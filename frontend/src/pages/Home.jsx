import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Approved Components Registry</h1>
      <p>Welcome to our internal component library. Browse and use approved UI components for your projects.</p>
      <Link to="/gallery" className="cta-button">
        Browse Gallery
      </Link>
    </div>
  );
};

export default Home;
