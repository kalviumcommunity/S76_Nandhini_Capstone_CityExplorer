import React, { useEffect, useState } from 'react';
import { FaMap, FaRoute, FaUtensils, FaStar, FaVideo, FaCalendar } from 'react-icons/fa';
import api from '../services/api';

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await api.get('/features');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  // Fallback icons if the icon from the database is not recognized
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'map': return <FaMap className="text-primary text-3xl" />;
      case 'route': return <FaRoute className="text-secondary text-3xl" />;
      case 'utensils': return <FaUtensils className="text-accent text-3xl" />;
      case 'star': return <FaStar className="text-primary text-3xl" />;
      case 'video': return <FaVideo className="text-secondary text-3xl" />;
      case 'calendar': return <FaCalendar className="text-accent text-3xl" />;
      default: return <FaMap className="text-primary text-3xl" />;
    }
  };

  // Get color class based on the colorClass field
  const getColorClass = (colorClass) => {
    switch (colorClass) {
      case 'primary': return 'bg-primary-light/10 border-primary';
      case 'secondary': return 'bg-secondary-light/10 border-secondary';
      case 'accent': return 'bg-accent-light/10 border-accent';
      default: return 'bg-primary-light/10 border-primary';
    }
  };

  if (loading) {
    return (
      <div id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loading Features...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Features</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            City Explorer provides everything you need to plan the perfect trip, 
            from interactive maps to personalized itineraries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature._id}
              className={`p-6 rounded-lg border-l-4 ${getColorClass(feature.colorClass)} transition-transform hover:scale-105`}
            >
              <div className="mb-4">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;