import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function PrivateRoute({ children, isAdminRoute = false }) {
  const { user } = useUser();

  if (!user) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/signin" />;
  }

  if (isAdminRoute && !user.is_admin) {
    // Redirige vers une page non autorisée si l'utilisateur n'est pas admin
    return <Navigate to="/booklist" />;
  }

  return children; // Rendu du composant protégé
}

export default PrivateRoute;
