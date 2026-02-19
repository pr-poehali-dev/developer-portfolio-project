import json
import os
import psycopg2
import psycopg2.extras


def handler(event, context):
    """Возвращает список заявок для админ-панели"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    headers = event.get('headers', {})
    token = headers.get('X-Admin-Token', headers.get('x-admin-token', ''))
    admin_pass = os.environ.get('ADMIN_PASSWORD', 'admin123')
    if token != admin_pass:
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Unauthorized'})}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    method = event.get('httpMethod')

    if method == 'GET':
        cur.execute(f"SELECT * FROM {schema}.requests ORDER BY created_at DESC")
        rows = cur.fetchall()
        for r in rows:
            r['created_at'] = r['created_at'].isoformat() if r['created_at'] else None
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps(rows, default=str)}

    if method == 'PUT':
        body = json.loads(event.get('body', '{}'))
        req_id = body.get('id')
        status = body.get('status', 'new')
        if not req_id:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'id required'})}
        cur.execute(f"UPDATE {schema}.requests SET status = %s WHERE id = %s", (status, req_id))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'success': True})}

    if method == 'DELETE':
        body = json.loads(event.get('body', '{}'))
        req_id = body.get('id')
        if not req_id:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'id required'})}
        cur.execute(f"DELETE FROM {schema}.requests WHERE id = %s", (req_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'success': True})}

    return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}
