import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
  type: 'organization' | 'product' | 'itemList';
  data?: any;
}

export default function SchemaOrg({ type, data }: SchemaOrgProps) {
  const getSchema = () => {
    if (type === 'organization') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'МЕРКА',
        description: 'Оптовые поставки пивных закусок с 2004 года',
        url: 'https://merkaprofish.ru',
        logo: 'https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/18443893-850f-418a-a51a-ec629403ae5e.jpg',
        telephone: '+7',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'RU',
          addressLocality: 'Москва'
        },
        sameAs: [
          'https://t.me/merka_fish',
          'https://yandex.ru/maps/-/CHASuZKa'
        ]
      };
    }

    if (type === 'product' && data) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        offers: {
          '@type': 'Offer',
          price: data.price?.replace(/[^\d]/g, '') || '0',
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'МЕРКА'
          }
        }
      };
    }

    if (type === 'itemList' && data) {
      return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: data.title,
        description: data.description,
        numberOfItems: data.products?.length || 0,
        itemListElement: data.products?.slice(0, 10).map((product: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            description: product.description,
            offers: {
              '@type': 'Offer',
              price: product.price?.replace(/[^\d]/g, '') || '0',
              priceCurrency: 'RUB',
              availability: 'https://schema.org/InStock'
            }
          }
        })) || []
      };
    }

    return null;
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
