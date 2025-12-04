import axios from 'axios';

const API_BASE_URL = 'https://trip-planner-backend-rsq0.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Trip APIs
export const generateTrip = (data) => api.post('/trips/generate', data);
export const getUserTrips = (userId) => api.get(`/trips/user/${userId}`);
export const getTripById = (tripId) => api.get(`/trips/${tripId}`);

// Place APIs
export const getPlacePhoto = (query) => api.get(`/places/photo?query=${encodeURIComponent(query)}`);

// Helper function to get image URL for destinations
export const getDestinationImage = (destination) => {
  const encodedDestination = encodeURIComponent(destination);
  return `https://source.unsplash.com/1600x900/?${encodedDestination},travel,city,landmark`;
};

// Helper function to get hotel image
export const getHotelImage = (hotelName, destination) => {
  const query = `${hotelName} ${destination} hotel`;
  const encoded = encodeURIComponent(query);
  return `https://source.unsplash.com/800x600/?${encoded}`;
};

// Helper function to get place image
export const getPlaceImage = (placeName, destination) => {
  const query = `${placeName} ${destination}`;
  const encoded = encodeURIComponent(query);
  return `https://source.unsplash.com/800x600/?${encoded}`;
};

export default api;