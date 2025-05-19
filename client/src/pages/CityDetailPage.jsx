import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaLandmark, FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';

const CityDetailPage = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await api.get(`/cities/${id}`);
        setCity(response.data);
      } catch (error) {
        console.error('Error fetching city details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Loading City Details...</h1>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
        <p className="mb-6">The city you're looking for doesn't exist or has been removed.</p>
        <Link to="/cities" className="btn btn-primary">
          <FaArrowLeft className="mr-2" /> Back to Cities
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="h-[50vh] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${city.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{city.name}</h1>
            <div className="flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-xl">{city.country}</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-black bg-opacity-50 rounded-full px-4 py-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-bold">{city.rating.toFixed(1)}</span>
                <span className="text-gray-300 text-sm ml-1">({city.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link to="/cities" className="flex items-center text-primary hover:underline">
            <FaArrowLeft className="mr-2" /> Back to Cities
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About {city.name}</h2>
            <p className="text-gray-700 mb-6">
              {city.name} is a vibrant city in {city.country} known for its unique culture, 
              stunning architecture, and incredible food. With {city.placeCount} famous places 
              to visit, it's a destination for travelers from around the world.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaLandmark className="mr-2 text-primary" /> 
                Top Attractions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-primary-light/20 text-primary rounded-full p-1 mr-3 mt-1">
                    <FaStar className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-medium">Famous Landmark</span>
                    <p className="text-gray-600 text-sm">A must-visit historical site with stunning architecture.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-light/20 text-primary rounded-full p-1 mr-3 mt-1">
                    <FaStar className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-medium">Cultural Museum</span>
                    <p className="text-gray-600 text-sm">Explore the rich history and culture of the region.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-light/20 text-primary rounded-full p-1 mr-3 mt-1">
                    <FaStar className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-medium">Local Market</span>
                    <p className="text-gray-600 text-sm">Experience authentic local products and cuisine.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-4">City Highlights</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">Rating</span>
                  <span className="font-medium flex items-center">
                    <FaStar className="text-yellow-500 mr-1" /> 
                    {city.rating.toFixed(1)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Country</span>
                  <span className="font-medium">{city.country}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Places to Visit</span>
                  <span className="font-medium">{city.placeCount}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Reviews</span>
                  <span className="font-medium">{city.reviewCount}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Best Time to Visit</span>
                  <span className="font-medium">Spring/Fall</span>
                </li>
              </ul>
            </div>
            
            <button className="btn btn-primary w-full mb-4">
              Plan Your Trip
            </button>
            
            <button className="btn btn-outline w-full">
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;