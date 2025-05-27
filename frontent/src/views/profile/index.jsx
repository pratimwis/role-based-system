import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import profileImageDefault from '../../assets/userImage/profileImage.jpeg';
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { updateProfile } from '../../api/AllApi';
import { updateProfileImage } from '../../redux/authSlice/slice';


const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [profileImage, setProfileImage] = useState(user.profilePicture || profileImageDefault);


  const handlePasswordChange = () => {
    if (!newPassword.current || !newPassword.new || !newPassword.confirm) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword.new !== newPassword.confirm) {
      toast.error('New password and confirm password do not match');
      return;
    }
    setShowPasswordField(false);
    setNewPassword('');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const response = await updateProfile(formData);
      dispatch(updateProfileImage(response.data.imageUrl));
      if (response.status === 200) {
        setProfileImage(response.data.imageUrl);
        toast.success('Profile image updated successfully');
      } else {
        console.error('Failed to update profile image');
      }
    }
  }




  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl">
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
          />
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profileUpload"
            className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer"
            title="Change profile picture"
          >
            <FaRegEdit className="text-gray-600 hover:text-blue-600" size={18} />
          </label>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-blue-600 font-medium capitalize">{user.role}</p>
          <p className="text-sm text-gray-500 mt-1">User ID: <span className="font-mono">{user._id}</span></p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Username</label>
          <div className="px-4 py-2 bg-gray-100 rounded-md">{user.username}</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Role</label>
          <div className="px-4 py-2 bg-gray-100 rounded-md capitalize">{user.role}</div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>

        {!showPasswordField ? (
          <button
            onClick={() => setShowPasswordField(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter current password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword.current || ''}
              onChange={(e) => setNewPassword({ ...newPassword, current: e.target.value })}
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword.new || ''}
              onChange={(e) => setNewPassword({ ...newPassword, new: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword.confirm || ''}
              onChange={(e) => setNewPassword({ ...newPassword, confirm: e.target.value })}
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setShowPasswordField(false);
                  setNewPassword('');
                }}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
              >
                Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
