import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PropertyForm from '../../components/properties/PropertyForm';
import LandlordApplication from '../../components/LandlordApplication';

const CreatePropertyPage = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-card text-center">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to list your property.</p>
          <a 
            href="/login" 
            className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (user?.userType !== 'landlord') {
    return <LandlordApplication />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <PropertyForm />
      </div>
    </div>
  );
};

export default CreatePropertyPage;