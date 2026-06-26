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
              {/* Simba bottle SVG */}              <svg viewBox="0 0 200 480" style={{ width: '200px', height: 'auto' }}>
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
                  
                  {/* High-Fidelity Vector Lion Face and Gold Crown Logo */}
                  <g id="lion-logo">
                    {/* Gold Crown */}
                    <path d="M-10 -7 Q-5 -9 0 -9 Q5 -9 10 -7 L12 -12 L6 -16 L3 -12 L0 -20 L-3 -12 L-6 -16 L-12 -12 Z" fill="#d4af37"/>
                    {/* Crown Tip Circles */}
                    <circle cx="0" cy="-20" r="1.5" fill="#d4af37"/>
                    <circle cx="-6" cy="-16" r="1.2" fill="#d4af37"/>
                    <circle cx="6" cy="-16" r="1.2" fill="#d4af37"/>
                    <circle cx="-12" cy="-12" r="1.0" fill="#d4af37"/>
                    <circle cx="12" cy="-12" r="1.0" fill="#d4af37"/>
                    
                    {/* Lion Face */}
                    <path d="M-2.5 3 L2.5 3 L1 7 L-1 7 Z" fill="#000000"/>
                    <path d="M-1 7 Q0 8 1 7 Q0 9.5 0 12" stroke="#000000" strokeWidth="0.8" fill="none"/>
                    <path d="M-4 6 Q-2 7 0 6.5 Q2 7 4 6" stroke="#000000" strokeWidth="0.8" fill="none"/>
                    <path d="M-6 -0.5 Q-4 -2.5 -2 -1.5" stroke="#000000" strokeWidth="1.2" fill="none"/>
                    <path d="M2 -1.5 Q4 -2.5 6 -0.5" stroke="#000000" strokeWidth="1.2" fill="none"/>
                    <polygon points="-5,-1 -3,-1.5 -2,-1 -3,-0.5" fill="#000000"/>
                    <polygon points="5,-1 3,-1.5 2,-1 3,-0.5" fill="#000000"/>
                    <path d="M-3 -4 Q0 -5.5 3 -4" stroke="#000000" strokeWidth="0.8" fill="none"/>
                    <path d="M-2.5 -6 Q0 -8 2.5 -6" stroke="#000000" strokeWidth="0.8" fill="none"/>
                    <path d="M-1.5 -8 Q0 -9.5 1.5 -8" stroke="#000000" strokeWidth="0.8" fill="none"/>
                    
                    {/* Symmetrical Mane Locks */}
                    <path d="M-3 -8 L0 -12 L3 -8 L0 -9 Z" fill="#000000"/>
                    <path d="M-2 -10 C-6 -10 -9 -7 -10 -4 L-8 -5 C-7 -7 -5 -8 -2 -8 Z" fill="#000000"/>
                    <path d="M-10 -4 C-13 -3 -15 0 -15 4 L-12 2 C-12 0 -10 -2 -8 -3 Z" fill="#000000"/>
                    <path d="M-15 4 C-16 8 -14 11 -11 13 L-10 10 C-11 9 -12 7 -12 4 Z" fill="#000000"/>
                    <path d="M-11 13 C-8 15 -5 15 -2 13 L-3 11 C-5 12 -7 12 -9 11 Z" fill="#000000"/>
                    <path d="M-6 -8 C-9 -9 -11 -7 -12 -5 L-10 -5 C-9 -6 -8 -7 -6 -7 Z" fill="#000000"/>
                    <path d="M-11 -5 C-13 -4 -14 -1 -14 2 L-12 1 C-12 -1 -11 -2 -10 -3 Z" fill="#000000"/>
                    <path d="M-14 2 C-15 5 -14 8 -12 10 L-10 8 C-11 7 -11 5 -11 3 Z" fill="#000000"/>
                    
                    <path d="M2 -10 C6 -10 9 -7 10 -4 L8 -5 C7 -7 5 -8 2 -8 Z" fill="#000000"/>
                    <path d="M10 -4 C13 -3 15 0 15 4 L12 2 C12 0 10 -2 8 -3 Z" fill="#000000"/>
                    <path d="M15 4 C16 8 14 11 11 13 L10 10 C11 9 12 7 12 4 Z" fill="#000000"/>
                    <path d="M11 13 C8 15 5 15 2 13 L3 11 C5 12 7 12 9 11 Z" fill="#000000"/>
                    <path d="M6 -8 C9 -9 11 -7 12 -5 L10 -5 C9 -6 8 -7 6 -7 Z" fill="#000000"/>
                    <path d="M11 -5 C13 -4 14 -1 14 2 L12 1 C12 -1 11 -2 10 -3 Z" fill="#000000"/>
                    <path d="M14 2 C15 5 14 8 12 10 L10 8 C11 7 11 5 11 3 Z" fill="#000000"/>
                    
                    <path d="M0 12 L-2 15 L0 18 L2 15 Z" fill="#000000"/>
                    <path d="M-3 11 L-5 14 L-2 15 L-1 13 Z" fill="#000000"/>
                    <path d="M3 11 L5 14 L2 15 L1 13 Z" fill="#000000"/>
                  </g>
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

                {/* NECK (Clear green glass) */}
                <path d="M75 45 Q65 80 60 110 L140 110 Q135 80 125 45 Z" fill="url(#hero-bot-liq-grad)"/>
                <path d="M75 45 Q65 80 60 110 L140 110 Q135 80 125 45 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>

                {/* BODY (Green Glass base) */}
                <path d="M60 110 Q40 130 38 170 L38 360 Q38 400 100 410 Q162 400 162 360 L162 170 Q160 130 140 110 Z" fill="url(#hero-bot-liq-grad)"/>
                <path d="M60 110 Q40 130 38 170 L38 360 Q38 400 100 410 Q162 400 162 360 L162 170 Q160 130 140 110 Z" fill="none" stroke="rgba(129,199,132,0.35)" strokeWidth="2.2"/>

                {/* SHOULDER WRAPPER (White sleeve) */}
                <path d="M60 110 Q40 130 38 170 L38 246 L162 246 L162 170 Q160 130 140 110 Z" fill="url(#hero-bot-wrap-grad)"/>

                {/* DECORATIVE CHEVRON BAND */}
                {/* Border lines */}
                <line x1="60" y1="108" x2="140" y2="108" stroke="#311b0b" strokeWidth="0.8"/>
                <line x1="60" y1="114" x2="140" y2="114" stroke="#311b0b" strokeWidth="0.8"/>
                {/* Zigzags */}
                <path d="M60 108 L 64 114 L 68 108 L 72 114 L 76 108 L 80 114 L 84 108 L 88 114 L 92 108 L 96 114 L 100 108 L 104 114 L 108 108 L 112 114 L 116 108 L 120 114 L 124 108 L 128 114 L 132 108 L 136 114 L 140 108" stroke="#311b0b" strokeWidth="0.8" fill="none"/>

                {/* LABEL (Dark Brown body label) */}
                <rect x="38" y="246" width="124" height="94" fill="#311b0b"/>

                {/* Badge Circle & Logo */}
                <circle cx="100" cy="212" r="18" fill="#ffffff" stroke="#d4af37" strokeWidth="1.2"/>
                <use href="#lion-logo" x="100" y="212" />

                {/* Brand Texts on Dark Brown */}
                <text x="100" y="268" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="#ffffff" letterSpacing="0.8">VIN</text>
                <text x="100" y="282" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="none" stroke="#ffffff" strokeWidth="2.2" letterSpacing="0.8">NKOLO</text>
                <text x="100" y="282" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="none" stroke="#311b0b" strokeWidth="0.8" letterSpacing="0.8">NKOLO</text>
                <text x="100" y="296" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="none" stroke="#ffffff" strokeWidth="2.2" letterSpacing="0.8">MBOKA</text>
                <text x="100" y="296" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="none" stroke="#311b0b" strokeWidth="0.8" letterSpacing="0.8">MBOKA</text>
                <text x="100" y="306" text-anchor="middle" fontFamily="Inter,sans-serif" fontSize="4.2" fill="#d4af37" letterSpacing="0.2">GINGER-BASED ALCOHOLIC BEVERAGE</text>

                {/* Red Swahili banner */}
                <rect x="38" y="318" width="124" height="22" fill="#b71c1c" />
                <text x="100" y="331" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="4.2" fill="#ffffff" letterSpacing="0.1">NGUVU YA SIMBA, FAHARI YA TANZANIA</text>

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

