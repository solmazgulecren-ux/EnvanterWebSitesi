import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORY_COLORS, MONSTER_COLORS, CATEGORIES } from '../theme/colors';
import { textColorForBg } from '../utils/productHelpers';
import { useTranslation } from '../utils/i18n';
import { registerNewTranslations } from '../utils/translationEngine';
import './ProductDetail.css';
import '../pages/AddProduct.css'; // modal CSS class'larını paylaşmak için

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProducts();
  const { t } = useTranslation();

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [products, id],
  );

  // Edit form state'leri
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [defectNotes, setDefectNotes] = useState('');
  const [category, setCategory] = useState('Bilgisayar');
  const [stock, setStock] = useState('');
  const [nameError, setNameError] = useState('');
  const [imageError, setImageError] = useState('');
  const [stockError, setStockError] = useState('');

  /* Kategori bazlı renk: ürünün kategorisine göre sabit renk atanır */
  const color = useMemo(() => {
    if (!product) return MONSTER_COLORS[0];
    return CATEGORY_COLORS[product.category] || MONSTER_COLORS[0];
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-missing">
          <h1>{t('productDetail.notFound')}</h1>
          <Link to="/urunler">{t('productDetail.back')}</Link>
        </div>
      </div>
    );
  }

  const textColor = textColorForBg(color);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(product.id);
    setShowDeleteConfirm(false);
    navigate('/urunler');
  };

  const handleOpenEdit = () => {
    setName(product.name);
    setImage(product.image);
    setDescription(product.description || '');
    setDefectNotes(product.defectNotes || '');
    setCategory(product.category);
    setStock(product.stock);
    setNameError('');
    setImageError('');
    setStockError('');
    setShowEditForm(true);
  };

  const handleImageFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      if (imageError) setImageError('');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError(t('addProductPage.errorName'));
      hasError = true;
    } else {
      setNameError('');
    }

    if (!image.trim()) {
      setImageError(t('addProductPage.errorImage'));
      hasError = true;
    } else {
      setImageError('');
    }

    const stockNum = Number(stock);
    if (stock === '' || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      setStockError(t('addProductPage.errorStock'));
      hasError = true;
    } else {
      setStockError('');
    }

    if (hasError) return;

    registerNewTranslations(name.trim());
    if (description.trim()) {
      registerNewTranslations(description.trim());
    }

    updateProduct(product.id, {
      name: name.trim(),
      image,
      description: description.trim(),
      defectNotes: defectNotes.trim(),
      category,
      stock: stockNum,
    });
    setShowEditForm(false);
  };

  return (
    <div className="product-detail-page">
      <Link to="/urunler" className="product-detail-back">{t('productDetail.back')}</Link>

      <div className="product-detail-layout">
        <aside className="product-detail-panel">
          <div className="product-detail-image-wrap">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info-card" style={{ backgroundColor: color, color: textColor }}>
            <h1>{t('products.' + product.name, product.name)}</h1>
            <p className="product-detail-sku">{product.sku} · {t('categories.' + product.category, product.category)}</p>
            <p className="product-detail-stock">{t('addProductPage.stock')}: {product.stock}</p>
          </div>

          <section className="product-detail-section">
            <h2>{t('productDetail.descTitle')}</h2>
            <p>{t('descriptions.' + product.description, product.description) || t('productDetail.noDesc')}</p>
          </section>

          <section className="product-detail-section">
            <h2>{t('productDetail.defectTitle')}</h2>
            <p className={product.defectNotes ? 'product-detail-defect' : 'product-detail-empty'}>
              {product.defectNotes || t('productDetail.noDefect')}
            </p>
          </section>
        </aside>

        <div className="product-detail-side">
          <div className="product-detail-side-card">
            <h3>{t('productDetail.reviewTitle')}</h3>
            <p>{t('productDetail.reviewDesc')}</p>
            <ul>
              <li><strong>SKU:</strong> {product.sku}</li>
              <li><strong>{t('addProductPage.category')}:</strong> {t('categories.' + product.category, product.category)}</li>
              <li><strong>{t('addProductPage.stock')}:</strong> {product.stock}</li>
            </ul>

            {/* Düzenle / Sil Butonları */}
            <div className="product-detail-actions">
              <button 
                type="button" 
                className="action-btn edit-btn" 
                onClick={handleOpenEdit}
              >
                📝 {t('productDetail.editBtn')}
              </button>
              <button 
                type="button" 
                className="action-btn delete-btn" 
                onClick={handleDelete}
              >
                🗑️ {t('productDetail.deleteBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Düzenleme Modalı */}
      {showEditForm && (
        <div className="add-product-modal-backdrop" onClick={() => setShowEditForm(false)}>
          <div className="add-product-modal" onClick={(event) => event.stopPropagation()}>
            <h2>{t('addProductPage.editTitle')}</h2>
            <p className="add-product-modal-subtitle">{t('addProductPage.editSubtitle')}</p>

            <form onSubmit={handleUpdateSubmit} noValidate>
              <div className="add-form-group">
                <div className="add-form-label-row">
                  <label>{t('addProductPage.productName')}</label>
                  {nameError && <span className="add-form-error">{nameError}</span>}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder={t('placeholders.productName')}
                />
              </div>

              {/* Kategori Seçimi */}
              <div className="add-form-group">
                <label>{t('addProductPage.category')}</label>
                <div className="add-form-category-select">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`category-select-btn${category === cat ? ' active' : ''}`}
                      style={{
                        '--cat-color': CATEGORY_COLORS[cat],
                        backgroundColor: category === cat ? CATEGORY_COLORS[cat] : 'transparent',
                        color: category === cat ? textColorForBg(CATEGORY_COLORS[cat]) : '#555',
                        borderColor: CATEGORY_COLORS[cat],
                      }}
                      onClick={() => setCategory(cat)}
                    >
                      {t('categories.' + cat, cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stok Miktarı */}
              <div className="add-form-group">
                <div className="add-form-label-row">
                  <label>{t('addProductPage.stock')}</label>
                  {stockError && <span className="add-form-error">{stockError}</span>}
                </div>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(event) => {
                    setStock(event.target.value);
                    if (stockError) setStockError('');
                  }}
                  placeholder={t('placeholders.stock')}
                />
              </div>

              {/* Ürün Görseli */}
              <div className="add-form-group">
                <div className="add-form-label-row">
                  <label>{t('addProductPage.image')}</label>
                  {imageError && <span className="add-form-error">{imageError}</span>}
                </div>
                <input type="file" accept="image/*" onChange={handleImageFile} />
                <input
                  type="url"
                  value={image.startsWith('data:') ? '' : image}
                  onChange={(event) => {
                    setImage(event.target.value);
                    if (imageError) setImageError('');
                  }}
                  placeholder={t('placeholders.imageUrl')}
                />
                {image && (
                  <div className="add-form-preview">
                    <img src={image} alt="Önizleme" />
                  </div>
                )}
              </div>

              {/* Açıklama */}
              <div className="add-form-group">
                <label>{t('addProductPage.description')}</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder={t('placeholders.description')}
                  rows={3}
                />
              </div>

              {/* Hata / Durum Notu */}
              <div className="add-form-group">
                <label>{t('addProductPage.defectNotes')}</label>
                <textarea
                  value={defectNotes}
                  onChange={(event) => setDefectNotes(event.target.value)}
                  placeholder={t('placeholders.defectNotes')}
                  rows={2}
                />
              </div>

              <div className="add-form-actions">
                <button type="button" className="add-form-cancel" onClick={() => setShowEditForm(false)}>
                  {t('addProductPage.cancel')}
                </button>
                <button type="submit" className="add-form-submit">
                  {t('addProductPage.saveChanges')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="add-product-modal-backdrop" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-modal" onClick={(event) => event.stopPropagation()}>
            <div className="delete-confirm-modal-header">
              <h2>⚠️ {t('productDetail.deleteConfirmTitle')}</h2>
            </div>
            <p>{t('productDetail.deleteConfirmDesc')}</p>
            <div className="delete-confirm-actions">
              <button 
                type="button" 
                className="delete-confirm-btn delete-confirm-cancel" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                {t('productDetail.cancel')}
              </button>
              <button 
                type="button" 
                className="delete-confirm-btn delete-confirm-submit" 
                onClick={handleConfirmDelete}
              >
                {t('productDetail.deleteBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
