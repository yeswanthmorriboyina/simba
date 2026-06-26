import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop, Circle, ClipPath, Line, G, Text as SvgText } from 'react-native-svg';
import { COLORS, GLOBAL_STYLES } from '../styles';

export default function Hero({ onExplorePress, onB2BPress }) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -18,
          duration: 3000,
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ])
    ).start();
  }, [floatAnim]);

  return (
    <View style={styles.heroSection}>
      {/* Background Orbs */}
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />

      <View style={GLOBAL_STYLES.container}>
        {/* Eyebrow */}
        <View style={styles.eyebrow}>
          <View style={styles.line} />
          <Text style={styles.eyebrowText}>Premium Quality · Tanzania</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Pure Tanzania,{'\n'}
          <Text style={styles.goldText}>Refreshed</Text> Daily
        </Text>

        {/* Description */}
        <Text style={styles.desc}>
          Crafting Tanzania's finest natural mineral water, sparkling juices, and high-performance energy drinks since 1998. Sourced from natural springs and purified using 7-stage state-of-the-art filtration.
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity 
            style={[GLOBAL_STYLES.btn, GLOBAL_STYLES.btnGold, styles.flexBtn]} 
            onPress={onExplorePress}
          >
            <Text style={GLOBAL_STYLES.btnGoldText}>Explore Products</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[GLOBAL_STYLES.btn, GLOBAL_STYLES.btnOutline, styles.flexBtn]} 
            onPress={onB2BPress}
          >
            <Text style={GLOBAL_STYLES.btnOutlineText}>B2B Portal</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Bottle Visualization */}
        <Animated.View style={[styles.bottleContainer, { transform: [{ translateY: floatAnim }] }]}>
          <Svg viewBox="0 0 160 220" width={160} height={220}>
            <Rect x="60" y="5" width="40" height="22" rx="3" fill="url(#p1cap)" />
            <Line x1={65} y1={5} x2={65} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={70} y1={5} x2={70} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={75} y1={5} x2={75} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={80} y1={5} x2={80} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={85} y1={5} x2={85} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={90} y1={5} x2={90} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={95} y1={5} x2={95} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p1wrap)" />
            <Path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p1body)" stroke="rgba(129,199,132,0.35)" strokeWidth={1.5} />
            <G clipPath="url(#p1-label-clip)">
              <Rect x={42} y={110} width={76} height={40} fill="#f7f4ee" />
              <Rect x={42} y={150} width={76} height={40} fill="#311b0b" />
              <Circle cx={80} cy={130} r={11} fill="none" stroke="#d4af37" strokeWidth={0.6} strokeDasharray="1,0.5" />
              <Path d="M75 116 L77 120 L80 117 L83 120 L85 116 L83 123 L77 123 Z" fill="#d4af37" />
              <SvgText x={80} y={134} textAnchor="middle" fontSize={12}>🦁</SvgText>
              <SvgText x={80} y={157} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={5.5} fill="#ffffff" letterSpacing={0.8}>VIN</SvgText>
              <SvgText x={80} y={165} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={5.5} fill="#ffffff" letterSpacing={0.8}>NKOLO</SvgText>
              <SvgText x={80} y={173} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={5.5} fill="#ffffff" letterSpacing={0.8}>MBOKA</SvgText>
              <Rect x={42} y={178} width={76} height={8} fill="#b71c1c" />
              <SvgText x={80} y={184} textAnchor="middle" fontFamily="System" fontWeight="700" fontSize={2.4} fill="#ffffff" letterSpacing={0.05}>NGUVU YA SIMBA</SvgText>
            </G>
            <Defs>
              <LinearGradient id="p1cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#1b5e20" />
                <Stop offset="35%" stopColor="#2e7d32" />
                <Stop offset="65%" stopColor="#4caf50" />
                <Stop offset="100%" stopColor="#0d5c14" />
              </LinearGradient>
              <LinearGradient id="p1wrap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#e8e5dc" />
                <Stop offset="35%" stopColor="#f7f4ee" />
                <Stop offset="70%" stopColor="#ffffff" />
                <Stop offset="100%" stopColor="#d9d6cd" />
              </LinearGradient>
              <LinearGradient id="p1body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse">
                <Stop offset="0%" stopColor="#0f3d1b" />
                <Stop offset="50%" stopColor="#1b5e20" />
                <Stop offset="100%" stopColor="#092410" />
              </LinearGradient>
              <ClipPath id="p1-label-clip">
                <Rect x={42} y={110} width={76} height={80} rx={6} />
              </ClipPath>
            </Defs>
          </Svg>
        </Animated.View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>28+</Text>
            <Text style={styles.statLabel}>Years Est.</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>7-Stg</Text>
            <Text style={styles.statLabel}>Purified</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>100%</Text>
            <Text style={styles.statLabel}>Tanzanian</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: COLORS.navy,
    position: 'relative',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  orb1: {
    width: 250,
    height: 250,
    backgroundColor: COLORS.gold,
    top: -50,
    right: -50,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: '#3a6bbf',
    bottom: 50,
    left: -50,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: COLORS.gold,
    marginRight: 10,
  },
  eyebrowText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 48,
    marginBottom: 16,
  },
  goldText: {
    color: COLORS.gold2,
  },
  desc: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 32,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  flexBtn: {
    flex: 1,
  },
  bottleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 240,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(201, 168, 76, 0.15)',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

