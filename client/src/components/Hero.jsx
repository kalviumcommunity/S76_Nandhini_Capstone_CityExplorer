import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkedAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          opacity: '0.4'
        }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Cities Like Never Before
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Explore the world's most exciting destinations with personalized guides, 
            local recommendations, and interactive maps.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/cities" 
              className="btn btn-primary text-lg py-3 px-8 flex items-center justify-center gap-2"
            >
              <FaSearch />
              Explore Cities
            </Link>
            
            <a 
              href="#features" 
              className="btn btn-outline border-white text-white hover:bg-white hover:bg-opacity-10 text-lg py-3 px-8 flex items-center justify-center gap-2"
            >
              <FaMapMarkedAlt />
              How It Works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;