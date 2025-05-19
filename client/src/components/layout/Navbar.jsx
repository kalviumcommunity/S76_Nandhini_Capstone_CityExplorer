import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display text-primary font-bold">
          City Explorer
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/cities" className="hover:text-primary">Cities</Link>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-primary">
                {user?.username}
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-outline hover:text-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary">Login</Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-dark"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-md">
          <nav className="flex flex-col space-y-4 mb-4">
            <Link 
              to="/" 
              className="hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/cities" 
              className="hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Cities
            </Link>
          </nav>
          
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="hover:text-primary"
                  onClick={toggleMobileMenu}
                >
                  {user?.username}
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="btn btn-outline hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-primary"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;