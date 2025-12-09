import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ScrollToTop from '@/components/ScrollToTop';

export default function Index() {
  const { toast } = useToast();
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
      description: 'Оплата на месте в день выезда',
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
      description: 'От 50 кг до нескольких тонн',
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden fish-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="absolute top-10 right-10 text-primary/10 text-9xl">🍺</div>
        <div className="absolute bottom-20 left-20 text-primary/10 text-8xl">🐟</div>
        <div className="absolute top-1/3 left-10 text-primary/10 text-7xl">🥜</div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-shadow">
              Закупаем снеки к пиву
              <span className="block text-primary mt-2">по лучшим ценам</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Рыба, кальмар, орехи, сухарики, чипсы — покупаем быстро и выгодно для баров, ресторанов и кафе
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              >
                Что закупаем
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto animate-scale-in">
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
              Категории закупаемых товаров
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Работаем со всеми популярными видами снеков для вашего заведения
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="p-8 glass border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {index === 0 ? '🐟' : index === 1 ? '🦑' : index === 2 ? '🥩' : index === 3 ? '🥜' : index === 4 ? '🍟' : '🥨'}
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={category.icon} className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 hop-pattern relative">
        <div className="absolute top-20 right-20 text-primary/5 text-8xl">🍻</div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Простой и прозрачный процесс сотрудничества
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-amber-500 text-primary-foreground text-3xl font-bold mb-6 shadow-lg shadow-primary/50">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
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
              <p className="text-lg text-muted-foreground">
                Оставьте заявку и мы свяжемся с вами в течение 30 минут
              </p>
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
              <p className="text-lg text-muted-foreground mb-8">
                Работаем ежедневно с 9:00 до 21:00. Выезжаем по всему городу.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <a href="tel:+79991234567" className="text-2xl font-bold hover:text-primary transition-colors">
                      +7 (999) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:info@snacks-buyer.ru" className="text-xl font-semibold hover:text-primary transition-colors">
                      info@snacks-buyer.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="h-20 text-lg bg-[#25D366] hover:bg-[#20BA5A] text-white"
                onClick={() => window.open('https://wa.me/79991234567', '_blank')}
              >
                <Icon name="MessageCircle" className="mr-2" size={24} />
                WhatsApp
              </Button>
              <Button 
                size="lg" 
                className="h-20 text-lg bg-[#0088cc] hover:bg-[#0077b5] text-white"
                onClick={() => window.open('https://t.me/snacks_buyer', '_blank')}
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
          <p>&copy; 2024 Закупка снеков. Все права защищены.</p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}