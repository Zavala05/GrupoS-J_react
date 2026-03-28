import { Container } from 'react-bootstrap';

export default function Sectors() {
  const sectors = [
    {
      title: 'Minería',
      description: 'Soluciones para equipos de alta resistencia y operación 24/7.'
    },
    {
      title: 'Construcción',
      description: 'Repuestos para excavadoras, retroexcavadoras y pavimentación.'
    },
    {
      title: 'Manufactura',
      description: 'Componentes para líneas de producción y maquinaria industrial.'
    },
    {
      title: 'Equipo Pesado',
      description: 'Distribución integral para flotas de transporte y carga.'
    }
  ];

  return (
    <section className="sectors" id="sectors">
      <div className="container">
        <h2 className="section-title" >Sectores que Atendemos</h2>
        
        <div className="sectors-grid">
          {sectors.map((sector, index) => (
            <div className="sector-card" key={index}>
              <h3>{sector.title}</h3>
              <p>{sector.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
