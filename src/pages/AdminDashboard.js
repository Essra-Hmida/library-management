import React, { useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { useUser } from '../context/UserContext';  
import '../styles/AdminDashboard.css';  
import dashboardImage from '../assets/dashboard-image.jpg'; // Chemin vers votre image  

function AdminDashboard() {  
  const navigate = useNavigate();  
  const { user } = useUser();  

  useEffect(() => {  
    if (!user || !user.is_admin) {  
      navigate('/signin');  
    }  
  }, [user, navigate]);  

  return (  
    <div className="admin-dashboard">  
      <header className="dashboard-header">  
        <h1>Tableau de Bord Administrateur</h1>  
        <p>Bienvenue, {user?.username} !</p>  
      </header>  
      <nav className="dashboard-nav">  
        <button onClick={() => navigate('/admin/books')}>Gérer les Livres</button>  
        <button onClick={() => navigate('/admin/members')}>Gérer les Membres</button>  
        <button onClick={() => navigate('/admin/borrow-return')}>Gérer Emprunts et Retours</button>  
      </nav>  
      <main className="dashboard-main">  
        <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />  
      </main>  
    </div>  
  );  
}  

export default AdminDashboard;