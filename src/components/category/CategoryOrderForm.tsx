import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { CategoryData } from '@/types/category';

interface CategoryOrderFormProps {
  category: CategoryData;
}

export default function CategoryOrderForm({ category }: CategoryOrderFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

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
          category: category.title || 'Общая заявка',
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

  return (
    <div>
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
  );
}
