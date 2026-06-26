import React, { useState, useEffect } from 'react';

export default function ContactForm({ initialMessage, initialRole }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Distributor / Wholesaler');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialMessage, initialRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out the required fields (Name, Email, and Message).');
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setRole('Distributor / Wholesaler');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="tag">Partner With Us</div>
            <h2 className="reveal">Let's <em className="gold">Work Together</em></h2>
            <p className="reveal">
              Whether you're a local retailer, national wholesaler, corporate client, or looking to join our logistics pipeline — we'd love to hear from you.
            </p>

            <div className="contact-items">
              <div className="ci reveal">
                <div className="ci-icon">📍</div>
                <div className="ci-text">
                  <strong>Corporate HQ</strong>
                  <span>Plot 1204, Industrial Area, Dar es Salaam, Tanzania</span>
                </div>
              </div>
              <div className="ci reveal reveal-delay-1">
                <div className="ci-icon">✉️</div>
                <div className="ci-text">
                  <strong>Distribution Enquiries</strong>
                  <span>sales@simba-beverages.co.tz</span>
                </div>
              </div>
              <div className="ci reveal reveal-delay-2">
                <div className="ci-icon">📞</div>
                <div className="ci-text">
                  <strong>Customer Service</strong>
                  <span>+255 22 212 4455</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap reveal">
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>✦</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '16px' }}>
                  Enquiry Registered
                </h3>
                <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: '28px' }}>
                  Thank you, <strong>{name}</strong>! Your wholesale request has been received. Our B2B accounts team will contact you at <strong>{email}</strong> within 24 hours.
                </p>
                <button className="btn btn-gold" onClick={handleReset}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-name">Full Name</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      placeholder="e.g. Mwansa Mwape" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email">Email Address</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      placeholder="e.g. mwansa@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="form-company">Company / Retail Name</label>
                  <input 
                    type="text" 
                    id="form-company" 
                    placeholder="e.g. Mwansa Retail Partners (Optional)" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-role">Your Business Profile</label>
                  <select 
                    id="form-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Distributor / Wholesaler">Distributor / Wholesaler</option>
                    <option value="Retailer / Shop Owner">Retailer / Shop Owner</option>
                    <option value="Corporate Buyer">Corporate Buyer</option>
                    <option value="General Consumer">General Consumer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-msg">Detailed Request</label>
                  <textarea 
                    id="form-msg" 
                    placeholder="Tell us about your targeted volumes, delivery locations, and logistics expectations..." 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit B2B Request ✦
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

