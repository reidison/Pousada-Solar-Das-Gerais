'use server';

import { generatePersonalizedWelcomeMessage, type PersonalizedWelcomeMessageInput } from '@/ai/flows/personalized-welcome-message';

export async function getPersonalizedWelcomeMessage(input: PersonalizedWelcomeMessageInput) {
    // In a real application, you might add authentication or logging here.
    return await generatePersonalizedWelcomeMessage(input);
}
