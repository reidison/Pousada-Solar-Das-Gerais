
export type Locale = 'pt' | 'en';

export type Translation = {
  welcomeMessage: {
    title: string;
    subtitle: string;
  };
  infoCards: {
    breakfast: {
      title: string;
      line1: string;
      line2: string;
    };
    wifi: {
      title: string;
      line1: string;
      line2: string;
    };
    mainAccess: {
      title: string;
      line1: string;
      line2: string;
    };
    cityTour: {
      title: string;
    };
    reception: {
      title: string;
      line1: string;
      button: string;
    };
    minibar: {
      title: string;
      button: string;
    };
    usefulPhones: {
      title: string;
      button: string;
    };
    regulation: {
      title: string;
      button: string;
    };
  };
};

export const translations: Record<Locale, Translation> = {
  pt: {
    welcomeMessage: {
      title: "Bem-vindo(a) à Pousada Solar das Gerais!",
      subtitle: "Horários, comodidades e informações para você aproveitar ao máximo sua estadia conosco.",
    },
    infoCards: {
      breakfast: {
        title: "Café da Manhã",
        line1: "Servido diariamente das",
        line2: "Local:",
      },
      wifi: {
        title: "Wi-Fi",
        line1: "Rede:",
        line2: "Senha:",
      },
      mainAccess: {
        title: "Acesso Principal",
        line1: "A porta principal utiliza uma senha eletrônica.",
        line2: "Senha:",
      },
      cityTour: {
        title: "City Tour",
      },
      reception: {
        title: "Fale com a Recepção",
        line1: "Precisa de algo? Estamos à disposição no WhatsApp.",
        button: "Falar pelo WhatsApp",
      },
      minibar: {
        title: "Frigobar",
        button: "Ver a lista",
      },
      usefulPhones: {
        title: "Telefones Úteis",
        button: "Ver Lista Completa",
      },
      regulation: {
        title: "Nosso Regulamento",
        button: "Ler",
      },
    },
  },
  en: {
    welcomeMessage: {
      title: "Welcome to Pousada Solar das Gerais!",
      subtitle: "Schedules, amenities, and information for you to make the most of your stay with us.",
    },
    infoCards: {
      breakfast: {
        title: "Breakfast",
        line1: "Served daily from",
        line2: "Location:",
      },
      wifi: {
        title: "Wi-Fi",
        line1: "Network:",
        line2: "Password:",
      },
      mainAccess: {
        title: "Main Access",
        line1: "The main door uses an electronic password.",
        line2: "Password:",
      },
      cityTour: {
        title: "City Tour",
      },
      reception: {
        title: "Contact Reception",
        line1: "Need anything? We are available on WhatsApp.",
        button: "Chat on WhatsApp",
      },
      minibar: {
        title: "Minibar",
        button: "View list",
      },
      usefulPhones: {
        title: "Useful Phones",
        button: "View Full List",
      },
      regulation: {
        title: "Our Regulations",
        button: "Read",
      },
    },
  },
};
