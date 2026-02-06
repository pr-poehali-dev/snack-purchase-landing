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
    
    company_type = data.get('companyType', 'ООО')
    company_name = data.get('companyName', '')
    address = data.get('address', '')
    contact = data.get('contact', '')
    working_hours = data.get('workingHours', '')
    comments = data.get('comments', '')
    items = data.get('items', [])
    
    # Формируем текст письма с товарами и общей суммой
    items_list = []
    total_sum = 0
    
    def extract_price(price_str):
        import re
        if not price_str:
            return 0
        match = re.search(r'\d+', price_str)
        return int(match.group()) if match else 0
    
    for item in items:
        price = extract_price(item.get('price', '0₽'))
        quantity = item['quantity']
        item_total = price * quantity
        total_sum += item_total
        items_list.append(f"- {item['name']} ({quantity} {item.get('unit', 'кг')}) — {price}₽/шт × {quantity} = {item_total}₽")
    
    items_text = '\n'.join(items_list)
    
    email_body = f"""
Новый заказ с сайта!

ДАННЫЕ ЗАКАЗЧИКА:
{company_type} {company_name}
Точный адрес: {address}
Контакт для связи: {contact}
Время работы: {working_hours}
Комментарии: {comments}

ЗАКАЗАННЫЕ ТОВАРЫ:
{items_text}

ИТОГОВАЯ СУММА: {total_sum}₽

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