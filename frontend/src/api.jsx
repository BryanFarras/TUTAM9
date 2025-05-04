import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors consistently
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('user');
          alert('Your session has expired. Please log in again.');
          window.location.href = '/login'; // Use href for better compatibility
          break;
        case 403:
          // Handle forbidden
          alert('You do not have permission to perform this action.');
          break;
        case 500:
          // Handle server errors
          alert('An internal server error occurred. Please try again later.');
          break;
        default:
          alert(`An error occurred: ${error.response.statusText}`);
      }
    } else {
      // Handle network or other errors
      alert('A network error occurred. Please check your connection.');
    }
    return Promise.reject(error);
  }
);