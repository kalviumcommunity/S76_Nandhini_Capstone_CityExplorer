import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Loading Profile...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-primary py-8 px-6 text-white text-center">
              <div className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center text-4xl mx-auto mb-4">
                <FaUser />
              </div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-primary-light mt-2 flex items-center justify-center">
                <FaCalendarAlt className="mr-2" />
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Account Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Username</label>
                  <p className="font-medium">{user.username}</p>
                </div>
                
                <div>
                  <label className="block text-gray-500 text-sm mb-1">User ID</label>
                  <p className="font-medium">{user._id}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="btn btn-primary">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Your Activity</h3>
              
              <div className="text-center py-8 text-gray-500">
                <div className="text-5xl mb-4">🌟</div>
                <p className="mb-2">You haven't made any trips yet!</p>
                <p>Start exploring cities to plan your first adventure.</p>
                
                <button className="btn btn-primary mt-4">
                  Explore Cities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;