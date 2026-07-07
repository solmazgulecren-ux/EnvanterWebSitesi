import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddProductTile } from '../components/ProductCard';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { sortProducts, withMonsterColors } from '../utils/productHelpers';
import './AddProduct.css';
import '../pages/InventoryList.css';

export default function AddProduct() {
  const navigate = useNavigate();
  const { products, addProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [defectNotes, setDefectNotes] = useState('');
  const [nameError, setNameError] = useState('');
  const [imageError, setImageError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sortedProducts = useMemo(
    () => withMonsterColors(sortProducts(products, 'name-asc')),
    [products],
  );

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

  const resetForm = () => {
    setName('');
    setImage('');
    setDescription('');
    setDefectNotes('');
    setNameError('');
    setImageError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError('Ürün adı boş bırakılamaz');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!image.trim()) {
      setImageError('Ürün görseli eklenmelidir');
      hasError = true;
    } else {
      setImageError('');
    }

    if (hasError) return;

    addProduct({ name, image, description, defectNotes });
    setSuccessMessage('Ürün başarıyla eklendi');
    resetForm();
    setShowForm(false);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  return (
    <div className="add-product-page">
      <header className="inventory-header">
        <div>
          <h1>Ürün Ekle</h1>
          <p>Yeni ürün eklemek için + kutusuna tıklayın.</p>
        </div>
      </header>

      {successMessage && (
        <div className="add-product-success" role="status">
          {successMessage}
        </div>
      )}

      <div className="inventory-grid">
        <AddProductTile onClick={() => setShowForm(true)} />
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onImageClick={() => navigate(`/urunler/${product.id}`)}
          />
        ))}
      </div>

      {showForm && (
        <div className="add-product-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="add-product-modal" onClick={(event) => event.stopPropagation()}>
            <h2>Yeni Ürün Bilgileri</h2>
            <p className="add-product-modal-subtitle">Görsel, isim, açıklama ve varsa hata bilgisi girin.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="add-form-group">
                <div className="add-form-label-row">
                  <label>Ürün Adı</label>
                  {nameError && <span className="add-form-error">{nameError}</span>}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="Örn: Dizüstü Bilgisayar"
                />
              </div>

              <div className="add-form-group">
                <div className="add-form-label-row">
                  <label>Ürün Görseli</label>
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
                  placeholder="veya görsel URL'si yapıştırın"
                />
                {image && (
                  <div className="add-form-preview">
                    <img src={image} alt="Önizleme" />
                  </div>
                )}
              </div>

              <div className="add-form-group">
                <label>Açıklama</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ürün hakkında kısa açıklama"
                  rows={3}
                />
              </div>

              <div className="add-form-group">
                <label>Hata / Durum Notu</label>
                <textarea
                  value={defectNotes}
                  onChange={(event) => setDefectNotes(event.target.value)}
                  placeholder="Örn: Ekran kırık, pil şişmiş"
                  rows={2}
                />
              </div>

              <div className="add-form-actions">
                <button type="button" className="add-form-cancel" onClick={() => setShowForm(false)}>
                  İptal
                </button>
                <button type="submit" className="add-form-submit">
                  Ürünü Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
