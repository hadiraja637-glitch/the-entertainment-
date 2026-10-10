export type CategoryId = 
  | 'lol' 
  | 'play' 
  | 'satisfying' 
  | 'brain' 
  | 'midnight' 
  | 'weird' 
  | 'creative' 
  | 'escape' 
  | 'websites' 
  | 'creator';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
  badgeBg: string;
  itemCount: number;
}

export interface EntertainmentItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  tags: string[];
  timeEstimate: string; // e.g. "1 min", "2-3 min", "Instant"
  timeCategory?: '<1' | '1-3' | '3-5';
  icon: string;
  componentId: string;
  featured?: boolean;
}

export interface Joke {
  id: string;
  setup: string;
  punchline: string;
}

export interface Riddle {
  id: string;
  riddle: string;
  answer: string;
  hint: string;
}

export interface WouldYouRatherItem {
  id: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
}

export interface TriviaItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface FactItem {
  id: string;
  fact: string;
  source: string;
  verified: boolean;
  topic: string;
}

export interface WebsiteGem {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  emoji: string;
  safetyNote: string;
}

export interface OpticalIllusion {
  id: string;
  title: string;
  description: string;
  explanation: string;
  type: 'hermann-grid' | 'cafe-wall' | 'motion-rings' | 'impossible-triangle';
}
