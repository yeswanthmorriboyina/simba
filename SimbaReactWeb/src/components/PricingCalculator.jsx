import React, { useState } from 'react';
import { PRODUCT_DATA } from './Products';

export default function PricingCalculator({ selectedProduct, onProductChange, onCreateEnquiry }) {
  const [quantity, setQuantity] = useState(10);

  const productNames = Object.keys(PRODUCT_DATA);
  const p = PRODUCT_DATA[selectedProduct] || PRODUCT_DATA[productNames[0]];
  const basePrice = p.basePrice;

  // Volume discounts tiers
  let discountPercent = 0;
  if (quantity >= 1000) {
    discountPercent = 15;
  } else if (quantity >= 500) {
    discountPercent = 10;
  } else if (quantity >= 100) {
    discountPercent = 5;
  }

  const subtotal = basePrice * quantity;
  const savings = subtotal * (discountPercent / 100);
  const total = subtotal - savings;
  const unitPrice = total / quantity;

  const handleEnquiry = () => {
    onCreateEnquiry({
      productName: selectedProduct,
      quantity,
      discount: `${discountPercent}%`,
      total: `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    });
  };

  return (
    <section id="calculator" className="section">
      <div className="container">
        <div className="calc-container">
          <div className="calc-info">
            <div className="tag">B2B Wholesale</div>
            <h2>Interactive <em className="gold">Pricing</em> Calculator</h2>
            <p>
              Simba Beverages Limited supports wholesalers, distributors, and bulk retail accounts across Tanzania. Use our pricing calculator to estimate your order costs, unit rates, and volume discounts in real-time.
            </p>
            <div className="discount-tiers">
              <div className="tier-box">
                <h4>5% Off</h4>
                <p>100 - 499 Cases</p>
              </div>
              <div className="tier-box">
                <h4>10% Off</h4>
                <p>500 - 999 Cases</p>
              </div>
              <div className="tier-box">
                <h4>15% Off</h4>
                <p>1,000+ Cases</p>
              </div>
            </div>
          </div>

          <div className="calc-card reveal">
            <div className="calc-row">
              <div className="calc-group">
                <label htmlFor="calc-product">Select Product</label>
                <select 
                  id="calc-product" 
                  value={selectedProduct} 
                  onChange={(e) => onProductChange(e.target.value)}
                >
                  {productNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="calc-group">
                <label>Base Price / Case</label>
                <div className="calc-res-val" id="calc-base-val" style={{ padding: '13px 16px', fontWeight: 600 }}>
                  ${basePrice.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="range-wrap">
              <div className="range-val-display">
                <span>Order Quantity</span>
                <span id="calc-qty-val" style={{ color: 'var(--gold)', fontSize: '1.15rem' }}>
                  {quantity} cases
                </span>
              </div>
              <input 
                type="range" 
                id="calc-quantity" 
                min="10" 
                max="2500" 
                value={quantity} 
                step="10" 
                className="calc-slider"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="calc-results">
              <div className="calc-res-item">
                <span className="calc-res-label">Est. Unit Price / Case</span>
                <span className="calc-res-val" id="calc-unit-val">${unitPrice.toFixed(2)}</span>
              </div>
              <div className="calc-res-item">
                <span className="calc-res-label">Volume Discount</span>
                <span className="calc-res-val" id="calc-discount-val">{discountPercent}%</span>
              </div>
              <div className="calc-res-item">
                <span className="calc-res-label">Total Savings</span>
                <span className="calc-res-val" id="calc-savings-val">${savings.toFixed(2)}</span>
              </div>
              <div className="calc-res-item total">
                <span className="calc-res-label">Estimated Grand Total</span>
                <span className="calc-res-val" id="calc-total-val">
                  ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={handleEnquiry}>
              Create Enquiry with Quote ✦
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

