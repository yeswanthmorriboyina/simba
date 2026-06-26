import React, { useState, useEffect } from 'react';
import { PRODUCT_DATA } from './Products';

export default function ProductModal({ isOpen, productName, onClose, onEnquire }) {
  const [activeSizeIdx, setActiveSizeIdx] = useState(0);

  const p = PRODUCT_DATA[productName];

  useEffect(() => {
    setActiveSizeIdx(0);
  }, [productName]);

  if (!isOpen || !p) return null;

  // Nutritional Specs Profile mapping
  const specsDatabase = {
    "Nkolo Mboka": { "Alcohol Content": "12% Vol", "Sugars": "6.5g/100ml", "Energy": "72 kcal", "Ingredients": "Fermented Grapes & Herbs" },
    "Ola Kombucha": { "Probiotics Count": "1 Billion CFU", "Energy": "22 kcal", "Sugars": "4.2g/100ml", "Organic Acids": "0.5%" },
    "Ginger Punch": { "Ginger Extract": "15%", "Energy": "38 kcal", "Sugars": "9.2g/100ml", "Sodium": "8mg" },
    "Hard Rock": { "Energy": "46 kcal", "Caffeine": "32mg/100ml", "Taurine": "400mg/100ml", "Vitamin B12": "1.5mcg" }
  };

  const specs = specsDatabase[productName] || {};

  return (
    <div id="product-modal" className={`modal-overlay active`} onClick={(e) => { if (e.target.id === 'product-modal') onClose(); }}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <div id="modal-card-content" style={{ display: 'contents' }}>
          <div className="modal-visual-panel">
            {p.svg}
          </div>
          <div className="modal-info-panel">
            <div className="modal-category">{p.category}</div>
            <h2>{productName}</h2>
            <p className="modal-desc">{p.desc} Sourced cleanly and bottled under high hygienic standards to deliver optimal taste and freshness.</p>
            
            <div className="modal-specs-title">Nutritional Information / Profile</div>
            <div className="modal-specs-grid">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="modal-spec-item">
                  <span className="modal-spec-label">{key}</span>
                  <span className="modal-spec-val">{value}</span>
                </div>
              ))}
            </div>

            <div className="modal-specs-title">Available Packaging</div>
            <div className="modal-sizes">
              {p.sizes.map((size, idx) => (
                <button
                  key={size}
                  className={`modal-size-btn ${idx === activeSizeIdx ? 'active' : ''}`}
                  onClick={() => setActiveSizeIdx(idx)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
              <button className="btn btn-gold" onClick={() => onEnquire(productName)}>Enquire B2B Pricing →</button>
              <button className="btn btn-outline" onClick={onClose}>Close Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
