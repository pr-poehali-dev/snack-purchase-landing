import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { blogPostsData } from '@/data/blogPostsData';

export default function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? blogPostsData[postId] : null;
  
  const allPosts = Object.values(blogPostsData);
  const relatedPosts = post 
    ? allPosts
        .filter(p => p.id !== post.id && (p.category === post.category || Math.random() > 0.5))
        .slice(0, 3)
    : [];

  const schemaData = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.ogImage || "https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/47f9ae72-7eab-48a3-8086-81802cdce7ed.jpg",
    "datePublished": "2026-02-06T12:00:00+03:00",
    "dateModified": "2026-02-06T12:00:00+03:00",
    "author": {
      "@type": "Organization",
      "name": "МЕРКА"
    },
    "publisher": {
      "@type": "Organization",
      "name": "МЕРКА — Оптовые поставки закусок",
      "logo": {
        "@type": "ImageObject",
        "url": "https://merkaprofish.ru/logo.png"
      }
    },
    "articleSection": post.category,
    "url": `https://merkaprofish.ru/blog/${post.id}`
  } : null;

  const breadcrumbSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://merkaprofish.ru/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Блог",
        "item": "https://merkaprofish.ru/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://merkaprofish.ru/blog/${post.id}`
      }
    ]
  } : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
          <Link to="/blog">
            <Button size="lg">
              <Icon name="ArrowLeft" className="mr-2" />
              Вернуться к блогу
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} — Блог МЕРКА</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://merkaprofish.ru/blog/${post.id}`} />
        
        {/* Schema.org разметка для Google */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        
        {/* Open Graph теги для соцсетей */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://merkaprofish.ru/blog/${post.id}`} />
        <meta property="og:site_name" content="МЕРКА — Оптовые поставки закусок" />
        <meta property="og:locale" content="ru_RU" />
        {post.ogImage && <meta property="og:image" content={post.ogImage} />}
        {post.ogImage && <meta property="og:image:width" content="1024" />}
        {post.ogImage && <meta property="og:image:height" content="1024" />}
        {post.ogImage && <meta property="og:image:alt" content={post.title} />}
        <meta property="article:published_time" content="2026-02-06T12:00:00+03:00" />
        <meta property="article:author" content="МЕРКА" />
        <meta property="article:section" content={post.category} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.ogImage && <meta name="twitter:image" content={post.ogImage} />}
        {post.ogImage && <meta name="twitter:image:alt" content={post.title} />}
      </Helmet>

      <Header />

      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-shadow drop-shadow-2xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/blog" className="hover:text-primary transition-colors">
              Блог
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">{post.title}</span>
          </nav>

          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-amber-500 transition-all mb-8 group bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg">
            <Icon name="ArrowLeft" size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Вернуться к блогу</span>
          </Link>

          <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-primary/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-500/10 to-primary/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              {post.ogImage ? (
                <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={post.ogImage} 
                    alt={post.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              ) : (
                <div className="text-9xl mb-10 text-center drop-shadow-2xl animate-fade-in">{post.image}</div>
              )}
              
              <div className="prose prose-lg max-w-none">
                {post.content.map((section, index) => (
                  <div key={index} className="mb-8">
                    {section.type === 'paragraph' && (
                      <p className="text-lg text-foreground leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                        {section.text}
                      </p>
                    )}
                    
                    {section.type === 'heading' && (
                      <div className="relative mt-16 mb-8">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-amber-500 rounded-full" />
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                          {section.text}
                        </h2>
                      </div>
                    )}
                    
                    {section.type === 'list' && (
                      <ul className="space-y-4 mb-8">
                        {section.items?.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 group">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                              <Icon name="Check" size={14} className="text-primary-foreground" />
                            </div>
                            <span className="text-lg text-foreground leading-relaxed flex-1">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.type === 'quote' && (
                      <div className="relative my-12 group">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-amber-500 to-primary rounded-full" />
                        <div className="bg-gradient-to-br from-primary/10 via-amber-500/5 to-primary/10 p-8 rounded-2xl border-2 border-primary/20 group-hover:border-amber-500/30 transition-colors">
                          <Icon name="Quote" size={32} className="text-primary/30 mb-4" />
                          <p className="text-xl font-semibold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent leading-relaxed">
                            {section.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <Icon name="BookOpen" size={28} className="text-primary" />
                <h2 className="text-3xl font-bold">Похожие статьи</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group"
                  >
                    <div className="glass rounded-xl border-2 border-primary/20 hover:border-amber-500/50 transition-all duration-300 overflow-hidden h-full hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/10">
                      {relatedPost.ogImage ? (
                        <div className="relative aspect-video w-full overflow-hidden">
                          <img 
                            src={relatedPost.ogImage} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-amber-500 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                            {relatedPost.category}
                          </div>
                        </div>
                      ) : (
                        <div className="relative bg-gradient-to-br from-primary/10 via-amber-500/10 to-primary/5 p-12 flex items-center justify-center">
                          <div className="text-6xl transform group-hover:scale-125 transition-all duration-300">
                            {relatedPost.image}
                          </div>
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-amber-500 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                            {relatedPost.category}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={12} className="text-amber-500" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-amber-500 transition-all line-clamp-2 leading-snug">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 glass rounded-2xl p-8 border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:border-amber-500/30 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Sparkles" size={24} className="text-amber-500" />
                <h3 className="text-2xl font-bold">Понравилась статья?</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-lg">
                Свяжитесь с нами, чтобы узнать больше о поставках качественных закусок для вашего магазина
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <Icon name="Send" className="mr-2" />
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}