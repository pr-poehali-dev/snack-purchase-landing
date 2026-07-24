INSERT INTO t_p14304766_snack_purchase_landi.products (id, category_id, name, description, price, unit, in_stock, image, sort_order)
VALUES (943, 'meat-dried', 'Мини Колбаски Пивные ПАТРОНЫ Аджика 80гр', '80 г', '115₽/шт', 'кг', false, '', 0)
ON CONFLICT (id) DO NOTHING;