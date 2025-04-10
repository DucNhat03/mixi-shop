import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer'; // ⬅️ Thêm dòng này

const App = () => {
  return (
    <Router>
      <div className="p-4 max-w-screen-xl mx-auto min-h-screen flex flex-col">
        <Header />
        <Navbar />
        
        <div className="flex-grow"> 
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
