import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { sortProducts, withCategoryColors } from '../utils/productHelpers';
import './InventoryList.css';

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'İsim (A-Z)' },
  { value: 'name-desc', label: 'İsim (Z-A)' },
  { value: 'stock-desc', label: 'Stok (Yüksek)' },
  { value: 'stock-asc', label: 'Stok (Düşük)' },
  { value: 'category-asc', label: 'Kategori (A-Z)' },
];

export default function InventoryList() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('name-asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    return withCategoryColors(sortProducts(filtered, sortBy));
  }, [products, sortBy, searchTerm]);

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <div>
          <h1>Envanter Listesi</h1>
          <p>Ürünleri görüntüleyin ve sıralayın. Detay için görsele tıklayın.</p>
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
              placeholder="Ürün adı, kategori veya SKU ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="inventory-sort">
            <label htmlFor="product-sort">Sırala</label>
            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
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
          <p>Aramanızla eşleşen ürün bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
