import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const adminUser = import.meta.env.VITE_ADMIN_USER;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (usuario === adminUser && password === adminPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      setSuccess('INICIO DE SESION EXITOSO!');
      setError('');
      
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } else {
      setError('Usuario o contraseña incorrectos');
      setPassword('');
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