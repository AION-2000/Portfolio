export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ThemeColors {
  ESPRESSO = '#1A120B',
  LATTE = '#D7CCC8',
  FOAM = '#FAF8F5',
}