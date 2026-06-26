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
              <svg viewBox="0 0 200 480" style={{ width: '200px', height: 'auto' }}>
                <defs>
                  <linearGradient id="hero-cap-green" x1="75" y1="0" x2="125" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1b5e20"/>
                    <stop offset="35%" stopColor="#2e7d32"/>
                    <stop offset="65%" stopColor="#4caf50"/>
                    <stop offset="100%" stopColor="#0d5c14"/>
                  </linearGradient>
                  <linearGradient id="hero-bot-liq-grad" x1="38" y1="0" x2="162" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0f3d1b"/>
                    <stop offset="50%" stopColor="#1b5e20"/>
                    <stop offset="100%" stopColor="#092410"/>
                  </linearGradient>
                  <linearGradient id="hero-bot-wrap-grad" x1="38" y1="0" x2="162" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e8e5dc"/>
                    <stop offset="35%" stopColor="#f7f4ee"/>
                    <stop offset="70%" stopColor="#ffffff"/>
                    <stop offset="100%" stopColor="#d9d6cd"/>
                  </linearGradient>
                  <clipPath id="hero-label-clip">
                    <rect x="46" y="180" width="108" height="140" rx="10" />
                  </clipPath>
                </defs>

                {/* CAP */}
                <rect x="75" y="10" width="50" height="32" rx="3" fill="url(#hero-cap-green)"/>
                <rect x="80" y="6" width="40" height="10" rx="2" fill="url(#hero-cap-green)"/>
                {/* Cap Ribs */}
                <line x1="81" y1="10" x2="81" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>
                <line x1="87" y1="10" x2="87" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>
                <line x1="93" y1="10" x2="93" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>
                <line x1="99" y1="10" x2="99" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>
                <line x1="105" y1="10" x2="105" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>
                <line x1="111" y1="10" x2="111" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>
                <line x1="117" y1="10" x2="117" y2="42" stroke="#1b5e20" strokeWidth="1.8"/>

                {/* NECK (White wrapper sleeve) */}
                <path d="M75 45 Q65 80 60 110 L140 110 Q135 80 125 45 Z" fill="url(#hero-bot-wrap-grad)"/>
                <path d="M75 45 Q65 80 60 110 L140 110 Q135 80 125 45 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>

                {/* BODY */}
                <path d="M60 110 Q40 130 38 170 L38 360 Q38 400 100 410 Q162 400 162 360 L162 170 Q160 130 140 110 Z" fill="url(#hero-bot-liq-grad)"/>
                <path d="M60 110 Q40 130 38 170 L38 360 Q38 400 100 410 Q162 400 162 360 L162 170 Q160 130 140 110 Z" fill="none" stroke="rgba(129,199,132,0.35)" strokeWidth="2.2"/>

                {/* LABEL (Split White/Brown with Lion & Crown) */}
                <g clipPath="url(#hero-label-clip)">
                  {/* Top Half White */}
                  <rect x="46" y="180" width="108" height="66" fill="#f7f4ee" />
                  {/* Bottom Half Dark Brown */}
                  <rect x="46" y="246" width="108" height="74" fill="#311b0b" />
                  
                  {/* Lion Circle & Gold Crown */}
                  <circle cx="100" cy="212" r="18" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="2,1" />
                  <path d="M92 186 L95 190 L100 186 L105 190 L108 186 L105 193 L95 193 Z" fill="#d4af37" />
                  <text x="100" y="218" textAnchor="middle" fontSize="20">🦁</text>

                  {/* Brand Texts on Dark Brown */}
                  <text x="100" y="262" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="11.5" fill="#ffffff" letterSpacing="0.8">VIN</text>
                  <text x="100" y="275" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="11.5" fill="#ffffff" letterSpacing="0.8">NKOLO</text>
                  <text x="100" y="288" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="11.5" fill="#ffffff" letterSpacing="0.8">MBOKA</text>
                  <text x="100" y="297" text-anchor="middle" fontFamily="Inter,sans-serif" fontSize="4.2" fill="#d4af37" letterSpacing="0.2">GINGER-BASED ALCOHOLIC BEVERAGE</text>
                  
                  {/* Red Swahili banner */}
                  <rect x="46" y="304" width="108" height="16" fill="#b71c1c" />
                  <text x="100" y="315" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="3.6" fill="#ffffff" letterSpacing="0.1">NGUVU YA SIMBA, FAHARI YA TANZANIA</text>
                </g>

                <path d="M70 115 Q72 200 68 360" stroke="rgba(255,255,255,0.15)" strokeWidth="6" strokeLinecap="round"/>
                <path d="M80 113 Q82 160 80 240" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

