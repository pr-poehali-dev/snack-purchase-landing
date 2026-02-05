import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  const categories = [
    { label: 'Рыба вяленая', emoji: '🐟', id: 'fish-dried' },
    { label: 'Рыба копченая и соленая', emoji: '🐠', id: 'fish-smoked' },
    { label: 'Снеки', emoji: '🍿', id: 'snacks' },
    { label: 'Гренки чипсы орехи сушки', emoji: '🥨', id: 'crackers-nuts' },
    { label: 'Картофельные чипсы', emoji: '🥔', id: 'potato-chips' },
    { label: 'Семечки', emoji: '🌻', id: 'seeds' },
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
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-14 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#0e7490" />
                    </linearGradient>
                    <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  
                  <path d="M 30 30 Q 35 25, 40 30 Q 45 35, 50 30 Q 55 25, 60 30 Q 65 35, 70 30" 
                    fill="none" stroke="url(#frameGradient)" strokeWidth="3" strokeLinecap="round"/>
                  
                  <text x="50" y="22" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" 
                    fill="url(#frameGradient)" textAnchor="middle">мерка</text>
                  
                  <path d="M 30 40 L 35 95 L 50 100 L 65 95 L 70 40 Z" 
                    fill="url(#waveGradient)" stroke="url(#frameGradient)" strokeWidth="2.5"/>
                  
                  <path d="M 35 45 Q 40 50, 45 45 Q 50 40, 55 45 Q 60 50, 65 45" 
                    fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7"/>
                  <path d="M 35 55 Q 40 60, 45 55 Q 50 50, 55 55 Q 60 60, 65 55" 
                    fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6"/>
                  <path d="M 35 65 Q 40 70, 45 65 Q 50 60, 55 65 Q 60 70, 65 65" 
                    fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/>
                  <path d="M 35 75 Q 40 80, 45 75 Q 50 70, 55 75 Q 60 80, 65 75" 
                    fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4"/>
                  <path d="M 35 85 Q 40 90, 45 85 Q 50 80, 55 85 Q 60 90, 65 85" 
                    fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.3"/>
                  
                  <path d="M 48 40 L 52 40 L 52 100 L 48 100 Z" 
                    fill="#e5e7eb" stroke="url(#frameGradient)" strokeWidth="1.5"/>
                  
                  <path d="M 30 105 L 70 105 L 65 110 L 35 110 Z" 
                    fill="#0e7490" stroke="url(#frameGradient)" strokeWidth="2"/>
                  
                  <circle cx="52" cy="70" r="8" fill="#fbbf24" opacity="0.8"/>
                  <circle cx="52" cy="70" r="5" fill="#f59e0b" opacity="0.9"/>
                </svg>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-primary group-hover:text-amber-300 transition-colors">
                  МЕРКА
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Пивные закуски оптом 🍺
                </p>
              </div>
            </div>

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
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() => scrollToSection(cat.id)}
                          className="w-full justify-start text-sm hover:bg-primary/10 hover:text-primary"
                        >
                          <span className="mr-2 text-lg">{cat.emoji}</span>
                          {cat.label}
                        </Button>
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
            </nav>

            <div className="flex items-center gap-3">
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
                        <Button
                          key={index}
                          variant="ghost"
                          onClick={() => scrollToSection(cat.id)}
                          className="w-full justify-start text-sm hover:bg-primary/10 hover:text-primary"
                        >
                          <span className="mr-2 text-base">{cat.emoji}</span>
                          {cat.label}
                        </Button>
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