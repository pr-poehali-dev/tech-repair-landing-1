import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2
import psycopg2.extras

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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


def hash_pw(pw: str) -> str:
    return hashlib.sha256(pw.encode()).hexdigest()


def get_user_by_token(cur, token: str):
    if not token:
        return None
    cur.execute(
        f"SELECT u.id, u.email, u.name, u.role FROM {SCHEMA}.sessions s "
        f"JOIN {SCHEMA}.users u ON u.id = s.user_id "
        f"WHERE s.token = '{token}' AND s.expires_at > NOW()"
    )
    row = cur.fetchone()
    return dict(row) if row else None


def handler(event: dict, context) -> dict:
    '''Авторизация: вход по email/паролю, выдача токена и проверка текущей сессии.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'isBase64Encoded': False, 'body': ''}

    conn = db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    if method == 'GET':
        token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token', '')
        user = get_user_by_token(cur, token)
        if not user:
            return resp(401, {'error': 'Не авторизован'})
        return resp(200, {'user': user})

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        action = body.get('action', 'login')

        if action == 'login':
            email = (body.get('email') or '').strip().lower().replace("'", "''")
            password = body.get('password') or ''
            cur.execute(f"SELECT id, email, name, role, password_hash FROM {SCHEMA}.users WHERE email = '{email}'")
            row = cur.fetchone()
            if not row or row['password_hash'] != hash_pw(password):
                return resp(401, {'error': 'Неверный email или пароль'})
            token = secrets.token_hex(32)
            expires = datetime.utcnow() + timedelta(days=7)
            cur.execute(
                f"INSERT INTO {SCHEMA}.sessions (user_id, token, expires_at) "
                f"VALUES ({row['id']}, '{token}', '{expires.isoformat()}')"
            )
            return resp(200, {'token': token, 'user': {'id': row['id'], 'email': row['email'],
                                                       'name': row['name'], 'role': row['role']}})

        if action == 'logout':
            token = body.get('token', '').replace("'", "''")
            cur.execute(f"UPDATE {SCHEMA}.sessions SET expires_at = NOW() WHERE token = '{token}'")
            return resp(200, {'ok': True})

    return resp(400, {'error': 'Неверный запрос'})
