import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { sortProducts, withCategoryColors } from '../utils/productHelpers';
import { useTranslation } from '../utils/i18n';
import './InventoryList.css';

export default function InventoryList() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('name-asc');
  const [searchTerm, setSearchTerm] = useState('');

  const sortOptions = useMemo(() => [
    { value: 'name-asc', label: t('lang') === 'ar' ? 'الاسم (أ-ي)' : t('lang') === 'es' ? 'Nombre (A-Z)' : t('lang') === 'en' ? 'Name (A-Z)' : 'İsim (A-Z)' },
    { value: 'name-desc', label: t('lang') === 'ar' ? 'الاسم (ي-أ)' : t('lang') === 'es' ? 'Nombre (Z-A)' : t('lang') === 'en' ? 'Name (Z-A)' : 'İsim (Z-A)' },
    { value: 'stock-desc', label: t('lang') === 'ar' ? 'المخزون (الأعلى)' : t('lang') === 'es' ? 'Stock (Alto)' : t('lang') === 'en' ? 'Stock (High)' : 'Stok (Yüksek)' },
    { value: 'stock-asc', label: t('lang') === 'ar' ? 'المخزون (الأقل)' : t('lang') === 'es' ? 'Stock (Bajo)' : t('lang') === 'en' ? 'Stock (Low)' : 'Stok (Düşük)' },
    { value: 'category-asc', label: t('lang') === 'ar' ? 'الفئة (أ-ي)' : t('lang') === 'es' ? 'Categoría (A-Z)' : t('lang') === 'en' ? 'Category (A-Z)' : 'Kategori (A-Z)' },
  ], [t]);

  const filteredAndSortedProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = products.filter((product) => {
      const transName = t('products.' + product.name, product.name).toLowerCase();
      const transCat = t('categories.' + product.category, product.category).toLowerCase();
      return (
        transName.includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        transCat.includes(term)
      );
    });
    return withCategoryColors(sortProducts(filtered, sortBy));
  }, [products, sortBy, searchTerm, t]);

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <div>
          <h1>{t('inventory.title')}</h1>
          <p>{t('inventory.subtitle')}</p>
        </div>

        <div className="inventory-header-actions">
          <div className="inventory-search-wrap">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              id="product-search"
              placeholder={t('inventory.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="inventory-sort">
            <label htmlFor="product-sort">{t('inventory.sortLabel')}</label>
            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="inventory-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onImageClick={() => navigate(`/urunler/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="inventory-empty-search">
          <p>{t('inventory.emptySearch')}</p>
        </div>
      )}
    </div>
  );
}
