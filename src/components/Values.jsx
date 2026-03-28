import { Container } from 'react-bootstrap';

export default function Values() {
  const values = [
    {
      title: 'Autenticidad y Calidad',
      description: 'Piezas genuinas con respaldo técnico de origen. Garantizamos la autenticidad de cada repuesto.'
    },
    {
      title: 'Eficiencia Logística',
      description: 'Reducción de tiempos de entrega sin depender de intermediarios. Más rápido a tu equipo.'
    },
    {
      title: 'Costos Optimizados',
      description: 'Precios competitivos derivados de nuestra relación directa con fabricantes mundiales.'
    },
    {
      title: 'Precisión Operativa',
      description: 'Exactitud en especificaciones técnicas. En la industria, no hay margen para el error.'
    },
    {
      title: 'Responsabilidad Ética',
      description: 'Mantenemos los más altos estándares de ética comercial y respeto a normativas globales.'
    },
    {
      title: 'Orientación al Usuario Final',
      description: 'Cadena de suministro diseñada para el mecánico y el gerente de mantenimiento.'
    },
    {
      title: 'Resiliencia Industrial',
      description: 'Adaptabilidad ante emergencias en la cadena global. Tu flujo de repuestos nunca se corta.'
    },
    {
      title: 'Pasión por la Ingeniería',
      description: 'Nos apasionan las máquinas. Cuidado minucioso en cada pieza que distribuimos.'
    }
  ];

  return (
    <section className="values">
      <div className="container">
        <h2 className="section-title">Nuestros Valores Corporativos</h2>
        
        <div className="values-grid">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <span className="value-number">{String(index + 1).padStart(2, '0')}</span>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
