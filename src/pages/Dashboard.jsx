import './Dashboard.css';
import { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { getDashboardStats } from '../utils/products';
import { MAGENTA, TEAL, BLUE, LIGHT_PINK } from '../theme/colors';

export default function Dashboard() {
  const { products } = useProducts();

  const stats = useMemo(() => {
    const data = getDashboardStats(products);
    return [
      { label: 'Toplam Ürün', value: String(data.total), color: MAGENTA },
      { label: 'Stokta', value: String(data.inStock), color: TEAL },
      { label: 'Kritik Stok', value: String(data.criticalStock), color: BLUE },
      { label: 'Kategoriler', value: String(data.categories), color: LIGHT_PINK },
    ];
  }, [products]);

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
    </div>
  );
}
