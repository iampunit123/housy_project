import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Details</h1>
        <p className="text-gray-600">Viewing property ID: {id}</p>
        <p className="text-gray-600">Property details will be displayed here.</p>
      </div>
    </div>
  );
};

export default PropertyDetailPage;