import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Sectors from './components/Sectors';
import Products from './components/Products';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
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

