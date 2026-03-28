import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="header">
      <Navbar expand="lg" className="navbar-custom" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand href="#home" className="brand-logo">
            Grupo <span>S&J</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-links">
              <Nav.Link href="#home" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
              <Nav.Link href="#about" onClick={() => setExpanded(false)}>Sobre Nosotros</Nav.Link>
              <Nav.Link href="#sectors" onClick={() => setExpanded(false)}>Sectores</Nav.Link>
              <Nav.Link href="#products" onClick={() => setExpanded(false)}>Productos</Nav.Link>
              <Nav.Link href="#brands" onClick={() => setExpanded(false)}>Marcas</Nav.Link>
              <Nav.Link href="#contact" onClick={() => setExpanded(false)}>
                <button className="contact-btn">Contáctanos</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
