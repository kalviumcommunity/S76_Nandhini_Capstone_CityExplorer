import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const CityCard = ({ city }) => {
  return (
    <Link to={`/cities/${city._id}`} className="block">
      <div className="card group transition-all duration-300 hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={city.imageUrl} 
            alt={`${city.name}, ${city.country}`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold">{city.name}</h3>
            <div className="flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1 text-secondary" />
              <span className="text-sm">{city.country}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-bold">{city.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({city.reviewCount} reviews)</span>
            </div>
            <span className="text-sm text-gray-500">{city.placeCount} places</span>
          </div>
          
          <button className="w-full btn btn-outline group-hover:bg-primary group-hover:text-white group-hover:border-primary">
            Explore City
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;