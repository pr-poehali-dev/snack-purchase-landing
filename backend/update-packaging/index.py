import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Обновляет категорию Фасовка с правильными товарами"""
    
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
        
        # Обновляем категорию
        cur.execute("""
            UPDATE t_p14304766_snack_purchase_landi.categories 
            SET 
                title = 'Фасовка',
                subtitle = 'Готовые порции по 125-150 гр',
                description = 'Удобная фасовка популярных позиций небольшими порциями. Готовые наборы и чищеная рыба — всё, что нужно для быстрой продажи.',
                seo_title = 'Фасовка 125-150 гр',
                seo_description = 'Готовые порции рыбы, орехов и закусок.',
                benefits = ARRAY['Удобные порции по 125-150 гр', 'Готовые к продаже', 'Популярные позиции', 'Чищеная рыба и наборы']
            WHERE id = 'packaging'
        """)
        
        # Удаляем старые товары категории packaging
        cur.execute("DELETE FROM t_p14304766_snack_purchase_landi.products WHERE category_id = 'packaging'")
        deleted = cur.rowcount
        
        # Добавляем новые товары
        packaging_products = [
            ('Ассорти рыбное "Семь вкусов моря" 125 гр', 'Премиум ассорти', '🐟', '250', 'шт'),
            ('Икра воблы 125 гр', 'Вяленая', '🐟', '330', 'шт'),
            ('Икра камбалы 125 гр', 'Дальневосточная', '🐟', '400', 'шт'),
            ('Икра минтая 125 гр', 'Вяленая', '🐟', '245', 'шт'),
            ('Корюшка чищеная с икрой 125 гр', 'Готовая к употреблению', '🐟', '330', 'шт'),
            ('Ореховый микс 125 гр', 'Смесь орехов', '🥜', '180', 'шт'),
            ('Соломка камбалы 125 гр', 'Нарезка', '🐟', '250', 'шт'),
            ('Соломка семги 125 гр', 'Нарезка', '🐠', '155', 'шт'),
            ('Фисташки Америка 125 гр', 'Американские', '🥜', '210', 'шт'),
            ('Чипсы мясные КУРИЦА 125 гр', 'Оригинальные', '🍗', '155', 'шт'),
            ('Чипсы мясные СВИНИНА 125 гр', 'Оригинальные', '🥩', '170', 'шт'),
            ('Вобла чищеная (тушка)', 'Готова к употреблению', '🐟', '1100', 'кг'),
            ('Корюшка чищеная (тушка)', 'Готова к употреблению', '🐟', '1400', 'кг'),
            ('Сырок чищеный (тушка)', 'Готов к употреблению', '🐟', '750', 'кг'),
            ('Стейк горбуши сушеные 150 гр', '150г', '🐠', '265', 'шт'),
            ('Набор из воблы 150гр', 'Готовый набор', '🐟', '65', 'шт'),
            ('Креветка с/с 40 гр', 'Сушено-соленая', '🦐', '70', 'шт'),
            ('Креветка с/с 150 гр', 'Сушено-соленая', '🦐', '255', 'шт'),
        ]
        
        for product in packaging_products:
            cur.execute("""
                INSERT INTO t_p14304766_snack_purchase_landi.products 
                (category_id, name, description, image, price, unit, in_stock)
                VALUES ('packaging', %s, %s, %s, %s, %s, true)
            """, product)
        
        conn.commit()
        inserted = len(packaging_products)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'deleted': deleted,
                'inserted': inserted,
                'message': f'Удалено {deleted} старых товаров, добавлено {inserted} новых'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
