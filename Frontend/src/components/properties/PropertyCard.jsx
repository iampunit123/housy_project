import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import { formatPrice, getSustainabilityColor, getSustainabilityLabel } from '../../utils/formatters';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={property.images?.[0] || '/api/placeholder/400/300'}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-white font-semibold text-sm flex items-center space-x-1 ${getSustainabilityColor(property.sustainability?.overallScore)} bg-opacity-90`}>
            <Star className="h-3 w-3 fill-current" />
            <span>{property.sustainability?.overallScore?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location.area}, {property.location.city}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-600">
            {formatPrice(property.price, property.priceType)}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          {property.features.bedrooms > 0 && (
            <div className="flex items-center space-x-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.features.bedrooms} beds</span>
            </div>
          )}
          {property.features.bathrooms > 0 && (
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.features.bathrooms} baths</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span className="text-sm">{property.features.area} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded text-xs font-medium ${getSustainabilityColor(property.sustainability?.overallScore)}`}>
              {getSustainabilityLabel(property.sustainability?.overallScore)} Sustainability
            </div>
          </div>
          <Link
            to={`/properties/${property._id}`}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;