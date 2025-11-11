'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackToTop() {
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
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="default"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 rounded-full h-12 w-12 bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all duration-300 z-50 transform',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
