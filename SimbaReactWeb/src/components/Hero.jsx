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
              {/* Simba Premium Amber Bottle SVG */}
              <svg viewBox="0 0 200 480" style={{ width: '200px', height: 'auto' }}>
                <defs>
                  <linearGradient id="hb-cap" x1="78" y1="0" x2="122" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6b4c11"/><stop offset="30%" stopColor="#c9a84c"/>
                    <stop offset="60%" stopColor="#e8c96b"/><stop offset="100%" stopColor="#8a6010"/>
                  </linearGradient>
                  <linearGradient id="hb-foil" x1="78" y1="0" x2="122" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7a5a10"/><stop offset="40%" stopColor="#d4af37"/>
                    <stop offset="70%" stopColor="#f0d060"/><stop offset="100%" stopColor="#6b4c11"/>
                  </linearGradient>
                  <linearGradient id="hb-glass" x1="38" y1="0" x2="162" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a0800"/><stop offset="25%" stopColor="#3d1c00"/>
                    <stop offset="55%" stopColor="#5c2a00"/><stop offset="80%" stopColor="#3d1c00"/>
                    <stop offset="100%" stopColor="#1a0800"/>
                  </linearGradient>
                  <linearGradient id="hb-shine" x1="38" y1="0" x2="162" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgba(255,180,80,0)"/>
                    <stop offset="30%" stopColor="rgba(255,180,80,0.12)"/>
                    <stop offset="55%" stopColor="rgba(255,220,130,0.22)"/>
                    <stop offset="80%" stopColor="rgba(255,180,80,0.08)"/>
                    <stop offset="100%" stopColor="rgba(255,180,80,0)"/>
                  </linearGradient>
                  <linearGradient id="hb-label" x1="38" y1="220" x2="162" y2="340" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f5f0e8"/><stop offset="100%" stopColor="#ede5d0"/>
                  </linearGradient>
                  <linearGradient id="hb-badge" x1="82" y1="186" x2="118" y2="222" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2c1a00"/><stop offset="100%" stopColor="#1a0e00"/>
                  </linearGradient>
                  <g id="lion-logo-h">
                    <path d="M-10 -7 Q-5 -9 0 -9 Q5 -9 10 -7 L12 -12 L6 -16 L3 -12 L0 -20 L-3 -12 L-6 -16 L-12 -12 Z" fill="#d4af37"/>
                    <circle cx="0" cy="-20" r="1.5" fill="#d4af37"/><circle cx="-6" cy="-16" r="1.2" fill="#d4af37"/>
                    <circle cx="6" cy="-16" r="1.2" fill="#d4af37"/><circle cx="-12" cy="-12" r="1" fill="#d4af37"/><circle cx="12" cy="-12" r="1" fill="#d4af37"/>
                    <path d="M-2.5 3 L2.5 3 L1 7 L-1 7 Z" fill="#000"/><path d="M-1 7 Q0 8 1 7 Q0 9.5 0 12" stroke="#000" strokeWidth="0.8" fill="none"/>
                    <path d="M-4 6 Q-2 7 0 6.5 Q2 7 4 6" stroke="#000" strokeWidth="0.8" fill="none"/>
                    <path d="M-6 -0.5 Q-4 -2.5 -2 -1.5" stroke="#000" strokeWidth="1.2" fill="none"/><path d="M2 -1.5 Q4 -2.5 6 -0.5" stroke="#000" strokeWidth="1.2" fill="none"/>
                    <polygon points="-5,-1 -3,-1.5 -2,-1 -3,-0.5" fill="#000"/><polygon points="5,-1 3,-1.5 2,-1 3,-0.5" fill="#000"/>
                    <path d="M-3 -4 Q0 -5.5 3 -4" stroke="#000" strokeWidth="0.8" fill="none"/><path d="M-2.5 -6 Q0 -8 2.5 -6" stroke="#000" strokeWidth="0.8" fill="none"/>
                    <path d="M-3 -8 L0 -12 L3 -8 L0 -9 Z" fill="#000"/>
                    <path d="M-2 -10 C-6 -10 -9 -7 -10 -4 L-8 -5 C-7 -7 -5 -8 -2 -8 Z" fill="#000"/>
                    <path d="M-10 -4 C-13 -3 -15 0 -15 4 L-12 2 C-12 0 -10 -2 -8 -3 Z" fill="#000"/>
                    <path d="M-15 4 C-16 8 -14 11 -11 13 L-10 10 C-11 9 -12 7 -12 4 Z" fill="#000"/>
                    <path d="M-11 13 C-8 15 -5 15 -2 13 L-3 11 C-5 12 -7 12 -9 11 Z" fill="#000"/>
                    <path d="M2 -10 C6 -10 9 -7 10 -4 L8 -5 C7 -7 5 -8 2 -8 Z" fill="#000"/>
                    <path d="M10 -4 C13 -3 15 0 15 4 L12 2 C12 0 10 -2 8 -3 Z" fill="#000"/>
                    <path d="M15 4 C16 8 14 11 11 13 L10 10 C11 9 12 7 12 4 Z" fill="#000"/>
                    <path d="M11 13 C8 15 5 15 2 13 L3 11 C5 12 7 12 9 11 Z" fill="#000"/>
                    <path d="M0 12 L-2 15 L0 18 L2 15 Z" fill="#000"/>
                    <path d="M-3 11 L-5 14 L-2 15 L-1 13 Z" fill="#000"/><path d="M3 11 L5 14 L2 15 L1 13 Z" fill="#000"/>
                  </g>
                </defs>
                {/* ══ CAP (gold screw-top) — slender ══ */}
                <rect x="86" y="5" width="28" height="8" rx="2" fill="url(#hb-cap)"/>
                <rect x="80" y="12" width="40" height="30" rx="3" fill="url(#hb-cap)"/>
                <line x1="86" y1="12" x2="86" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <line x1="91" y1="12" x2="91" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <line x1="96" y1="12" x2="96" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <line x1="101" y1="12" x2="101" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <line x1="106" y1="12" x2="106" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <line x1="111" y1="12" x2="111" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <line x1="116" y1="12" x2="116" y2="42" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
                <rect x="80" y="14" width="40" height="5" rx="1" fill="rgba(255,220,100,0.25)"/>

                {/* ══ GOLD FOIL NECK ══ */}
                <path d="M80 42 Q74 60 72 80 L128 80 Q126 60 120 42 Z" fill="url(#hb-foil)"/>
                <line x1="86" y1="42" x2="82" y2="80" stroke="rgba(100,70,10,0.4)" strokeWidth="0.8"/>
                <line x1="100" y1="42" x2="100" y2="80" stroke="rgba(255,230,120,0.3)" strokeWidth="0.6"/>
                <line x1="114" y1="42" x2="118" y2="80" stroke="rgba(100,70,10,0.4)" strokeWidth="0.8"/>
                <line x1="72" y1="78" x2="128" y2="78" stroke="#d4af37" strokeWidth="1.2"/>
                <line x1="72" y1="81" x2="128" y2="81" stroke="#8a6010" strokeWidth="0.6"/>

                {/* ══ GLASS BODY (slender deep amber) ══ */}
                <path d="M72 80 Q62 105 60 140 L60 380 Q60 420 100 426 Q140 420 140 380 L140 140 Q138 105 128 80 Z" fill="url(#hb-glass)"/>
                <path d="M72 80 Q62 105 60 140 L60 380 Q60 420 100 426 Q140 420 140 380 L140 140 Q138 105 128 80 Z" fill="url(#hb-shine)"/>
                <path d="M72 80 Q62 105 60 140 L60 380 Q60 420 100 426 Q140 420 140 380 L140 140 Q138 105 128 80 Z" fill="none" stroke="rgba(201,140,30,0.4)" strokeWidth="2"/>

                {/* ══ GOLD SHOULDER BAND ══ */}
                <rect x="60" y="218" width="80" height="6" fill="#c9a84c" rx="1"/>
                <rect x="60" y="223" width="80" height="2" fill="#8a6010"/>

                {/* ══ CREAM LABEL ══ */}
                <rect x="62" y="222" width="76" height="135" rx="4" fill="url(#hb-label)"/>
                <rect x="62" y="222" width="76" height="135" rx="4" fill="none" stroke="#c9a84c" strokeWidth="2.2"/>
                <rect x="67" y="227" width="66" height="125" rx="2" fill="none" stroke="#c9a84c" strokeWidth="0.8"/>

                {/* Lion badge */}
                <circle cx="100" cy="255" r="17" fill="url(#hb-badge)" stroke="#d4af37" strokeWidth="1.5"/>
                <circle cx="100" cy="255" r="12" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.7"/>
                <g transform="translate(100,255) scale(0.72)"><use href="#lion-logo-h"/></g>

                {/* Brand name */}
                <text x="100" y="283" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="8" fill="#1a0e00" letterSpacing="1.5">VIN</text>
                <line x1="72" y1="286" x2="128" y2="286" stroke="#c9a84c" strokeWidth="0.7"/>
                <text x="100" y="297" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="10.5" fill="#1a0e00" letterSpacing="1.5">NKOLO</text>
                <text x="100" y="310" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="10.5" fill="#1a0e00" letterSpacing="1.5">MBOKA</text>
                <line x1="72" y1="314" x2="128" y2="314" stroke="#c9a84c" strokeWidth="0.7"/>
                <text x="100" y="323" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="3.2" fill="#6b4c11" letterSpacing="0.8">GINGER-BASED ALCOHOLIC BEVERAGE</text>
                <text x="100" y="332" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="3.0" fill="#8a6010" letterSpacing="0.4">330 ml · 12% Vol · Dar es Salaam</text>

                {/* ══ RED BANNER ══ */}
                <rect x="62" y="357" width="76" height="18" rx="2" fill="#b71c1c"/>
                <text x="100" y="368" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="2.8" fill="#ffffff" letterSpacing="0.1">NGUVU YA SIMBA · FAHARI YA TANZANIA</text>

                {/* Glass sheens */}
                <path d="M66 84 Q63 200 66 390" stroke="rgba(255,180,80,0.18)" strokeWidth="7" strokeLinecap="round"/>
                <path d="M72 82 Q70 160 72 340" stroke="rgba(255,220,140,0.12)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M80 84 Q100 90 120 84" stroke="rgba(255,220,100,0.25)" strokeWidth="3" strokeLinecap="round"/>
                <ellipse cx="100" cy="422" rx="40" ry="5" fill="rgba(100,50,0,0.35)"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

