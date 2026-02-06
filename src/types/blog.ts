export interface BlogPostSection {
  type: 'paragraph' | 'heading' | 'list' | 'quote';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  ogImage?: string;
  category: string;
  readTime: string;
  content: BlogPostSection[];
}
