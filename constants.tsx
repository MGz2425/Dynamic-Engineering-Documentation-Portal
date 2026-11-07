
import { TechnicalDoc, DocCategory } from './types';

export const SAMPLE_DOCS: TechnicalDoc[] = [
  {
    id: 'bio-001',
    title: 'Full Biography',
    category: DocCategory.BIOGRAPHY,
    content: `Loading biography...`,
    tags: ['history', 'life', 'service'],
    lastUpdated: '2024-05-20',
    author: 'Archive',
    version: '1.0.0'
  },
  {
    id: 'sermon-list',
    title: 'Spiritual Sermons',
    category: DocCategory.SERMONS,
    content: `Select a sermon to read.`,
    tags: ['spiritual', 'sermons', 'teachings'],
    lastUpdated: '2024-05-20',
    author: 'Anba Pachomius',
    version: '1.0.0'
  },
  {
    id: 'article-list',
    title: 'Theological Articles',
    category: DocCategory.ARTICLES,
    content: `Coming Soon`,
    tags: ['theology', 'articles'],
    lastUpdated: '2024-05-20',
    author: 'Anba Pachomius',
    version: '1.0.0'
  },
  {
    id: 'book-gallery',
    title: 'Publications & Books',
    category: DocCategory.BOOKS,
    content: `Books will be added soon.`,
    tags: ['books', 'publications'],
    lastUpdated: '2024-05-20',
    author: 'Anba Pachomius',
    version: '1.0.0'
  }
];

export const APP_THEME = {
  primary: '#3b82f6',
  background: '#09090b',
  surface: '#18181b',
  border: '#27272a',
  text: '#fafafa',
  textMuted: '#a1a1aa'
};
