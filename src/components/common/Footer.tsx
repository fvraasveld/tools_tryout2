import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, CATEGORIES, SITE_CONFIG } from '../../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/quicktoolkits.png" 
                alt={SITE_NAME}
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-display font-bold">{SITE_NAME}</span>
            </div>
            <p className="text-dark-300 text-sm mb-4">
              Your all-in-one platform for free online tools and utilities.
            </p>
            {/* Support Button */}
            <a
              href={SITE_CONFIG.SUPPORT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-dark-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <span>☕</span>
              <span>Support Us</span>
            </a>
          </div>

          {/* Tool Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tool Categories</h3>
            <ul className="space-y-2 text-dark-300 text-sm">
              {CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                <li key={category}>
                  <Link to={`/?category=${category}`} className="hover:text-white transition-colors">
                    {category} Tools
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-400 text-sm">
          <p>
            &copy; {currentYear} {SITE_NAME}. Made with ❤️ for the internet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
