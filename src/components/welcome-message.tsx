'use client';

import { OrnamentCorner } from '@/components/icons/ornament-corner';

export function WelcomeMessage() {
    return (
        <div className="relative text-center mb-12 animate-fade-in-down p-8">
            <OrnamentCorner className="absolute top-0 left-0 w-12 h-12 text-primary/40" />
            <OrnamentCorner className="absolute top-0 right-0 w-12 h-12 text-primary/40 transform rotate-90" />
            <OrnamentCorner className="absolute bottom-0 left-0 w-12 h-12 text-primary/40 transform -rotate-90" />
            <OrnamentCorner className="absolute bottom-0 right-0 w-12 h-12 text-primary/40 transform rotate-180" />

            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                Bem-vindo(a) à Pousada Solar das Gerais!
            </h1>
            <div className="text-lg text-muted-foreground min-h-[28px]">
                <p>Horários, comodidades e informações para voce aproveitar ao máximo sua estadia conosco.</p>
            </div>
        </div>
    );
}
