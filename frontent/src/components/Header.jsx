import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { socket } from '../socket';

const Header = () => {
  const userLocalData = localStorage.getItem('userData');
  const userData = JSON.parse(userLocalData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    socket.emit("logout", userData.username);
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to={'/'}>
          <h1 className="text-2xl font-semibold tracking-wide">Role Based Login</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </Link>
          {!userData && (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
              >
                Register
              </Link>
            </>
          )}

          {userData && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
