import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import CategoryHero from '@/components/category/CategoryHero';
import CategoryBenefits from '@/components/category/CategoryBenefits';
import ProductsSection from '@/components/category/ProductsSection';
import CategoryContent from '@/components/category/CategoryContent';
import CategoryOrderForm from '@/components/category/CategoryOrderForm';
import SchemaOrg from '@/components/seo/SchemaOrg';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { categoriesData } from '@/data/categoriesData';
import { CategoryData } from '@/types/category';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) { setLoading(false); return; }

    const loadCategory = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/3b7c8f03-6bb3-4cd5-bc59-7bf5fdb13fe3');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const apiCategory = data[categoryId];
        const staticCategory = categoriesData[categoryId] ?? null;
        if (apiCategory) {
          const hasProducts = apiCategory.products && apiCategory.products.length > 0;
          setCategory(hasProducts ? apiCategory : { ...apiCategory, products: staticCategory?.products ?? [] });
        } else {
          setCategory(staticCategory);
        }
      } catch {
        setCategory(categoriesData[categoryId] ?? null);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Категория не найдена</h1>
          <p className="text-muted-foreground mb-6">Запрошенная категория не существует.</p>
          <Link to="/">
            <Button size="lg">
              <Icon name="Home" className="mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{category.seo?.title || `${category.title} — МЕРКА`}</title>
        <meta name="description" content={category.seo?.description || category.description} />
        <meta property="og:title" content={category.seo?.title || category.title} />
        <meta property="og:description" content={category.seo?.description || category.description} />
        <link rel="canonical" href={`https://merkaprofish.ru/category/${category.id}`} />
      </Helmet>
      
      <SchemaOrg type="itemList" data={category} />
      <Header />
      
      <Breadcrumbs items={[
        { label: category.title, href: `/category/${category.id}` }
      ]} />
      
      <CategoryHero category={category} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <CategoryBenefits category={category} />

          <ProductsSection category={category} />

          <CategoryContent category={category} />

          <CategoryOrderForm category={category} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Свяжитесь с нами</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Button 
              size="lg" 
              className="h-20 text-lg bg-[#0088cc] hover:bg-[#0077b5] text-white px-12"
              onClick={() => window.open('https://t.me/merka_fish', '_blank')}
            >
              <Icon name="Send" className="mr-3" size={24} />
              Telegram
            </Button>
            
            <Button 
              size="lg" 
              className="h-20 text-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 shadow-2xl shadow-red-500/30 relative overflow-hidden group"
              onClick={() => window.open('https://yandex.ru/maps/-/CHASuZKa', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Icon name="MapPin" className="mr-3 animate-bounce" size={24} />
              <span className="font-semibold">Мы на карте</span>
            </Button>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}