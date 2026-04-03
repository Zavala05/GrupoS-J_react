import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Grupo S&J</h1>
        <p className="hero-slogan">El puente directo entre el fabricante y su industria</p>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.95)' }}>
          Soluciones integrales en repuestos de alta calidad para la industria
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn-primary-cta">Solicitar Cotización</a>
          <a href=""  onClick={() => navigate("/products")} className="btn-secondary-cta">Ver Productos</a>
        </div>
      </div>
    </section>
  );
}
