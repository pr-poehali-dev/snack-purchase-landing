'''Загрузка начальных данных категорий и товаров в базу данных'''
import json
import os
import psycopg2
from data_loader import get_all_categories, get_all_products

def handler(event: dict, context) -> dict:
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
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        # Получаем данные из data_loader
        categories = get_all_categories()
        products = get_all_products()
        
        # Вставка категорий
        for cat in categories:
            cur.execute('''
                INSERT INTO categories (id, emoji, title, subtitle, description, seo_title, seo_description, benefits)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO UPDATE SET
                    emoji = EXCLUDED.emoji,
                    title = EXCLUDED.title,
                    subtitle = EXCLUDED.subtitle,
                    description = EXCLUDED.description,
                    seo_title = EXCLUDED.seo_title,
                    seo_description = EXCLUDED.seo_description,
                    benefits = EXCLUDED.benefits
            ''', (cat['id'], cat['emoji'], cat['title'], cat['subtitle'], cat['description'],
                  cat.get('seo_title'), cat.get('seo_description'), cat['benefits']))
        
        # Вставка товаров
        for i, prod in enumerate(products):
            cur.execute('''
                INSERT INTO products (category_id, name, description, image, price, unit, in_stock, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ''', (prod[0], prod[1], prod[2], prod[3], prod[4], 'кг', True, i))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Данные успешно загружены',
                'categories': len(categories),
                'products': len(products)
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }