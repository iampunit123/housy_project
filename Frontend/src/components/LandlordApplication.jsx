import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LandlordApplication = () => {
  const { user, updateProfile } = useAuth();
  const [application, setApplication] = useState({
    idNumber: '',
    proofOfAddress: null,
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send application to admin for approval
    // Admin can then change userType from 'tenant' to 'landlord'
  };

  if (user?.userType === 'landlord') {
    return (
      <div className="bg-green-100 p-4 rounded-lg">
        <p>✅ You are already a verified landlord!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-card">
      <h2 className="text-2xl font-bold mb-4">Become a Landlord</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID Number</label>
          <input 
            type="text"
            className="w-full border rounded px-3 py-2"
            value={application.idNumber}
            onChange={(e) => setApplication({...application, idNumber: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input 
            type="tel"
            className="w-full border rounded px-3 py-2"
            value={application.phone}
            onChange={(e) => setApplication({...application, phone: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LandlordApplication;