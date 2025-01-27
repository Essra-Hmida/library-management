import React, { useEffect, useState } from 'react';
import '../styles/AdminBorrowReturnPage.css'; 
function AdminBorrowReturnPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupération des emprunts depuis l'API
    fetch('http://127.0.0.1:8000/api/emprunts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des emprunts');
        }
        return response.json();
      })
      .then(data => setBorrowedBooks(data))
      .catch(error => setError(error.message)); // Gestion des erreurs
  }, []);

  const handleDelete = (id) => { 
    fetch(`http://127.0.0.1:8000/api/emprunts/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.error || 'Erreur lors de la suppression de l\'emprunt');
        });
      }
      setBorrowedBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    })
    .catch(error => setError(error.message));
  };
  
  

  return (
    <div className="admin-borrow-return">
      <h2>Gestion des Emprunts et Retours</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichage de l'erreur si elle existe */}
      <table>
        <thead>
          <tr>
            <th>ID Emprunt</th>
            <th>Nom d'Utilisateur</th>
            <th>Titre du Livre</th>
            <th>Date d'Emprunt</th>
            <th>Date de Retour</th>
            <th>Action</th> {/* Colonne pour l'action de suppression */}
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length === 0 ? (
            <tr>
              <td colSpan="6">Aucun emprunt trouvé.</td>
            </tr>
          ) : (
            borrowedBooks.map(borrow => (
              <tr key={borrow.id}>
                <td>{borrow.id}</td>
                <td>{borrow.utilisateur__username}</td> {/* Nom d'utilisateur */}
                <td>{borrow.livre__titre}</td> {/* Titre du livre */}
                <td>{borrow.date_emprunt}</td>
                <td>{borrow.date_retour}</td>
                <td>
                  <button
                    onClick={() => handleDelete(borrow.id)}
                    style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                  >
                    Supprimer
                  </button>
                </td> {/* Bouton de suppression */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBorrowReturnPage;
