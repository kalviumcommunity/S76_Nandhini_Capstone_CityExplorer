import React, { useEffect, useState } from 'react';
import { FaSearch, FaGlobeAmericas } from 'react-icons/fa';
import CityCard from '../components/CityCard';
import api from '../services/api';

const CitiesPage = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get('/cities');
        setCities(response.data);
        setFilteredCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const results = cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(results);
  }, [searchTerm, cities]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Loading Cities...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-light py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Cities</h1>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Discover amazing cities around the world and plan your next adventure.
            Search by city name or country to find your dream destination.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cities or countries..."
              className="input pl-10 py-3"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {filteredCities.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCities.map((city) => (
              <CityCard key={city._id} city={city} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaGlobeAmericas className="text-primary text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Cities Found</h3>
            <p className="text-gray-600">
              We couldn't find any cities matching your search criteria. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitiesPage;