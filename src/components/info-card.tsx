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
      <div className="p-5 sm:p-6 pb-2">
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

      {/* Onda Orgânica Decorativa no Rodapé do Cartão em Azul Petróleo #113F52 */}
      <div className="mt-4 overflow-hidden leading-none pointer-events-none select-none">
        <svg
          viewBox="0 0 300 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-3 sm:h-3.5 block"
          preserveAspectRatio="none"
        >
          {/* Onda sutil em azul petróleo */}
          <path
            d="M0,10 C70,22 150,0 230,14 C265,20 285,12 300,16 L300,22 L0,22 Z"
            fill={waveAccentColor === '#F6B726' ? '#F6B726' : '#113F52'}
          />
          {/* Onda de base em azul petróleo #113F52 */}
          <path
            d="M0,16 C85,5 175,20 255,12 C275,10 290,14 300,16 L300,22 L0,22 Z"
            fill="#0C2B3A"
          />
        </svg>
      </div>
    </Card>
  );
}
