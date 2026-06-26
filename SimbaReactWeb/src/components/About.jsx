import React from 'react';

export default function About() {
  const features = [
    { icon: '🧪', title: '7-Stage Purification', desc: 'Tested and double-filtered to exceed standard health guidelines.' },
    { icon: '🌿', title: 'Natural Springs', desc: 'Sourced from deep, protected underground mineral aquifers.' },
    { icon: '🇹🇿', title: '100% Tanzanian Owned', desc: 'Locally staffed and manufactured in Dar es Salaam Province.' },
    { icon: '♻️', title: 'Recyclable Packaging', desc: 'Minimizing environmental footprint with 100% recyclable bottles.' }
  ];

  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-img-frame">
            <div className="about-illustration">
              <svg viewBox="0 0 200 200" style={{ width: '80%', height: 'auto' }}>
                {/* Aquifer flow visualization SVG */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" strokeDasharray="5,5" />
                <path d="M40 100 Q100 60 160 100 T280 100" fill="none" stroke="url(#flowGrad)" strokeWidth="4" strokeLinecap="round" />
                <path d="M20 120 Q100 80 180 120 T340 120" fill="none" stroke="url(#flowGrad)" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
                <defs>
                  <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#c9a84c" />
                    <stop offset="50%" stopColor="#29b6f6" />
                    <stop offset="100%" stopColor="#e8c96b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="about-badge">
              <strong>28+</strong>
              <span>Years of<br />Purity</span>
            </div>
          </div>
        </div>

        <div className="about-text">
          <div className="tag">Our Heritage</div>
          <h2>Purity Sourced from protected springs</h2>
          <p>
            Simba Beverages operates deep-well purification facilities, leveraging state-of-the-art filtration, ozone treatment, and packaging processes. We ensure that our water retains essential natural minerals for a crisp, refreshing, and balanced taste.
          </p>
          <p>
            Proudly based in Dar es Salaam, Tanzania, we supply retail partners, wholesalers, corporate offices, and local communities with beverages that meet the highest standards of safety, quality, and hydration.
          </p>

          <div className="about-features">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

