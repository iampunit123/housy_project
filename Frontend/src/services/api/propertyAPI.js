import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/auth';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('housy_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const propertyAPI = {
  getProperties: (params = {}) => api.get('/', { params }),
  getFeaturedProperties: () => api.get('/featured'),
  getPropertyById: (id) => api.get(`/${id}`),
  getCities: () => api.get('/cities'),
  
  createProperty: (propertyData) => api.post('/', propertyData),
  updateProperty: (id, propertyData) => api.put(`/${id}`, propertyData),
  deleteProperty: (id) => api.delete(`/${id}`),
  getMyProperties: () => api.get('/landlord/my-properties'),
};

export default api;