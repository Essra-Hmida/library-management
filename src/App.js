import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Contexte utilisateur
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import BookListPage from './pages/BookListPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookManagementPage from './pages/AdminBookManagementPage';
import AdminMemberManagementPage from './pages/AdminMemberManagementPage';
import AdminBorrowReturnPage from './pages/AdminBorrowReturnPage';
import PrivateRoute from './components/PrivateRoute'; // Route privée pour les pages sécurisées

function App() {
  return (
    <UserProvider> {/* Fournir le contexte utilisateur */}
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/booklist" element={<BookListPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />

          {/* Tableau de bord pour les administrateurs */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAdminRoute={true}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Gestion des livres pour les administrateurs */}
          <Route
            path="/admin/books"
            element={
              <PrivateRoute isAdminRoute={true}>
                <AdminBookManagementPage />
              </PrivateRoute>
            }
          />

          {/* Gestion des membres pour les administrateurs */}
          <Route
            path="/admin/members"
            element={
              <PrivateRoute isAdminRoute={true}>
                <AdminMemberManagementPage />
              </PrivateRoute>
            }
          />

          {/* Gestion des emprunts et retours pour les administrateurs */}
          <Route
            path="/admin/borrow-return"
            element={
              <PrivateRoute isAdminRoute={true}>
                <AdminBorrowReturnPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
