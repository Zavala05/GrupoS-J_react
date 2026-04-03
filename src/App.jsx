import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Sectors from './components/Sectors';
import Products from './components/Products';
import Brands from './components/Brands';
import BrandProducts from './components/BrandProducts';
import AllProducts from './components/AllProducts';
import CategoryProducts from './components/CategoryProducts';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function HomePage() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      <About />
      <Values />
      <Sectors />
      <Products />
      <Brands />
      <Contact />
      <Footer />
    </div>
  );
}

function BrandPage() {
  return (
    <div className="app-container">
      <Header />
      <BrandProducts />
      <Footer />
    </div>
  );
}

function AllProductsPage() {
  return (
    <div className="app-container">
      <Header />
      <AllProducts />
      <Footer />
    </div>
  );
}

function CategoryPage() {
  return (
    <div className="app-container">
      <Header />
      <CategoryProducts />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/brand/:id" element={<BrandPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/products" element={<AllProductsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
    </Routes>
  );
}

