'use client';

export function WelcomeMessage() {
    return (
        <div className="relative text-center mb-12 animate-fade-in-down p-8">
            <div className="absolute top-0 left-0 h-8 w-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 h-8 w-8 border-r-2 border-t-2 border-primary/40 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 h-8 w-8 border-l-2 border-b-2 border-primary/40 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 h-8 w-8 border-r-2 border-b-2 border-primary/40 rounded-br-lg"></div>

            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                Bem-vindo(a) à Pousada Solar das Gerais!
            </h1>
            <div className="text-lg text-muted-foreground min-h-[28px]">
                <p>Horários, comodidades e informações para voce aproveitar ao máximo sua estadia conosco.</p>
            </div>
        </div>
    );
}
