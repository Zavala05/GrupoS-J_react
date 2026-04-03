import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import supabase from '../supabase';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener todos los productos
      const { data: productsData, error: productsError } = await supabase
        .from('productos')
        .select('*');

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="brand-products-container">
      <div className="brand-products-wrapper">
        <div className="brand-products-header">
          <h1 className="brand-products-title">Todos Nuestros Productos</h1>
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
                No hay productos disponibles.
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
                            e.target.src = 'https://via.placeholder.com/300x300?text=Sin+imagen';
                          }}
                        />
                      ) : (
                        <div className="product-image-placeholder">Sin imagen</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.nombre_producto}</h3>
                      <p className="product-description">{product.descripcion_producto}</p>
                      <p className="product-price">${product.precio_producto}</p>
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
