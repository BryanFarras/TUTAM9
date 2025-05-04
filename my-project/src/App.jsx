import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/NavBar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <--- TAMBAH INI

  return (
    <Router>
      <div className="my-12 pt-20 min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} visible={true} /> {/* visible bisa diganti logic scroll */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
