
export enum DocCategory {
  BIOGRAPHY = 'Biography',
  SERMONS = 'Sermons',
  ARTICLES = 'Articles',
  BOOKS = 'Books'
}

export interface TechnicalDoc {
  id: string;
  title: string;
  category: DocCategory;
  content: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  version: string;
}

export interface SearchResult {
  doc: TechnicalDoc;
  score: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
