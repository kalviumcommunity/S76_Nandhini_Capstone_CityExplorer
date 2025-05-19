import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMap } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="bg-gray-light min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 text-xl max-w-lg mx-auto mb-8">
          Oops! The page you are looking for might have been removed or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn btn-primary flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/cities" 
            className="btn btn-outline flex items-center justify-center"
          >
            <FaMap className="mr-2" />
            Explore Cities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;