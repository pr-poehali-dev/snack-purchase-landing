import { CategoryData } from '@/types/category';

interface CategoryHeroProps {
  category: CategoryData;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      {category.id === 'fish-dried' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/6645f3ab-8687-46c3-bcc9-bbfb027048fb.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'fish-smoked' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/8b8ea176-164b-40ac-a755-5884f7caa303.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'snacks' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/3cacd4ce-da5f-4a6d-a173-6757c956adc3.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'crackers-nuts' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/16cf24fe-fd4a-4034-a3cb-75b7961f8b26.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'potato-chips' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/39193d4a-bdad-412d-90bf-0292197c6432.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'seeds' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/3d88468a-98d4-4a76-8a7b-408f8e45b0a7.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'meat-dried' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/ec55999a-3aba-46ca-8d54-b5287fbb4710.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'cheese' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/a0835cc7-745f-40d3-869a-98039fd1f0c3.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'packaging' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/bucket/202d173e-0d74-4bb8-8645-cd7082233e46.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      
      {category.id === 'crackers' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/a8a86635-7464-43ea-8880-8c11ee8b22c1.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'nuts' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/79692452-ddf1-46c0-94c9-8eaa0bfa87cb.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}
      {category.id === 'meat' && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/d17808fe-e6db-4a3b-97d6-d1ff859cd614/files/73e064e8-2abd-468e-8c49-cb98e322ae40.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/60 via-[#1e293b]/50 to-[#0f172a]/60" />
        </>
      )}

      {!['fish-dried', 'fish-smoked', 'snacks', 'crackers-nuts', 'potato-chips', 'seeds', 'meat-dried', 'cheese', 'packaging', 'crackers', 'nuts', 'meat'].includes(category.id) && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] via-[#1e293b] to-[#0f172a]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          </div>
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce drop-shadow-2xl">{category.emoji}</div>
          {category.id === 'fish-smoked' ? (
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow drop-shadow-2xl">
              Копчёная рыба оптом для магазинов разливного пива
            </h1>
          ) : (
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-shadow drop-shadow-2xl">
              {category.title}
            </h1>
          )}
          <p className="text-2xl text-primary mb-8 drop-shadow-lg">{category.subtitle}</p>
          
          {category.id === 'fish-dried' ? (
            <div className="max-w-4xl mx-auto text-left space-y-4 drop-shadow-2xl bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-primary/20">
              <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                Тут всё просто. Человек наливает себе бокал, оглядывается — а что к пиву? Первое, за чем тянется рука — вяленая рыба. Так было двадцать лет назад, так будет ещё столько же. Тренды приходят и уходят, а вобла с пивом остаётся навсегда.
              </p>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                Купить вяленую рыбу для магазина — это не проблема, предложений на рынке полно. Проблема — найти поставщика, у которого она нормально приготовлена. Не пересоленная до состояния камня, не сырая внутри, без постороннего запаха. Мы перебрали кучу производителей, пока остановились на тех, чья продукция реально вкусная и стабильная от партии к партии.
              </p>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                Что есть в наличии постоянно: астраханская вобла настоящая, пелядь хорошего качества, камбала с икрой, жёлтый полосатик, кальмар стружка, икра воблы. Это проверенная база, которая продаётся в любой сезон.
              </p>
            </div>
          ) : (
            <p className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-2xl bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-primary/20">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}