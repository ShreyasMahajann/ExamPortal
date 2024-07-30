import React from 'react';
import AdminNavbar from './AdminNavBar';
import AdminQuizGenerator from './AdminQuizGenerator';

const AdminPanel = () => {
  return (
    <div>
      <AdminNavbar />
      <AdminQuizGenerator />
    </div>
  );
};

export default AdminPanel;