export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Grupo <span>S&J</span></h3>
            <p>El puente directo entre el fabricante y su industria. Soluciones integrales en repuestos de alta calidad para maquinaria pesada.</p>
          </div>
          
          <div className="footer-links">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#about">Sobre Nosotros</a></li>
              <li><a href="#products">Productos</a></li>
              <li><a href="#sectors">Sectores</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Soporte</h4>
            <ul>
              <li><a href="#contact">Contacto</a></li>
              <li><a href="#brands">Marcas</a></li>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Términos</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>Teléfono: (504) XXXX-XXXX</p>
            <p>Email: info@gruposyj.com</p>
            <p>Dirección: San Pedro Sula, Honduras</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Grupo S&J. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}