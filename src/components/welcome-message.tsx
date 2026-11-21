'use client';

import { useLanguage } from '@/contexts/language-context';

export function WelcomeMessage() {
    const { translations } = useLanguage();

    return (
        <div className="relative text-center mb-12 animate-fade-in-down bg-card/50 rounded-lg shadow-sm py-8 px-4 md:px-12">
            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                    {translations.welcomeMessage.title}
                </h1>
                <div className="text-lg text-muted-foreground min-h-[28px]">
                    <p>{translations.welcomeMessage.subtitle}</p>
                </div>
            </div>
        </div>
    );
}
