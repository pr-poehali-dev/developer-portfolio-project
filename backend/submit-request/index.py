import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2


def handler(event, context):
    """Сохраняет заявку с сайта в БД и отправляет уведомление на почту"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните обязательные поля'})}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.requests (name, email, phone, message) VALUES (%s, %s, %s, %s) RETURNING id, created_at",
        (name, email, phone, message)
    )
    row = cur.fetchone()
    request_id = row[0]
    created_at = row[1].strftime('%d.%m.%Y %H:%M')
    conn.commit()
    cur.close()
    conn.close()

    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASSWORD', '')
    notify_email = os.environ.get('NOTIFY_EMAIL', '')

    if smtp_user and smtp_pass and notify_email:
        subject = f'Новая заявка #{request_id} с сайта'
        html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a1a2e;color:#e0e0e0;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#7c3aed,#0ea5e9);padding:20px 30px;">
                <h2 style="margin:0;color:#fff;">Новая заявка #{request_id}</h2>
            </div>
            <div style="padding:24px 30px;">
                <p><strong style="color:#a78bfa;">Имя:</strong> {name}</p>
                <p><strong style="color:#a78bfa;">Email:</strong> {email}</p>
                <p><strong style="color:#a78bfa;">Телефон:</strong> {phone or '—'}</p>
                <p><strong style="color:#a78bfa;">Сообщение:</strong></p>
                <div style="background:#262640;padding:16px;border-radius:8px;margin-top:8px;">{message}</div>
                <p style="color:#888;font-size:12px;margin-top:16px;">Дата: {created_at}</p>
            </div>
        </div>
        """
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = notify_email
        msg.attach(MIMEText(html, 'html'))

        try:
            server = smtplib.SMTP_SSL('smtp.mail.ru', 465)
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, notify_email, msg.as_string())
            server.quit()
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'id': request_id})
    }
