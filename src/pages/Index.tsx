import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';

export default function Index() {
  const { toast } = useToast();
  const [requestsToday, setRequestsToday] = useState(0);
  
  useEffect(() => {
    const randomRequests = Math.floor(Math.random() * 401) + 100;
    setRequestsToday(randomRequests);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', phone: '', message: '' });
  };

  const categories = [
    {
      icon: 'Fish',
      title: 'Сушёная рыба',
      description: 'Все виды сушёной и вяленой рыбы',
    },
    {
      icon: 'Shell',
      title: 'Кальмары',
      description: 'Сушёные кольца, стружка, щупальца',
    },
    {
      icon: 'Beef',
      title: 'Вяленое мясо',
      description: 'Говядина, свинина, курица',
    },
    {
      icon: 'CircleDot',
      title: 'Орехи',
      description: 'Все виды солёных и жареных орехов',
    },
    {
      icon: 'Cookie',
      title: 'Чипсы',
      description: 'Картофельные, кукурузные, снеки',
    },
    {
      icon: 'Square',
      title: 'Сухарики',
      description: 'Все вкусы и форматы',
    },
  ];

  const benefits = [
    {
      icon: 'Zap',
      title: 'Быстрые расчёты',
      description: 'Любая форма оплаты',
    },
    {
      icon: 'DollarSign',
      title: 'Честные цены',
      description: 'Прозрачная оценка без скрытых условий',
    },
    {
      icon: 'Truck',
      title: 'Самовывоз',
      description: 'Приезжаем сами, вывозим всё',
    },
    {
      icon: 'Package',
      title: 'Любые объёмы',
      description: 'От 5 кг до нескольких тонн',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Заявка',
      description: 'Оставьте заявку любым удобным способом',
    },
    {
      number: '02',
      title: 'Оценка',
      description: 'Согласуем цену и объём по телефону',
    },
    {
      number: '03',
      title: 'Выезд',
      description: 'Приезжаем в удобное для вас время',
    },
    {
      number: '04',
      title: 'Расчёт',
      description: 'Оплачиваем и вывозим товар сразу',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden fish-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="absolute top-10 right-10 text-primary/10 text-9xl">🍺</div>
        <div className="absolute bottom-20 left-20 text-primary/10 text-8xl">🐟</div>
        <div className="absolute top-1/3 left-10 text-primary/10 text-7xl">🥜</div>

        <div className="absolute top-32 right-8 sm:right-16 z-20 animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-amber-500 to-amber-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary to-amber-500 rounded-full p-6 sm:p-8 shadow-2xl border-4 border-amber-400/30 transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="text-center">
                <div className="text-sm sm:text-base font-bold text-primary-foreground mb-1">Работаем с</div>
                <div className="text-4xl sm:text-5xl font-black text-primary-foreground">2004</div>
                <div className="text-sm sm:text-base font-bold text-primary-foreground mt-1">года</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-300 rounded-full shadow-lg flex items-center justify-center text-xl">
                ⭐
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-shadow leading-tight">
              Пивные закуски оптом для магазинов разливного пива
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Send" className="mr-2" size={20} />
                Оставить заявку
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >Перейти к выбору</Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto animate-scale-in">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 beer-foam"
              >
                <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={benefit.icon} className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-2xl mx-auto animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-amber-500/20 to-primary/20 rounded-2xl blur-xl animate-pulse"></div>
              <div className="relative glass rounded-2xl p-8 border-2 border-primary/30 shadow-2xl">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🍺</div>
                  <div className="text-center">
                    <div className="text-sm sm:text-base text-muted-foreground mb-2"></div>
                    <div className="text-5xl sm:text-6xl font-black text-primary bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                      {requestsToday}
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Заявок сегодня в категориях</span>
                    </div>
                  </div>
                  <div className="text-6xl animate-bounce" style={{ animationDuration: '2.3s', animationDelay: '0.2s' }}>🐟</div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="text-primary">🐟</span> Рыба
                  </span>
                  <span className="text-primary/50">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-primary">🦑</span> Снеки
                  </span>
                  <span className="text-primary/50">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-primary">🥩</span> Мясо
                  </span>
                  <span className="text-primary/50">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-primary">🧀</span> Сыры
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 max-w-5xl mx-auto relative">
            <div className="absolute -top-6 -left-6 text-6xl opacity-20">🍺</div>
            <div className="absolute -bottom-6 -right-6 text-6xl opacity-20">🐟</div>
            <div className="glass rounded-3xl p-10 sm:p-14 border-2 border-primary/30 shadow-2xl shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative space-y-8 text-lg sm:text-xl leading-relaxed">
                <p className="text-foreground/90 first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                  Знаете, что отличает успешную пивную точку от той, где покупатель берёт только пиво и уходит? Правильно подобранные закуски. Мы занимаемся именно этим — собираем ассортимент, который реально покупают, а не тот, что пылится на витрине.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  <span className="text-2xl">🍻</span>
                  <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                </div>
                <p className="text-foreground/90">
                  Работаем с магазинами разливного пива, барами, небольшими розничными точками. За годы работы научились понимать, что нужно вашим покупателям. <span className="text-primary font-semibold">Вобла? Есть.</span> <span className="text-primary font-semibold">Кальмар? Конечно.</span> <span className="text-primary font-semibold">Мясные чипсы для тех, кто рыбу не любит? Тоже в наличии.</span>
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  <span className="text-2xl">🥨</span>
                  <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                </div>
                <p className="text-foreground/90">
                  Почему к нам возвращаются? Да всё просто: <span className="text-primary font-semibold">товар свежий</span>, <span className="text-primary font-semibold">цены адекватные</span>, а если что-то не продаётся — <span className="text-primary font-semibold">подскажем, чем заменить</span>. Не первый год в этом бизнесе, так что знаем его изнутри.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" className="text-primary" size={32} />
        </div>
      </section>

      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30 wood-texture relative">
        <div className="absolute top-10 left-10 text-primary/5 text-9xl">🦑</div>
        <div className="absolute bottom-10 right-10 text-primary/5 text-9xl">🥨</div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Наши категории
            </h2>
            <p className="text-xl text-muted-foreground">
              Полный ассортимент пивных закусок оптом
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              { id: 'fish-dried', emoji: '🐟', title: 'Рыба вяленая', desc: 'Вобла, пелядь, камбала с икрой' },
              { id: 'fish-smoked', emoji: '🐠', title: 'Рыба копченая и соленая', desc: 'Красная рыба, сельдь, скумбрия' },
              { id: 'snacks', emoji: '🦑', title: 'Снеки', desc: 'Кальмары, креветки, морские деликатесы' },
              { id: 'crackers-nuts', emoji: '🥨', title: 'Гренки чипсы орехи сушки', desc: 'Гренки с чесноком, сухарики, орешки' },
              { id: 'potato-chips', emoji: '🥔', title: 'Картофельные чипсы', desc: 'Все вкусы и форматы' },
              { id: 'seeds', emoji: '🌻', title: 'Семечки', desc: 'Жареные, соленые, разные виды' },
              { id: 'meat-dried', emoji: '🥩', title: 'Мясо вяленое', desc: 'Говядина, свинина, курица' },
              { id: 'cheese', emoji: '🧀', title: 'Сыры', desc: 'Колбасный, косички, жареный' },
              { id: 'packaging', emoji: '📦', title: 'Фасовка', desc: 'Удобная упаковка любых размеров' },
            ].map((cat, index) => (
              <div
                key={index}
                id={cat.id}
                className="glass rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer group relative"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {cat.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-amber-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground text-base">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Вяленая и копчёная рыба — то, за чем приходят в пивной
            </h2>
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute -top-6 -left-6 text-6xl opacity-20">🐟</div>
              <div className="absolute -bottom-6 -right-6 text-6xl opacity-20">🦑</div>
              <div className="glass rounded-3xl p-10 sm:p-14 border-2 border-primary/30 shadow-2xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative space-y-8 text-lg sm:text-xl leading-relaxed">
                  <p className="text-foreground/90 first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                    Давайте честно: вяленая рыба — это процентов семьдесят продаж любой пивной точки. Без неё никуда. Поэтому у нас тут всё серьёзно.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🐟</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  <p className="text-foreground/90">
                    Астраханская вобла — это вообще отдельная история. <span className="text-primary font-semibold">Настоящая, с икрой, просоленная как надо.</span> Не пересушенная и не сырая. Берут её коробками, особенно ближе к выходным. Икра воблы, кстати, тоже улетает — многие специально за ней приходят.
                  </p>
                  <p className="text-xl font-bold text-primary">Что ещё хорошо идёт:</p>
                  <ul className="space-y-3 pl-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-2xl">🔸</span>
                      <span className="text-foreground/90"><strong className="text-primary">Пелядь</strong> — жирненькая, в меру солёная, клиенты любят</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-2xl">🔸</span>
                      <span className="text-foreground/90"><strong className="text-primary">Камбала с икрой</strong> — выглядит дорого, а по цене вполне доступна</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-2xl">🔸</span>
                      <span className="text-foreground/90"><strong className="text-primary">Жёлтый полосатик</strong> — классика, которая никогда не подводит</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-2xl">🔸</span>
                      <span className="text-foreground/90"><strong className="text-primary">Кальмар стружка</strong> — для тех, кому рыба надоела</span>
                    </li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🍺</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  <p className="text-foreground/90">
                    Копчёная рыба — это уже для гурманов. <span className="text-primary font-semibold">Красная рыба копчёная разлетается под крафтовое пиво</span>, да и под обычное тоже неплохо. Если не знаете, что взять — звоните, подскажем, что сейчас лучше берут.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Мясные закуски — когда рыба не для всех
            </h2>
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute -top-6 -left-6 text-6xl opacity-20">🥩</div>
              <div className="absolute -bottom-6 -right-6 text-6xl opacity-20">🍖</div>
              <div className="glass rounded-3xl p-10 sm:p-14 border-2 border-primary/30 shadow-2xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative space-y-8 text-lg sm:text-xl leading-relaxed">
                  <p className="text-foreground/90 first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                    Есть категория людей, которые рыбу на дух не переносят. И что, терять этих клиентов? Нет уж. Для них держим мясные снеки, и скажу вам — <span className="text-primary font-semibold">маржа там очень приятная</span>.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🥓</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  <p className="text-foreground/90">
                    <span className="text-primary font-semibold">Вяленое мясо сейчас вообще в тренде.</span> Берут и к пиву, и просто так пожевать. Мясные чипсы — штука интересная, хрустят, вкус насыщенный, упаковка яркая. На витрине смотрятся отлично.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🍻</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  <p className="text-foreground/90">
                    Мясные колбаски — это для тех, кто хочет посерьёзнее перекусить. А <span className="text-primary font-semibold">свиные ушки</span> — ну, тут без комментариев, кто пробовал — тот знает. Хрустящие, с перчинкой, под светлое пиво идеально.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Сыры, орешки, сухарики — мелочь, а приятно
            </h2>
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute -top-6 -left-6 text-6xl opacity-20">🧀</div>
              <div className="absolute -bottom-6 -right-6 text-6xl opacity-20">🥜</div>
              <div className="glass rounded-3xl p-10 sm:p-14 border-2 border-primary/30 shadow-2xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative space-y-8 text-lg sm:text-xl leading-relaxed">
                  <p className="text-foreground/90 first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                    Вот эти позиции многие недооценивают. А зря! Человек пришёл за пивом, взял рыбку, а тут ещё и сухарики по акции. Почему бы не добавить? <span className="text-primary font-semibold">Средний чек растёт, все довольны.</span>
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🧀</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                      <span>🧀</span> Сырные штуки
                    </h3>
                    <p className="text-foreground/90">
                      <span className="text-primary font-semibold">Копчёный колбасный сыр</span> — его обычно нарезают и кладут рядом с кассой. Импульсная покупка, работает на ура. <span className="text-primary font-semibold">Сырные косички</span> — вообще хит, особенно молодёжь берёт. Жареный сыр — для любителей чего-то необычного.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🥨</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                      <span>🥨</span> Всё хрустящее
                    </h3>
                    <p className="text-foreground/90 mb-4">
                      <span className="text-primary font-semibold">Гренки с чесноком</span> — это наша любовь. Ароматные, хрустящие, чеснок настоящий, не химический. Есть ещё со вкусом томата и икры — тоже разбирают.
                    </p>
                    <p className="text-foreground/90">
                      Сухарики чёрные — под тёмное пиво самое то. Из бородинского хлеба, с тмином, <span className="text-primary font-semibold">вкус детства, только для взрослых</span>.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🥜</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                      <span>🥜</span> Орехи и семечки
                    </h3>
                    <p className="text-foreground/90">
                      Арахис у нас разный: <span className="text-primary font-semibold">с сыром, с беконом, васаби для экстремалов</span>. Фисташки — ну куда без них, классика жанра. Семечки тоже есть, куда ж без них в нашем деле.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-work" className="py-20 px-4 sm:px-6 lg:px-8 hop-pattern relative">
        <div className="absolute top-20 right-20 text-primary/5 text-8xl">🍻</div>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Почему работать с нами удобно
            </h2>
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute -top-6 -left-6 text-6xl opacity-20">🤝</div>
              <div className="absolute -bottom-6 -right-6 text-6xl opacity-20">✅</div>
              <div className="glass rounded-3xl p-10 sm:p-14 border-2 border-primary/30 shadow-2xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative space-y-8 text-lg sm:text-xl leading-relaxed">
                  <p className="text-foreground/90 first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                    Слушайте, мы сами из этого бизнеса, понимаем все ваши головные боли. Поставщик подвёл, товар не свежий, фасовка неудобная — всё это проходили.
                  </p>
                  
                  <p className="text-2xl font-bold text-primary text-center">Поэтому у нас так:</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">📦</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  
                  <p className="text-foreground/90">
                    <strong className="text-primary text-2xl">Привозим свежее.</strong> Не «условно свежее», а реально свежее. Сроки нормальные, хранение правильное.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">📊</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  
                  <p className="text-foreground/90">
                    <strong className="text-primary text-2xl">Объёмы любые.</strong> Хотите коробку на пробу — пожалуйста. Хотите фуру — тоже договоримся.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">⚡</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  
                  <p className="text-foreground/90">
                    <strong className="text-primary text-2xl">Отгружаем быстро.</strong> Понимаем, что пустая витрина — это потерянные деньги.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">💡</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  
                  <p className="text-foreground/90">
                    <strong className="text-primary text-2xl">Подсказываем, что брать.</strong> Если только открываетесь или хотите обновить ассортимент — поможем собрать заказ, который будет продаваться.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <span className="text-2xl">🍻</span>
                    <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                  
                  <p className="text-foreground/90 text-center">
                    В общем, если ищете, где закупать пивные закуски без головной боли — <span className="text-primary font-semibold">давайте попробуем поработать</span>. Прайс скинем, по ассортименту проконсультируем, дальше сами решите.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30 fish-scale relative">
        <div className="absolute top-10 left-1/4 text-primary/5 text-7xl">🍺</div>
        <div className="absolute bottom-10 right-1/4 text-primary/5 text-7xl">🐠</div>
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 sm:p-12 border border-primary/20">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Продавайте снеки выгодно
              </h2>
              <p className="text-lg text-muted-foreground">Оставьте заявку и мы свяжемся с вами кратчайшие сроки</p>
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
                  placeholder="Что хотите продать? (необязательно)"
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
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border wood-texture relative">
        <div className="absolute bottom-10 left-10 text-primary/5 text-8xl">🍻</div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Свяжитесь с нами
              </h2>
              <p className="text-lg text-muted-foreground mb-8">Работаем с пн по пт с 6:00 до 17:00. </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Телефон</p>
                    <a href="tel:+79261092609" className="text-xl font-bold hover:text-primary transition-colors block">
                      8 (926) 109 - 26 - 09
                    </a>
                    <a href="tel:+79776135936" className="text-xl font-bold hover:text-primary transition-colors block mt-1">
                      8 (977) 613 - 59 - 36
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:info@snacks-buyer.ru" className="text-xl font-semibold hover:text-primary transition-colors">merka_04@mail.ru</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="h-20 text-lg bg-[#0088cc] hover:bg-[#0077b5] text-white px-12"
                onClick={() => window.open('https://t.me/merka_fish', '_blank')}
              >
                <Icon name="Send" className="mr-2" size={24} />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2026 Закупка снеков. Все права защищены.</p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}