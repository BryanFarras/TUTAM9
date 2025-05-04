import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginAsGuest = () => {
    localStorage.setItem("user", JSON.stringify({ name: "Guest", email: "guest@example.com" }));
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed. Please try again!");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-black p-8 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full rounded-md"  // Menghapus 'border border-gray-300'
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full rounded-md"  // Menghapus 'border border-gray-300'
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={handleLoginAsGuest}
            className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
          >
            Login as Guest
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
