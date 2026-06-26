import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, GLOBAL_STYLES } from '../styles';
import { PRODUCT_DATA } from './Products';

export default function PricingCalculator({ selectedProduct, onProductChange, onCreateEnquiry }) {
  const [quantity, setQuantity] = useState(10);

  const productNames = Object.keys(PRODUCT_DATA);
  const activeProduct = PRODUCT_DATA[selectedProduct] || PRODUCT_DATA[productNames[0]];

  // Handle updates when prop changes (e.g. from modal enquiry trigger)
  useEffect(() => {
    if (selectedProduct) {
      // Keep state in sync
    }
  }, [selectedProduct]);

  const basePrice = activeProduct.basePrice;

  // Pricing calculations
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
    const quoteData = {
      productName: selectedProduct,
      quantity,
      discount: `${discountPercent}%`,
      total: `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    };
    onCreateEnquiry(quoteData);
  };

  return (
    <View style={styles.calcSection}>
      <View style={GLOBAL_STYLES.container}>
        <View style={GLOBAL_STYLES.tag}>
          <Text style={GLOBAL_STYLES.tagText}>Calculator</Text>
        </View>
        <Text style={GLOBAL_STYLES.sectionTitle}>B2B Pricing Portal</Text>
        <Text style={GLOBAL_STYLES.sectionSubtitle}>
          Estimate your wholesale order rates, unit costs, and volume discounts in real-time.
        </Text>

        {/* Product selector tabs */}
        <Text style={styles.inputLabel}>Select Beverage</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.productsScroll}
          contentContainerStyle={styles.productsScrollContent}
        >
          {productNames.map(name => (
            <TouchableOpacity
              key={name}
              style={[
                styles.productTab,
                selectedProduct === name && styles.productTabActive
              ]}
              onPress={() => onProductChange(name)}
            >
              <Text 
                style={[
                  styles.productTabText,
                  selectedProduct === name && styles.productTabActiveText
                ]}
              >
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Calculator Main Card */}
        <View style={styles.calcCard}>
          {/* Base price display */}
          <View style={styles.priceRow}>
            <Text style={styles.cardLabel}>Base Price per Case</Text>
            <Text style={styles.cardVal}>${basePrice.toFixed(2)}</Text>
          </View>

          {/* Quantity Slider */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.cardLabel}>Order Volume</Text>
              <Text style={styles.sliderValText}>{quantity} Cases</Text>
            </View>
            <Slider
              minimumValue={10}
              maximumValue={2500}
              step={10}
              value={quantity}
              onValueChange={setQuantity}
              minimumTrackTintColor={COLORS.gold}
              maximumTrackTintColor="rgba(255,255,255,0.1)"
              thumbTintColor={COLORS.gold}
              style={styles.slider}
            />
            <View style={styles.sliderLimits}>
              <Text style={styles.limitText}>Min: 10</Text>
              <Text style={styles.limitText}>Max: 2,500</Text>
            </View>
          </View>

          {/* Real-time Results */}
          <View style={styles.resultsGrid}>
            <View style={styles.resItem}>
              <Text style={styles.resLabel}>Unit Cost / Case</Text>
              <Text style={styles.resValue}>${unitPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.resItem}>
              <Text style={styles.resLabel}>Volume Discount</Text>
              <Text style={styles.resValue}>{discountPercent}%</Text>
            </View>
            <View style={styles.resItem}>
              <Text style={styles.resLabel}>Total Savings</Text>
              <Text style={styles.resValue}>${savings.toFixed(2)}</Text>
            </View>
            <View style={[styles.resItem, styles.totalItem]}>
              <Text style={styles.resLabel}>Est. Grand Total</Text>
              <Text style={styles.totalValue}>
                ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity 
            style={[GLOBAL_STYLES.btn, GLOBAL_STYLES.btnGold]}
            onPress={handleEnquiry}
          >
            <Text style={GLOBAL_STYLES.btnGoldText}>Create Enquiry with Quote ✦</Text>
          </TouchableOpacity>
        </View>

        {/* Tier Info */}
        <View style={styles.tiersGrid}>
          <View style={styles.tierBox}>
            <Text style={styles.tierTitle}>5% Off</Text>
            <Text style={styles.tierLabel}>100 - 499 Cases</Text>
          </View>
          <View style={styles.tierBox}>
            <Text style={styles.tierTitle}>10% Off</Text>
            <Text style={styles.tierLabel}>500 - 999 Cases</Text>
          </View>
          <View style={styles.tierBox}>
            <Text style={styles.tierTitle}>15% Off</Text>
            <Text style={styles.tierLabel}>1,000+ Cases</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calcSection: {
    backgroundColor: COLORS.navy,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gold2,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  productsScroll: {
    marginBottom: 24,
  },
  productsScrollContent: {
    gap: 8,
    paddingHorizontal: 4,
  },
  productTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.navy2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productTabActive: {
    borderColor: COLORS.gold,
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
  },
  productTabText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '500',
  },
  productTabActiveText: {
    color: COLORS.gold,
    fontWeight: '600',
  },
  calcCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gold2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardVal: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  sliderContainer: {
    marginBottom: 28,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderValText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gold,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLimits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limitText: {
    fontSize: 11,
    color: COLORS.muted,
  },
  resultsGrid: {
    backgroundColor: 'rgba(201, 168, 76, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.12)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  resItem: {
    width: '46%',
  },
  totalItem: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(201, 168, 76, 0.15)',
    paddingTop: 12,
    marginTop: 4,
  },
  resLabel: {
    fontSize: 10,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.gold2,
  },
  tiersGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  tierBox: {
    flex: 1,
    backgroundColor: 'rgba(201, 168, 76, 0.03)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(201, 168, 76, 0.25)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  tierTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gold2,
    marginBottom: 4,
  },
  tierLabel: {
    fontSize: 8.5,
    color: COLORS.muted,
    textAlign: 'center',
  },
});
