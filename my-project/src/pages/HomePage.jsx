import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
          Selamat Datang di Kalender & Catatan
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          Gunakan aplikasi ini untuk melihat kalender dan menambahkan catatan harian Anda.
        </p>

        <div className="text-center">
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Buka Kalender
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
