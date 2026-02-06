import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { blogPostsData } from '@/data/blogPostsData';

const blogPosts = Object.values(blogPostsData);

export default function Blog() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Блог о пивных закусках — МЕРКА",
    "description": "Полезные статьи о выборе закусок, работе с поставщиками и увеличении продаж в магазинах разливного пива.",
    "url": "https://merkaprofish.ru/blog",
    "publisher": {
      "@type": "Organization",
      "name": "МЕРКА — Оптовые поставки закусок"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.ogImage || "https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/47f9ae72-7eab-48a3-8086-81802cdce7ed.jpg",
      "datePublished": "2026-02-06T12:00:00+03:00",
      "author": {
        "@type": "Organization",
        "name": "МЕРКА"
      },
      "url": `https://merkaprofish.ru/blog/${post.id}`
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Блог о пивных закусках — советы для магазинов разливного пива</title>
        <meta name="description" content="Полезные статьи о выборе закусок, работе с поставщиками и увеличении продаж в магазинах разливного пива." />
        <link rel="canonical" href="https://merkaprofish.ru/blog" />
        
        {/* Schema.org разметка для Google */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        
        {/* Open Graph теги для соцсетей */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Блог о пивных закусках — советы для магазинов разливного пива" />
        <meta property="og:description" content="Полезные статьи о выборе закусок, работе с поставщиками и увеличении продаж в магазинах разливного пива." />
        <meta property="og:url" content="https://merkaprofish.ru/blog" />
        <meta property="og:site_name" content="МЕРКА — Оптовые поставки закусок" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/47f9ae72-7eab-48a3-8086-81802cdce7ed.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Блог о пивных закусках МЕРКА" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Блог о пивных закусках — советы для магазинов разливного пива" />
        <meta name="twitter:description" content="Полезные статьи о выборе закусок, работе с поставщиками и увеличении продаж в магазинах разливного пива." />
        <meta name="twitter:image" content="https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/47f9ae72-7eab-48a3-8086-81802cdce7ed.jpg" />
        <meta name="twitter:image:alt" content="Блог о пивных закусках МЕРКА" />
      </Helmet>

      <Header />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <div className="text-8xl mb-6 animate-bounce drop-shadow-2xl">📚</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow drop-shadow-2xl">
              Блог о пивных закусках
            </h1>
            <p className="text-2xl text-primary mb-8 drop-shadow-lg">
              Полезные статьи для владельцев магазинов разливного пива
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full glass border-2 border-primary/20 hover:border-amber-500/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-gradient-to-br from-primary/10 via-amber-500/10 to-primary/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
                    {post.ogImage ? (
                      <div className="relative aspect-video w-full">
                        <img 
                          src={post.ogImage} 
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="p-16 flex items-center justify-center">
                        <div className="text-9xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 drop-shadow-2xl">
                          {post.image}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-amber-500 text-primary-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6 relative">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 bg-secondary/30 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Icon name="Calendar" size={14} className="text-primary" />
                        <span>{post.date}</span>
                      </div>
                      <div className="w-px h-4 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <Icon name="Clock" size={14} className="text-amber-500" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-amber-500 transition-all duration-300 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="relative overflow-hidden rounded-lg">
                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-gradient-to-r group-hover:from-primary/10 group-hover:to-amber-500/10 transition-all font-semibold relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Читать далее
                          <Icon name="ArrowRight" size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Не нашли нужную статью?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Напишите нам, и мы подготовим материал на интересующую вас тему
          </p>
          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-primary-foreground px-8"
            >
              <Icon name="Send" className="mr-2" />
              Связаться с нами
            </Button>
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}