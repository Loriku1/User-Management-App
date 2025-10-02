import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            User Management
          </Link>
          <Link
            to="/add-user"
            className="bg-white/95 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Add User
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;