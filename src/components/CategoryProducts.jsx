import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase';
import './CategoryProducts.css';

export default function CategoryProducts() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategoryDetails();
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryDetails = async () => {
    try {
      setLoadingCategory(true);
      const { data, error } = await supabase
        .from('Categories')
        .select('id, nombre_categoria, descripcion_categoria, imagen_categoria_url')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCategory(data);
    } catch (error) {
      console.error('Error cargando categoría:', error);
      setError('Error al cargar la categoría');
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchCategoryProducts = async () => {
    try {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from('productos')
        .select('id, nombre_producto, descripcion_producto, precio_producto, imagen_producto_url, marca_producto, categoria_producto')
        .eq('categoria_producto', id);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError('Error al cargar los productos');
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <div className="category-products-container">
      {loadingCategory ? (
        <div className="loading-state">
          <div className="loading-text">Cargando...</div>
        </div>
      ) : (
        category && (
          <div className="category-header">
            <div className="category-header-image">
              {category.imagen_categoria_url && (
                <img src={category.imagen_categoria_url} alt={category.nombre_categoria} />
              )}
            </div>
            <div className="category-header-content">
              <h1>{category.nombre_categoria}</h1>
              {category.descripcion_categoria && (
                <p className="category-description">{category.descripcion_categoria}</p>
              )}
            </div>
          </div>
        )
      )}

      <div className="category-products-section">
        <h2>Productos de esta categoría</h2>
        {loadingProducts ? (
          <div className="loading-state">
            <div className="loading-text">Cargando...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">No hay productos en esta categoría</div>
        ) : (
          <div className="brand-products-wrapper">
            <div className="brand-products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  {product.imagen_producto_url && (
                    <div className="product-image-container">
                      <img src={product.imagen_producto_url} alt={product.nombre_producto} className="product-image" />
                    </div>
                  )}
                  <div className="product-content">
                    <h3 className="product-name">{product.nombre_producto}</h3>
                    {product.descripcion_producto && (
                      <p className="product-description">{product.descripcion_producto}</p>
                    )}
                    <span className="product-price">${product.precio_producto.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
