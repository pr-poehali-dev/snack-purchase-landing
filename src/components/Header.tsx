import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  };

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
              <div className="relative">
                <div className="w-14 h-16 rounded-2xl bg-gradient-to-b from-amber-200/30 via-amber-400 to-amber-600 border-2 border-amber-400/60 shadow-lg shadow-amber-500/50 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 beer-glass-effect" />
                  
                  <div className="absolute top-0 left-0 right-0 h-5 bg-white/95 rounded-t-xl foam-bubbles">
                    <div className="absolute top-0.5 left-2 w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                    <div className="absolute top-1 right-2 w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.3s' }} />
                    <div className="absolute top-1.5 left-1/2 w-1 h-1 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }} />
                  </div>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl">
                    🐟
                  </div>
                </div>
                
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                  🥜
                </div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-primary group-hover:text-amber-300 transition-colors">
                  СНЭКИ BAR
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Закупаем всё к пиву 🍺
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {[
                { label: 'Главная', icon: 'Home', id: 'hero' },
                { label: 'Категории', icon: 'Grid3x3', id: 'categories' },
                { label: 'Как работаем', icon: 'Workflow', id: 'how-we-work' },
                { label: 'Контакты', icon: 'Phone', id: 'contact' },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="relative group/nav text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon name={item.icon} size={18} className="mr-2" />
                  <span>{item.label}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-full transition-all duration-300" />
                </Button>
              ))}
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
                {[
                  { label: 'Главная', icon: 'Home', id: 'hero' },
                  { label: 'Категории', icon: 'Grid3x3', id: 'categories' },
                  { label: 'Как работаем', icon: 'Workflow', id: 'how-we-work' },
                  { label: 'Контакты', icon: 'Phone', id: 'contact' },
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="w-full justify-start text-lg hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon name={item.icon} size={20} className="mr-3" />
                    {item.label}
                  </Button>
                ))}
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
