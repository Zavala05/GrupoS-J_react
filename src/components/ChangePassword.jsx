import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import '../styles/admin.css';

export default function ChangePassword() {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogin = async () => {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('login')
        .select('id, username')
        .limit(1);

      if (error) {
        console.error('Error fetching login data:', error);
        setError('No se pudo cargar la configuración de login.');
      } else {
        const loginRow = Array.isArray(data) ? data[0] : data;
        if (!loginRow) {
          setError('No se encontró el registro de login en la base de datos.');
        } else {
          setUsername(loginRow.username || '');
        }
      }

      setLoading(false);
    };

    fetchLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las nuevas contraseñas que ingresaste no coinciden.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('login')
        .select('id, password')
        .limit(1);

      if (error) {
        throw error;
      }

      const loginRow = Array.isArray(data) ? data[0] : data;
      if (!loginRow) {
        setError('No se encontró el registro de login.');
        return;
      }

      if (loginRow.password !== oldPassword) {
        setError('Contraseña anterior incorrecta.');
        return;
      }

      const { error: updateError } = await supabase
        .from('login')
        .update({ password: newPassword })
        .eq('id', loginRow.id);

      if (updateError) {
        throw updateError;
      }

      setStatus('Contraseña actualizada con éxito.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Error al actualizar la contraseña. Intenta de nuevo.');
    }
  };

  if (loading) {
    return <div className="admin-loading">Cargando datos de usuario...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Cambiar Contraseña</h1>
          <p style={{ marginTop: '0.5rem', color: '#ccc' }}>
            Usuario administrador: <strong>{username || 'Sin usuario cargado'}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="admin-btn" onClick={() => navigate('/admin')}>
            Volver al Panel
          </button>
        </div>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="oldPassword">Contraseña anterior *</label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Ingresa tu contraseña actual"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Nueva contraseña *</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingresa la nueva contraseña"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar nueva contraseña *</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la nueva contraseña"
              required
            />
          </div>

          {error && <p className="alert-danger">{error}</p>}
          {status && <p className="alert-success">{status}</p>}

          <button type="submit" className="admin-btn" style={{ marginTop: '1rem' }}>
            Guardar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
