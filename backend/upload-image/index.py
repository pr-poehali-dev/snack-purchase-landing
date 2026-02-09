import json
import os
import boto3
import base64
import uuid
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Загружает изображение товара в S3 и возвращает URL"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        image_base64 = body.get('image')
        filename = body.get('filename', 'image.jpg')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Image data is required'})
            }
        
        # Декодируем base64
        if ',' in image_base64:
            image_base64 = image_base64.split(',')[1]
        
        image_data = base64.b64decode(image_base64)
        
        # Определяем тип файла
        content_type = 'image/jpeg'
        if filename.lower().endswith('.png'):
            content_type = 'image/png'
        elif filename.lower().endswith('.webp'):
            content_type = 'image/webp'
        
        # Генерируем уникальное имя файла
        ext = filename.split('.')[-1] if '.' in filename else 'jpg'
        unique_filename = f"products/{datetime.now().strftime('%Y%m%d')}_{uuid.uuid4().hex[:8]}.{ext}"
        
        # Загружаем в S3
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        
        s3.put_object(
            Bucket='files',
            Key=unique_filename,
            Body=image_data,
            ContentType=content_type
        )
        
        # Формируем CDN URL
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{unique_filename}"
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'url': cdn_url,
                'filename': unique_filename
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
