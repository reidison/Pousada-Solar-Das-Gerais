'use client';

import { LaurelBranch } from '@/components/icons/laurel-branch';

export function WelcomeMessage() {
    return (
        <div className="text-center mb-12 animate-fade-in-down">
            <div className="relative inline-block">
                <div className="absolute -left-16 -top-2 bottom-0 flex items-center text-primary/70 transform -translate-x-4 opacity-50">
                    <LaurelBranch className="w-16 h-auto" />
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                    Bem-vindo(a) à Pousada Solar das Gerais!
                </h1>
                <div className="absolute -right-16 -top-2 bottom-0 flex items-center text-primary/70 transform translate-x-4 opacity-50">
                    <LaurelBranch className="w-16 h-auto transform -scale-x-100" />
                </div>
            </div>

            <div className="text-lg text-muted-foreground min-h-[28px]">
                <p>Horários, comodidades e informações para voce aproveitar ao máximo sua estadia conosco.</p>
            </div>
        </div>
    );
}
