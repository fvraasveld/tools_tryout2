import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SITE_NAME, CATEGORIES } from '../../utils/constants';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category: string) => {
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(`/?category=${category}`);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-dark-100 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/quicktoolkits.png" 
                alt={SITE_NAME}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xl font-display font-bold text-dark-900 hidden sm:block">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* All Tools Dropdown with better UX */}
            <div 
              ref={dropdownRef}
              className="relative"
            >
              <button 
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1"
              >
                All Tools
                <svg className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                  {CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="w-full text-left px-4 py-3 text-dark-600 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                    >
                      {category} Tools
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-100 bg-white">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-dark-600 hover:text-primary-600 font-medium transition-colors px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              {CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="text-left text-dark-600 hover:text-primary-600 font-medium transition-colors px-2 py-2"
                >
                  {category} Tools
                </button>
              ))}
              <Link to="/about" className="text-dark-600 hover:text-primary-600 font-medium transition-colors px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-dark-600 hover:text-primary-600 font-medium transition-colors px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
