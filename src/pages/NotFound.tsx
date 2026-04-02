import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-6 animate-float">🔍</div>
        <h1 className="text-6xl font-display font-bold text-dark-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-display font-semibold text-dark-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-dark-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or
          deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            ← Back to Home
          </Link>
          <Link to="/tools" className="btn-secondary">
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
