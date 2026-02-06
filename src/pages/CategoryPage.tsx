import { useParams, Link } from 'react-router-dom';
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
import { categoriesData } from '@/data/categoriesData';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoriesData[categoryId] : null;

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Категория не найдена</h1>
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