import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { COLORS, GLOBAL_STYLES } from './styles';

// Import Custom Components
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
  const [modalVisible, setModalVisible] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [initialRole, setInitialRole] = useState('Distributor / Wholesaler');

  // References for smooth scrolling
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Layout positions
  const [pourLayoutY, setPourLayoutY] = useState(0);
  const [productsLayoutY, setProductsLayoutY] = useState(0);
  const [calcLayoutY, setCalcLayoutY] = useState(0);
  const [contactLayoutY, setContactLayoutY] = useState(0);

  // Smooth scroll handler
  const scrollTo = (y) => {
    if (scrollViewRef.current && y > 0) {
      scrollViewRef.current.scrollTo({ y, animated: true });
    }
  };

  // Actions
  const handleExplore = () => scrollTo(productsLayoutY);
  const handleB2B = () => scrollTo(calcLayoutY);

  const handleProductSelect = (name) => {
    setSelectedProduct(name);
    setModalVisible(true);
  };

  const handleEnquireFromModal = (name) => {
    setModalVisible(false);
    setSelectedProduct(name);
    
    // Autofill contact message for modal query
    setInitialRole('Retailer / Shop Owner');
    setInitialMessage(`Hello Simba Team, \n\nI am interested in B2B distribution/retail pricing for ${name}. Please get back to me with your volume catalogs and logistics pricing.`);
    
    // Scroll to contact form
    setTimeout(() => scrollTo(contactLayoutY), 400);
  };

  const handleCreateEnquiryFromCalculator = (quoteData) => {
    setInitialRole('Distributor / Wholesaler');
    setInitialMessage(`Hello Simba Team, \n\nI calculated an estimated bulk pricing quote on your portal:\n- Product: ${quoteData.productName}\n- Quantity: ${quoteData.quantity} cases\n- Volume Discount Applied: ${quoteData.discount}\n- Total Estimated Cost: ${quoteData.total}\n\nPlease verify this quote and send me a formal contract invoice.`);
    
    // Scroll to contact form
    scrollTo(contactLayoutY);
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.safeArea}>
      <ExpoStatusBar style="light" />
      
      {/* Top Navbar Header */}
      <View style={styles.navBar}>
        <View style={styles.navLogo}>
          <Text style={styles.logoMark}>SB</Text>
          <View>
            <Text style={styles.logoTitle}>Simba Beverages</Text>
            <Text style={styles.logoSub}>Tanzania · Est. 1998</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.navBtn} onPress={handleExplore}>
          <Text style={styles.navBtnText}>Catalog</Text>
        </TouchableOpacity>
      </View>

      {/* Main Scroll Container */}
      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* 1. Hero Section */}
        <Hero onExplorePress={handleExplore} onB2BPress={handleB2B} />

        {/* 2. Pour Animation Section */}
        <View 
          onLayout={(e) => setPourLayoutY(e.nativeEvent.layout.y)}
        >
          <PourAnimation scrollY={scrollY} layoutY={pourLayoutY} />
        </View>

        {/* 3. About Section */}
        <About />

        {/* 4. Products Section */}
        <View 
          onLayout={(e) => setProductsLayoutY(e.nativeEvent.layout.y)}
        >
          <Products onProductSelect={handleProductSelect} />
        </View>

        {/* 5. Pricing Calculator Section */}
        <View 
          onLayout={(e) => setCalcLayoutY(e.nativeEvent.layout.y)}
        >
          <PricingCalculator 
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
            onCreateEnquiry={handleCreateEnquiryFromCalculator}
          />
        </View>

        {/* 6. Contact Form Section */}
        <View 
          onLayout={(e) => setContactLayoutY(e.nativeEvent.layout.y)}
        >
          <ContactForm 
            initialMessage={initialMessage} 
            initialRole={initialRole} 
          />
        </View>

        {/* 7. Footer Section */}
        <Footer />
      </Animated.ScrollView>

      {/* Product Details Modal Overlay */}
      <ProductModal
        visible={modalVisible}
        productName={selectedProduct}
        onClose={() => setModalVisible(false)}
        onEnquire={handleEnquireFromModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 72,
    backgroundColor: 'rgba(10, 22, 40, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 168, 76, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 100,
  },
  navLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
    textAlign: 'center',
    lineHeight: 36,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  logoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  logoSub: {
    fontSize: 8.5,
    color: COLORS.gold,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  navBtn: {
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  navBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gold,
  },
});

