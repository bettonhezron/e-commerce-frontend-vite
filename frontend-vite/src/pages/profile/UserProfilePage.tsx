import React from 'react';

const UserProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p className="text-gray-600">Profile information will be displayed here</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <p className="text-gray-600">Account settings will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 