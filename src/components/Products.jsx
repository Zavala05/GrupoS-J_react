import { Container } from 'react-bootstrap';
import supabase from '../supabase.js';
import { useEffect, useState } from 'react';

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('Categories')
        .select('id, nombre_categoria, descripcion_categoria, imagen_categoria_url');

      if (error) throw error;
      setCategories(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error al cargar las categorías');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="products-section" id="products">
      <div className="brand-products-wrapper">
        <h2 className="section-title">CATEGORIAS DE PRODUCTOS</h2>

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <span className="loading-text">Cargando categorías...</span>
          </div>
        )}

        {error && <div className="error-state">{error}</div>}

        {!loading && !error && (
          <>
            {categories.length > 0 ? (
              <div className="categories-container">
                {categories.map((category) => (
                  <div key={category.id} className="category-card">
                    <div className="category-image-container">
                      {category.imagen_categoria_url ? (
                        <img
                          src={category.imagen_categoria_url}
                          alt={category.nombre_categoria}
                          className="category-image"
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
                    <div className="category-info">
                      <h3 className="category-name">{category.nombre_categoria}</h3>
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-categories-state">
                No hay categorías disponibles
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
