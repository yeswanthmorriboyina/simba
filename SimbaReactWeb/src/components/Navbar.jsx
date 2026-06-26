import React, { useState, useEffect } from 'react';

export default function Navbar({ onCatalogPress, onContactPress }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo">
        <div className="nav-logo-mark">SB</div>
        <div className="nav-logo-text">
          Simba Beverages
          <span>Tanzania · Est. 1998</span>
        </div>
      </div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#products" onClick={(e) => { e.preventDefault(); onCatalogPress(); }}>Products</a>
        <a href="#values">Why Us</a>
        <a href="#sustainability">Sustainability</a>
        <a href="#contact" className="btn btn-gold" onClick={(e) => { e.preventDefault(); onContactPress(); }}>Get In Touch</a>
      </div>
    </nav>
  );
}

