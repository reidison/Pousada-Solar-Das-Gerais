'use client';

import { useState, useEffect } from 'react';
import { getPersonalizedWelcomeMessage } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export function WelcomeMessage() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMessage() {
            try {
                const result = await getPersonalizedWelcomeMessage({
                    guestName: "Hóspede",
                    hotelName: "Pousada Solar das Gerais",
                    weatherInfo: {
                        temperature: 22,
                        condition: 'Ensolarado'
                    }
                });
                setMessage(result.welcomeMessage);
            } catch (error) {
                console.error("Failed to fetch personalized welcome message:", error);
                setMessage("Preparamos estas informações para que sua experiência conosco seja perfeita.");
            }
        }
        fetchMessage();
    }, []);

    return (
        <div className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                Bem-vindo(a) à Pousada Solar das Gerais!
            </h1>
            <div className="text-lg text-muted-foreground min-h-[28px]">
                {message ? (
                    <p>{message}</p>
                ) : (
                    <Skeleton className="h-7 w-3/4 mx-auto" />
                )}
            </div>
        </div>
    );
}
