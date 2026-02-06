import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''Отправка простых заявок с сайта на почту владельца'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Получаем данные заявки
    data = json.loads(event.get('body', '{}'))
    
    name = data.get('name', '')
    phone = data.get('phone', '')
    message = data.get('message', '')
    category = data.get('category', 'Общая заявка')
    
    # Формируем текст письма
    email_body = f"""
Новая заявка с сайта!

ДАННЫЕ КЛИЕНТА:
Имя: {name}
Телефон: {phone}
Категория: {category}
Сообщение: {message if message else 'Не указано'}

---
Письмо отправлено автоматически с сайта
"""
    
    # Настройки SMTP
    smtp_host = os.environ.get('SMTP_HOST_CORRECT', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT_CORRECT', '465'))
    smtp_user = os.environ.get('SMTP_USER_CORRECT')
    smtp_password = os.environ.get('SMTP_PASSWORD_CORRECT')
    
    # Создаем письмо
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg['Subject'] = f'Новая заявка от {name} - {category}'
    msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
    
    # Отправляем письмо
    try:
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена на почту'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': str(e)})
        }
