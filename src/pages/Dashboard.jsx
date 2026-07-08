import './Dashboard.css';
import '../pages/InventoryList.css';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { getDashboardStats } from '../utils/products';
import { withCategoryColors, textColorForBg } from '../utils/productHelpers';
import ProductCard from '../components/ProductCard';
import { MAGENTA, TEAL, BLUE, LIGHT_PINK, CATEGORIES, CATEGORY_COLORS } from '../theme/colors';

export default function Dashboard() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState(null);

  const stats = useMemo(() => {
    const data = getDashboardStats(products);
    return [
      { label: 'Toplam Ürün', value: String(data.total), color: MAGENTA },
      { label: 'Stokta', value: String(data.totalStock), color: TEAL },
      { label: 'Kritik Stok', value: String(data.criticalStock), color: BLUE },
      { label: 'Kategoriler', value: String(data.categories), color: LIGHT_PINK },
    ];
  }, [products]);

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
        <h1>Özet Paneli</h1>
        <p>
          Envanter durumunuza hızlı bir bakış atın.
          {products.length > 0 && ` Şu anda ${products.length} ürün listeleniyor.`}
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
        <h2 className="dashboard-section-title">Kategoriler</h2>
        <div className="category-filters">
          <button
            type="button"
            className={`category-filter-btn${!activeCategory ? ' active' : ''}`}
            style={{ '--cat-color': '#666', backgroundColor: !activeCategory ? '#444' : 'transparent', color: !activeCategory ? '#fff' : '#555', borderColor: '#666' }}
            onClick={() => setActiveCategory(null)}
          >
            Tümü
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
                {cat}
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
          <p>Bu kategoride ürün bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
