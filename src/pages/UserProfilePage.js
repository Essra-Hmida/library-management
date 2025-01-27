import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Icône pour retourner à la page précédente
import { Link } from 'react-router-dom'; // Pour la navigation
import '../styles/UserProfilePage.css'; // Fichier CSS pour styliser la page
import { useUser } from '../context/UserContext';

function UserProfilePage() {
  const { user } = useUser(); // Accéder à l'utilisateur connecté
  const [borrowedBooks, setBorrowedBooks] = useState([]); // État pour les emprunts
  const [error, setError] = useState(null); // État pour les erreurs éventuelles

  useEffect(() => {
    // Requête pour récupérer les emprunts de l'utilisateur
    const fetchBorrowedBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/emprunts_user/${user.id}`);
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("Erreur API :", errorDetails);
          throw new Error(errorDetails.error || "Erreur lors de la récupération des emprunts");
        }
        const data = await response.json();
        setBorrowedBooks(data);
      } catch (err) {
        console.error("Erreur :", err);
        setError(err.message);
      }
    };

    if (user?.id) { // Vérifier que l'utilisateur est disponible
      fetchBorrowedBooks();
    }
  }, [user]); // Ajouter `user` comme dépendance pour réagir à ses changements

  return (
    <div className="user-profile-container">
      <div className="top-nav">
        <Link to="/">
          <FaArrowLeft size={30} color="black" />
        </Link>
        <h2>Mon Profil</h2>
      </div>

      <h3>Livres empruntés</h3>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : borrowedBooks.length === 0 ? (
        <p>Aucun livre emprunté.</p>
      ) : (
        <div className="book-cards">
          {borrowedBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <h3>{book.livre}</h3>
              <p><strong>Date d'emprunt :</strong> {book.date_emprunt}</p>
              <p><strong>Date de retour :</strong> {book.date_retour}</p>
              <p className={`status ${new Date(book.date_retour) < new Date() ? 'late' : 'on-time'}`}>
                {new Date(book.date_retour) < new Date() ? 'En retard' : 'À rendre'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
