
export enum DocCategory {
  PROTOCOL = 'Protocol Specifications',
  TESTING = 'Testing Procedures',
  ARCHITECTURE = 'System Architecture',
  OPERATIONS = 'Operations & Maintenance',
  SECURITY = 'Security Compliance'
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
