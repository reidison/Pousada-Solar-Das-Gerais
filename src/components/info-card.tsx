import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface InfoCardProps {
  icon?: ReactNode;
  customIconUrl?: string;
  title: string;
  subtitle?: string;
  iconBgColor?: string;
  waveAccentColor?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InfoCard({
  icon,
  customIconUrl,
  title,
  subtitle,
  iconBgColor = 'bg-amber-100/70 text-amber-700',
  waveAccentColor = '#F6B726',
  children,
  className,
  onClick,
}: InfoCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between h-full bg-white rounded-2xl border border-[#113F52]",
        "shadow-[0_4px_20px_rgba(17,63,82,0.06)] hover:shadow-[0_12px_28px_rgba(17,63,82,0.12)]",
        "transition-all duration-300 transform hover:-translate-y-1 overflow-hidden select-none",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="p-5 sm:p-6">
        {/* Ícone Circular com Fundo Suave Pastel */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              "flex items-center justify-center h-13 w-13 rounded-full transition-transform group-hover:scale-105 duration-300 overflow-hidden",
              iconBgColor
            )}
          >
            {customIconUrl ? (
              <img
                src={customIconUrl}
                alt={title}
                className="w-7 h-7 object-contain"
              />
            ) : (
              icon
            )}
          </div>
        </div>

        {/* Título com Seta Chevron à Direita */}
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-headline font-bold text-base sm:text-lg text-solar-navy group-hover:text-solar-navyLight transition-colors">
            {title}
          </h2>
          <ChevronRight
            size={18}
            className="text-solar-navy/40 group-hover:text-solar-navy group-hover:translate-x-1 transition-all shrink-0"
          />
        </div>

        {/* Subtítulo Descritivo */}
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
            {subtitle}
          </p>
        )}

        {/* Conteúdo adicional/botões (se houver) */}
        {children && (
          <div className="mt-4 pt-3 border-t border-[#113F52]/20 flex flex-col items-center justify-center text-center">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}
