export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Grupo <span>S&J</span></h1>
        <p className="hero-slogan">El puente directo entre el fabricante y su industria</p>
        <p className="hero-subtitle">
          Soluciones integrales en repuestos de alta calidad para maquinaria pesada, minería, construcción y manufactura. 
          Excelencia, confianza y servicio profesional en cada entrega.
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn-primary-cta"> Ver Productos</a>
          <a href="#about" className="btn-secondary-cta">Conocer Más</a>
        </div>
      </div>
    </section>
  );
}
