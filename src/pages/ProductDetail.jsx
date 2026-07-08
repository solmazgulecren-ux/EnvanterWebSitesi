import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORY_COLORS, MONSTER_COLORS } from '../theme/colors';
import { textColorForBg } from '../utils/productHelpers';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [products, id],
  );

  /* Kategori bazlı renk: ürünün kategorisine göre sabit renk atanır */
  const color = useMemo(() => {
    if (!product) return MONSTER_COLORS[0];
    return CATEGORY_COLORS[product.category] || MONSTER_COLORS[0];
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-missing">
          <h1>Ürün bulunamadı</h1>
          <Link to="/urunler">Envanter listesine dön</Link>
        </div>
      </div>
    );
  }

  const textColor = textColorForBg(color);

  return (
    <div className="product-detail-page">
      <Link to="/urunler" className="product-detail-back">← Envanter listesine dön</Link>

      <div className="product-detail-layout">
        <aside className="product-detail-panel">
          <div className="product-detail-image-wrap">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info-card" style={{ backgroundColor: color, color: textColor }}>
            <h1>{product.name}</h1>
            <p className="product-detail-sku">{product.sku} · {product.category}</p>
            <p className="product-detail-stock">Stok: {product.stock}</p>
          </div>

          <section className="product-detail-section">
            <h2>Açıklama</h2>
            <p>{product.description || 'Açıklama eklenmemiş.'}</p>
          </section>

          <section className="product-detail-section">
            <h2>Hata / Durum Notu</h2>
            <p className={product.defectNotes ? 'product-detail-defect' : 'product-detail-empty'}>
              {product.defectNotes || 'Herhangi bir hata veya durum notu girilmemiş.'}
            </p>
          </section>
        </aside>

        <div className="product-detail-side">
          <div className="product-detail-side-card">
            <h3>Ürün İnceleme</h3>
            <p>Bu ekranda seçilen ürünün görseli ve tüm detayları görüntülenir.</p>
            <ul>
              <li><strong>SKU:</strong> {product.sku}</li>
              <li><strong>Kategori:</strong> {product.category}</li>
              <li><strong>Stok:</strong> {product.stock}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
