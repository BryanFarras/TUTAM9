import { Link } from 'react-router-dom';

function Navbar({ visible, isLoggedIn}) {
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-40 bg-white shadow-md transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center">
        <Link to="/home" className="text-xl font-semibold text-color_green2 hover:text-color_green5 transition">DayNote</Link>
      </div>
      
      <div className="flex items-center gap-6">
        {isLoggedIn && (
          <>
            <Link to="/home" className="text-gray-700 hover:text-color_green5 transition">
              Home
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;