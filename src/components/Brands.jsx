import { Container } from 'react-bootstrap';

export default function Brands() {
  const brands = [
    'Alwitco', 'Atlas Copco', 'AtlasDrill', 'Bomag', 'Caterpillar', 'CTP',
    'Cummins', 'Donaldson', 'Dossan / Develon', 'Enerpac', 'Epiroc',
    'Freightliner', 'Grove', 'Hilti', 'Holset', 'Hyundai', 'Ingersoll Rand',
    'JCB', 'John Deere', 'Komatsu', 'Kubota', 'Liebherr', 'Mack', 'Milwaukee',
    'Reed', 'Renault', 'Rexroth', 'Rosemount', 'Sandvik', 'Scania',
    'Schneider Electric', 'Siemens', 'Sullair', 'Terex', 'Universal', 'Urrea',
    'Wam', 'Wirten'
  ];

  return (
    <section className="brands" id="brands">
      <div className="container">
        <h2 className="section-title">Nuestras Marcas</h2>
        
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div className="brand-item" key={index}>
              <p>{brand}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
