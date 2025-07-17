import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../client';
import CodeBlock from '../components/CodeBlock';
import ComponentModal from '../components/ComponentModal';

const platforms = ['All', 'React', 'Vue', 'Svelte', 'HTML/CSS', 'Tailwind'];

const Gallery = () => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading components...</p>
      </div>
    );
  }

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
              <div className="card-image" onClick={() => setSelectedComponent(component)}>
                {component.previewImage ? (
                  <img src={urlFor(component.previewImage).url()} alt={component.title} />
                ) : (
                  <div className="image-placeholder">No Preview</div>
                )}
              </div>
              <div className="card-content">
                <span className="platform-badge">{component.platform}</span>
                <h3>{component.title}</h3>
                <p className="author">By {component.author || 'Anonymous'}</p>
                <div className="card-actions">
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedComponent(component)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No components found</h3>
            <p>Try selecting a different platform filter.</p>
          </div>
        )}
      </div>

      {selectedComponent && (
        <ComponentModal 
          component={selectedComponent} 
          onClose={() => setSelectedComponent(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;
