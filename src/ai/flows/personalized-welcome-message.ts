'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized welcome messages based on weather conditions.
 *
 * It exports:
 * - `generatePersonalizedWelcomeMessage`: A function to generate the welcome message.
 * - `PersonalizedWelcomeMessageInput`: The input type for the function.
 * - `PersonalizedWelcomeMessageOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherInfoSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  condition: z.string().describe('The current weather condition (e.g., sunny, rainy, cloudy).'),
});

const PersonalizedWelcomeMessageInputSchema = z.object({
  guestName: z.string().describe('The name of the guest.'),
  hotelName: z.string().describe('The name of the hotel.'),
  weatherInfo: WeatherInfoSchema.describe('The current weather information.'),
});
export type PersonalizedWelcomeMessageInput = z.infer<typeof PersonalizedWelcomeMessageInputSchema>;

const PersonalizedWelcomeMessageOutputSchema = z.object({
  welcomeMessage: z.string().describe('The personalized welcome message.'),
});
export type PersonalizedWelcomeMessageOutput = z.infer<typeof PersonalizedWelcomeMessageOutputSchema>;

const generatePersonalizedWelcomeMessagePrompt = ai.definePrompt({
  name: 'generatePersonalizedWelcomeMessagePrompt',
  input: {schema: PersonalizedWelcomeMessageInputSchema},
  output: {schema: PersonalizedWelcomeMessageOutputSchema},
  prompt: `You are a hotel concierge expert at writing personalized welcome messages for guests.

  Write a warm and inviting welcome message for {{guestName}} arriving at {{hotelName}}.

  Consider the following weather conditions when crafting the message:
  - Temperature: {{weatherInfo.temperature}}°C
  - Condition: {{weatherInfo.condition}}

  Aim for a message that is concise, friendly, and makes the guest feel welcomed and informed, but it should not sound like a template.
  The welcome message should not be more than 50 words.
  `,
});

const personalizedWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'personalizedWelcomeMessageFlow',
    inputSchema: PersonalizedWelcomeMessageInputSchema,
    outputSchema: PersonalizedWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalizedWelcomeMessagePrompt(input);
    return output!;
  }
);

export async function generatePersonalizedWelcomeMessage(
  input: PersonalizedWelcomeMessageInput
): Promise<PersonalizedWelcomeMessageOutput> {
  return personalizedWelcomeMessageFlow(input);
}
