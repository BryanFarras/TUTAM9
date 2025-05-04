import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          throw new Error('No user data found');
        }

        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Verify with backend
        const response = await api.get(`/users/email/${userData.email}`);
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to verify user');
        }
      } catch (error) {
        setError(error.message);
        if (error.response?.status === 401) {
          onLogout();
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, onLogout]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name || 'User'}
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Account Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;