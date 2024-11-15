import { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    email: 'john@example.com',
    password: '********'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState(userData);

  const handleEdit = () => {
    setTempUserData(userData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempUserData(userData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setUserData(tempUserData);
    setIsEditing(false);
    // Here you would typically make an API call to update the user data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px]">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={isEditing ? tempUserData.username : userData.username}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500
                         disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={isEditing ? tempUserData.email : userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500
                         disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={isEditing ? tempUserData.password : userData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500
                         disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
                           text-gray-700 bg-white hover:bg-gray-50 focus:outline-none 
                           focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                           text-white bg-purple-600 hover:bg-purple-700 focus:outline-none 
                           focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                         text-white bg-purple-600 hover:bg-purple-700 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;