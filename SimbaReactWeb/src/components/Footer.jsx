import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="nav-logo-mark" style={{ color: 'var(--navy)' }}>SB</div>
              <div className="nav-logo-text" style={{ color: 'var(--white)' }}>
                Simba Beverages
                <span style={{ color: 'var(--gold)' }}>Tanzania · Est. 1998</span>
              </div>
            </div>
            <p>
              Providing premium-grade drinking water, zesty carbonated sodas, cold-pressed juices, and high-performance energy drinks to local and regional African markets.
            </p>
            <div className="footer-socials">
              <button className="social-btn">📘</button>
              <button className="social-btn">🐦</button>
              <button className="social-btn">📸</button>
              <button className="social-btn">💼</button>
            </div>
          </div>

          <div className="footer-col">
            <div className="tag" style={{ marginBottom: '14px' }}>Tanzania HQ</div>
            <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              Plot 1204, Industrial Area,<br />
              Dar es Salaam, Tanzania<br /><br />
              sales@simba-beverages.co.tz<br />
              +255 22 212 4455
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Our Story</a></li>
              <li><a href="#products">Products Catalog</a></li>
              <li><a href="#about">Sustainability</a></li>
              <li><a href="#contact">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Partnerships</h4>
            <ul>
              <li><a href="#contact">Become a Distributor</a></li>
              <li><a href="#contact">Retail Distribution</a></li>
              <li><a href="#contact">Corporate Orders</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Simba Beverages Limited. All rights reserved.</span>
          <span>A <span style={{ color: 'var(--gold)' }}>Premidis Group</span> Company · Tanzania</span>
        </div>
      </div>
    </footer>
  );
}

