import { textColorForBg } from '../utils/productHelpers';
import '../pages/InventoryList.css';

export default function ProductCard({ product, onImageClick }) {
  const metaColor = textColorForBg(product.color) === '#111'
    ? 'rgba(0,0,0,0.72)'
    : 'rgba(255,255,255,0.92)';

  const imageContent = (
    <img src={product.image} alt={product.name} loading="lazy" />
  );

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {onImageClick ? (
          <button type="button" className="product-image-button" onClick={onImageClick}>
            {imageContent}
          </button>
        ) : (
          imageContent
        )}
      </div>
      <div
        className="product-info"
        style={{
          backgroundColor: product.color,
          color: textColorForBg(product.color),
        }}
      >
        <h3>{product.name}</h3>
        <div className="product-meta" style={{ color: metaColor }}>
          <span>{product.sku}</span>
          <span>Stok: {product.stock}</span>
          <span>{product.category}</span>
        </div>
      </div>
    </article>
  );
}

export function AddProductTile({ onClick }) {
  return (
    <button type="button" className="product-card add-product-tile" onClick={onClick}>
      <div className="add-product-tile-inner">
        <span className="add-product-plus">+</span>
        <span>Yeni Ürün</span>
      </div>
    </button>
  );
}
