import { useState, useEffect } from "react";
import supabase from "../../supabase";

export default function Marcas() {
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
      nombre_marca: ''
    });

    const fetchMarcas = async () => {
      try {
        const { data, error } = await supabase
          .from('Marcas')
          .select('*');

        if (error) {
          throw error;
        }

        setMarcas(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching marcas:', error);
        setError('Error al cargar las marcas');
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchMarcas();
    }, []);

    if (loading) {
      return <p>Cargando marcas...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    const handleDelete = async (marcaId) => {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta marca?');
      if (!confirmDelete) {
        return;
      }
      setDeletingId(marcaId);
      try {
        const { error } = await supabase
          .from('Marcas')
          .delete()
          .eq('id', marcaId);

        if (error) {
          throw error;
        }

        await fetchMarcas();
      } catch (error) {
        console.error('Error deleting marca:', error);
        alert('Error al eliminar la marca');
      } finally {
        setDeletingId(null);
      }
    };

    const handleOpenModal = () => {
      setFormData({
        nombre_marca: ''
      });
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setFormData({
        nombre_marca: ''
      });
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmitForm = async (e) => {
      e.preventDefault();
      
      if (!formData.nombre_marca) {
        alert('Por favor completa el nombre de la marca');
        return;
      }

      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('Marcas')
          .insert([
            {
              nombre_marca: formData.nombre_marca
            }
          ]);

        if (error) {
          throw error;
        }

        alert('Marca agregada exitosamente');
        await fetchMarcas();
        handleCloseModal();
      } catch (error) {
        console.error('Error adding marca:', error);
        alert('Error al agregar la marca: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    };

    return(
        <div className="admin-card">
            <div className="admin-card__header">
              <h2>Marcas Registradas</h2>
              <button className="admin-btn add" onClick={handleOpenModal}>Agregar Marca</button>
            </div>
          {marcas.length <= 0 ? (
            <p className='product-table_empty'>No hay marcas registradas.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {marcas.map((marca) => (
                  <tr key={marca.id}>
                    <td>{marca.nombre_marca}</td>
                    
                    <td>
                      <button className="admin-btn delete" onClick={() => handleDelete(marca.id)}>Eliminar</button>
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
                  <h3>Agregar Nueva Marca</h3>
                  <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                </div>
                <form onSubmit={handleSubmitForm} className="modal-form">
                  <div className="form-group">
                    <label htmlFor="nombre_marca">Nombre de la Marca *</label>
                    <input
                      type="text"
                      id="nombre_marca"
                      name="nombre_marca"
                      value={formData.nombre_marca}
                      onChange={handleInputChange}
                      placeholder="Ingrese el nombre de la marca"
                      required
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Guardando...' : 'Guardar Marca'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
    )

}