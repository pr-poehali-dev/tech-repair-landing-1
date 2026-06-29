import json
import os
import psycopg2
import psycopg2.extras

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}

# Описание таблиц: имя -> (поля для записи, поле сортировки)
TABLES = {
    'services': (['icon', 'title', 'price_from', 'features', 'is_popular', 'sort_order'], 'sort_order'),
    'prices': (['category', 'name', 'price', 'duration', 'sort_order'], 'sort_order'),
    'portfolio': (['icon', 'title', 'problem', 'solution', 'duration', 'sort_order'], 'sort_order'),
    'reviews': (['name', 'role', 'text', 'rating', 'is_published', 'sort_order'], 'sort_order'),
    'blog_posts': (['category', 'icon', 'title', 'excerpt', 'read_time', 'published_at', 'sort_order'], 'sort_order'),
    'faqs': (['question', 'answer', 'sort_order'], 'sort_order'),
    'team_members': (['name', 'role', 'experience', 'skill', 'sort_order'], 'sort_order'),
}
BOOL_FIELDS = {'is_popular', 'is_published'}
INT_FIELDS = {'rating', 'sort_order'}


def db():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    return conn


def resp(status, body):
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False, 'body': json.dumps(body, default=str, ensure_ascii=False)}


def get_user(cur, headers):
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token', '')
    if not token:
        return None
    token = token.replace("'", "''")
    cur.execute(
        f"SELECT u.id, u.role FROM {SCHEMA}.sessions s JOIN {SCHEMA}.users u ON u.id = s.user_id "
        f"WHERE s.token = '{token}' AND s.expires_at > NOW()"
    )
    row = cur.fetchone()
    return dict(row) if row else None


def esc(v):
    if v is None:
        return 'NULL'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


def cast(field, value):
    if field in BOOL_FIELDS:
        return bool(value)
    if field in INT_FIELDS:
        try:
            return int(value)
        except (TypeError, ValueError):
            return 0
    return value


def handler(event: dict, context) -> dict:
    '''CRUD управление контентом всех секций сайта: услуги, цены, портфолио, отзывы, блог, FAQ, команда.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    table = params.get('table', '')

    conn = db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Публичный GET — без авторизации, отдаёт все секции или конкретную
    if method == 'GET':
        if table and table in TABLES:
            order = TABLES[table][1]
            cur.execute(f"SELECT * FROM {SCHEMA}.{table} ORDER BY {order}, id")
            return resp(200, {'items': [dict(r) for r in cur.fetchall()]})
        result = {}
        for name, (_, order) in TABLES.items():
            cur.execute(f"SELECT * FROM {SCHEMA}.{name} ORDER BY {order}, id")
            result[name] = [dict(r) for r in cur.fetchall()]
        return resp(200, result)

    # Все изменения требуют авторизации
    user = get_user(cur, event.get('headers', {}))
    if not user:
        return resp(401, {'error': 'Требуется авторизация'})

    if table not in TABLES:
        return resp(400, {'error': 'Неизвестный раздел'})

    fields = TABLES[table][0]
    body = json.loads(event.get('body') or '{}')

    if method == 'POST':
        cols, vals = [], []
        for f in fields:
            if f in body:
                cols.append(f)
                vals.append(esc(cast(f, body[f])))
        cur.execute(
            f"INSERT INTO {SCHEMA}.{table} ({', '.join(cols)}) VALUES ({', '.join(vals)}) RETURNING *"
        )
        return resp(200, {'item': dict(cur.fetchone())})

    if method == 'PUT':
        item_id = int(body.get('id', 0))
        sets = [f"{f} = {esc(cast(f, body[f]))}" for f in fields if f in body]
        if not sets:
            return resp(400, {'error': 'Нет данных для обновления'})
        cur.execute(
            f"UPDATE {SCHEMA}.{table} SET {', '.join(sets)} WHERE id = {item_id} RETURNING *"
        )
        row = cur.fetchone()
        return resp(200, {'item': dict(row) if row else None})

    if method == 'DELETE':
        if user['role'] != 'admin':
            return resp(403, {'error': 'Удаление доступно только администратору'})
        item_id = int(params.get('id', 0))
        cur.execute(f"DELETE FROM {SCHEMA}.{table} WHERE id = {item_id}")
        return resp(200, {'ok': True})

    return resp(400, {'error': 'Метод не поддерживается'})
