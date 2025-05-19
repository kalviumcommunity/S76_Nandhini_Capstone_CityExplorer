import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CityCard from './CityCard';
import api from '../services/api';

const CitiesShowcase = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get('/cities');
        // Display only first 6 cities on homepage
        setCities(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loading Popular Cities...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Popular Cities</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore the most visited and loved cities around the world. 
            Each with its unique culture, attractions, and experiences.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/cities" className="btn btn-primary">
            View All Cities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CitiesShowcase;