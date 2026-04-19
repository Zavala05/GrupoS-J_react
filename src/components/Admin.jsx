import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import { useEffect, useState } from 'react';
import Marcas from './tables/marcas';
import Productos from './tables/productos';
import '../styles/admin.css'

export default function Admin() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nombre_categoria: '',
    descripcion_categoria: '',
    imagen_categoria_url: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');


  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('Categories')
        .select('*');

      if (error) {
        throw error;
      }

      setCategories(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error al cargar las categorias');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  

  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta categoria?');
    if (!confirmDelete) {
      return;
    }
    setDeletingId(categoryId);
    try {
      const { error } = await supabase
        .from('Categories')
        .delete()
        .eq('id', categoryId);

        if (error) {
          throw error;
        }

        await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error al eliminar la categoria');
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      nombre_categoria: '',
      descripcion_categoria: '',
      imagen_categoria_url: ''
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nombre_categoria: '',
      descripcion_categoria: '',
      imagen_categoria_url: ''
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
          imagen_categoria_url: reader.result
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre_categoria) {
      alert('Por favor completa el nombre de la categoría');
      return;
    }

    if (!formData.descripcion_categoria) {
      alert('Por favor completa la descripción de la categoría');
      return;
    }

    if (!formData.imagen_categoria_url) {
      alert('Por favor selecciona una imagen para la categoría');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('Categories')
        .insert([
          {
            nombre_categoria: formData.nombre_categoria,
            descripcion_categoria: formData.descripcion_categoria,
            imagen_categoria_url: formData.imagen_categoria_url
          }
        ]);

      if (error) {
        throw error;
      }

      alert('Categoría agregada exitosamente');
      await fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error al agregar la categoría: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Panel Administrador</h1>
          <p style={{ marginTop: '0.5rem', color: '#ccc' }}>
            Aquí puedes gestionar tus productos, marcas, categorías y la contraseña de acceso.
          </p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-btn" onClick={() => navigate('/admin/change-password')}>
            Cambiar Contraseña
          </button>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </div>
      <div className="admin-content">
        <p>Bienvenido al Panel Administrador, aquí podrás gestionar el contenido de tus productos, marcas y categorias.</p>
        <div className='Categories-container'>
          <div className='categories-header'>
            <h2>Categorias Registradas</h2>
            <button className="admin-btn add" onClick={handleOpenModal}>Agregar Categoría</button>
          </div>
          {categories.length <= 0 ? (
            <p className='product-table_empty'>No hay categorias registradas.</p>
          ) : (
            <table className="categories-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.nombre_categoria}</td>
                    <td>{category.descripcion_categoria}</td>
                    <td>
                                        {category.imagen_categoria_url ? (
                                            <img
                                                src={category.imagen_categoria_url}
                                                alt={category.nombre_categoria}
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
                    <td>
                      <button onClick={() => handleDelete(category.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Agregar Nueva Categoría</h3>
                <button className="modal-close" onClick={handleCloseModal}>&times;</button>
              </div>
              <form onSubmit={handleSubmitForm} className="modal-form">
                <div className="form-group">
                  <label htmlFor="nombre_categoria">Nombre de la Categoría *</label>
                  <input
                    type="text"
                    id="nombre_categoria"
                    name="nombre_categoria"
                    value={formData.nombre_categoria}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre de la categoría"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion_categoria">Descripción *</label>
                  <textarea
                    id="descripcion_categoria"
                    name="descripcion_categoria"
                    value={formData.descripcion_categoria}
                    onChange={handleInputChange}
                    placeholder="Ingrese la descripción de la categoría"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="imagen_categoria">Imagen de la Categoría *</label>
                  <input
                    type="file"
                    id="imagen_categoria"
                    name="imagen_categoria"
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

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Categoría'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <Marcas />
        <Productos />
      </div>
    </div>
  );
}
