'use client';

import React, { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CardTheme = 'gold' | 'green' | 'blue';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  theme?: CardTheme;
  children: ReactNode;
  onClick?: () => void;
  action?: ReactNode;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  theme = 'gold',
  children,
  onClick,
  action,
  className = '',
}: FeatureCardProps) {
  const themeStyles = {
    gold: {
      badge: 'bg-[#FFF6E7] text-[#D97706] border border-amber-200/50',
      wave: 'fill-[#EBA120]',
      hoverBorder: 'hover:border-amber-300',
    },
    green: {
      badge: 'bg-[#EBF7EE] text-[#24824F] border border-emerald-200/50',
      wave: 'fill-[#39845A]',
      hoverBorder: 'hover:border-emerald-300',
    },
    blue: {
      badge: 'bg-[#EAF2F9] text-[#1E4D6E] border border-sky-200/50',
      wave: 'fill-[#18486C]',
      hoverBorder: 'hover:border-sky-300',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.04)]',
        'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden',
        currentTheme.hoverBorder,
        onClick ? 'cursor-pointer' : '',
        className
      )}
    >
      {/* Top Content */}
      <div className="p-5 pb-6">
        <div className="flex items-center justify-between mb-3.5">
          {/* Icon Badge */}
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105', currentTheme.badge)}>
            {icon}
          </div>

          {/* Chevron */}
          <div className="text-slate-400 group-hover:text-slate-700 transition-colors p-1">
            <ChevronRight size={18} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-[#11314C] tracking-tight mb-2">
          {title}
        </h3>

        {/* Text / Body Content */}
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {children}
        </div>

        {/* Action button if provided */}
        {action && (
          <div className="mt-3.5 pt-1">
            {action}
          </div>
        )}
      </div>

      {/* Decorative Bottom Wave */}
      <div className="w-full h-3 overflow-hidden leading-none mt-auto">
        <svg
          viewBox="0 0 500 50"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,25 C150,55 350,0 500,30 L500,50 L0,50 Z"
            className={currentTheme.wave}
          />
        </svg>
      </div>
    </div>
  );
}
