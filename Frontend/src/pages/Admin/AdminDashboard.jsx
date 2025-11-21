import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-primary-500">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-2">Total Properties</h3>
          <p className="text-2xl font-bold text-primary-500">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-card">
          <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
          <p className="text-2xl font-bold text-primary-500">23</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="bg-primary-500 text-white px-4 py-2 rounded">
            Manage Users
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            View Properties
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;