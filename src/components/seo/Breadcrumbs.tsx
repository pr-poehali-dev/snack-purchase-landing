import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Icon from '@/components/ui/icon';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Главная', href: '/' }, ...items];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://merkaprofish.ru${item.href}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <nav aria-label="Хлебные крошки" className="absolute top-20 left-0 right-0 z-20 py-3 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {allItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <Icon name="ChevronRight" size={16} className="mx-2 text-white/50" />
                )}
                {index === allItems.length - 1 ? (
                  <span className="text-white font-medium">{item.label}</span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}