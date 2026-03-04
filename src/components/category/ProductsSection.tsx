import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { Product, CategoryData } from '@/types/category';

interface ProductsSectionProps {
  category: CategoryData;
}

export default function ProductsSection({ category }: ProductsSectionProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const extractPrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const filteredProducts = category.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const price = extractPrice(product.price);
    const minPrice = priceRange.min ? parseInt(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseInt(priceRange.max) : Infinity;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    return matchesSearch && matchesPrice;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: `${category.id}-${product.name}`,
      categoryId: category.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      unit: product.unit,
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину`,
    });
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Ассортимент
      </h2>

      <div className="mb-8 max-w-4xl mx-auto space-y-4">
        <div className="glass rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Search" className="text-primary" size={24} />
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-background/50 border-border focus:border-primary"
            />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Icon name="DollarSign" className="text-primary" size={20} />
              <span className="text-sm font-semibold">Цена:</span>
            </div>
            <Input
              type="number"
              placeholder="От"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-24 bg-background/50 border-border focus:border-primary"
            />
            <span className="text-muted-foreground">—</span>
            <Input
              type="number"
              placeholder="До"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-24 bg-background/50 border-border focus:border-primary"
            />
            {(searchQuery || priceRange.min || priceRange.max) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange({ min: '', max: '' });
                }}
                className="text-sm"
              >
                <Icon name="X" size={16} className="mr-1" />
                Сбросить
              </Button>
            )}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Найдено товаров: {filteredProducts.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
          <div
            key={index}
            className="glass rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group animate-fade-in flex flex-col"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="mb-4 group-hover:scale-110 transition-all duration-500">
              {product.image && product.image.startsWith('http') ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-xl"
                />
              ) : (
                <div className="text-5xl group-hover:rotate-12 transition-all duration-500">
                  {product.image}
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-amber-300 transition-colors">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
            {product.price && (
              <p className="text-lg font-bold text-amber-400 mb-4">{product.price}</p>
            )}
            <Button
              className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleAddToCart(product)}
            >
              <Icon name="ShoppingCart" className="mr-2" size={18} />
              В корзину
            </Button>
          </div>
        )))}
      </div>
    </div>
  );
}