import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../client';

const platforms = ['All', 'React', 'Vue', 'Svelte', 'HTML/CSS', 'Tailwind'];

const Gallery = () => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "component"] | order(createdAt desc)';
    client.fetch(query).then((data) => {
      setComponents(data);
      setFilteredComponents(data);
      setLoading(false);
    });
  }, []);

  const handleFilter = (platform) => {
    setActiveFilter(platform);
    if (platform === 'All') {
      setFilteredComponents(components);
    } else {
      setFilteredComponents(
        components.filter((c) => c.platform.toLowerCase() === platform.toLowerCase())
      );
    }
  };

  if (loading) return <div className="loading">Loading components...</div>;

  return (
    <div className="gallery-container">
      <h1>Component Gallery</h1>
      <p>Explore our collection of reusable components.</p>

      <div className="filter-container">
        {platforms.map((platform) => (
          <button
            key={platform}
            className={`filter-btn ${activeFilter === platform ? 'active' : ''}`}
            onClick={() => handleFilter(platform)}
          >
            {platform}
          </button>
        ))}
      </div>

      <div className="component-grid">
        {filteredComponents.length > 0 ? (
          filteredComponents.map((component) => (
            <div key={component._id} className="component-card">
              {component.previewImage && (
                <div className="card-image">
                  <img src={urlFor(component.previewImage).url()} alt={component.title} />
                </div>
              )}
              <div className="card-content">
                <span className="platform-badge">{component.platform}</span>
                <h3>{component.title}</h3>
                <p className="author">By {component.author || 'Anonymous'}</p>
                <div className="card-actions">
                  <button className="view-btn">View Code</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No components found for this platform.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
