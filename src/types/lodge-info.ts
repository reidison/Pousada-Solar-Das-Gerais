export interface CardIconsConfig {
  breakfast?: string;
  wifi?: string;
  cityTour?: string;
  loja?: string;
  reception?: string;
  minibar?: string;
  usefulServices?: string;
  regulation?: string;
  aiWelcome?: string;
  [key: string]: string | undefined;
}

export interface LodgeInfo {
  id?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  cardIcons?: CardIconsConfig;
  breakfastHours?: string;
  breakfastLocation?: string;
  wifiName?: string;
  wifiPassword?: string;
  mainDoorAccessCode?: string;
  whatsappNumber?: string;
  welcomeMessage?: string;
  regulation?: string;
}
