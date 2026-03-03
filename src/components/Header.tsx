import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { totalItems, items } = useCart();

  const extractPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = extractPrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  const categories = [
    { label: 'Рыба вяленая', emoji: '🐟', id: 'fish-dried' },
    { label: 'Рыба копченая и соленая', emoji: '🐠', id: 'fish-smoked' },
    { label: 'Снеки', emoji: '🦑', id: 'snacks' },
    { label: 'Сухарики и чипсы', emoji: '🥐', id: 'crackers' },
    { label: 'Гренки чипсы орехи сушки', emoji: '🥨', id: 'crackers-nuts' },
    { label: 'Картофельные чипсы', emoji: '🥔', id: 'potato-chips' },
    { label: 'Семечки', emoji: '🌻', id: 'seeds' },
    { label: 'Мясные закуски', emoji: '🥓', id: 'meat' },
    { label: 'Мясо вяленое', emoji: '🥩', id: 'meat-dried' },
    { label: 'Сыры', emoji: '🧀', id: 'cheese' },
    { label: 'Фасовка', emoji: '📦', id: 'packaging' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-2xl shadow-primary/10 border-b border-primary/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <img 
                  src="https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/4268ab04-26a4-4fd3-9c11-a5017afb70ac.png" 
                  alt="Мерка" 
                  className="w-full h-full object-contain brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-lg"
                  style={{ filter: 'brightness(0) saturate(100%) invert(79%) sepia(66%) saturate(433%) hue-rotate(359deg) brightness(102%) contrast(92%)' }}
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-primary group-hover:text-amber-300 transition-colors">
                  МЕРКА
                </h1>
                <p className="text-sm text-muted-foreground -mt-0.5">
                  Пивные закуски оптом 🍺
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('hero')}
                className="relative group/nav text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Icon name="Home" size={18} className="mr-2" />
                <span>Главная</span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-full transition-all duration-300" />
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="relative group/nav text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon name="Grid3x3" size={18} className="mr-2" />
                  <span>Категории</span>
                  <Icon name="ChevronDown" size={16} className={`ml-1 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-full transition-all duration-300" />
                </Button>
                
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-background/98 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl shadow-primary/10 animate-fade-in z-50">
                    <div className="p-3 grid gap-1">
                      {categories.map((cat, index) => (
                        <Link
                          key={index}
                          to={`/category/${cat.id}`}
                          onClick={() => {
                            setIsCategoriesOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-center"
                        >
                          <span className="mr-2 text-lg">{cat.emoji}</span>
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                onClick={() => scrollToSection('how-we-work')}
                className="relative group/nav text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Icon name="Workflow" size={18} className="mr-2" />
                <span>Как работаем</span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-full transition-all duration-300" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="relative group/nav text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Icon name="Phone" size={18} className="mr-2" />
                <span>Контакты</span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-full transition-all duration-300" />
              </Button>

              <Link to="/blog">
                <Button
                  className="relative bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-primary-foreground font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
                >
                  <Icon name="BookOpen" size={18} className="mr-2" />
                  <span>Блог</span>
                </Button>
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-primary hover:bg-primary/10"
                >
                  <Icon name="ShoppingCart" size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </Button>
                {totalItems > 0 && (
                  <div className="absolute top-full right-0 mt-2 bg-background/98 backdrop-blur-xl border border-primary/20 rounded-lg shadow-xl px-4 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="text-sm font-semibold text-muted-foreground">Итого:</div>
                    <div className="text-xl font-bold text-primary">{calculateTotal()}₽</div>
                  </div>
                )}
              </Link>

              <Button
                size="lg"
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-primary-foreground shadow-lg shadow-primary/30 relative overflow-hidden group/cta"
                onClick={() => scrollToSection('contact')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                <Icon name="Zap" size={20} className="animate-pulse" />
                <span className="font-semibold">Оставить заявку</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-primary hover:bg-primary/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name={isMenuOpen ? 'X' : 'Menu'} size={28} />
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-primary/20 shadow-2xl animate-fade-in">
              <nav className="flex flex-col gap-1 p-4">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('hero')}
                  className="w-full justify-start text-lg hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Home" size={20} className="mr-3" />
                  Главная
                </Button>
                
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="w-full justify-start text-lg hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon name="Grid3x3" size={20} className="mr-3" />
                    Категории
                    <Icon name="ChevronDown" size={18} className={`ml-auto transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {isCategoriesOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {categories.map((cat, index) => (
                        <Link
                          key={index}
                          to={`/category/${cat.id}`}
                          onClick={() => {
                            setIsCategoriesOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-center"
                        >
                          <span className="mr-2 text-base">{cat.emoji}</span>
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('how-we-work')}
                  className="w-full justify-start text-lg hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Workflow" size={20} className="mr-3" />
                  Как работаем
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('contact')}
                  className="w-full justify-start text-lg hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Phone" size={20} className="mr-3" />
                  Контакты
                </Button>

                <Link to="/blog" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    className="w-full justify-start text-lg bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-primary-foreground font-semibold shadow-lg"
                  >
                    <Icon name="BookOpen" size={20} className="mr-3" />
                    Блог
                  </Button>
                </Link>
                
                <Button
                  size="lg"
                  className="w-full mt-4 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-primary-foreground"
                  onClick={() => scrollToSection('contact')}
                >
                  <Icon name="Zap" size={20} className="mr-2" />
                  Оставить заявку
                </Button>
              </nav>
            </div>
          )}
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
        </div>
      </header>

      <div className={`fixed top-0 left-0 right-0 h-1 z-[60] overflow-hidden ${isScrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <div 
          className="h-full bg-gradient-to-r from-primary via-amber-400 to-primary transition-all duration-300 shadow-lg shadow-primary/50"
          style={{
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
          }}
        />
      </div>
    </>
  );
}