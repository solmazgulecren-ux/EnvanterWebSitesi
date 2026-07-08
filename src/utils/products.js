const PRODUCTS_KEY = 'envanter_products';
const SCHEMA_VERSION_KEY = 'envanter_schema_version';
const CURRENT_SCHEMA_VERSION = 3;
export const PRODUCTS_UPDATED_EVENT = 'envanter-products-updated';

export const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Dizüstü Bilgisayar', sku: 'LT-001', stock: 12, category: 'Bilgisayar', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', description: 'Ofis kullanımı için dizüstü bilgisayar.', defectNotes: '' },
  { id: 2, name: 'Kablosuz Mouse', sku: 'MS-014', stock: 45, category: 'Mouse', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', description: 'Ergonomik kablosuz mouse.', defectNotes: '' },
  { id: 3, name: 'Mekanik Klavye', sku: 'KB-208', stock: 8, category: 'Klavye', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', description: 'Mekanik switch klavye.', defectNotes: '' },
  { id: 4, name: '27" Monitör', sku: 'MN-077', stock: 15, category: 'Bilgisayar', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop', description: '27 inç geniş ekran monitör.', defectNotes: '' },
  { id: 5, name: 'USB-C Hub', sku: 'HB-033', stock: 3, category: 'Diğer', image: 'https://images.unsplash.com/photo-1625948515291-69613efd202f?w=400&h=400&fit=crop', description: 'Çoklu port USB-C hub.', defectNotes: '' },
  { id: 6, name: 'Yazıcı', sku: 'PR-019', stock: 2, category: 'Diğer', image: 'https://images.unsplash.com/photo-1612815154850-56aa6672c3b4?w=400&h=400&fit=crop', description: 'Lazer yazıcı.', defectNotes: '' },
  { id: 7, name: 'Webcam HD', sku: 'WC-042', stock: 4, category: 'Diğer', image: 'https://images.unsplash.com/photo-1587826080696-f246b12cf842?w=400&h=400&fit=crop', description: 'HD görüntülü toplantı kamerası.', defectNotes: '' },
  { id: 8, name: 'Kulaklık', sku: 'HP-056', stock: 28, category: 'Kulaklık', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', description: 'Gürültü önleyici kulaklık.', defectNotes: '' },
];

function notifyProductsUpdated() {
  window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
}

export function getProducts() {
  try {
    /* Şema versiyonu değiştiyse localStorage'ı resetle */
    const storedVersion = Number(localStorage.getItem(SCHEMA_VERSION_KEY) || 0);
    if (storedVersion < CURRENT_SCHEMA_VERSION) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(SCHEMA_VERSION_KEY, String(CURRENT_SCHEMA_VERSION));
      return [...DEFAULT_PRODUCTS];
    }

    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return [...DEFAULT_PRODUCTS];
    }
    return JSON.parse(stored);
  } catch {
    return [...DEFAULT_PRODUCTS];
  }
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  localStorage.setItem(SCHEMA_VERSION_KEY, String(CURRENT_SCHEMA_VERSION));
  notifyProductsUpdated();
}

export function getProductById(id) {
  return getProducts().find((product) => product.id === Number(id));
}

export function addProduct({ name, image, description, defectNotes, category, stock }) {
  const products = getProducts();
  const nextId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
  const sku = `PR-${String(nextId).padStart(3, '0')}`;

  const newProduct = {
    id: nextId,
    name: name.trim(),
    sku,
    stock: Number(stock) || 1,
    category: category || 'Bilgisayar',
    image,
    description: description.trim(),
    defectNotes: defectNotes.trim(),
  };

  saveProducts([...products, newProduct]);
  return newProduct;
}

export function getDashboardStats(products = getProducts()) {
  const categories = new Set(products.map((product) => product.category));
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const criticalStock = products.filter((product) => product.stock < 5).length;

  return {
    total: products.length,
    totalStock,
    criticalStock,
    categories: categories.size,
  };
}

export function updateProduct(id, updatedData) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === Number(id));
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updatedData,
      id: Number(id),
    };
    saveProducts(products);
    return products[index];
  }
  return null;
}

export function deleteProduct(id) {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== Number(id));
  saveProducts(filtered);
  return filtered;
}
