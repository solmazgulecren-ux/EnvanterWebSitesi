import { textColorForBg } from '../utils/productHelpers';
import { useTranslation } from '../utils/i18n';
import '../pages/InventoryList.css';

export default function ProductCard({ product, onImageClick }) {
  const { t } = useTranslation();
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
        <h3>{t('products.' + product.name, product.name)}</h3>
        <div className="product-meta" style={{ color: metaColor }}>
          <span>{product.sku}</span>
          <span>{t('addProductPage.stock')}: {product.stock}</span>
          <span>{t('categories.' + product.category, product.category)}</span>
        </div>
      </div>
    </article>
  );
}

export function AddProductTile({ onClick }) {
  const { t } = useTranslation();
  return (
    <button type="button" className="product-card add-product-tile" onClick={onClick}>
      <div className="add-product-tile-inner">
        <span className="add-product-plus">+</span>
        <span>{t('addProductPage.newProduct')}</span>
      </div>
    </button>
  );
}
