'use client';

export function WelcomeMessage() {
    return (
        <div className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                Bem-vindo(a) à Pousada Solar das Gerais!
            </h1>
            <div className="text-lg text-muted-foreground min-h-[28px]">
                <p>Horários, comodidades e informações para voce aproveitar ao máximo sua estadia conosco.</p>
            </div>
        </div>
    );
}
