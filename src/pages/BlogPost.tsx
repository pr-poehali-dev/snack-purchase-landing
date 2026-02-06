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

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-amber-500 transition-colors mb-8">
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Вернуться к блогу
          </Link>

          <div className="glass rounded-3xl p-8 sm:p-12 border-2 border-primary/30 shadow-2xl">
            <div className="text-8xl mb-8 text-center">{post.image}</div>
            
            <div className="prose prose-lg max-w-none">
              {post.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.type === 'paragraph' && (
                    <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                      {section.text}
                    </p>
                  )}
                  
                  {section.type === 'heading' && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 mt-12">
                      {section.text}
                    </h2>
                  )}
                  
                  {section.type === 'list' && (
                    <ul className="space-y-4 mb-6">
                      {section.items?.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary text-xl mt-1">•</span>
                          <span className="text-lg text-foreground/90 leading-relaxed flex-1">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.type === 'quote' && (
                    <div className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl my-8">
                      <p className="text-xl font-semibold text-primary italic">
                        {section.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 glass rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Понравилась статья?</h3>
            <p className="text-muted-foreground mb-6">
              Свяжитесь с нами, чтобы узнать больше о поставках качественных закусок для вашего магазина
            </p>
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600">
                <Icon name="Send" className="mr-2" />
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
