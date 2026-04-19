import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import './Login.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!usuario || !password) {
      setError('Por favor ingresa usuario y contraseña.');
      return;
    }

    setLoading(true);
    try {
      const usernameTrimmed = usuario.trim();
      const { data, error } = await supabase
        .from('login')
        .select('id, username, password')
        .eq('username', usernameTrimmed)
        .limit(1);

      if (error) {
        throw error;
      }

      const loginRow = Array.isArray(data) ? data[0] : data;
      if (!loginRow || loginRow.password !== password) {
        setError('Usuario o contraseña incorrectos');
        setPassword('');
      } else {
        localStorage.setItem('isLoggedIn', 'true');
        setSuccess('INICIO DE SESIÓN EXITOSO!');
        setError('');
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error al validar el usuario. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="access-panel">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && <p className="alert-danger">{error}</p>}
          {success && <p className="alert-success">{success}</p>}
          <button type="submit" className="submit-action">Entrar</button>
        </form>
      </div>
    </div>
  );
}