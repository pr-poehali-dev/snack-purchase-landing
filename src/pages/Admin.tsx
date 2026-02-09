import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  in_stock: boolean;
}

interface Category {
  id: string;
  emoji: string;
  title: string;
  products: Product[];
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Проверяем сохраненную сессию
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginInput === 'Merka' && passwordInput === 'Www373826483') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setAuthError('');
      setLoading(true);
      loadProducts();
    } else {
      setAuthError('Неверный логин или пароль');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setLoginInput('');
    setPasswordInput('');
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/3b7c8f03-6bb3-4cd5-bc59-7bf5fdb13fe3');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Loaded categories:', data);
      
      setCategories(data);
      
      // Выбираем первую категорию с товарами
      if (!selectedCategory && Object.keys(data).length > 0) {
        const firstCategoryWithProducts = Object.keys(data).find(
          (catId) => data[catId].products && data[catId].products.length > 0
        );
        if (firstCategoryWithProducts) {
          setSelectedCategory(firstCategoryWithProducts);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      alert(`Ошибка загрузки данных: ${error}`);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    setSaving(true);
    try {
      const response = await fetch('https://functions.poehali.dev/3b7c8f03-6bb3-4cd5-bc59-7bf5fdb13fe3', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      if (response.ok) {
        await loadProducts();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
    setSaving(false);
  };

  // Форма входа
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl border border-primary/20 p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <Icon name="Lock" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">🔐 Вход в админку</h1>
            <p className="text-muted-foreground">Введите логин и пароль</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Логин</label>
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg border border-primary/20 focus:border-primary/50 focus:outline-none transition-colors"
                placeholder="Введите логин"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg border border-primary/20 focus:border-primary/50 focus:outline-none transition-colors"
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-destructive/20 border border-destructive/50 rounded-lg"
              >
                <Icon name="AlertCircle" size={20} className="text-destructive" />
                <p className="text-sm text-destructive">{authError}</p>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="LogIn" size={20} />
              Войти
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться на сайт
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin text-primary mx-auto mb-4" size={48} />
          <p className="text-xl font-medium">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Проверка наличия данных
  if (Object.keys(categories).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
        <div className="text-center">
          <Icon name="AlertCircle" className="text-destructive mx-auto mb-4" size={48} />
          <p className="text-xl font-medium mb-2">Нет данных для отображения</p>
          <p className="text-muted-foreground mb-4">Категории и товары не найдены</p>
          <button
            onClick={loadProducts}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  const currentCategory = categories[selectedCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Шапка */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🔧 Админ-панель</h1>
              <p className="text-muted-foreground">Управление товарами и ценами</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 glass rounded-lg border border-destructive/20 hover:border-destructive/50 text-destructive transition-all"
              >
                <Icon name="LogOut" size={20} />
                <span>Выйти</span>
              </button>
              <a
                href="/"
                className="flex items-center gap-2 px-6 py-3 glass rounded-lg border border-primary/20 hover:border-primary/50 transition-all"
              >
                <Icon name="Home" size={20} />
                <span>На сайт</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Выбор категории */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="glass rounded-xl p-4 border border-primary/20">
            <div className="flex flex-wrap gap-3">
              {Object.values(categories)
                .filter((cat) => cat.products && cat.products.length > 0)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'glass border border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    <span className="mr-2">{cat.emoji}</span>
                    <span className="font-medium">{cat.title}</span>
                    <span className="ml-2 text-sm opacity-75">({cat.products.length})</span>
                  </button>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Таблица товаров */}
        {currentCategory && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-xl border border-primary/20 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10 border-b border-primary/20">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Название</th>
                    <th className="px-6 py-4 text-left font-semibold">Описание</th>
                    <th className="px-6 py-4 text-left font-semibold">Цена</th>
                    <th className="px-6 py-4 text-left font-semibold">В наличии</th>
                    <th className="px-6 py-4 text-left font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategory.products.map((product) => (
                    <tr key={product.id} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-muted-foreground">{product.id}</td>
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {product.description}
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">{product.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            product.in_stock
                              ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                              : 'bg-red-500/20 text-red-600 dark:text-red-400'
                          }`}
                        >
                          <Icon name={product.in_stock ? 'Check' : 'X'} size={14} />
                          {product.in_stock ? 'В наличии' : 'Закончился'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-all"
                        >
                          <Icon name="Edit" size={16} />
                          <span>Редактировать</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Модальное окно редактирования */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl border border-primary/20 p-8 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Редактирование товара</h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-lg border border-primary/20 focus:border-primary/50 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-lg border border-primary/20 focus:border-primary/50 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Цена</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-lg border border-primary/20 focus:border-primary/50 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.in_stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, in_stock: e.target.checked })}
                      className="w-5 h-5 rounded border-primary/20 text-primary focus:ring-primary"
                    />
                    <span className="font-medium">Товар в наличии</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Icon name="Loader2" className="animate-spin" size={20} />
                      <span>Сохранение...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Save" size={20} />
                      <span>Сохранить</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-3 glass border border-primary/20 rounded-lg font-semibold hover:border-primary/50 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}