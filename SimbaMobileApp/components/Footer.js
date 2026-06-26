import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, GLOBAL_STYLES } from '../styles';

export default function Footer() {
  const socialIcons = ['📘', '🐦', '📸', '💼'];

  return (
    <View style={styles.footerSection}>
      <View style={GLOBAL_STYLES.container}>
        {/* Brand */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>SIMBA BEVERAGES</Text>
          <Text style={styles.brandSub}>Tanzania · Est. 1998</Text>
          <Text style={styles.brandDesc}>
            Providing premium quality still spring water, sparkling beverages, fruit juices, and energy drinks to families and commercial industries.
          </Text>
        </View>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          {socialIcons.map((icon, index) => (
            <TouchableOpacity key={index} style={styles.socialBtn}>
              <Text style={styles.socialText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <Text style={styles.colHeader}>Tanzania HQ</Text>
            <Text style={styles.colText}>Plot 1204, Industrial Area{'\n'}Dar es Salaam, Tanzania</Text>
            <Text style={styles.colText}>sales@simba-beverages.co.tz</Text>
            <Text style={styles.colText}>+255 22 212 4455</Text>
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>© 2025 Simba Beverages Ltd. All rights reserved.</Text>
          <Text style={styles.bottomSubtext}>A Premidis Group Company · Tanzania</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerSection: {
    backgroundColor: '#060e1c',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  brandContainer: {
    marginBottom: 28,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 1.5,
    fontFamily: 'System',
  },
  brandSub: {
    fontSize: 10,
    color: COLORS.gold,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 4,
    marginBottom: 12,
  },
  brandDesc: {
    fontSize: 12.5,
    color: COLORS.muted,
    lineHeight: 18,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 36,
  },
  socialBtn: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(201, 168, 76, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.15)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 16,
  },
  infoGrid: {
    marginBottom: 36,
  },
  infoCol: {
    marginBottom: 20,
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gold2,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  colText: {
    fontSize: 12.5,
    color: COLORS.muted,
    lineHeight: 18,
    marginBottom: 6,
  },
  bottomRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 24,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 11,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 4,
  },
  bottomSubtext: {
    fontSize: 10,
    color: COLORS.gold,
    textAlign: 'center',
  },
});

