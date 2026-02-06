'''Загрузка начальных данных категорий и товаров в базу данных'''
import json
import os
import psycopg2

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
        # Подключение к БД
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        # Данные категорий
        categories = [
            {
                'id': 'fish-dried',
                'emoji': '🐟',
                'title': 'Рыба вяленая',
                'subtitle': 'Классика пивных закусок',
                'description': 'Вяленая рыба — это основа любой пивной точки. Астраханская вобла, пелядь, камбала с икрой — всё, что реально покупают. Работаем только с проверенными поставщиками, храним правильно, привозим свежее.',
                'seo_title': 'Вяленая рыба оптом — пивные закуски для магазинов разливного пива',
                'seo_description': 'Поставки вяленой и копчёной рыбы оптом для пивных магазинов. Снеки, мясные закуски, орехи, гренки. Свежий товар, быстрая отгрузка, адекватные цены.',
                'benefits': ['Только свежая рыба с правильными сроками', 'Астраханская вобла с икрой — хит продаж', 'Разные весовые категории и фасовка', 'Документы и сертификаты на всю продукцию']
            },
            {
                'id': 'fish-smoked',
                'emoji': '🐠',
                'title': 'Рыба копченая и соленая',
                'subtitle': 'Для гурманов и ценителей',
                'description': 'Копчёная и солёная рыба — это для тех, кто понимает толк в закусках. Красная рыба, сельдь, скумбрия холодного и горячего копчения. Особенно хорошо идёт под крафтовое пиво.',
                'seo_title': 'Копчёная рыба оптом — поставки для пивных магазинов',
                'seo_description': 'Копчёная рыба оптом: скумбрия, красная, белая, вялено-копчёная. Холодное копчение, свежие партии, поставки для пивных магазинов. Каталог и прайс на сайте.',
                'benefits': ['Холодное и горячее копчение', 'Красная рыба — хит под крафтовое пиво', 'Правильное хранение и транспортировка', 'Удобная нарезка и фасовка']
            },
            {
                'id': 'snacks',
                'emoji': '🦑',
                'title': 'Снеки',
                'subtitle': 'Кальмары, креветки и морские деликатесы',
                'description': 'Морские снеки — это категория с отличной маржой. Кальмары в разных форматах, креветки, осьминоги. Идут на ура, особенно в заведениях с молодой аудиторией.',
                'benefits': ['Все форматы кальмаров — кольца, стружка, щупальца', 'Креветки разных размеров', 'Яркая упаковка — продаёт сама себя', 'Отличная маржинальность']
            },
            {
                'id': 'meat',
                'emoji': '🥓',
                'title': 'Мясные закуски',
                'subtitle': 'Колбасы, сало, сыры',
                'description': 'Мясные закуски — это must-have для любого разливного бара. Охотничьи колбаски, пепперони, копчёные рёбрышки. Всё то, что всегда берут к тёмному пиву.',
                'benefits': ['Охотничьи колбаски — топ продаж', 'Правильная фасовка и хранение', 'Разные ценовые сегменты', 'Всегда свежие партии']
            },
            {
                'id': 'nuts',
                'emoji': '🥜',
                'title': 'Орехи',
                'subtitle': 'Арахис, миндаль, кешью',
                'description': 'Орехи — универсальная закуска, которую берут все. Солёные, жареные, со специями. Фасуем удобно, цена адекватная, качество на высоте.',
                'benefits': ['Разные форматы упаковки', 'Классические и премиальные орехи', 'Всегда свежие партии', 'Отличная маржинальность']
            },
            {
                'id': 'crackers',
                'emoji': '🥖',
                'title': 'Сухарики и чипсы',
                'subtitle': 'Гренки, чипсы, снеки',
                'description': 'Классика жанра — то, что всегда на ходу. Большой выбор вкусов, удобная фасовка, годные цены.',
                'benefits': ['Большой выбор вкусов', 'Разные форматы фасовки', 'Всегда свежие партии', 'Популярные бренды']
            }
        ]
        
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
        
        # Данные товаров для категории fish-dried
        fish_dried_products = [
            {'name': 'Вобла вяленая (крупная) ПРЕМИУМ', 'description': 'Крупная, отборная', 'image': '🐟', 'price': '1100₽/кг'},
            {'name': 'Вобла вяленая (отборная)', 'description': 'Премиум качество', 'image': '🐟', 'price': '780₽/кг'},
            {'name': 'Густера', 'description': 'Вяленая', 'image': '🐟', 'price': '335₽/кг'},
            {'name': 'Камбала вяленая (без икры)', 'description': 'Дальневосточная', 'image': '🐟', 'price': '750₽/кг'},
            {'name': 'Камбала вяленая (икр)', 'description': 'С икрой', 'image': '🐟', 'price': '1500₽/кг'},
            {'name': 'Камбала вяленая ЕРШ', 'description': 'Мелкая', 'image': '🐟', 'price': '1250₽/кг'},
            {'name': 'Камбала чищенная тушка', 'description': 'Готова к употреблению', 'image': '🐟', 'price': '1100₽/кг'},
            {'name': 'Корюшка Вяленая Дальний Восток (без икры)', 'description': 'Дальневосточная', 'image': '🐟', 'price': '2300₽/кг'},
            {'name': 'Корюшка вяленая Дальний Восток (икр.)', 'description': 'С икрой', 'image': '🐟', 'price': '3500₽/кг'},
            {'name': 'Корюшка вяленая Ладожская', 'description': 'Ладожское озеро', 'image': '🐟', 'price': '795₽/кг'},
            {'name': 'Красноперка вяленая', 'description': 'Нежная', 'image': '🐟', 'price': '370₽/кг'},
            {'name': 'Лещ вял. донской', 'description': 'Донской', 'image': '🐟', 'price': '430₽/кг'},
            {'name': 'Лещ вяленый', 'description': 'Классический', 'image': '🐟', 'price': '430₽/кг'},
            {'name': 'Мойва вяленая', 'description': 'Мелкая', 'image': '🐟', 'price': '800₽/кг'},
            {'name': 'Окунь вяленый', 'description': 'Речной', 'image': '🐟', 'price': '410₽/кг'},
            {'name': 'Пелядь вяленая', 'description': 'Жирная', 'image': '🐟', 'price': '1050₽/кг'},
            {'name': 'Плотва вяленая', 'description': 'Классика', 'image': '🐟', 'price': '650₽/кг'},
            {'name': 'Рыбец вяленый', 'description': 'Деликатес', 'image': '🐟', 'price': '510₽/кг'},
            {'name': 'Синец вяленый', 'description': 'Нежный', 'image': '🐟', 'price': '600₽/кг'},
            {'name': 'Судак вяленый', 'description': 'Крупный', 'image': '🐟', 'price': '780₽/кг'},
            {'name': 'Сырок вяленый (пыжьян)', 'description': 'Северный', 'image': '🐟', 'price': '860₽/кг'},
            {'name': 'Тюлька вяленая', 'description': 'Мелкая, целиком', 'image': '🐟', 'price': '480₽/кг'},
            {'name': 'Уклейка вяленая', 'description': 'Мелкая', 'image': '🐟', 'price': '1000₽/кг'},
            {'name': 'Балык сырка (пыжьян)', 'description': 'Деликатес', 'image': '🐟', 'price': '550₽/кг'},
            {'name': 'Чехонь вяленая', 'description': 'Мелкая и средняя', 'image': '🐟', 'price': '700₽/кг'},
            {'name': 'Щука вяленая', 'description': 'Крупная', 'image': '🐟', 'price': '860₽/кг'},
            {'name': 'Щука северная мелкая', 'description': 'Северная', 'image': '🐟', 'price': '860₽/кг'}
        ]
        
        # Вставка товаров fish-dried
        for i, prod in enumerate(fish_dried_products):
            cur.execute('''
                INSERT INTO products (category_id, name, description, image, price, unit, in_stock, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ''', ('fish-dried', prod['name'], prod['description'], prod['image'], prod['price'], 'кг', True, i))
        
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
                'products': len(fish_dried_products)
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
