import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { sortProducts, withMonsterColors } from '../utils/productHelpers';
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

  const sortedProducts = useMemo(
    () => withMonsterColors(sortProducts(products, sortBy)),
    [products, sortBy],
  );

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <div>
          <h1>Envanter Listesi</h1>
          <p>Ürünleri görüntüleyin ve sıralayın. Detay için görsele tıklayın.</p>
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
      </header>

      <div className="inventory-grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onImageClick={() => navigate(`/urunler/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
