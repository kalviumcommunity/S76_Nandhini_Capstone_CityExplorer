const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const City = require('./models/City');
const Feature = require('./models/Feature');
const User = require('./models/User');
const bcrypt = require('bcrypt');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const seedData = async () => {
  try {
    console.log('🌱 Seeding database...');
    
    // Check if features exist
    const featuresCount = await Feature.countDocuments();
    
    if (featuresCount === 0) {
      console.log('Seeding features...');
      
      const features = [
        {
          title: 'Interactive Maps',
          description: 'Explore cities with our detailed interactive maps, highlighting points of interest and hidden gems.',
          icon: 'map-marked-alt',
          colorClass: 'primary'
        },
        {
          title: 'Personalized Itineraries',
          description: 'Create custom itineraries based on your interests, time, and preferred pace of exploration.',
          icon: 'route',
          colorClass: 'secondary'
        },
        {
          title: 'Local Recommendations',
          description: 'Discover where locals eat, shop, and hang out with recommendations from city residents.',
          icon: 'utensils',
          colorClass: 'accent'
        }
      ];
      
      await Feature.insertMany(features);
      console.log('✅ Features seeded successfully');
    } else {
      console.log('Features already exist, skipping seed');
    }
    
    // Check if cities exist
    const citiesCount = await City.countDocuments();
    
    if (citiesCount === 0) {
      console.log('Seeding cities...');
      
      const cities = [
        {
          name: 'New York',
          country: 'United States',
          description: 'The city that never sleeps. Explore iconic landmarks, diverse neighborhoods, and world-class dining.',
          imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          rating: 4.8,
          reviewCount: 12543,
          placeCount: 328
        },
        {
          name: 'Paris',
          country: 'France',
          description: 'The City of Light. Discover romantic streets, historical monuments, and incredible cuisine.',
          imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80',
          rating: 4.7,
          reviewCount: 10221,
          placeCount: 295
        },
        {
          name: 'Tokyo',
          country: 'Japan',
          description: 'A fascinating blend of traditional and ultramodern. Experience cutting-edge technology, historic temples, and vibrant street life.',
          imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1536&q=80',
          rating: 4.9,
          reviewCount: 8976,
          placeCount: 412
        }
      ];
      
      await City.insertMany(cities);
      console.log('✅ Cities seeded successfully');
    } else {
      console.log('Cities already exist, skipping seed');
    }
    
    // Check if demo user exists
    const demoUser = await User.findOne({ username: 'demo' });
    
    if (!demoUser) {
      console.log('Creating demo user...');
      
      const hashedPassword = await bcrypt.hash('password', 10);
      
      await User.create({
        username: 'demo',
        password: hashedPassword
      });
      
      console.log('✅ Demo user created successfully');
    } else {
      console.log('Demo user already exists, skipping creation');
    }
    
    console.log('🎉 Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();