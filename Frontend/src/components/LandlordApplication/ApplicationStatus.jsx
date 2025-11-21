import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ApplicationStatus = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  const fetchApplicationStatus = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/applications/my-application`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('housy_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplication(data.application);
      }
    } catch (error) {
      console.error('Error fetching application status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-card text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading application status...</p>
      </div>
    );
  }

  if (!application) {
    return null; // No application found
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          title: 'Application Under Review',
          message: 'Your application is being reviewed by our team.'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          title: 'Application Approved!',
          message: 'You can now list properties on Housy.'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          title: 'Application Not Approved',
          message: application.reviewNotes || 'Please contact support for more information.'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          title: 'Unknown Status',
          message: 'Please contact support.'
        };
    }
  };

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`p-6 rounded-lg border-l-4 ${statusConfig.bgColor} border-l-${statusConfig.color.split('-')[1]}-500`}>
      <div className="flex items-start space-x-4">
        <StatusIcon className={`w-6 h-6 mt-1 flex-shrink-0 ${statusConfig.color}`} />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{statusConfig.title}</h3>
          <p className="text-gray-600 mt-1">{statusConfig.message}</p>
          
          <div className="mt-4 text-sm text-gray-500">
            <p><strong>Applied on:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
            {application.reviewedAt && (
              <p><strong>Reviewed on:</strong> {new Date(application.reviewedAt).toLocaleDateString()}</p>
            )}
          </div>

          {application.status === 'approved' && (
            <div className="mt-4">
              <a 
                href="/create-property" 
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                List Your First Property
              </a>
            </div>
          )}

          {application.status === 'rejected' && (
            <div className="mt-4">
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Apply Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;