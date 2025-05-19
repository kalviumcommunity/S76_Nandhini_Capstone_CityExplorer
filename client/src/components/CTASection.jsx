import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaUserPlus } from 'react-icons/fa';

const CTASection = () => {
  return (
    <div className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          
          <p className="text-xl text-white/80 mb-8">
            Join thousands of travelers who have discovered their dream destinations 
            and created unforgettable memories with City Explorer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/cities" 
              className="btn bg-white text-primary hover:bg-gray-100 text-lg py-3 px-8 flex items-center justify-center gap-2"
            >
              <FaMapMarkedAlt />
              Explore Cities
            </Link>
            
            <Link 
              to="/register" 
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary text-lg py-3 px-8 flex items-center justify-center gap-2"
            >
              <FaUserPlus />
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;