'''API для получения и обновления товаров (v3)'''
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            # Получение всех категорий с товарами
            cur.execute('''
                SELECT 
                    c.id as category_id,
                    c.emoji,
                    c.title,
                    c.subtitle,
                    c.description,
                    c.seo_title,
                    c.seo_description,
                    c.benefits,
                    json_agg(
                        json_build_object(
                            'id', p.id,
                            'name', p.name,
                            'description', p.description,
                            'image', p.image,
                            'price', p.price,
                            'unit', p.unit,
                            'in_stock', p.in_stock
                        ) ORDER BY p.sort_order
                    ) as products
                FROM categories c
                LEFT JOIN products p ON c.id = p.category_id
                GROUP BY c.id, c.emoji, c.title, c.subtitle, c.description, 
                         c.seo_title, c.seo_description, c.benefits
                ORDER BY c.id
            ''')
            
            categories = cur.fetchall()
            result = {}
            
            for cat in categories:
                result[cat['category_id']] = {
                    'id': cat['category_id'],
                    'emoji': cat['emoji'],
                    'title': cat['title'],
                    'subtitle': cat['subtitle'],
                    'description': cat['description'],
                    'seo': {
                        'title': cat['seo_title'],
                        'description': cat['seo_description']
                    },
                    'benefits': cat['benefits'] or [],
                    'products': [p for p in cat['products'] if p['id'] is not None]
                }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result)
            }
        
        elif method == 'PUT':
            # Обновление товара
            body = json.loads(event.get('body', '{}'))
            product_id = body.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product ID is required'})
                }
            
            update_fields = []
            params = []
            
            if 'name' in body:
                update_fields.append('name = %s')
                params.append(body['name'])
            
            if 'description' in body:
                update_fields.append('description = %s')
                params.append(body['description'])
            
            if 'price' in body:
                update_fields.append('price = %s')
                params.append(body['price'])
            
            if 'in_stock' in body:
                update_fields.append('in_stock = %s')
                params.append(body['in_stock'])
            
            if 'image' in body:
                update_fields.append('image = %s')
                params.append(body['image'])
            
            if not update_fields:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'No fields to update'})
                }
            
            params.append(product_id)
            
            query = f'''
                UPDATE products 
                SET {', '.join(update_fields)}
                WHERE id = %s
                RETURNING id, name, description, price, in_stock
            '''
            
            cur.execute(query, params)
            updated_product = cur.fetchone()
            
            conn.commit()
            cur.close()
            conn.close()
            
            if not updated_product:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'product': dict(updated_product)
                })
            }
        
        elif method == 'POST':
            # Создание нового товара
            body = json.loads(event.get('body', '{}'))
            category_id = body.get('category_id')
            name = body.get('name')
            price = body.get('price')
            
            if not category_id or not name or not price:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'category_id, name and price are required'})
                }
            
            cur.execute('''
                INSERT INTO products (category_id, name, description, price, in_stock, image, unit)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id, name, description, price, in_stock
            ''', (
                category_id,
                name,
                body.get('description', ''),
                price,
                body.get('in_stock', True),
                body.get('image', ''),
                body.get('unit', 'кг')
            ))
            
            new_product = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'product': dict(new_product)
                })
            }
        
        elif method == 'DELETE':
            # Удаление товара
            body = json.loads(event.get('body', '{}'))
            product_id = body.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product ID is required'})
                }
            
            cur.execute('DELETE FROM products WHERE id = %s RETURNING id', (product_id,))
            deleted = cur.fetchone()
            
            conn.commit()
            cur.close()
            conn.close()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'deleted_id': deleted['id']})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }