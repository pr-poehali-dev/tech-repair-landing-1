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


def db():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    return conn


def resp(status, body):
    return {'statusCode': status, 'headers': {**CORS, 'Content-Type': 'application/json'},
            'isBase64Encoded': False, 'body': json.dumps(body, default=str, ensure_ascii=False)}


def esc(v):
    if v is None:
        return 'NULL'
    return "'" + str(v).replace("'", "''") + "'"


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


def handler(event: dict, context) -> dict:
    '''Приём заявок с формы сайта (публично) и управление ими в админ-панели.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    conn = db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Публичная отправка заявки
    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = esc(body.get('name', ''))
        phone = esc(body.get('phone', ''))
        appliance = esc(body.get('appliance', ''))
        message = esc(body.get('message', ''))
        cur.execute(
            f"INSERT INTO {SCHEMA}.requests (name, phone, appliance, message) "
            f"VALUES ({name}, {phone}, {appliance}, {message}) RETURNING id"
        )
        return resp(200, {'ok': True, 'id': cur.fetchone()['id']})

    # Остальное — только для авторизованных
    user = get_user(cur, event.get('headers', {}))
    if not user:
        return resp(401, {'error': 'Требуется авторизация'})

    if method == 'GET':
        cur.execute(f"SELECT * FROM {SCHEMA}.requests ORDER BY created_at DESC")
        return resp(200, {'items': [dict(r) for r in cur.fetchall()]})

    if method == 'PUT':
        body = json.loads(event.get('body') or '{}')
        item_id = int(body.get('id', 0))
        status = esc(body.get('status', 'new'))
        cur.execute(f"UPDATE {SCHEMA}.requests SET status = {status} WHERE id = {item_id} RETURNING *")
        row = cur.fetchone()
        return resp(200, {'item': dict(row) if row else None})

    if method == 'DELETE':
        if user['role'] != 'admin':
            return resp(403, {'error': 'Удаление доступно только администратору'})
        params = event.get('queryStringParameters') or {}
        item_id = int(params.get('id', 0))
        cur.execute(f"DELETE FROM {SCHEMA}.requests WHERE id = {item_id}")
        return resp(200, {'ok': True})

    return resp(400, {'error': 'Метод не поддерживается'})
