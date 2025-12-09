import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
          <Button
            onClick={scrollToTop}
            size="lg"
            className="relative w-16 h-20 rounded-3xl bg-gradient-to-b from-amber-200/20 via-amber-400 to-amber-600 hover:from-amber-300/30 hover:via-amber-500 hover:to-amber-700 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/50 overflow-hidden group"
          >
            <div className="absolute inset-0 beer-glass-effect" />
            
            <div className="absolute top-0 left-0 right-0 h-8 bg-white/90 rounded-t-3xl foam-bubbles z-10 group-hover:h-10 transition-all duration-300">
              <div className="absolute top-1 left-2 w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
              <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.5s' }} />
              <div className="absolute top-3 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2.2s' }} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20 mt-4">
              <Icon 
                name="ArrowUp" 
                size={28} 
                className="text-primary-foreground drop-shadow-lg group-hover:scale-110 transition-transform" 
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </Button>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-primary font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Вверх
          </div>
        </div>
      )}
    </>
  );
}
