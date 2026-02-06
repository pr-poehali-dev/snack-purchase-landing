import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';

interface Product {
  name: string;
  description: string;
  price?: string;
  image: string;
  unit?: string;
  photo?: string;
}

interface CategoryData {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  products: Product[];
}

const categoriesData: Record<string, CategoryData> = {
  'fish-dried': {
    id: 'fish-dried',
    emoji: '🐟',
    title: 'Рыба вяленая',
    subtitle: 'Классика пивных закусок',
    description: 'Вяленая рыба — это основа любой пивной точки. Астраханская вобла, пелядь, камбала с икрой — всё, что реально покупают. Работаем только с проверенными поставщиками, храним правильно, привозим свежее.',
    benefits: [
      'Только свежая рыба с правильными сроками',
      'Астраханская вобла с икрой — хит продаж',
      'Разные весовые категории и фасовка',
      'Документы и сертификаты на всю продукцию'
    ],
    products: [
      { name: 'Вобла вяленая (крупная) ПРЕМИУМ', description: 'Крупная, отборная', image: '🐟', price: '1100₽/кг', unit: 'кг' },
      { name: 'Вобла вяленая (отборная)', description: 'Премиум качество', image: '🐟', price: '780₽/кг', unit: 'кг' },
      { name: 'Густера', description: 'Вяленая', image: '🐟', price: '335₽/кг', unit: 'кг' },
      { name: 'Камбала вяленая (без икры)', description: 'Дальневосточная', image: '🐟', price: '750₽/кг', unit: 'кг' },
      { name: 'Камбала вяленая (икр)', description: 'С икрой', image: '🐟', price: '1500₽/кг', unit: 'кг' },
      { name: 'Камбала вяленая ЕРШ', description: 'Мелкая', image: '🐟', price: '1250₽/кг', unit: 'кг' },
      { name: 'Камбала чищенная тушка', description: 'Готова к употреблению', image: '🐟', price: '1100₽/кг', unit: 'кг' },
      { name: 'Корюшка Вяленая Дальний Восток (без икры)', description: 'Дальневосточная', image: '🐟', price: '2300₽/кг', unit: 'кг' },
      { name: 'Корюшка вяленая Дальний Восток (икр.)', description: 'С икрой', image: '🐟', price: '3500₽/кг', unit: 'кг', photo: 'https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/e980f386-249b-41e5-9d0f-1592d40485d8.jpg' },
      { name: 'Корюшка вяленая Ладожская', description: 'Ладожское озеро', image: '🐟', price: '795₽/кг', unit: 'кг' },
      { name: 'Красноперка вяленая', description: 'Нежная', image: '🐟', price: '370₽/кг', unit: 'кг' },
      { name: 'Лещ вял. донской', description: 'Донской', image: '🐟', price: '430₽/кг', unit: 'кг' },
      { name: 'Лещ вяленый', description: 'Классический', image: '🐟', price: '430₽/кг', unit: 'кг' },
      { name: 'Мойва вяленая', description: 'Мелкая', image: '🐟', price: '800₽/кг', unit: 'кг' },
      { name: 'Окунь вяленый', description: 'Речной', image: '🐟', price: '410₽/кг', unit: 'кг' },
      { name: 'Пелядь вяленая', description: 'Жирная', image: '🐟', price: '1050₽/кг', unit: 'кг' },
      { name: 'Плотва вяленая', description: 'Классика', image: '🐟', price: '650₽/кг', unit: 'кг' },
      { name: 'Рыбец вяленый', description: 'Деликатес', image: '🐟', price: '510₽/кг', unit: 'кг' },
      { name: 'Синец вяленый', description: 'Нежный', image: '🐟', price: '600₽/кг', unit: 'кг' },
      { name: 'Судак вяленый', description: 'Крупный', image: '🐟', price: '780₽/кг', unit: 'кг' },
      { name: 'Сырок вяленый (пыжьян)', description: 'Северный', image: '🐟', price: '860₽/кг', unit: 'кг' },
      { name: 'Тюлька вяленая', description: 'Мелкая, целиком', image: '🐟', price: '480₽/кг', unit: 'кг' },
      { name: 'Уклейка вяленая', description: 'Мелкая', image: '🐟', price: '1000₽/кг', unit: 'кг' },
      { name: 'Балык сырка (пыжьян)', description: 'Деликатес', image: '🐟', price: '550₽/кг', unit: 'кг' },
      { name: 'Чехонь вяленая', description: 'Мелкая и средняя', image: '🐟', price: '700₽/кг', unit: 'кг' },
      { name: 'Щука вяленая', description: 'Крупная', image: '🐟', price: '860₽/кг', unit: 'кг' },
      { name: 'Щука северная мелкая', description: 'Северная', image: '🐟', price: '860₽/кг', unit: 'кг' }
    ]
  },
  'fish-smoked': {
    id: 'fish-smoked',
    emoji: '🐠',
    title: 'Рыба копченая и соленая',
    subtitle: 'Для гурманов и ценителей',
    description: 'Копчёная и солёная рыба — это для тех, кто понимает толк в закусках. Красная рыба, сельдь, скумбрия холодного и горячего копчения. Особенно хорошо идёт под крафтовое пиво.',
    benefits: [
      'Холодное и горячее копчение',
      'Красная рыба — хит под крафтовое пиво',
      'Правильное хранение и транспортировка',
      'Удобная нарезка и фасовка'
    ],
    products: [
      { name: 'Ассорти кета-зубатка шашлык х/к', description: 'Ассорти холодного копчения', image: '🐠', price: '1550₽/кг', unit: 'кг' },
      { name: 'Балык горбуши', description: 'Деликатес', image: '🐠', price: '900₽/кг', unit: 'кг' },
      { name: 'Балык Кеты', description: 'Премиум', image: '🐠', price: '950₽/кг', unit: 'кг' },
      { name: 'Вомер х/к', description: 'Холодного копчения', image: '🐠', price: '840₽/кг', unit: 'кг' },
      { name: 'Горбуша филе пласт х/к', description: 'Филе холодного копчения', image: '🐠', price: '1400₽/кг', unit: 'кг' },
      { name: 'Жерех бабочка х/к', description: 'Разделка бабочка', image: '🐠', price: '615₽/кг', unit: 'кг' },
      { name: 'Кальмар щупальцы х/к', description: 'Холодного копчения', image: '🐠', price: '2400₽/кг', unit: 'кг' },
      { name: 'Кальмар шашлык г/к', description: 'Горячего копчения', image: '🐠', price: '1190₽/кг', unit: 'кг' },
      { name: 'Кальмар палочки г/к', description: 'Горячего копчения', image: '🐠', price: '1260₽/кг', unit: 'кг' },
      { name: 'Камбала х/к', description: 'Холодного копчения', image: '🐠', price: '580₽/кг', unit: 'кг' },
      { name: 'Кета филе пласт х/к', description: 'Филе холодного копчения', image: '🐠', price: '1200₽/кг', unit: 'кг' },
      { name: 'Кета шашлык х/к', description: 'Шашлык холодного копчения', image: '🐠', price: '1450₽/кг', unit: 'кг' },
      { name: 'Лещ х/к', description: 'Холодного копчения', image: '🐠', price: '320₽/кг', unit: 'кг' },
      { name: 'Окунь бабочка МОРСКОЙ Х/К', description: 'Морской, разделка бабочка', image: '🐠', price: '890₽/кг', unit: 'кг' },
      { name: 'Пелядь х/к', description: 'Холодного копчения', image: '🐠', price: '1020₽/кг', unit: 'кг' },
      { name: 'Скумбрия х/к', description: 'Холодного копчения', image: '🐠', price: '645₽/кг', unit: 'кг' },
      { name: 'Сом филе пласт х/к', description: 'Филе холодного копчения', image: '🐠', price: '950₽/кг', unit: 'кг' },
      { name: 'Теша горбуши', description: 'Брюшки', image: '🐠', price: '430₽/кг', unit: 'кг' },
      { name: 'Теша Кеты', description: 'Брюшки', image: '🐠', price: '260₽/кг', unit: 'кг' },
      { name: 'Щука шашлык х/к', description: 'Шашлык холодного копчения', image: '🐠', price: '1100₽/кг', unit: 'кг' }
    ]
  },
  'snacks': {
    id: 'snacks',
    emoji: '🦑',
    title: 'Снеки',
    subtitle: 'Кальмары, креветки и морские деликатесы',
    description: 'Морские снеки — это категория с отличной маржой. Кальмары в разных форматах, креветки, осьминоги. Идут на ура, особенно в заведениях с молодой аудиторией.',
    benefits: [
      'Все форматы кальмаров — кольца, стружка, щупальца',
      'Креветки разных размеров',
      'Яркая упаковка — продаёт сама себя',
      'Отличная маржинальность'
    ],
    products: [
      { name: 'Анчоус', description: 'Сушеный', image: '🦑', price: '900₽/кг', unit: 'кг' },
      { name: 'Ассорти рыбное "Семь вкусов моря"', description: 'Премиум ассорти', image: '🦑', price: '1750₽/кг', unit: 'кг' },
      { name: 'Желтый полосатик', description: 'Деликатес', image: '🦑', price: '1250₽/кг', unit: 'кг' },
      { name: 'Икра Воблы', description: 'Вяленая', image: '🦑', price: '2500₽/кг', unit: 'кг' },
      { name: 'Икра минтая', description: 'Вяленая', image: '🦑', price: '1700₽/кг', unit: 'кг' },
      { name: 'Икра форели вяленая', description: 'Премиум', image: '🦑', price: '2400₽/кг', unit: 'кг' },
      { name: 'Камбалка деликатесная', description: 'Вяленая', image: '🦑', price: '1160₽/кг', unit: 'кг' },
      { name: 'Кольца кальмара', description: 'Сушеные', image: '🦑', price: '1390₽/кг', unit: 'кг' },
      { name: 'Кольца кальмара по шанхайски', description: 'Острые', image: '🦑', price: '1450₽/кг', unit: 'кг' },
      { name: 'Креветка сушёная', description: 'Целиком', image: '🦐', price: '1560₽/кг', unit: 'кг' },
      { name: 'Мидии вяленые', description: 'Деликатес', image: '🦪', price: '1930₽/кг', unit: 'кг' },
      { name: 'Кальмар сушеный пятачки (осьминог с/с)', description: 'Классические', image: '🐙', price: '1900₽/кг', unit: 'кг' },
      { name: 'Кальмар сушеный пятачки ПРЕМИУМ (осьминог с/с)', description: 'Премиум качество', image: '🐙', price: '2000₽/кг', unit: 'кг' },
      { name: 'Палочки Кеты', description: 'Вяленые', image: '🦑', price: '1800₽/кг', unit: 'кг' },
      { name: 'Паутинка кальмара', description: 'Тонкая нарезка', image: '🦑', price: '860₽/кг', unit: 'кг' },
      { name: 'Паутинка СЕМГИ', description: 'Тонкая нарезка', image: '🦑', price: '790₽/кг', unit: 'кг' },
      { name: 'Паутинка ФОРЕЛИ', description: 'Тонкая нарезка', image: '🦑', price: '790₽/кг', unit: 'кг' },
      { name: 'Полоски кальмара', description: 'Сушеные', image: '🦑', price: '1400₽/кг', unit: 'кг' },
      { name: 'Полоски кальмара по-шанхайски', description: 'Острые', image: '🦑', price: '1450₽/кг', unit: 'кг' },
      { name: 'Полоски кальмара ПРЕМИУМ', description: 'Премиум качество', image: '🦑', price: '2000₽/кг', unit: 'кг' },
      { name: 'Соломка леща', description: 'Вяленая', image: '🦑', price: '580₽/кг', unit: 'кг' },
      { name: 'Соломка минтая', description: 'Сушеная', image: '🦑', price: '730₽/кг', unit: 'кг' },
      { name: 'Соломка семги', description: 'Вяленая', image: '🦑', price: '1050₽/кг', unit: 'кг' },
      { name: 'Соломка щуки (натуральная)', description: 'Без добавок', image: '🦑', price: '750₽/кг', unit: 'кг' },
      { name: 'Соломка сома (натуральная)', description: 'Без добавок', image: '🦑', price: '990₽/кг', unit: 'кг' },
      { name: 'Стейки горбуши сушеные', description: 'Деликатес', image: '🦑', price: '1900₽/кг', unit: 'кг' },
      { name: 'Стружка кальмара', description: 'Сушеная', image: '🦑', price: '1390₽/кг', unit: 'кг' },
      { name: 'Стружка кальмара по шанхайски', description: 'Острая', image: '🦑', price: '1450₽/кг', unit: 'кг' },
      { name: 'Таранка с перцем', description: 'Острая', image: '🦑', price: '730₽/кг', unit: 'кг' },
      { name: 'Тунец сол-суш с перцем', description: 'Острый', image: '🦑', price: '990₽/кг', unit: 'кг' },
      { name: 'Тунец солено-сушеный', description: 'Классический', image: '🦑', price: '990₽/кг', unit: 'кг' },
      { name: 'Угорь с/с', description: 'Солено-сушеный', image: '🦑', price: '990₽/кг', unit: 'кг' },
      { name: 'Хот-Тейс из кальмара', description: 'Острые полоски', image: '🦑', price: '1750₽/кг', unit: 'кг' },
      { name: 'Янтарная с перцем', description: 'Острая', image: '🦑', price: '790₽/кг', unit: 'кг' },
      { name: 'Японские снеки', description: 'Микс', image: '🦑', price: '450₽/кг', unit: 'кг' }
    ]
  },
  'crackers-nuts': {
    id: 'crackers-nuts',
    emoji: '🥨',
    title: 'Гренки, чипсы, орехи, сушки',
    subtitle: 'Хрустящие закуски на любой вкус',
    description: 'Хрустящие снеки — это импульсная покупка. Человек идёт за пивом, видит гренки с чесноком или орешки — и берёт. Маленький чек, но объёмы большие.',
    benefits: [
      'Все популярные вкусы',
      'Разная фасовка — от мелкой до оптовой',
      'Долгий срок годности',
      'Высокая оборачиваемость'
    ],
    products: [
      { name: 'Арахис со вкусом Аджика', description: 'Острый', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Баварские колбаски', description: 'Пряный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Барбекю', description: 'Классический', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Бекон', description: 'Мясной', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Васаби', description: 'Острый', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Грибы-Сметана', description: 'Сливочный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом жареные колбаски с соусом карри', description: 'Пряный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Краб', description: 'Морской', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Красная икра', description: 'Деликатесный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Креветка', description: 'Морской', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Паприка', description: 'Пряный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Салями', description: 'Мясной', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Семга-Сыр', description: 'Рыбный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Сметана-Зелень', description: 'Классический', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Сыр', description: 'Сырный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Сыр со сметаной', description: 'Сливочный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Сыр-Чеснок', description: 'Ароматный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Тайский чили', description: 'Острый', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом томат-зелень', description: 'Овощной', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Холодец-Хрен', description: 'Традиционный', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис со вкусом Шашлык', description: 'Мясной', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Арахис соленый', description: 'Классический', image: '🥜', price: '310₽/кг', unit: 'кг' },
      { name: 'Бобы жарено соленые', description: 'Хрустящие', image: '🥜', price: '580₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Бекон', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Васаби', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Креветка', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Пикантный', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Сметана-Лук', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Сыр', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Холодец-Хрен', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Глазурированный арахис Черная икра', description: 'В глазури', image: '🥜', price: '360₽/кг', unit: 'кг' },
      { name: 'Гренки "Бекон"', description: 'Мясной вкус', image: '🥨', price: '355₽/кг', unit: 'кг' },
      { name: 'Гренки "Васаби"', description: 'Острый', image: '🥨', price: '320₽/кг', unit: 'кг' },
      { name: 'Гренки "Томат-Зелень"', description: 'Овощной', image: '🥨', price: '450₽/кг', unit: 'кг' },
      { name: 'Гренки "Хрен-Холодец"', description: 'Традиционный', image: '🥨', price: '395₽/кг', unit: 'кг' },
      { name: 'Гренки "Чесночные"', description: 'Ароматные', image: '🥨', price: '395₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Копченый лосось"', description: 'Рыбный', image: '🥨', price: '410₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Кимчи"', description: 'Острый', image: '🥨', price: '450₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Красная Икра"', description: 'Деликатесный', image: '🥨', price: '450₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Семга"', description: 'Рыбный', image: '🥨', price: '380₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Шашлык"', description: 'Мясной', image: '🥨', price: '380₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Крылышки барбекю"', description: 'Пряный', image: '🥨', price: '410₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Сметана-Зелень"', description: 'Классический', image: '🥨', price: '360₽/кг', unit: 'кг' },
      { name: 'Гренки белые "Сыр"', description: 'Сырный', image: '🥨', price: '400₽/кг', unit: 'кг' },
      { name: 'Гренки белые "ФоБо"', description: 'Азиатский', image: '🥨', price: '440₽/кг', unit: 'кг' },
      { name: 'Гренки ПОЛОСКИ "Аджика"', description: 'Острый', image: '🥨', price: '335₽/кг', unit: 'кг' },
      { name: 'Гренки ПОЛОСКИ "Бекон"', description: 'Мясной', image: '🥨', price: '335₽/кг', unit: 'кг' },
      { name: 'Гренки ПОЛОСКИ "Холодец-хрен"', description: 'Традиционный', image: '🥨', price: '335₽/кг', unit: 'кг' },
      { name: 'Гренки ПОЛОСКИ "Чеснок"', description: 'Ароматный', image: '🥨', price: '335₽/кг', unit: 'кг' },
      { name: 'Гренки Рак с укропом', description: 'Морской', image: '🥨', price: '380₽/кг', unit: 'кг' },
      { name: 'Гренки с тайским соусом', description: 'Азиатский', image: '🥨', price: '460₽/кг', unit: 'кг' },
      { name: 'Гренки телятина на гриле', description: 'Мясной', image: '🥨', price: '410₽/кг', unit: 'кг' },
      { name: 'Кешью жарено соленый', description: 'Премиум', image: '🥜', price: '1100₽/кг', unit: 'кг' },
      { name: 'Кукуруза жарено - соленая', description: 'Хрустящая', image: '🥜', price: '660₽/кг', unit: 'кг' },
      { name: 'Миндаль жареный соленый', description: 'Премиум', image: '🥜', price: '1000₽/кг', unit: 'кг' },
      { name: 'Ореховый микс', description: 'Ассорти орехов', image: '🥜', price: '850₽/кг', unit: 'кг' },
      { name: 'Тыквенная семечка (сушенная)', description: 'Полезная', image: '🥜', price: '600₽/кг', unit: 'кг' },
      { name: 'Снапсы с чесноком', description: 'Ароматные', image: '🥨', price: '370₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Малосольные огурчики', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Ветчина сыр', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Кольца кальмара', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Красная икра', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Мексиканский Микс', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Пицца', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Рак с Укропом', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Сливочный Лучок', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Табаско', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухари "Премиум"-(Багет)-Четыре Сыра', description: 'Багет', image: '🥨', price: '350₽/кг', unit: 'кг' },
      { name: 'Сухарики КРАФТОВЫЕ "Вареные раки"', description: 'Крафтовые', image: '🥨', price: '310₽/кг', unit: 'кг' },
      { name: 'Сухарики КРАФТОВЫЕ "Сало с горчицей"', description: 'Крафтовые', image: '🥨', price: '310₽/кг', unit: 'кг' },
      { name: 'Сухарики КРАФТОВЫЕ "Тайский перец"', description: 'Крафтовые', image: '🥨', price: '310₽/кг', unit: 'кг' },
      { name: 'Сухарики КРАФТОВЫЕ "Телятина на гриле"', description: 'Крафтовые', image: '🥨', price: '310₽/кг', unit: 'кг' },
      { name: 'Сушка с солью "Флотская" 60 гр 1/50', description: 'Упаковка 50шт', image: '🥨', price: '1295₽/уп', unit: 'шт' },
      { name: 'Фисташки Америка', description: 'Премиум', image: '🥜', price: '1400₽/кг', unit: 'кг' }
    ]
  },
  'potato-chips': {
    id: 'potato-chips',
    emoji: '🥔',
    title: 'Картофельные чипсы',
    subtitle: 'Все форматы и вкусы',
    description: 'Чипсы — классика, которая всегда продаётся. Работаем со всеми крупными производителями, есть и локальные бренды с интересными вкусами.',
    benefits: [
      'Все известные бренды',
      'Локальные производители с уникальными вкусами',
      'Мелкая и крупная фасовка',
      'Быстрая оборачиваемость'
    ],
    products: [
      { name: 'Картофельные ЧИПСЫ с острым и пряным вкусом 40 грамм', description: '40г', image: '🥔', price: '90₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ со вкусом сметаны и лука 40 грамм', description: '40г', image: '🥔', price: '90₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ со вкусом барбекю 40 грамм', description: '40г', image: '🥔', price: '90₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ оригинальные 40 грамм', description: '40г', image: '🥔', price: '90₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ СЫР 40 грамм', description: '40г', image: '🥔', price: '90₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ СЫР 160 грамм', description: '160г', image: '🥔', price: '215₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ с острым и пряным вкусом 160 грамм', description: '160г', image: '🥔', price: '215₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ со вкусом сметаны и лука 160 грамм', description: '160г', image: '🥔', price: '215₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ со вкусом барбекю 160 грамм', description: '160г', image: '🥔', price: '215₽/шт', unit: 'шт' },
      { name: 'Картофельные ЧИПСЫ оригинальные 160 грамм', description: '160г', image: '🥔', price: '215₽/шт', unit: 'шт' },
      { name: 'Кукурузные ЧИПСЫ НАЧОС с СЫРНЫМ СОУСОМ 200 грамм', description: '200г', image: '🌽', price: '240₽/шт', unit: 'шт' }
    ]
  },
  'seeds': {
    id: 'seeds',
    emoji: '🌻',
    title: 'Семечки',
    subtitle: 'Жареные, солёные, разных видов',
    description: 'Семечки — продукт, который берут всегда. Особенно хорошо идёт в небольших упаковках у кассы. Подсолнечные, тыквенные, в разной фасовке.',
    benefits: [
      'Свежая обжарка',
      'Разная фасовка от 50г до 5кг',
      'Подсолнечные и тыквенные',
      'Отличный товар для импульсных покупок'
    ],
    products: [
      { name: 'Семечки жар/соленые 130 гр', description: '130г', image: '🌻', price: '140₽/шт', unit: 'шт' },
      { name: 'Семечки жар/оригинальные 130 гр', description: '130г', image: '🌻', price: '140₽/шт', unit: 'шт' },
      { name: 'Семечки жар/ со вкусом специй(сладк) 130 гр', description: '130г', image: '🌻', price: '140₽/шт', unit: 'шт' },
      { name: 'Семечки жар/со вкусом ореха пекан 108 гр', description: '108г', image: '🌻', price: '140₽/шт', unit: 'шт' },
      { name: 'Семечки жар/со вкусом карамели 108 гр', description: '108г', image: '🌻', price: '140₽/шт', unit: 'шт' },
      { name: 'Семечки жар/со вкусом ротангового перца 108 гр', description: '108г', image: '🌻', price: '140₽/шт', unit: 'шт' },
      { name: 'Семечки жар/со вкусом трюфеля 140 гр', description: '140г', image: '🌻', price: '140₽/шт', unit: 'шт' }
    ]
  },
  'meat-dried': {
    id: 'meat-dried',
    emoji: '🥩',
    title: 'Мясо вяленое',
    subtitle: 'Для тех, кто не любит рыбу',
    description: 'Вяленое мясо — отличная альтернатива рыбе. Говядина, свинина, курица в разных форматах. Хорошая маржа, растущий спрос.',
    benefits: [
      'Говядина, свинина, курица',
      'Разные форматы — чипсы, соломка, кусочки',
      'Высокая маржинальность',
      'Для тех, кто не ест рыбу'
    ],
    products: [
      { name: 'Ломтики говядины 500 гр', description: '500г упаковка', image: '🥩', price: '1140₽/шт', unit: 'шт' },
      { name: 'Ломтики индейки 500 гр', description: '500г упаковка', image: '🥩', price: '1090₽/шт', unit: 'шт' },
      { name: 'Ломтики конины 500 гр', description: '500г упаковка', image: '🥩', price: '1170₽/шт', unit: 'шт' },
      { name: 'Ломтики курицы 500 гр', description: '500г упаковка', image: '🍗', price: '965₽/шт', unit: 'шт' },
      { name: 'Ломтики лося 500 гр', description: '500г упаковка', image: '🥩', price: '1215₽/шт', unit: 'шт' },
      { name: 'Ломтики оленины 500 гр', description: '500г упаковка', image: '🥩', price: '1210₽/шт', unit: 'шт' },
      { name: 'Ломтики свинины 500 гр', description: '500г упаковка', image: '🥩', price: '1080₽/шт', unit: 'шт' },
      { name: 'Мясные колбаски Классические', description: 'Вяленые', image: '🌭', price: '1380₽/кг', unit: 'кг' },
      { name: 'Мясные колбаски со вкусом Сыра', description: 'Вяленые', image: '🌭', price: '1450₽/кг', unit: 'кг' },
      { name: 'Мясные колбаски со вкусом Чеснока', description: 'Вяленые', image: '🌭', price: '1420₽/кг', unit: 'кг' },
      { name: 'Мясные колбаски со вкусом Чили', description: 'Вяленые', image: '🌭', price: '1420₽/кг', unit: 'кг' },
      { name: 'Ушки свиные в/у 90 гр', description: '90г вакуум', image: '🐷', price: '60₽/шт', unit: 'шт' },
      { name: 'Ушки свиные в/у паприка 90 гр', description: '90г вакуум', image: '🐷', price: '60₽/шт', unit: 'шт' },
      { name: 'Ушки свиные в/у хрен 90 гр', description: '90г вакуум', image: '🐷', price: '60₽/шт', unit: 'шт' },
      { name: 'Ушки свиные в/у чеснок 90 гр', description: '90г вакуум', image: '🐷', price: '60₽/шт', unit: 'шт' },
      { name: 'Целое ухо 180 гр оригинальное', description: '180г', image: '🐷', price: '125₽/шт', unit: 'шт' },
      { name: 'Целое ухо 180 гр чеснок', description: '180г', image: '🐷', price: '125₽/шт', unit: 'шт' },
      { name: 'КУРИЦА ХАЛАПЕНЬО(очень острая)', description: 'Очень острая', image: '🍗', price: '1440₽/кг', unit: 'кг' },
      { name: 'СВИНИНА ХАЛАПЕНЬО(очень острая)', description: 'Очень острая', image: '🥩', price: '1440₽/кг', unit: 'кг' },
      { name: 'Чипсы мясные КУРИЦА со вкусом чеснока', description: 'С чесноком', image: '🍗', price: '1440₽/кг', unit: 'кг' },
      { name: 'Чипсы мясные КУРИЦА', description: 'Оригинальные', image: '🍗', price: '1240₽/кг', unit: 'кг' },
      { name: 'Чипсы мясные СВИНИНА', description: 'Оригинальные', image: '🥩', price: '1310₽/кг', unit: 'кг' },
      { name: 'Чипсы мясные СВИНИНА ПО КАВКАЗКИ', description: 'По-кавказски', image: '🥩', price: '1340₽/кг', unit: 'кг' },
      { name: 'Чипсы мясные "ИНДЕЙКА ГРИЛЬ"', description: 'Гриль', image: '🥩', price: '1490₽/кг', unit: 'кг' }
    ]
  },
  'cheese': {
    id: 'cheese',
    emoji: '🧀',
    title: 'Сыры',
    subtitle: 'Копчёные, косички, жареные',
    description: 'Сырные закуски — это вкусно и необычно. Копчёный колбасный сыр отлично идёт нарезкой у кассы, косички любит молодёжь, жареный сыр — для гурманов.',
    benefits: [
      'Копчёный колбасный сыр — хит продаж',
      'Сырные косички — популярны у молодёжи',
      'Жареный сыр — премиальная позиция',
      'Отлично выглядит на витрине'
    ],
    products: [
      { name: 'Сыр "Чикорн" Мексиканская смесь', description: 'Мексиканская смесь', image: '🧀', price: '1305₽/кг', unit: 'кг' },
      { name: 'Сыр "Чикорн" Оригинальный', description: 'Оригинальный', image: '🧀', price: '1305₽/кг', unit: 'кг' },
      { name: 'Сыр джил паутина с чесноком', description: 'С чесноком', image: '🧀', price: '1150₽/кг', unit: 'кг' },
      { name: 'Сыр жареный "Оригинал" 0,5 кг', description: '500г упаковка', image: '🧀', price: '575₽/шт', unit: 'шт' },
      { name: 'Сыр жареный "Тайский перец" 0,5 кг', description: '500г упаковка', image: '🧀', price: '575₽/шт', unit: 'шт' },
      { name: 'Сыр жареный "Красная икра" 0,5 кг', description: '500г упаковка', image: '🧀', price: '575₽/шт', unit: 'шт' },
      { name: 'Сыр жареный "Сметана зелень" 0,5 кг', description: '500г упаковка', image: '🧀', price: '575₽/шт', unit: 'шт' },
      { name: 'Сыр жареный "Васаби" 0,5 кг', description: '500г упаковка', image: '🧀', price: '575₽/шт', unit: 'шт' },
      { name: 'Сыр жареный "Чеснок" 0,5 кг', description: '500г упаковка', image: '🧀', price: '575₽/шт', unit: 'шт' },
      { name: 'Сыр копченый "Бочонок" 500 гр', description: '500г', image: '🧀', price: '700₽/шт', unit: 'шт' },
      { name: 'Сыр копченый "Бочонок молочный со вкусом паприки"', description: 'С паприкой', image: '🧀', price: '1150₽/кг', unit: 'кг' },
      { name: 'Сыр копченый "Бочонок молочный со вкусом чеснок - укроп"', description: 'Чеснок-укроп', image: '🧀', price: '1150₽/кг', unit: 'кг' },
      { name: 'Сыр копченый "Балык" 50 гр', description: '50г', image: '🧀', price: '95₽/шт', unit: 'шт' },
      { name: 'Сыр копченый "Кавказская коса" 100 гр', description: '100г', image: '🧀', price: '160₽/шт', unit: 'шт' },
      { name: 'Сыр копченый весовой', description: 'Классический', image: '🧀', price: '1150₽/кг', unit: 'кг' },
      { name: 'Сыр копченый весовой "Коса"', description: 'Косичка', image: '🧀', price: '1200₽/кг', unit: 'кг' },
      { name: 'Сыр копченый весовой "Спагетти"', description: 'Тонкие нити', image: '🧀', price: '1150₽/кг', unit: 'кг' }
    ]
  },
  'packaging': {
    id: 'packaging',
    emoji: '📦',
    title: 'Фасовка',
    subtitle: 'Удобная упаковка любых размеров',
    description: 'Предлагаем услуги фасовки под ваши нужды. Любые объёмы, любая продукция. Вакуум, zip-lock пакеты, картонные коробки — всё, что нужно для удобной продажи.',
    benefits: [
      'Любые объёмы фасовки',
      'Вакуумная упаковка',
      'Брендированная упаковка под ваш магазин',
      'Быстрые сроки выполнения'
    ],
    products: [
      { name: 'Ассорти рыбное "Семь вкусов моря" 125 гр', description: '125г упаковка', image: '📦', price: '250₽/шт', unit: 'шт' },
      { name: 'Икра воблы 125 гр', description: '125г упаковка', image: '📦', price: '330₽/шт', unit: 'шт' },
      { name: 'Икра камбалы 125 гр', description: '125г упаковка', image: '📦', price: '400₽/шт', unit: 'шт' },
      { name: 'Икра минтая 125 гр', description: '125г упаковка', image: '📦', price: '245₽/шт', unit: 'шт' },
      { name: 'Корюшка чищеная с икрой 125 гр', description: '125г упаковка', image: '📦', price: '330₽/шт', unit: 'шт' },
      { name: 'Ореховый микс 125 гр', description: '125г упаковка', image: '📦', price: '180₽/шт', unit: 'шт' },
      { name: 'Соломка камбалы 125 гр', description: '125г упаковка', image: '📦', price: '250₽/шт', unit: 'шт' },
      { name: 'Соломка семги 125 гр', description: '125г упаковка', image: '📦', price: '155₽/шт', unit: 'шт' },
      { name: 'Фисташки Америка 125 гр', description: '125г упаковка', image: '📦', price: '210₽/шт', unit: 'шт' },
      { name: 'Чипсы мясные КУРИЦА 125 гр', description: '125г упаковка', image: '📦', price: '155₽/шт', unit: 'шт' },
      { name: 'Чипсы мясные СВИНИНА 125 гр', description: '125г упаковка', image: '📦', price: '170₽/шт', unit: 'шт' },
      { name: 'Вобла чищеная (тушка)', description: 'Чищеная тушка', image: '📦', price: '1100₽/кг', unit: 'кг' },
      { name: 'Корюшка чищеная (тушка)', description: 'Чищеная тушка', image: '📦', price: '1400₽/кг', unit: 'кг' },
      { name: 'Сырок чищеный (тушка)', description: 'Чищеная тушка', image: '📦', price: '750₽/кг', unit: 'кг' },
      { name: 'Стейк горбуши сушеные 150 гр', description: '150г упаковка', image: '📦', price: '265₽/шт', unit: 'шт' },
      { name: 'Набор из воблы 150гр', description: '150г упаковка', image: '📦', price: '65₽/шт', unit: 'шт' },
      { name: 'Креветка с/с 40 гр', description: '40г упаковка', image: '📦', price: '70₽/шт', unit: 'шт' },
      { name: 'Креветка с/с 150 гр', description: '150г упаковка', image: '📦', price: '255₽/шт', unit: 'шт' }
    ]
  }
};

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const category = categoryId ? categoriesData[categoryId] : null;

  // Функция для извлечения числовой цены
  const extractPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Фильтрация товаров
  const filteredProducts = category?.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const price = extractPrice(product.price);
    const minPrice = priceRange.min ? parseInt(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseInt(priceRange.max) : Infinity;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    return matchesSearch && matchesPrice;
  }) || [];

  const handleAddToCart = (product: Product) => {
    if (!category) return;
    addItem({
      id: `${category.id}-${product.name}`,
      categoryId: category.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      unit: product.unit,
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/ee7a88f7-8496-447c-a731-c347ee03503c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          category: category?.title || 'Общая заявка',
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Категория не найдена</h1>
          <Link to="/">
            <Button size="lg">
              <Icon name="Home" className="mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {category.id === 'fish-dried' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/6645f3ab-8687-46c3-bcc9-bbfb027048fb.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'fish-smoked' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/8b8ea176-164b-40ac-a755-5884f7caa303.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'snacks' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/3cacd4ce-da5f-4a6d-a173-6757c956adc3.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'crackers-nuts' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/16cf24fe-fd4a-4034-a3cb-75b7961f8b26.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'potato-chips' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/39193d4a-bdad-412d-90bf-0292197c6432.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'seeds' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/3d88468a-98d4-4a76-8a7b-408f8e45b0a7.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'meat-dried' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/ec55999a-3aba-46ca-8d54-b5287fbb4710.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'cheese' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/a0835cc7-745f-40d3-869a-98039fd1f0c3.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        {category.id === 'packaging' && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/202d173e-0d74-4bb8-8645-cd7082233e46.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
          </>
        )}
        
        {!['fish-dried', 'fish-smoked', 'snacks', 'crackers-nuts', 'potato-chips', 'seeds', 'meat-dried', 'cheese', 'packaging'].includes(category.id) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
            </div>
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <div className="text-8xl mb-6 animate-bounce drop-shadow-2xl">{category.emoji}</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow drop-shadow-2xl">
              {category.title}
            </h1>
            <p className="text-2xl text-primary mb-8 drop-shadow-lg">{category.subtitle}</p>
            <p className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-2xl bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-primary/20">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Почему стоит выбрать эту категорию
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            {category.benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" className="text-primary" size={24} />
                  </div>
                  <p className="text-base sm:text-lg">{benefit}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Ассортимент
          </h2>

          <div className="mb-8 max-w-4xl mx-auto space-y-4">
            <div className="glass rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Search" className="text-primary" size={24} />
                <Input
                  type="text"
                  placeholder="Поиск по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-background/50 border-border focus:border-primary"
                />
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Icon name="DollarSign" className="text-primary" size={20} />
                  <span className="text-sm font-semibold">Цена:</span>
                </div>
                <Input
                  type="number"
                  placeholder="От"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-24 bg-background/50 border-border focus:border-primary"
                />
                <span className="text-muted-foreground">—</span>
                <Input
                  type="number"
                  placeholder="До"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-24 bg-background/50 border-border focus:border-primary"
                />
                {(searchQuery || priceRange.min || priceRange.max) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setPriceRange({ min: '', max: '' });
                    }}
                    className="text-sm"
                  >
                    <Icon name="X" size={16} className="mr-1" />
                    Сбросить
                  </Button>
                )}
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Найдено товаров: {filteredProducts.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              filteredProducts.map((product, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group animate-fade-in flex flex-col"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {product.photo ? (
                  <div className="mb-4 overflow-hidden rounded-xl relative">
                    <img 
                      src={product.photo} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3 text-4xl bg-background/80 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      {product.image}
                    </div>
                  </div>
                ) : (
                  <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {product.image}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-amber-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                {product.price && (
                  <p className="text-lg font-bold text-amber-400 mb-4">{product.price}</p>
                )}
                <Button
                  className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleAddToCart(product)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  В корзину
                </Button>
              </div>
            )))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 border border-primary/20">
              <div className="text-center mb-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  Заказать {category.title.toLowerCase()}
                </h2>
                <p className="text-lg text-muted-foreground">Оставьте заявку и мы свяжемся с вами в ближайшее время</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-14 text-lg bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Телефон"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-14 text-lg bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Что интересует? (необязательно)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-32 text-lg bg-background/50 border-border focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/">
              <Button size="lg" variant="outline" className="text-lg">
                <Icon name="ArrowLeft" className="mr-2" />
                Все категории
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Свяжитесь с нами</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Button 
              size="lg" 
              className="h-20 text-lg bg-[#0088cc] hover:bg-[#0077b5] text-white px-12"
              onClick={() => window.open('https://t.me/merka_fish', '_blank')}
            >
              <Icon name="Send" className="mr-3" size={24} />
              Telegram
            </Button>
            
            <Button 
              size="lg" 
              className="h-20 text-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 shadow-2xl shadow-red-500/30 relative overflow-hidden group"
              onClick={() => window.open('https://yandex.ru/maps/-/CHASuZKa', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Icon name="MapPin" className="mr-3 animate-bounce" size={24} />
              <span className="font-semibold">Мы на карте</span>
            </Button>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}