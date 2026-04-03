import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import supabase from '../supabase';

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [brands, setBrands] = useState([]);
  const [showBrandsDropdown, setShowBrandsDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase.from('Marcas').select('id, nombre_marca');
      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error cargando marcas:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const { data, error } = await supabase.from('Categories').select('id, nombre_categoria, imagen_categoria_url');
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
    setExpanded(false);
    setShowBrandsDropdown(false);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    setExpanded(false);
    setShowCategoriesModal(false);
  };

  const handleCategoriesClick = () => {
    if (!showCategoriesModal) {
      fetchCategories();
    }
    setShowCategoriesModal(!showCategoriesModal);
  };

  return (
    <header className="header">
      <Navbar expand="lg" className="navbar-custom" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/login" className="brand-logo">
            Grupo S&J
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-links">
              <Nav.Link  as={Link} to="/" href="#home" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
              <Nav.Link href="#about" onClick={() => setExpanded(false)}>Sobre Nosotros</Nav.Link>
              <button 
                className="categories-btn"
                onClick={() => {
                  handleCategoriesClick();
                  setExpanded(false);
                }}
              >
                Categorías
              </button>
              <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>Productos</Nav.Link>
              
              <div className="brands-dropdown-container" onMouseEnter={() => window.innerWidth > 991 && setShowBrandsDropdown(true)} onMouseLeave={() => window.innerWidth > 991 && setShowBrandsDropdown(false)}>
                <button 
                  className="brands-dropdown-btn"
                  onClick={() => setShowBrandsDropdown(!showBrandsDropdown)}
                >
                  Marcas {showBrandsDropdown ? '▲' : '▼'}
                </button>
                {showBrandsDropdown && (
                  <div className="brands-dropdown-menu">
                    {brands.length === 0 ? (
                      <div className="brands-dropdown-item" style={{ color: '#000000' }}>
                        Cargando marcas...
                      </div>
                    ) : (
                      brands.map(brand => (
                        <button 
                          key={brand.id}
                          className="brands-dropdown-item "
                          onClick={() => handleBrandClick(brand.id)}
                        >
                          {brand.nombre_marca}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <Nav.Link href="#contact" onClick={() => setExpanded(false)}>
                <button className="contact-btn">Contáctanos</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showCategoriesModal && (
        <div className="categories-modal-overlay" onClick={() => setShowCategoriesModal(false)}>
          <div className="categories-modal" onClick={(e) => e.stopPropagation()}>
            <div className="categories-modal-header">
              <h2>Categorías</h2>
              <button className="categories-modal-close" onClick={() => setShowCategoriesModal(false)}>
                ✕
              </button>
            </div>
            <div className="categories-modal-content">
              {loadingCategories ? (
                <div className="modal-loading">Cargando categorías...</div>
              ) : categories.length === 0 ? (
                <div className="modal-empty">No hay categorías disponibles</div>
              ) : (
                <div className="categories-grid">
                  {categories.map(category => (
                    <div 
                      key={category.id} 
                      className="category-modal-card"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.imagen_categoria_url && (
                        <img src={category.imagen_categoria_url} alt={category.nombre_categoria} />
                      )}
                      <p>{category.nombre_categoria}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
