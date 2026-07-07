import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/InventoryList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import RegisterScreen from './pages/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/kayit" element={<RegisterScreen />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/urunler" element={<InventoryList />} />
          <Route path="/urunler/:id" element={<ProductDetail />} />
          <Route path="/urun-ekle" element={<AddProduct />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
