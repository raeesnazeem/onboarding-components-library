import React from 'react';

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h1>Component Gallery</h1>
      <p>Explore our collection of reusable components.</p>
      <div className="component-grid">
        {/* Components from Sanity will be mapped here */}
        <p>Gallery content loading from Sanity soon...</p>
      </div>
    </div>
  );
};

export default Gallery;
