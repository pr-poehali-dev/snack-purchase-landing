import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''Отправка заказов с сайта на почту владельца'''
    
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
    
    # Получаем данные заказа
    data = json.loads(event.get('body', '{}'))
    
    company_name = data.get('companyName', '')
    address = data.get('address', '')
    contact = data.get('contact', '')
    working_hours = data.get('workingHours', '')
    comments = data.get('comments', '')
    items = data.get('items', [])
    
    # Формируем текст письма
    items_text = '\n'.join([
        f"- {item['name']} (x{item['quantity']})"
        for item in items
    ])
    
    email_body = f"""
Новый заказ с сайта!

ДАННЫЕ ЗАКАЗЧИКА:
Наименование юр. лица: {company_name}
Точный адрес: {address}
Контакт для связи: {contact}
Время работы: {working_hours}
Комментарии: {comments}

ЗАКАЗАННЫЕ ТОВАРЫ:
{items_text}

---
Письмо отправлено автоматически с сайта
"""
    
    # Настройки SMTP
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    # Создаем письмо
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg['Subject'] = f'Новый заказ от {company_name}'
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
            'body': json.dumps({'success': True, 'message': 'Заказ отправлен на почту'})
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
