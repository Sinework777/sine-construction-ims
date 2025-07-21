import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white/80 shadow-md">
      <div className="flex items-center gap-2">
        {/* Logo and other nav items */}
      </div>
      <div className="flex items-center gap-4">
        {/* ...other nav links... */}
        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 flex items-center gap-2 font-semibold shadow transition-transform transform hover:scale-105">
          <FaUserPlus className="text-lg" /> Sign Up
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {/* ...existing hero content... */}
      <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 flex items-center gap-3 font-bold text-xl shadow-lg transition-transform transform hover:scale-105 animate-bounce">
        <FaUserPlus className="text-2xl" /> Sign Up Free
      </Link>
    </div>
  );
}

export { Navbar, HeroSection };
