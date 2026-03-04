import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyType: 'ООО',
    companyName: '',
    address: '',
    contact: '',
    workingHours: '',
    comments: '',
    paymentMethod: '',
  });

  // Функция для вычисления общей суммы
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = extractPrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  // Функция для извлечения числовой цены
  const extractPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину перед оформлением заказа",
        variant: "destructive",
      });
      return;
    }

    if (!formData.paymentMethod) {
      toast({
        title: "Выберите способ оплаты",
        description: "Пожалуйста, выберите «Наличными» или «Расчетный счет»",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/94b7d436-dd86-4a52-a215-62014cfed48d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyType: formData.companyType,
          companyName: formData.companyName,
          address: formData.address,
          contact: formData.contact,
          workingHours: formData.workingHours,
          comments: formData.comments,
          paymentMethod: formData.paymentMethod,
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit || 'кг',
            price: item.price || '0₽',
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Заказ отправлен!",
          description: "Мы свяжемся с вами в ближайшее время для уточнения деталей.",
        });
        
        setFormData({
          companyType: 'ООО',
          companyName: '',
          address: '',
          contact: '',
          workingHours: '',
          comments: '',
          paymentMethod: '',
        });
        clearCart();
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заказ. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <Icon name="ArrowLeft" className="mr-2" />
                Вернуться на главную
              </Button>
            </Link>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Корзина
            </h1>
            <p className="text-xl text-muted-foreground">
              {totalItems > 0 ? `Товаров в корзине: ${totalItems}` : 'Корзина пуста'}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center border border-primary/20">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
              <p className="text-muted-foreground mb-8">
                Добавьте товары из каталога, чтобы оформить заказ
              </p>
              <Link to="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="Grid3x3" className="mr-2" />
                  Перейти к категориям
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold mb-4">Товары в заказе</h2>
                
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="glass rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all animate-fade-in"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl flex-shrink-0">{item.image}</div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        {item.price && (
                          <p className="text-lg font-bold text-amber-400 mb-4">
                            {item.price}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="text-lg font-bold w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Icon name="Trash2" size={18} className="mr-2" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  <Icon name="Trash2" className="mr-2" />
                  Очистить корзину
                </Button>
              </div>

              <div className="lg:col-span-1">
                <div className="glass rounded-3xl p-8 border border-primary/20 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        ИП или ООО *
                      </label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={formData.companyType === 'ИП' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setFormData({ ...formData, companyType: 'ИП' })}
                        >
                          ИП
                        </Button>
                        <Button
                          type="button"
                          variant={formData.companyType === 'ООО' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setFormData({ ...formData, companyType: 'ООО' })}
                        >
                          ООО
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Наименование юр. лица *
                      </label>
                      <Input
                        placeholder={formData.companyType === 'ИП' ? 'ИП Иванов Иван Иванович' : 'ООО «Пивная точка»'}
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Точный адрес *
                      </label>
                      <Input
                        placeholder="г. Москва, ул. Ленина, д. 1"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Контакт для связи *
                      </label>
                      <Input
                        placeholder="+7 (999) 123-45-67"
                        type="tel"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Время работы *
                      </label>
                      <Input
                        placeholder="Пн-Пт: 9:00-21:00"
                        value={formData.workingHours}
                        onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Ваши комментарии к заказу
                      </label>
                      <Textarea
                        placeholder="Особые пожелания или вопросы..."
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        className="bg-background/50 border-border focus:border-primary resize-none min-h-24"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Способ оплаты *
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className={`flex-1 py-2 px-4 rounded-lg font-semibold border-2 transition-all duration-200 ${
                            formData.paymentMethod === 'Наличными'
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted/40 text-muted-foreground border-muted hover:border-primary/50 hover:text-foreground'
                          }`}
                          onClick={() => setFormData({ ...formData, paymentMethod: 'Наличными' })}
                        >
                          Наличными
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-2 px-4 rounded-lg font-semibold border-2 transition-all duration-200 ${
                            formData.paymentMethod === 'Расчетный счет'
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted/40 text-muted-foreground border-muted hover:border-primary/50 hover:text-foreground'
                          }`}
                          onClick={() => setFormData({ ...formData, paymentMethod: 'Расчетный счет' })}
                        >
                          Расчетный счет
                        </button>
                      </div>
                      {!formData.paymentMethod && (
                        <p className="text-xs text-red-400 mt-1">Выберите способ оплаты</p>
                      )}
                    </div>
                    
                    <div className="border-t border-border pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итоговая сумма:</span>
                        <span className="text-2xl font-bold text-primary">{calculateTotal()}₽</span>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Icon name="Send" className="mr-2" size={20} />
                      Отправить заказ
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      * Обязательные поля
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}