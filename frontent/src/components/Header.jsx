import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  useDispatch, useSelector } from 'react-redux';
import { persistor } from '../redux/store';
import { logout } from '../redux/authSlice/slice';
import profileImage from '../assets/userImage/profileImage.jpeg';


const Header = () => {

  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge()
    navigate('/login');
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

          <Link to={'/profile'} className="h-10 w-10 bg-white rounded-full">
            <img
              src={userData?.profilePicture || profileImage}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />

          </Link>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;
