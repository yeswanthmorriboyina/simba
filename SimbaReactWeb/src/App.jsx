import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PourAnimation from './components/PourAnimation';
import About from './components/About';
import Products from './components/Products';
import ProductModal from './components/ProductModal';
import PricingCalculator from './components/PricingCalculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('Nkolo Mboka');
  const [modalOpen, setModalOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [initialRole, setInitialRole] = useState('Distributor / Wholesaler');

  // Section Refs for smooth scrolling
  const productsRef = useRef(null);
  const calculatorRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductSelect = (name) => {
    setSelectedProduct(name);
    setModalOpen(true);
  };

  const handleEnquireFromModal = (name) => {
    setModalOpen(false);
    setSelectedProduct(name);
    
    // Autofill contact message for modal query
    setInitialRole('Retailer / Shop Owner');
    setInitialMessage(`Hello Simba Team, \n\nI am interested in B2B distribution/retail pricing for ${name}. Please get back to me with your volume catalogs and logistics pricing.`);
    
    // Scroll to contact form
    setTimeout(() => scrollTo(contactRef), 400);
  };

  const handleCreateEnquiryFromCalculator = (quoteData) => {
    setInitialRole('Distributor / Wholesaler');
    setInitialMessage(`Hello Simba Team, \n\nI calculated an estimated bulk pricing quote on your portal:\n- Product: ${quoteData.productName}\n- Quantity: ${quoteData.quantity} cases\n- Volume Discount Applied: ${quoteData.discount}\n- Total Estimated Cost: ${quoteData.total}\n\nPlease verify this quote and send me a formal contract invoice.`);
    
    // Scroll to contact form
    scrollTo(contactRef);
  };

  return (
    <>
      <Navbar 
        onCatalogPress={() => scrollTo(productsRef)}
        onContactPress={() => scrollTo(contactRef)}
      />

      <Hero 
        onExplorePress={() => scrollTo(productsRef)}
        onB2BPress={() => scrollTo(calculatorRef)}
      />

      <PourAnimation />

      <About />

      <div ref={productsRef}>
        <Products onProductSelect={handleProductSelect} />
      </div>

      <div ref={calculatorRef}>
        <PricingCalculator 
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
          onCreateEnquiry={handleCreateEnquiryFromCalculator}
        />
      </div>

      <div ref={contactRef}>
        <ContactForm 
          initialMessage={initialMessage}
          initialRole={initialRole}
        />
      </div>

      <Footer />

      <ProductModal 
        isOpen={modalOpen}
        productName={selectedProduct}
        onClose={() => setModalOpen(false)}
        onEnquire={handleEnquireFromModal}
      />
    </>
  );
}
