import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'kak-vybrat-vyalenuju-rybu',
    title: 'Как выбрать вяленую рыбу для пивного магазина',
    excerpt: 'Разбираемся, какая вяленая рыба лучше продаётся, как проверить качество при закупке и на что обращать внимание при выборе поставщика.',
    date: '15 января 2026',
    image: '🐟',
    category: 'Рыба',
    readTime: '5 мин'
  },
  {
    id: 'kopchyonaja-ryba-holodnogo-kopchenija',
    title: 'Копчёная рыба холодного копчения: почему это выгоднее',
    excerpt: 'Горячее копчение портится быстро, холодное — хранится долго. Считаем экономику и объясняем, почему холодное копчение выгоднее для пивных точек.',
    date: '10 января 2026',
    image: '🐠',
    category: 'Рыба',
    readTime: '4 мин'
  },
  {
    id: 'sneki-dlya-piva',
    title: 'Снеки для пива: что реально покупают',
    excerpt: 'Кальмары, креветки, орехи, чипсы — что из этого действительно берут покупатели, а что просто занимает место на полке.',
    date: '5 января 2026',
    image: '🦑',
    category: 'Снеки',
    readTime: '6 мин'
  },
  {
    id: 'kak-uvelichit-srednyj-chek',
    title: 'Как увеличить средний чек в разливном магазине',
    excerpt: 'Простые приёмы, которые работают: как расположить товар, какие связки предлагать и что выкладывать у кассы.',
    date: '28 декабря 2025',
    image: '💰',
    category: 'Бизнес',
    readTime: '7 мин'
  },
  {
    id: 'vyalenoe-myaso-trend',
    title: 'Вяленое мясо — новый тренд пивных закусок',
    excerpt: 'Почему вяленое мясо становится популярнее классической рыбы и как на этом заработать.',
    date: '20 декабря 2025',
    image: '🥩',
    category: 'Закуски',
    readTime: '5 мин'
  },
  {
    id: 'oshibki-novichkov',
    title: '5 ошибок начинающих владельцев пивных магазинов',
    excerpt: 'Типичные промахи при открытии точки разливного пива: неправильный ассортимент, плохие поставщики, проблемы с хранением.',
    date: '15 декабря 2025',
    image: '⚠️',
    category: 'Бизнес',
    readTime: '8 мин'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Блог о пивных закусках — советы для магазинов разливного пива</title>
        <meta name="description" content="Полезные статьи о выборе закусок, работе с поставщиками и увеличении продаж в магазинах разливного пива." />
        <link rel="canonical" href="https://merkaprofish.ru/blog" />
      </Helmet>

      <Header />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <div className="text-8xl mb-6 animate-bounce drop-shadow-2xl">📚</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow drop-shadow-2xl">
              Блог о пивных закусках
            </h1>
            <p className="text-2xl text-primary mb-8 drop-shadow-lg">
              Полезные статьи для владельцев магазинов разливного пива
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <Card className="h-full glass border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
                  <div className="relative bg-gradient-to-br from-primary/20 to-amber-500/20 p-12 flex items-center justify-center">
                    <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                      {post.image}
                    </div>
                    <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all"
                    >
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Не нашли нужную статью?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Напишите нам, и мы подготовим материал на интересующую вас тему
          </p>
          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-primary-foreground px-8"
            >
              <Icon name="Send" className="mr-2" />
              Связаться с нами
            </Button>
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
