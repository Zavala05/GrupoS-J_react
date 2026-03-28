export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title contact-title">Contáctanos</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h4>📞 Teléfono / WhatsApp</h4>
              <a href="tel:+50433276274" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 800 }}>+504 3327-62-74</a>
              <p>Disponible de lunes a viernes, 8:00 AM - 5:00 PM</p>
            </div>

            <div className="info-item">
              <h4>📧 Correo Electrónico</h4>
              <a href="mailto:sales@gruposyjhn.com" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 800 }}>sales@gruposyjhn.com</a>
              <p>Respuesta rápida a todas tus consultas</p>
            </div>

            <div className="info-item">
              <h4>📍 Ubicación</h4>
              <p>
                Anillo Periférico, Sector Salamanca<br />
                San Pedro Sula, Cortés, Honduras
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
