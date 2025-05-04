import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          // Verify the token/user with backend if needed
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // If you're using tokens
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? 
                  <RegisterPage onLogin={handleLogin} /> : 
                  <Navigate to="/dashboard" replace />
              } 
            />
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? 
                  <LoginPage onLogin={handleLogin} /> : 
                  <Navigate to="/dashboard" replace />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                  <Dashboard onLogout={handleLogout} /> : 
                  <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="*" 
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;