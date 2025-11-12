'use client';

import { LaurelBranch } from '@/components/icons/laurel-branch';
import { useLanguage } from '@/contexts/language-context';

export function WelcomeMessage() {
    const { translations } = useLanguage();

    return (
        <div className="text-center mb-12 animate-fade-in-down">
            <div className="relative inline-block px-24 py-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-primary/70 opacity-50">
                    <LaurelBranch className="w-16 h-auto" />
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                    {translations.welcomeMessage.title}
                </h1>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-primary/70 opacity-50">
                    <LaurelBranch className="w-16 h-auto transform -scale-x-100" />
                </div>
            </div>

            <div className="text-lg text-muted-foreground min-h-[28px]">
                <p>{translations.welcomeMessage.subtitle}</p>
            </div>
        </div>
    );
}
