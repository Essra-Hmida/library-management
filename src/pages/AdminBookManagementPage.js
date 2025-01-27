import React, { useState, useEffect } from 'react';
import '../styles/AdminBookManagementPage.css';  

function AdminBookManagementPage() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ 
    titre: '', 
    auteur: '', 
    isbn: '', 
    genre: '', 
    emplacement: '', 
    disponible: true 
  });
  const [editBook, setEditBook] = useState(null); // Pour gérer le mode édition
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch('http://127.0.0.1:8000/api/livres')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur de chargement des livres');
        }
        return response.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => setError(err.message));
  };

  const handleAddBook = () => {
    if (!newBook.titre || !newBook.auteur || !newBook.isbn) {
      setError('Tous les champs obligatoires doivent être remplis.');
      return;
    }

    const newBookData = {
      titre: newBook.titre,
      auteur: newBook.auteur,
      isbn: newBook.isbn,
      genre: newBook.genre,
      emplacement: newBook.emplacement,
      disponible: newBook.disponible,
    };

    fetch('http://127.0.0.1:8000/api/livres/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBookData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du livre');
        }
        return response.json();
      })
      .then(() => {
        fetchBooks(); // Recharger les livres
        setNewBook({ titre: '', auteur: '', isbn: '', genre: '', emplacement: '', disponible: true });
      })
      .catch((err) => setError(err.message));
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      fetch(`http://127.0.0.1:8000/api/livres/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression du livre');
          }
          fetchBooks();
        })
        .catch((err) => setError(err.message));
    }
  };

  const handleUpdateBook = () => {  
    if (!editBook || !editBook.id) {  
      setError('Aucun livre sélectionné pour la mise à jour.');  
      return;  
    }  
    console.log("ID du livre à mettre à jour:", editBook.id);
    const updatedBookData = {  
      titre: editBook.titre,  
      auteur: editBook.auteur,  
      isbn: editBook.isbn,  
      genre: editBook.genre,  
      emplacement: editBook.emplacement,  
      disponible: editBook.disponible,  
    };  

    console.log("Mise à jour du livre :", updatedBookData); // Debugging log  
    console.log("Données envoyées :", updatedBookData); // Vérifier les données envoyées
    fetch(`http://127.0.0.1:8000/api/livres/${editBook.id}`, {  
      method: 'PUT',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify(updatedBookData),  
    })  
    .then((response) => {  
      if (!response.ok) {  
        throw new Error('Erreur lors de la mise à jour du livre.');  
      }  
      return response.json();  
    })  
    .then(() => {  
      fetchBooks();  
      setEditBook(null);  
    })  
    .catch((err) => setError(err.message));  
    };

  return (
    <div className="admin-book-management">
      <h2>Gestion des Livres</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Ajouter un livre */}
      <h3>Ajouter un livre</h3>
      <input
        type="text"
        placeholder="Titre"
        value={newBook.titre}
        onChange={(e) => setNewBook({ ...newBook, titre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Auteur"
        value={newBook.auteur}
        onChange={(e) => setNewBook({ ...newBook, auteur: e.target.value })}
      />
      <input
        type="text"
        placeholder="ISBN"
        value={newBook.isbn}
        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
      />
      <input
        type="text"
        placeholder="Genre"
        value={newBook.genre}
        onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Emplacement"
        value={newBook.emplacement}
        onChange={(e) => setNewBook({ ...newBook, emplacement: e.target.value })}
      />
      <button onClick={handleAddBook}>Ajouter un livre</button>

      {/* Liste des livres */}
      <h3>Liste des Livres</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Emplacement</th>
            <th>Disponibilité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.titre}</td>
              <td>{book.auteur}</td>
              <td>{book.isbn}</td>
              <td>{book.genre}</td>
              <td>{book.emplacement}</td>
              <td>{book.disponible ? 'Oui' : 'Non'}</td>
              <td>
                <button onClick={() => setEditBook(book)}>Modifier</button>
                <button onClick={() => handleDeleteBook(book.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modifier un livre */}
      {editBook && (
        <div>
          <h3>Modifier un livre</h3>
          <input
            type="text"
            placeholder="Titre"
            value={editBook.titre}
            onChange={(e) => setEditBook({ ...editBook, titre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Auteur"
            value={editBook.auteur}
            onChange={(e) => setEditBook({ ...editBook, auteur: e.target.value })}
          />
          <input
            type="text"
            placeholder="ISBN"
            value={editBook.isbn}
            onChange={(e) => setEditBook({ ...editBook, isbn: e.target.value })}
          />
          <input
            type="text"
            placeholder="Genre"
            value={editBook.genre}
            onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Emplacement"
            value={editBook.emplacement}
            onChange={(e) => setEditBook({ ...editBook, emplacement: e.target.value })}
          />
          <button onClick={handleUpdateBook}>Mettre à jour</button>
          <button onClick={() => setEditBook(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
}

export default AdminBookManagementPage;
