import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import supabase from '../supabase';

export default function BrandProducts() {
  const { id } = useParams();
  const [brandName, setBrandName] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrandAndProducts();
  }, [id]);

  const fetchBrandAndProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener el nombre de la marca
      const { data: brandData, error: brandError } = await supabase
        .from('Marcas')
        .select('nombre_marca')
        .eq('id', id)
        .single();

      if (brandError) throw brandError;
      setBrandName(brandData?.nombre_marca || '');

      // Obtener productos de esa marca
      const { data: productsData, error: productsError } = await supabase
        .from('productos')
        .select('*')
        .eq('marca_producto', id);

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="brand-products-container">
      <div className="brand-products-wrapper">
        <div className="brand-products-header">
          <h1 className="brand-products-title">Productos de {brandName}</h1>
        </div>

        {loading && (
          <div className="loading-state">
            <span className="loading-text">Cargando productos...</span>
          </div>
        )}

        {error && <div className="error-state">{error}</div>}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="no-categories-state">
                No hay productos disponibles para esta marca.
              </div>
            ) : (
              <div className="brand-products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      {product.imagen_producto_url ? (
                        <img
                          src={product.imagen_producto_url}
                          alt={product.nombre_producto}
                          className="product-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div style={{ color: '#999', fontWeight: '600' }}>
                          Sin Imagen
                        </div>
                      )}
                    </div>
                    <div className="product-content">
                      <h3 className="product-name">{product.nombre_producto}</h3>
                      <p className="product-description">
                        {product.descripcion_producto}
                      </p>
                      <div className="product-price">
                        ${product.precio_producto?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
