import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  return isLoggedIn ? element : <Navigate to="/login" replace />;
}
