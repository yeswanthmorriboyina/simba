import React, { useState, useEffect } from 'react';

export default function Hero({ onExplorePress, onB2BPress }) {
  const [years, setYears] = useState(0);
  const [purified, setPurified] = useState(0);
  const [owned, setOwned] = useState(0);

  useEffect(() => {
    // Count up animations
    const countUp = (setter, target, duration) => {
      let start = 0;
      const step = target / (duration / 30);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 30);
      return timer;
    };

    const t1 = countUp(setYears, 28, 1200);
    const t2 = countUp(setPurified, 7, 1200);
    const t3 = countUp(setOwned, 100, 1200);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
    };
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line"></div>
            <span>Premium Quality · Tanzania</span>
          </div>
          <h1 className="hero-title">
            Pure Tanzania,<br />
            <em>Refreshed</em> Daily
          </h1>
          <p className="hero-desc">
            Crafting Tanzania's finest natural mineral water, sparkling juices, and high-performance energy drinks since 1998. Sourced from natural aquifers and purified using state-of-the-art filtration.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-gold" onClick={onExplorePress}>Explore Products</button>
            <button className="btn btn-outline" onClick={onB2BPress}>B2B Wholesale Portal</button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">{years}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div>
              <div className="stat-num">{purified}-Stage</div>
              <div className="stat-label">Purification</div>
            </div>
            <div>
              <div className="stat-num">{owned}%</div>
              <div className="stat-label">Tanzanian Owned</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-bottle-wrap">
            <div className="bottle-glow"></div>
            <div className="bottle-ring bottle-ring-1"></div>
            <div className="bottle-ring bottle-ring-2"></div>
            <div className="bottle-ring bottle-ring-3"></div>
            <div className="svg-bottle">
              {/* Simba bottle SVG */}
              <svg viewBox="0 0 160 220" style={{ width: '200px', height: 'auto' }}>
                <rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p1cap)" />
                <path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p1body)" />
                <path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p1body)" />
                <rect x="42" y="110" width="76" height="80" rx="6" fill="#060e1c" opacity=".7" />
                <text x="80" y="148" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="11" fontWeight="700" fill="#c9a84c">SIMBA</text>
                <text x="80" y="163" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="6" fill="#e8c96b" letterSpacing="2">PURE WATER</text>
                <text x="80" y="180" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="8" fill="#6a8abf">500ml</text>
                <path d="M56 72 Q58 140 54 188" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="p1cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c9a84c" />
                    <stop offset="100%" stopColor="#e8c96b" />
                  </linearGradient>
                  <linearGradient id="p1body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a4a7e" stopOpacity=".9" />
                    <stop offset="100%" stopColor="#0f2040" stopOpacity=".95" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

