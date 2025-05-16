const mongoose = require('mongoose');
const dotenv = require('dotenv');
const City = require('./models/City');
const Feature = require('./models/Feature');
const User = require('./models/User');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await City.deleteMany();
    await Feature.deleteMany();
    console.log('Data cleared...');

    // Add demo user (but don't clear users to maintain existing accounts)
    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      await User.create({
        username: 'demo',
        password: 'password123' // This will be hashed by the model's pre-save hook
      });
      console.log('Demo user created');
    }

    // Seed cities
    const cities = [
      {
        name: 'New York',
        country: 'United States',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        rating: 4.8,
        reviewCount: 1248,
        placeCount: 350
      },
      {
        name: 'Paris',
        country: 'France',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        rating: 4.9,
        reviewCount: 1573,
        placeCount: 420
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
        rating: 4.7,
        reviewCount: 1189,
        placeCount: 480
      },
      {
        name: 'London',
        country: 'United Kingdom',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        rating: 4.6,
        reviewCount: 1352,
        placeCount: 410
      },
      {
        name: 'Rome',
        country: 'Italy',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        rating: 4.8,
        reviewCount: 1142,
        placeCount: 320
      },
      {
        name: 'Sydney',
        country: 'Australia',
        imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
        rating: 4.7,
        reviewCount: 987,
        placeCount: 280
      }
    ];

    const citiesResult = await City.insertMany(cities);
    console.log(`${citiesResult.length} cities inserted`);

    // Seed features
    const features = [
      {
        title: 'Interactive Maps',
        description: 'Explore cities with our detailed interactive maps, highlighting points of interest and hidden gems.',
        icon: 'map',
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
      },
      {
        title: 'Travel Reviews',
        description: 'Read honest reviews from fellow travelers to make informed decisions about destinations.',
        icon: 'star',
        colorClass: 'primary'
      },
      {
        title: 'Virtual Tours',
        description: 'Experience destinations through immersive virtual tours before planning your actual visit.',
        icon: 'video',
        colorClass: 'secondary'
      },
      {
        title: 'Travel Planner',
        description: 'Organize your trips with our comprehensive planner that covers all aspects of your journey.',
        icon: 'calendar',
        colorClass: 'accent'
      }
    ];

    const featuresResult = await Feature.insertMany(features);
    console.log(`${featuresResult.length} features inserted`);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();