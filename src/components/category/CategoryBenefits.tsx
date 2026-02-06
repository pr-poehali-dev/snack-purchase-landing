import Icon from '@/components/ui/icon';
import { CategoryData } from '@/types/category';

interface CategoryBenefitsProps {
  category: CategoryData;
}

export default function CategoryBenefits({ category }: CategoryBenefitsProps) {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
        Почему стоит выбрать эту категорию
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
        {category.benefits.map((benefit, index) => (
          <div
            key={index}
            className="glass rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Check" className="text-primary" size={24} />
              </div>
              <p className="text-base sm:text-lg">{benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
