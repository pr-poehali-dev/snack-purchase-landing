import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Удаляет дубликаты товаров из базы данных"""
    
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
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        # Находим и удаляем дубликаты (оставляем записи с меньшими ID)
        cur.execute("""
            DELETE FROM t_p14304766_snack_purchase_landi.products 
            WHERE id IN (
                SELECT p2.id 
                FROM t_p14304766_snack_purchase_landi.products p1
                INNER JOIN t_p14304766_snack_purchase_landi.products p2 
                    ON p1.name = p2.name 
                    AND p1.category_id = p2.category_id 
                    AND p1.id < p2.id
            )
        """)
        
        deleted_count = cur.rowcount
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'deleted_count': deleted_count,
                'message': f'Удалено {deleted_count} дубликатов'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
