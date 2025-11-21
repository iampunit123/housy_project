import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { propertyAPI } from '../../services/api/propertyAPI';
import ImageUpload from './ImageUpload';

const PropertyForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    price: '',
    priceType: 'monthly',
    location: { city: 'Nairobi', area: '', address: '' },
    features: { bedrooms: 1, bathrooms: 1, area: '', parking: 0 },
    amenities: [],
    sustainability: {
      energyScore: 0,
      waterScore: 0,
      wasteScore: 0,
      materialsScore: 0,
      features: []
    }
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if user is landlord
  if (user?.userType !== 'landlord') {
    return (
      <div className="max-w-2xl mx-auto bg-yellow-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Landlord Access Required</h2>
        <p>You need to be a verified landlord to list properties.</p>
        <button className="mt-4 bg-primary-500 text-white px-4 py-2 rounded">
          Apply to Become Landlord
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        images: images,
        price: Number(formData.price),
        features: {
          ...formData.features,
          area: Number(formData.features.area),
          bedrooms: Number(formData.features.bedrooms),
          bathrooms: Number(formData.features.bathrooms),
          parking: Number(formData.features.parking)
        }
      };

      const response = await propertyAPI.createProperty(propertyData);
      
      if (response.data.success) {
        alert('Property listed successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          propertyType: 'apartment',
          price: '',
          priceType: 'monthly',
          location: { city: 'Nairobi', area: '', address: '' },
          features: { bedrooms: 1, bathrooms: 1, area: '', parking: 0 },
          amenities: [],
          sustainability: {
            energyScore: 0,
            waterScore: 0,
            wasteScore: 0,
            materialsScore: 0,
            features: []
          }
        });
        setImages([]);
      }
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to create property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-card">
      <h2 className="text-2xl font-bold mb-6">List Your Property</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Property Title</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={formData.propertyType}
              onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office Space</option>
              <option value="short_stay">Short Stay</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.location.city}
              onChange={(e) => setFormData({
                ...formData, 
                location: {...formData.location, city: e.target.value}
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Area/Neighborhood</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.location.area}
              onChange={(e) => setFormData({
                ...formData, 
                location: {...formData.location, area: e.target.value}
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Address</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.location.address}
              onChange={(e) => setFormData({
                ...formData, 
                location: {...formData.location, address: e.target.value}
              })}
            />
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={formData.priceType}
              onChange={(e) => setFormData({...formData, priceType: e.target.value})}
            >
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Property Images</label>
          <ImageUpload onImagesChange={setImages} />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Creating Property...' : 'List Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;