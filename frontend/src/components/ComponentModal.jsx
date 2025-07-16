import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../client';
import CodeBlock from './CodeBlock';

const ComponentModal = ({ component, onClose }) => {
  if (!component) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="modal-header">
            <span className="platform-badge">{component.platform}</span>
            <h2>{component.title}</h2>
            <p className="author">By {component.author || 'Anonymous'}</p>
          </div>

          <div className="modal-grid">
            <div className="modal-image-container">
              {component.previewImage ? (
                <img 
                  src={urlFor(component.previewImage).url()} 
                  alt={component.title} 
                  className="modal-preview-image"
                />
              ) : (
                <div className="image-placeholder">No Preview Available</div>
              )}
            </div>

            <div className="modal-details">
              <h3>Description</h3>
              <div className="description-content">
                {component.description ? (
                  <PortableText value={component.description} />
                ) : (
                  <p>No description provided.</p>
                )}
              </div>
            </div>
          </div>

          <div className="modal-code-section">
            <h3>Code Snippet</h3>
            <CodeBlock code={component.codeSnippet || '// No code provided'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentModal;
