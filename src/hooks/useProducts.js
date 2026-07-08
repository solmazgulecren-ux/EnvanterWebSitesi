import { useCallback, useEffect, useState } from 'react';
import {
  addProduct as addProductToStore,
  getProducts,
  PRODUCTS_UPDATED_EVENT,
  updateProduct as updateProductInStore,
  deleteProduct as deleteProductFromStore,
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

  const updateProduct = useCallback((id, productData) => {
    const updated = updateProductInStore(id, productData);
    refreshProducts();
    return updated;
  }, [refreshProducts]);

  const deleteProduct = useCallback((id) => {
    const deleted = deleteProductFromStore(id);
    refreshProducts();
    return deleted;
  }, [refreshProducts]);

  return { products, addProduct, updateProduct, deleteProduct, refreshProducts };
}
