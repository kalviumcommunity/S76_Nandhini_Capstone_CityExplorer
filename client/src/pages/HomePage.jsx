import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CitiesShowcase from '../components/CitiesShowcase';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CitiesShowcase />
      <CTASection />
    </div>
  );
};

export default HomePage;