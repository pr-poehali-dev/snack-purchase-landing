import { CategoryData } from '@/types/category';

interface CategoryContentProps {
  category: CategoryData;
}

export default function CategoryContent({ category }: CategoryContentProps) {
  if (category.id !== 'fish-dried') {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto mb-20">
      <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-primary/30 shadow-2xl space-y-12">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-primary">
            Разная рыба для разных покупателей
          </h2>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed">
            <p className="text-foreground">
              Одним подавай <span className="text-amber-400 font-semibold">солёную вяленую рыбу</span> — посуше, пожёстче, чтобы долго жевать под разговор. Другие выбирают <span className="text-amber-400 font-semibold">сушёно-вяленую</span>, где мясо плотное и концентрированное. Третьи ищут <span className="text-amber-400 font-semibold">вялено-копчёную рыбу</span> — она помягче, с тёмным оттенком и лёгкой горчинкой от дыма.
            </p>
            <p className="text-foreground">
              А есть покупатели, которые заходят конкретно за <span className="text-amber-400 font-semibold">вяленой красной рыбой</span>. Горбуша, кета, нерка — на витрине эти позиции выделяются цветом и смотрятся дороже. Наценку на них можно ставить выше, и люди не удивляются — красная рыба воспринимается как деликатес, даже в вяленом виде.
            </p>
            <p className="text-foreground">
              Вот чего мы точно не делаем — не отправляем свежую вяленую рыбу вперемешку со старыми остатками. Каждая партия формируется отдельно, со своими сроками. <span className="text-primary font-semibold">Товарный вид на полке — это ваши продажи</span>, и мы про это помним.
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-primary">
            Как устроены поставки и почему с нами удобно
          </h2>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed">
            <p className="text-foreground">
              Мы не биржа и не агрегатор. Работаем от своего склада, товар в наличии. <span className="text-amber-400 font-semibold">Заказали сегодня — завтра отгрузили.</span> Не через неделю, не «ожидайте поступления», а реально быстро. Пустые полки для пивного магазина — это прямые убытки, и тянуть с отгрузкой мы себе не позволяем.
            </p>
            <p className="text-foreground">
              Цена на вяленую рыбу и остальные позиции зависит от объёма. Попросите прайс — увидите <span className="text-primary font-semibold">конкретные цифры</span>, а не «цену уточняйте». Ценник актуальный, обновляем его регулярно. По рознице тоже подскажем: знаем, какие наценки рабочие, а где уже начинается «стоит и не продаётся».
            </p>
            <p className="text-foreground">
              <span className="text-amber-400 font-semibold">Минимальный заказ — от одной коробки</span> по позиции. Можно взять понемногу разного на пробу и посмотреть, что пойдёт именно у вас. Потому что ассортимент в спальном районе и в центре города — это две разные истории.
            </p>
            <p className="text-foreground">
              Тем, кто только открывается, помогаем сформировать стартовую закупку. Не наугад, а на основе того, что мы видим по статистике продаж наших постоянных клиентов. <span className="text-primary font-semibold">Это экономит и деньги, и нервы.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}