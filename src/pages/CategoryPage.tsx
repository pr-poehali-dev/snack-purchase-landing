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
      { name: 'Корюшка вяленая Дальний Восток (икр.)', description: 'С икрой', image: '🐟', price: '3500₽/кг', unit: 'кг' },
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
      { name: 'Сёмга холодного копчения', description: 'Нарезка, вакуум', image: '🐠', price: '890₽/кг', unit: 'кг' },
      { name: 'Скумбрия копченая', description: 'Горячего копчения', image: '🐠', price: '320₽/кг', unit: 'кг' },
      { name: 'Сельдь атлантическая', description: 'Слабосолёная, филе', image: '🐠', price: '280₽/кг', unit: 'кг' },
      { name: 'Форель копченая', description: 'Холодного копчения', image: '🐠', price: '950₽/кг', unit: 'кг' },
      { name: 'Балык из осетра', description: 'Деликатес', image: '🐠', price: 'По запросу', unit: 'кг' },
      { name: 'Корюшка сушеная', description: 'Целиком, мелкая', image: '🐠', price: '420₽/кг', unit: 'кг' }
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
      { name: 'Кальмар кольца', description: 'Сушеные, солёные', image: '🦑', price: '680₽/кг', unit: 'кг' },
      { name: 'Кальмар стружка', description: 'Тонкая нарезка', image: '🦑', price: '720₽/кг', unit: 'кг' },
      { name: 'Кальмар щупальца', description: 'Целые, крупные', image: '🦑', price: '640₽/кг', unit: 'кг' },
      { name: 'Креветки сушеные', description: 'Мелкие, целиком', image: '🦐', price: '890₽/кг', unit: 'кг' },
      { name: 'Осьминог сушеный', description: 'Порционный', image: '🐙', price: '980₽/кг', unit: 'кг' },
      { name: 'Гребешок сушеный', description: 'Деликатес', image: '🦪', price: '1200₽/кг', unit: 'кг' }
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
      { name: 'Гренки с чесноком', description: 'Хрустящие, ароматные', image: '🥨', price: '180₽/кг', unit: 'кг' },
      { name: 'Гренки со вкусом икры', description: 'Популярный вкус', image: '🥨', price: '190₽/кг', unit: 'кг' },
      { name: 'Сухарики чёрные', description: 'Из бородинского хлеба', image: '🥨', price: '160₽/кг', unit: 'кг' },
      { name: 'Арахис солёный', description: 'Жареный, разные вкусы', image: '🥜', price: '220₽/кг', unit: 'кг' },
      { name: 'Фисташки солёные', description: 'Иранские, крупные', image: '🥜', price: '480₽/кг', unit: 'кг' },
      { name: 'Сушки-баранки', description: 'Традиционные', image: '🥨', price: '140₽/кг', unit: 'кг' }
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
      { name: 'Чипсы классические', description: 'Солёные, рифлёные', image: '🥔', price: '160₽/кг', unit: 'кг' },
      { name: 'Чипсы со вкусом бекона', description: 'Популярный вкус', image: '🥔', price: '170₽/кг', unit: 'кг' },
      { name: 'Чипсы сырные', description: 'Насыщенный вкус', image: '🥔', price: '165₽/кг', unit: 'кг' },
      { name: 'Чипсы со специями', description: 'Острые вкусы', image: '🥔', price: '180₽/кг', unit: 'кг' },
      { name: 'Чипсы натуральные', description: 'Без добавок', image: '🥔', price: '190₽/кг', unit: 'кг' },
      { name: 'Чипсы кукурузные', description: 'Лёгкие, хрустящие', image: '🌽', price: '155₽/кг', unit: 'кг' }
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
      { name: 'Семечки подсолнечные', description: 'Жареные, солёные', image: '🌻', price: '95₽/кг', unit: 'кг' },
      { name: 'Семечки тыквенные', description: 'Крупные, очищенные', image: '🎃', price: '280₽/кг', unit: 'кг' },
      { name: 'Семечки в кожуре', description: 'Классические', image: '🌻', price: '85₽/кг', unit: 'кг' },
      { name: 'Семечки белые', description: 'Сладкие', image: '🌻', price: '110₽/кг', unit: 'кг' },
      { name: 'Семечки со специями', description: 'Острые, разные вкусы', image: '🌻', price: '120₽/кг', unit: 'кг' },
      { name: 'Микс семечек', description: 'Подсолнечные + тыквенные', image: '🌻', price: '140₽/кг', unit: 'кг' }
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
      { name: 'Говядина вяленая', description: 'Нарезка соломкой', image: '🥩', price: '890₽/кг', unit: 'кг' },
      { name: 'Свинина вяленая', description: 'Кусочки', image: '🥩', price: '720₽/кг', unit: 'кг' },
      { name: 'Курица вяленая', description: 'Филе полосками', image: '🍗', price: '580₽/кг', unit: 'кг' },
      { name: 'Мясные чипсы', description: 'Тонкая нарезка', image: '🥩', price: '980₽/кг', unit: 'кг' },
      { name: 'Свиные ушки', description: 'Хрустящие, острые', image: '🐷', price: '420₽/кг', unit: 'кг' },
      { name: 'Колбаски охотничьи', description: 'Сырокопчёные', image: '🌭', price: '650₽/кг', unit: 'кг' }
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
      { name: 'Сыр копчёный колбасный', description: 'Косичка', image: '🧀', price: '380₽/кг', unit: 'кг' },
      { name: 'Сыр копчёный "Косичка"', description: 'Классика', image: '🧀', price: '420₽/кг', unit: 'кг' },
      { name: 'Сыр жареный', description: 'В панировке', image: '🧀', price: '680₽/кг', unit: 'кг' },
      { name: 'Сыр сулугуни копчёный', description: 'Косичка', image: '🧀', price: '520₽/кг', unit: 'кг' },
      { name: 'Сырные палочки', description: 'Хрустящие', image: '🧀', price: '340₽/кг', unit: 'кг' },
      { name: 'Сыр чечил', description: 'Волокнистый', image: '🧀', price: '480₽/кг', unit: 'кг' }
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
      { name: 'Фасовка 50-100г', description: 'Для кассовой зоны', image: '📦', price: '15₽/шт', unit: 'шт' },
      { name: 'Фасовка 200-500г', description: 'Стандарт', image: '📦', price: '25₽/шт', unit: 'шт' },
      { name: 'Фасовка 1кг', description: 'Оптовая', image: '📦', price: '35₽/шт', unit: 'шт' },
      { name: 'Вакуумная упаковка', description: 'Для рыбы и мяса', image: '📦', price: '40₽/шт', unit: 'шт' },
      { name: 'Брендированная упаковка', description: 'С вашим логотипом', image: '📦', price: 'По запросу', unit: 'шт' },
      { name: 'Картонные коробки', description: 'Для оптовых заказов', image: '📦', price: '50₽/шт', unit: 'шт' }
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

  const category = categoryId ? categoriesData[categoryId] : null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', phone: '', message: '' });
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

          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Ассортимент
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {category.products.map((product, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group animate-fade-in flex flex-col"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {product.image}
                </div>
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
            ))}
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