import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, GLOBAL_STYLES } from '../styles';
import { PRODUCT_DATA } from './Products';

export default function ProductModal({ visible, productName, onClose, onEnquire }) {
  const [selectedSize, setSelectedSize] = useState('');

  const product = PRODUCT_DATA[productName];

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [productName, product]);

  if (!product) return null;

  // Nutritional Specs Profile mapping
  const nutritionSpecs = {
    "Nkolo Mboka": { "Alcohol Content": "12% Vol", "Sugars": "6.5g/100ml", "Energy": "72 kcal", "Ingredients": "Fermented Grapes & Herbs" },
    "Ola Kombucha": { "Probiotics Count": "1 Billion CFU", "Energy": "22 kcal", "Sugars": "4.2g/100ml", "Organic Acids": "0.5%" },
    "Ginger Punch": { "Ginger Extract": "15%", "Energy": "38 kcal", "Sugars": "9.2g/100ml", "Sodium": "8mg" },
    "Hard Rock": { "Energy": "46 kcal", "Caffeine": "32mg/100ml", "Taurine": "400mg/100ml", "Vitamin B12": "1.5mcg" }
  };

  const specs = nutritionSpecs[productName] || {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Visual Panel */}
            <View style={styles.visualPanel}>
              {product.svg}
            </View>

            {/* Info Panel */}
            <View style={styles.infoPanel}>
              <Text style={styles.category}>{product.category}</Text>
              <Text style={styles.title}>{productName}</Text>
              <Text style={styles.desc}>{product.desc} Produced and bottled locally under strict hygienic standards.</Text>

              {/* Specs Grid */}
              <Text style={styles.specsTitle}>Nutritional Information</Text>
              <View style={styles.specsGrid}>
                {Object.entries(specs).map(([key, value]) => (
                  <View key={key} style={styles.specItem}>
                    <Text style={styles.specLabel}>{key}</Text>
                    <Text style={styles.specValue}>{value}</Text>
                  </View>
                ))}
              </View>

              {/* Sizes Selection */}
              <Text style={styles.specsTitle}>Available Sizing</Text>
              <View style={styles.sizesRow}>
                {product.sizes.map(size => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeBtn,
                      selectedSize === size && styles.sizeBtnActive
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.sizeBtnText,
                        selectedSize === size && styles.sizeBtnTextActive
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* CTA Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={[GLOBAL_STYLES.btn, GLOBAL_STYLES.btnGold, styles.flexBtn]}
                  onPress={() => onEnquire(productName)}
                >
                  <Text style={GLOBAL_STYLES.btnGoldText}>B2B Enquiry →</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GLOBAL_STYLES.btn, GLOBAL_STYLES.btnOutline, styles.flexBtn]}
                  onPress={onClose}
                >
                  <Text style={GLOBAL_STYLES.btnOutlineText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 22, 40, 0.85)',
  },
  modalView: {
    width: '92%',
    maxHeight: '85%',
    backgroundColor: COLORS.navy2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.25)',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: -2,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  visualPanel: {
    height: 200,
    backgroundColor: COLORS.navy3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoPanel: {
    padding: 24,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 12,
  },
  desc: {
    fontSize: 13.5,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 24,
  },
  specsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gold2,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 168, 76, 0.15)',
    paddingBottom: 4,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 12,
  },
  specItem: {
    width: '47%',
    marginBottom: 6,
  },
  specLabel: {
    fontSize: 11,
    color: COLORS.muted,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: 2,
  },
  sizesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  sizeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.15)',
  },
  sizeBtnActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  sizeBtnText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
  },
  sizeBtnTextActive: {
    color: COLORS.navy,
    fontWeight: '600',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  flexBtn: {
    flex: 1,
  },
});
