export interface Product {
  name: string;
  description: string;
  price?: string;
  image: string;
  unit?: string;
  in_stock?: boolean;
}

export interface CategoryData {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  products: Product[];
  seo?: {
    title: string;
    description: string;
    ogImage?: string;
  };
}