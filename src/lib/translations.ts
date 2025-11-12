
export type Locale = 'pt' | 'en';

export type Translation = {
  welcomeMessage: {
    title: string;
    subtitle: string;
  };
  // Add other translations here as the app grows
};

export const translations: Record<Locale, Translation> = {
  pt: {
    welcomeMessage: {
      title: "Bem-vindo(a) à Pousada Solar das Gerais!",
      subtitle: "Horários, comodidades e informações para você aproveitar ao máximo sua estadia conosco.",
    },
  },
  en: {
    welcomeMessage: {
      title: "Welcome to Pousada Solar das Gerais!",
      subtitle: "Schedules, amenities, and information for you to make the most of your stay with us.",
    },
  },
};
