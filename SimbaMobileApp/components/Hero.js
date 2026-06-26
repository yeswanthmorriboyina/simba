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
            </Defs>

            <Rect x="60" y="5" width="40" height="22" rx="3" fill="url(#p1cap)" />
            <Line x1={65} y1={5} x2={65} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={70} y1={5} x2={70} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={75} y1={5} x2={75} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={80} y1={5} x2={80} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={85} y1={5} x2={85} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={90} y1={5} x2={90} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>
            <Line x1={95} y1={5} x2={95} y2={27} stroke="#1b5e20" strokeWidth={1.2}/>

            {/* Neck (Green Glass) */}
            <Path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p1body)" />
            {/* Body (Green Glass) */}
            <Path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p1body)" stroke="rgba(129,199,132,0.35)" strokeWidth={1.5} />

            {/* Shoulder Wrapper (White Sleeve) */}
            <Path d="M50 70 Q38 85 36 110 L36 140 L124 140 L124 110 Q122 85 110 70Z" fill="url(#p1wrap)" />

            {/* Chevron shoulder band */}
            <Line x1={50} y1={68} x2={110} y2={68} stroke="#311b0b" strokeWidth={0.5}/>
            <Line x1={50} y1={72} x2={110} y2={72} stroke="#311b0b" strokeWidth={0.5}/>
            <Path d="M50 68 L 54 72 L 58 68 L 62 72 L 66 68 L 70 72 L 74 68 L 78 72 L 82 68 L 86 72 L 90 68 L 94 72 L 98 68 L 102 72 L 106 68 L 110 72" stroke="#311b0b" strokeWidth={0.5} fill="none"/>

            {/* Dark Brown label */}
            <Rect x={36} y={140} width={88} height={58} fill="#311b0b" />

            {/* Badge circle & logo */}
            <Circle cx={80} cy={122} r={12} fill="#ffffff" stroke="#d4af37" strokeWidth={0.8} />
            <G transform="translate(80, 122) scale(0.6)">
              {/* Gold Crown */}
              <Path d="M-10 -7 Q-5 -9 0 -9 Q5 -9 10 -7 L12 -12 L6 -16 L3 -12 L0 -20 L-3 -12 L-6 -16 L-12 -12 Z" fill="#d4af37"/>
              <Circle cx={0} cy={-20} r={1.5} fill="#d4af37"/>
              <Circle cx={-6} cy={-16} r={1.2} fill="#d4af37"/>
              <Circle cx={6} cy={-16} r={1.2} fill="#d4af37"/>
              <Circle cx={-12} cy={-12} r={1.0} fill="#d4af37"/>
              <Circle cx={12} cy={-12} r={1.0} fill="#d4af37"/>
              
              {/* Lion Face */}
              <Path d="M-2.5 3 L2.5 3 L1 7 L-1 7 Z" fill="#000000"/>
              <Path d="M-1 7 Q0 8 1 7 Q0 9.5 0 12" stroke="#000000" strokeWidth={0.8} fill="none"/>
              <Path d="M-4 6 Q-2 7 0 6.5 Q2 7 4 6" stroke="#000000" strokeWidth={0.8} fill="none"/>
              <Path d="M-6 -0.5 Q-4 -2.5 -2 -1.5" stroke="#000000" strokeWidth={1.2} fill="none"/>
              <Path d="M2 -1.5 Q4 -2.5 6 -0.5" stroke="#000000" strokeWidth={1.2} fill="none"/>
              <Path d="M-5 -1 L-3 -1.5 L-2 -1 L-3 -0.5 Z" fill="#000000"/>
              <Path d="M5 -1 L3 -1.5 L2 -1 L3 -0.5 Z" fill="#000000"/>
              <Path d="M-3 -4 Q0 -5.5 3 -4" stroke="#000000" strokeWidth={0.8} fill="none"/>
              <Path d="M-2.5 -6 Q0 -8 2.5 -6" stroke="#000000" strokeWidth={0.8} fill="none"/>
              <Path d="M-1.5 -8 Q0 -9.5 1.5 -8" stroke="#000000" strokeWidth={0.8} fill="none"/>
              
              {/* Mane locks */}
              <Path d="M-3 -8 L0 -12 L3 -8 L0 -9 Z" fill="#000000"/>
              <Path d="M-2 -10 C-6 -10 -9 -7 -10 -4 L-8 -5 C-7 -7 -5 -8 -2 -8 Z" fill="#000000"/>
              <Path d="M-10 -4 C-13 -3 -15 0 -15 4 L-12 2 C-12 0 -10 -2 -8 -3 Z" fill="#000000"/>
              <Path d="M-15 4 C-16 8 -14 11 -11 13 L-10 10 C-11 9 -12 7 -12 4 Z" fill="#000000"/>
              <Path d="M-11 13 C-8 15 -5 15 -2 13 L-3 11 C-5 12 -7 12 -9 11 Z" fill="#000000"/>
              <Path d="M-6 -8 C-9 -9 -11 -7 -12 -5 L-10 -5 C-9 -6 -8 -7 -6 -7 Z" fill="#000000"/>
              <Path d="M-11 -5 C-13 -4 -14 -1 -14 2 L-12 1 C-12 -1 -11 -2 -10 -3 Z" fill="#000000"/>
              <Path d="M-14 2 C-15 5 -14 8 -12 10 L-10 8 C-11 7 -11 5 -11 3 Z" fill="#000000"/>
              
              <Path d="M2 -10 C6 -10 9 -7 10 -4 L8 -5 C7 -7 5 -8 2 -8 Z" fill="#000000"/>
              <Path d="M10 -4 C13 -3 15 0 15 4 L12 2 C12 0 10 -2 8 -3 Z" fill="#000000"/>
              <Path d="M15 4 C16 8 14 11 11 13 L10 10 C11 9 12 7 12 4 Z" fill="#000000"/>
              <Path d="M11 13 C8 15 5 15 2 13 L3 11 C5 12 7 12 9 11 Z" fill="#000000"/>
              <Path d="M6 -8 C9 -9 11 -7 12 -5 L10 -5 C9 -6 8 -7 6 -7 Z" fill="#000000"/>
              <Path d="M11 -5 C13 -4 14 -1 14 2 L12 1 C12 -1 11 -2 10 -3 Z" fill="#000000"/>
              <Path d="M14 2 C15 5 14 8 12 10 L10 8 C11 7 11 5 11 3 Z" fill="#000000"/>
              
              <Path d="M0 12 L-2 15 L0 18 L2 15 Z" fill="#000000"/>
              <Path d="M-3 11 L-5 14 L-2 15 L-1 13 Z" fill="#000000"/>
              <Path d="M3 11 L5 14 L2 15 L1 13 Z" fill="#000000"/>
            </G>

            {/* Texts */}
            <SvgText x={80} y={153} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={6.5} fill="#ffffff" letterSpacing={0.4}>VIN</SvgText>
            <SvgText x={80} y={162} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={6.5} fill="none" stroke="#ffffff" strokeWidth={1.2} letterSpacing={0.4}>NKOLO</SvgText>
            <SvgText x={80} y={162} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={6.5} fill="none" stroke="#311b0b" strokeWidth={0.4} letterSpacing={0.4}>NKOLO</SvgText>
            <SvgText x={80} y={171} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={6.5} fill="none" stroke="#ffffff" strokeWidth={1.2} letterSpacing={0.4}>MBOKA</SvgText>
            <SvgText x={80} y={171} textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={6.5} fill="none" stroke="#311b0b" strokeWidth={0.4} letterSpacing={0.4}>MBOKA</SvgText>
            <SvgText x={80} y={177} textAnchor="middle" fontFamily="System" fontSize={2.0} fill="#d4af37" letterSpacing={0.1}>GINGER BEVERAGE</SvgText>

            {/* Red Swahili banner */}
            <Rect x={36} y={182} width={88} height={14} fill="#b71c1c" />
            <SvgText x={80} y={191} textAnchor="middle" fontFamily="System" fontWeight="700" fontSize={2.4} fill="#ffffff" letterSpacing={0.05}>NGUVU YA SIMBA</SvgText>
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

