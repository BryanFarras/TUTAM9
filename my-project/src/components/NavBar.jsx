import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn, visible }) {
  // Fungsi untuk logout pengguna
  const handleLogout = () => {
    // Menghapus status login di localStorage
    localStorage.removeItem("user");
    setIsLoggedIn(false);  // Update status login di state
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-40 bg-white shadow-md transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-color_green2 hover:text-color_green5 transition">
          DayNote
        </Link>
      </div>
      
      <div className="flex items-center gap-6">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-color_green5 transition">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-color_green5 transition">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-gray-700 hover:text-color_green5 transition">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-color_green5 transition">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-gray-700 hover:text-color_green5 transition">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
