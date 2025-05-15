import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found d-flex flex-column align-items-center justify-content-center py-5">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-5">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link to="/" className="btn btn-primary px-4 py-2">
          <i className="bi bi-house-door me-2"></i>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;