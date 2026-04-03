import { useState, useEffect } from "react";
import supabase from "../../supabase";

export default function Productos (){
    
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [formData, setFormData] = useState({
      nombre_producto: '',
      descripcion_producto: '',
      precio_producto: '',
      imagen_producto_url: '',
      marca_producto: '',
      categoria_producto: ''
    });
    const [imagePreview, setImagePreview] = useState(null);

    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*');

        if (error) {
          throw error;
        }

        setProductos(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching productos:', error);
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('Categories')
          .select('id, nombre_categoria');

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const { data, error } = await supabase
          .from('Marcas')
          .select('id, nombre_marca');

        if (error) throw error;
        setBrands(data || []);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    useEffect(() => {
      fetchProductos();
      fetchCategories();
      fetchBrands();
    }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const getBrandName = (brandId) => {
    const brand = brands.find(b => b.id === brandId);
    return brand ? brand.nombre_marca : 'N/A';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.nombre_categoria : 'N/A';
  };

  const handleDelete = async (productoId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) {
      return;
    }
    setDeletingId(productoId);
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', productoId);

        if (error) {
          throw error;
        }

        await fetchProductos();
    } catch (error) {
      console.error('Error deleting producto:', error);
      alert('Error al eliminar el producto');
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      nombre_producto: '',
      descripcion_producto: '',
      precio_producto: '',
      imagen_producto_url: '',
      marca_producto: '',
      categoria_producto: ''
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nombre_producto: '',
      descripcion_producto: '',
      precio_producto: '',
      imagen_producto_url: '',
      marca_producto: '',
      categoria_producto: ''
    });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagen_producto_url: reader.result
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre_producto || !formData.descripcion_producto || !formData.categoria_producto || !formData.marca_producto || !formData.precio_producto) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!formData.imagen_producto_url) {
      alert('Por favor selecciona una imagen para el producto');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('productos')
        .insert([
          {
            nombre_producto: formData.nombre_producto,
            descripcion_producto: formData.descripcion_producto,
            precio_producto: parseFloat(formData.precio_producto),
            imagen_producto_url: formData.imagen_producto_url,
            marca_producto: parseInt(formData.marca_producto),
            categoria_producto: parseInt(formData.categoria_producto)
          }
        ]);

      if (error) {
        throw error;
      }

      alert('Producto agregado exitosamente');
      await fetchProductos();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding producto:', error);
      alert('Error al agregar el producto: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

    return(
        <div className="admin-card">
            <div className="admin-card__header">
              <h2>Productos Registrados</h2>
              <button className="admin-btn add" onClick={handleOpenModal}>Agregar Producto</button>
            </div>
          {productos.length <= 0 ? (
            <p className='product-table_empty'>No hay productos registrados.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre_producto}</td>
                    <td>{producto.descripcion_producto}</td>
                    <td>L.{producto.precio_producto.toFixed(2)}</td>
                    <td>
                      {producto.imagen_producto_url ? (
                                            <img
                                                src={producto.imagen_producto_url}
                                                alt={producto.nombre_producto}
                                                className="product-table__thumb"
                                                loading="lazy"
                                                onError={(event) => {
                                                    event.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            'Sin imagen'
                                        )}
                    </td>
                    <td>{getBrandName(producto.marca_producto)}</td>
                    <td>{getCategoryName(producto.categoria_producto)}</td>
                    <td>
                      <button className="admin-btn delete" onClick={() => handleDelete(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {showModal && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Agregar Nuevo Producto</h3>
                  <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                </div>
                <form onSubmit={handleSubmitForm} className="modal-form">
                  <div className="form-group">
                    <label htmlFor="nombre_producto">Nombre del Producto *</label>
                    <input
                      type="text"
                      id="nombre_producto"
                      name="nombre_producto"
                      value={formData.nombre_producto}
                      onChange={handleInputChange}
                      placeholder="Ingrese el nombre del producto"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="descripcion_producto">Descripción *</label>
                    <textarea
                      id="descripcion_producto"
                      name="descripcion_producto"
                      value={formData.descripcion_producto}
                      onChange={handleInputChange}
                      placeholder="Ingrese la descripción del producto"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="precio_producto">Precio *</label>
                      <input
                        type="number"
                        id="precio_producto"
                        name="precio_producto"
                        value={formData.precio_producto}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="marca_producto">Marca *</label>
                      <select
                        id="marca_producto"
                        name="marca_producto"
                        value={formData.marca_producto}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccione una marca</option>
                        {brands.map(brand => (
                          <option key={brand.id} value={brand.id}>
                            {brand.nombre_marca}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="categoria_producto">Categoría *</label>
                      <select
                        id="categoria_producto"
                        name="categoria_producto"
                        value={formData.categoria_producto}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.nombre_categoria}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imagen_producto">Imagen del Producto *</label>
                      <input
                        type="file"
                        id="imagen_producto"
                        name="imagen_producto"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                      />
                      {imagePreview && (
                        <div className="image-preview">
                          <img src={imagePreview} alt="Vista previa" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
    )

}