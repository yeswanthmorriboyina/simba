import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, GLOBAL_STYLES } from '../styles';

export default function About() {
  const features = [
    {
      icon: '🧪',
      title: '7-Stage Purification',
      desc: 'Tested and filtered to exceed national health guidelines.',
    },
    {
      icon: '🌿',
      title: 'Natural Sources',
      desc: 'Directly tapped from protected underground aquifers.',
    },
    {
      icon: '🇹🇿',
      title: '100% Proudly Tanzanian',
      desc: 'Locally manufactured and staffed in Dar es Salaam, Tanzania.',
    },
    {
      icon: '♻️',
      title: 'Eco-Friendly Pack',
      desc: '100% recyclable bottles minimizing ecological impact.',
    },
  ];

  return (
    <View style={styles.aboutSection}>
      <View style={GLOBAL_STYLES.container}>
        <View style={GLOBAL_STYLES.tag}>
          <Text style={GLOBAL_STYLES.tagText}>Our Story</Text>
        </View>
        <Text style={GLOBAL_STYLES.sectionTitle}>Purity is Our Promise</Text>
        <Text style={GLOBAL_STYLES.sectionSubtitle}>
          Founded within the Premidis Group, Simba Beverages has grown into one of Tanzania's premier beverage manufacturers.
        </Text>

        {/* Narrative Card */}
        <View style={styles.narrativeCard}>
          <Text style={styles.narrativeText}>
            Simba Beverages operates state-of-the-art facilities in Tanzania. We employ advanced bottling technologies and strict QA controls. Our mission is simple: to keep Tanzanian families and businesses refreshed with clean, affordable, and premium quality products.
          </Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeNumber}>28+</Text>
            <Text style={styles.badgeLabel}>Years in{'\n'}Tanzania</Text>
          </View>
        </View>

        {/* Features List */}
        <View style={styles.featuresGrid}>
          {features.map((item, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutSection: {
    backgroundColor: COLORS.navy2,
  },
  narrativeCard: {
    backgroundColor: COLORS.navy3,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    position: 'relative',
  },
  narrativeText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  badgeContainer: {
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    padding: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.navy,
  },
  badgeLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.navy,
    textTransform: 'uppercase',
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(201, 168, 76, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 16,
  },
});

