import React, { useEffect, useState } from 'react';  
import '../styles/AdminMemberManagement.css';  

function AdminMemberManagementPage() {  
  const [members, setMembers] = useState([]);  

  useEffect(() => {  
    fetch('http://127.0.0.1:8000/api/utilisateurs') // Assurez-vous que cette route existe  
      .then(response => response.json())  
      .then(data => setMembers(data));  
  }, []);  

  const promoteToAdmin = (userId) => {  
    fetch('http://127.0.0.1:8000/api/promote-to-admin', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({ user_id: userId }),  
    })  
      .then(response => response.json())  
      .then(data => {  
        if (data.message) {  
          alert(data.message);  
          // Actualisez la liste des membres pour refléter le changement
          setMembers(members.map(member => 
            member.id === userId ? { ...member, is_admin: true } : member
          ));
        } else if (data.error) {  
          alert(data.error);  
        }  
      })  
      .catch(err => console.error('Erreur:', err));  
  };  

  return (  
    <div className="admin-member-management">  
      <h2>Gestion des Membres</h2>  
      <table>  
        <thead>  
          <tr>  
            <th>ID</th>  
            <th>Nom</th>  
            <th>Email</th>  
            <th>Rôle</th>  
            <th>Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {members.map(member => (  
            <tr key={member.id}>  
              <td>{member.id}</td>  
              <td>{member.username}</td>  
              <td>{member.email}</td>  
              <td>{member.is_admin ? 'Administrateur' : 'Membre'}</td>  
              <td>  
                {!member.is_admin && (  
                  <button onClick={() => promoteToAdmin(member.id)}>Promouvoir Admin</button>  
                )}  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
}  

export default AdminMemberManagementPage;
