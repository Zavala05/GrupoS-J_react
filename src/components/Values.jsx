import { Container } from 'react-bootstrap';

export default function Values() {
  const values = [
    {
      title: 'Autenticidad y Calidad',
      description: 'Piezas genuinas con respaldo técnico de origen.'
    },
    {
      title: 'Eficiencia Logística',
      description: 'Reducción de tiempos de entrega al no depender de intermediarios.'
    },
    {
      title: 'Costos Optimizados',
      description: 'Precios competitivos derivados de nuestra relación directa con fabricantes.'
    },
    {
      title: 'Precisión Operativa',
      description: 'En el mundo industrial, no hay margen para el error. Nos enfocamos en la exactitud de especificaciones técnicas y números de parte.'
    },
    {
      title: 'Responsabilidad Ética',
      description: 'Mantenemos los más altos estándares de ética en nuestras negociaciones y relaciones comerciales.'
    },
    {
      title: 'Orientación al Usuario Final',
      description: 'Nuestra cadena de suministro está diseñada pensando en quien utiliza el repuesto.'
    },
    {
      title: 'Resiliencia Industrial',
      description: 'Capacidad de adaptarnos y responder ante situaciones de emergencia en la cadena de suministro global.'
    },
    {
      title: 'Pasión por la Ingeniería',
      description: 'Nos apasiona el funcionamiento de las máquinas y el éxito técnico de nuestros clientes.'
    }
  ];

  return (
    <section className="values">
      <Container>
        <h2 className="section-title">Nuestros Valores Corporativos</h2>
        
        <div className="values-grid">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
