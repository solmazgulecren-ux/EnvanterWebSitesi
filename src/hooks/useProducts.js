import { useCallback, useEffect, useState } from 'react';
import {
  addProduct as addProductToStore,
  getProducts,
  PRODUCTS_UPDATED_EVENT,
} from '../utils/products';

export function useProducts() {
  const [products, setProducts] = useState(() => getProducts());

  const refreshProducts = useCallback(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    window.addEventListener(PRODUCTS_UPDATED_EVENT, refreshProducts);
    window.addEventListener('storage', refreshProducts);
    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, refreshProducts);
      window.removeEventListener('storage', refreshProducts);
    };
  }, [refreshProducts]);

  const addProduct = useCallback((productData) => {
    const created = addProductToStore(productData);
    refreshProducts();
    return created;
  }, [refreshProducts]);

  return { products, addProduct, refreshProducts };
}
