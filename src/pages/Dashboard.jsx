import './Dashboard.css';
import '../pages/InventoryList.css';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { getDashboardStats } from '../utils/products';
import { withCategoryColors, textColorForBg } from '../utils/productHelpers';
import ProductCard from '../components/ProductCard';
import { MAGENTA, TEAL, BLUE, LIGHT_PINK, CATEGORIES, CATEGORY_COLORS } from '../theme/colors';
import { useTranslation } from '../utils/i18n';

export default function Dashboard() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(null);

  const stats = useMemo(() => {
    const data = getDashboardStats(products);
    return [
      { label: t('dashboard.totalProducts'), value: String(data.total), color: MAGENTA },
      { label: t('dashboard.inStock'), value: String(data.totalStock), color: TEAL },
      { label: t('dashboard.criticalStock'), value: String(data.criticalStock), color: BLUE },
      { label: t('dashboard.categories'), value: String(data.categories), color: LIGHT_PINK },
    ];
  }, [products, t]);

  const filteredProducts = useMemo(() => {
    const colored = withCategoryColors(products);
    if (!activeCategory) return colored;
    return colored.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  const handleCategoryClick = (cat) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <h1>{t('dashboard.title')}</h1>
        <p>
          {t('dashboard.subtitle')}
          {products.length > 0 && (
            t('lang') === 'ar' ? ` يتم عرض ${products.length} من المنتجات حالياً.` :
            t('lang') === 'es' ? ` Actualmente se enumeran ${products.length} productos.` :
            t('lang') === 'en' ? ` Currently listing ${products.length} products.` :
            ` Şu anda ${products.length} ürün listeleniyor.`
          )}
        </p>
      </section>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="stat-card"
            style={{ '--accent-color': stat.color }}
          >
            <h3>{stat.label}</h3>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </div>

      {/* ── Kategori Filtre Butonları ── */}
      <section className="dashboard-category-section">
        <h2 className="dashboard-section-title">{t('dashboard.categories')}</h2>
        <div className="category-filters">
          <button
            type="button"
            className={`category-filter-btn${!activeCategory ? ' active' : ''}`}
            style={{ '--cat-color': '#666', backgroundColor: !activeCategory ? '#444' : 'transparent', color: !activeCategory ? '#fff' : '#555', borderColor: '#666' }}
            onClick={() => setActiveCategory(null)}
          >
            {t('dashboard.all')}
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const catColor = CATEGORY_COLORS[cat];
            const count = products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                className={`category-filter-btn${isActive ? ' active' : ''}`}
                style={{
                  '--cat-color': catColor,
                  backgroundColor: isActive ? catColor : 'transparent',
                  color: isActive ? textColorForBg(catColor) : '#555',
                  borderColor: catColor,
                }}
                onClick={() => handleCategoryClick(cat)}
              >
                {t('categories.' + cat, cat)}
                <span className="category-filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Filtrelenmiş Ürün Listesi ── */}
      {filteredProducts.length > 0 ? (
        <div className="dashboard-products-grid inventory-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onImageClick={() => navigate(`/urunler/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="dashboard-empty-filter">
          <p>{t('dashboard.emptyFilter')}</p>
        </div>
      )}
    </div>
  );
}
