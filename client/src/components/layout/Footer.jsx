import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">City Explorer</h3>
            <p className="text-gray-400 max-w-md">
              Discover cities like never before with our comprehensive travel platform. 
              Find hidden gems, plan your trip, and connect with locals.
            </p>
            
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white text-lg">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-lg">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-lg">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-lg">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/cities" className="text-gray-400 hover:text-white">Cities</Link></li>
                <li><Link to="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:info@cityexplorer.com" className="text-gray-400 hover:text-white">info@cityexplorer.com</a></li>
                <li><a href="tel:+1234567890" className="text-gray-400 hover:text-white">+1 (234) 567-890</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} City Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;