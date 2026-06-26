import React from 'react';

export const PRODUCT_DATA = {
  "Nkolo Mboka": {
    category: "Traditional Wine",
    desc: "A premium traditional wine crafted with natural ingredients, offering a rich and authentic taste of African heritage. Perfectly matured and blended.",
    sizes: ["750ml", "1L"],
    basePrice: 14.50,
    gradient: "linear-gradient(135deg, #1e0a12, #441624)",
    svg: (
      <svg viewBox="0 0 160 220" style={{ width: '100px', height: 'auto', position: 'relative', zIndex: 1 }}>
        <rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p1cap)" />
        <path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p1body)" />
        <path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p1body)" />
        <rect x="42" y="110" width="76" height="80" rx="6" fill="#060e1c" opacity=".7" />
        <text x="80" y="148" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="10" fontWeight="700" fill="#c9a84c">SIMBA</text>
        <text x="80" y="163" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="5.5" fill="#e8c96b" letterSpacing="1.5">NKOLO MBOKA</text>
        <text x="80" y="180" textAnchor="middle" fontSize="12" fill="#ef5350">🍇</text>
        <path d="M56 72 Q58 140 54 188" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
        <defs>
          <linearGradient id="p1cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#e8c96b" />
          </linearGradient>
          <linearGradient id="p1body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5a0f2b" stopOpacity=".9" />
            <stop offset="100%" stopColor="#2e0716" stopOpacity=".95" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  "Ola Kombucha": {
    category: "Probiotic Tea",
    desc: "Naturally fermented sparkling kombucha tea packed with probiotics and organic nutrients. A crisp, healthy beverage that refreshes and revitalizes.",
    sizes: ["330ml Can", "500ml"],
    basePrice: 11.00,
    gradient: "linear-gradient(135deg, #1a1006, #3d2314)",
    svg: (
      <svg viewBox="0 0 160 220" style={{ width: '100px', height: 'auto', position: 'relative', zIndex: 1 }}>
        <rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p2cap)" />
        <path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p2body)" />
        <path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p2body)" />
        <rect x="42" y="105" width="76" height="85" rx="6" fill="#0a1a06" opacity=".8" />
        <text x="80" y="143" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="11" fontWeight="700" fill="#c9a84c">SIMBA</text>
        <text x="80" y="158" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="6" fill="#a5d6a7" letterSpacing="1.5">OLA KOMBUCHA</text>
        <text x="80" y="175" textAnchor="middle" fontSize="14" fill="#aed581">🍃</text>
        <path d="M56 72 Q58 140 54 188" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
        <defs>
          <linearGradient id="p2cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8d4f16" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
          <linearGradient id="p2body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4e2508" stopOpacity=".9" />
            <stop offset="100%" stopColor="#2c1404" stopOpacity=".95" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  "Ginger Punch": {
    category: "Spiced Beverage",
    desc: "Zesty, fiery, and bold ginger beverage brewed from finest local ginger root and natural spices. Delivers a refreshing kick in every glass.",
    sizes: ["330ml Can", "500ml", "1.5L"],
    basePrice: 12.50,
    gradient: "linear-gradient(135deg, #1a1a06, #3d3a14)",
    svg: (
      <svg viewBox="0 0 160 220" style={{ width: '100px', height: 'auto', position: 'relative', zIndex: 1 }}>
        <rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p3cap)" />
        <path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p3body)" />
        <path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p3body)" />
        <rect x="42" y="105" width="76" height="85" rx="6" fill="#1a0606" opacity=".8" />
        <text x="80" y="143" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="11" fontWeight="700" fill="#c9a84c">SIMBA</text>
        <text x="80" y="158" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="6" fill="#ef9a9a" letterSpacing="1.5">GINGER PUNCH</text>
        <text x="80" y="175" textAnchor="middle" fontSize="14" fill="#ef5350">🍋</text>
        <path d="M56 72 Q58 140 54 188" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
        <defs>
          <linearGradient id="p3cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#ffd600" />
          </linearGradient>
          <linearGradient id="p3body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6e500a" stopOpacity=".9" />
            <stop offset="100%" stopColor="#3d2c05" stopOpacity=".95" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  "Hard Rock": {
    category: "Energy Drink",
    desc: "High-performance energy drink formulated to deliver sustained physical stamina and mental focus. Packed with B-vitamins, taurine, and natural caffeine.",
    sizes: ["250ml Can", "500ml Can"],
    basePrice: 18.00,
    gradient: "linear-gradient(135deg, #0e051c, #2a0b4e)",
    svg: (
      <svg viewBox="0 0 160 220" style={{ width: '100px', height: 'auto', position: 'relative', zIndex: 1 }}>
        <rect x="58" y="3" width="44" height="24" rx="6" fill="url(#p4cap)" />
        <path d="M58 27 Q48 50 46 72 L114 72 Q112 50 102 27Z" fill="url(#p4body)" />
        <path d="M46 72 Q32 88 30 114 L30 186 Q30 218 80 220 Q130 218 130 186 L130 114 Q128 88 114 72Z" fill="url(#p4body)" />
        <rect x="38" y="110" width="84" height="82" rx="6" fill="#0a0a04" opacity=".85" />
        <text x="80" y="147" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="10" fontWeight="700" fill="#ffd600">SIMBA</text>
        <text x="80" y="161" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="5.5" fill="#ffee58" letterSpacing="1.5">HARD ROCK</text>
        <text x="80" y="180" textAnchor="middle" fontSize="14">⚡</text>
        <path d="M52 74 Q54 144 50 188" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
        <defs>
          <linearGradient id="p4cap" x1="58" y1="0" x2="102" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffd600" />
            <stop offset="100%" stopColor="#ffee58" />
          </linearGradient>
          <linearGradient id="p4body" x1="30" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3a0f7e" stopOpacity=".95" />
            <stop offset="100%" stopColor="#160438" stopOpacity=".98" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
};

export default function Products({ onProductSelect }) {
  return (
    <section id="products" className="section">
      <div className="container">
        <div className="section-head">
          <div className="tag">Portfolio</div>
          <h2>Our Products</h2>
          <p>Explore our premium range of mineral water, carbonated refreshments, energy enhancers, and natural nectars.</p>
        </div>

        <div className="products-grid">
          {Object.entries(PRODUCT_DATA).map(([name, p]) => (
            <div key={name} className="product-card reveal" onClick={() => onProductSelect(name)}>
              <div className="product-img" style={{ background: p.gradient }}>
                {p.svg}
              </div>
              <div className="product-body">
                <div className="product-category">{p.category}</div>
                <h3>{name}</h3>
                <p>{p.desc}</p>
                <div className="product-tag-row">
                  {p.sizes.map(s => (
                    <span key={s} className="ptag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

