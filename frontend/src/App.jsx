import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage on app load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="min-h-screen bg-gray-100">
          <div className="mx-8 pt-4">
            <Routes>
              <Route 
                path="/register" 
                element={!isAuthenticated ? <RegisterPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/login" 
                element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
              />
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;