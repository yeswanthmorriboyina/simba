import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop, Line, Circle, ClipPath, G, Text as SvgText } from 'react-native-svg';
import { COLORS, GLOBAL_STYLES } from '../styles';

export const PRODUCT_DATA = {
  "Nkolo Mboka": {
    category: "Traditional Wine",
    desc: "A premium traditional wine crafted with natural ingredients, offering a rich and authentic taste of African heritage. Perfectly matured and blended.",
    sizes: ["330ml"],
    basePrice: 14.50,
    gradient: ["#1e0a12", "#441624"],
    svg: (
      <Svg viewBox="0 0 160 220" width={100} height={130}>
        <Defs>
          <LinearGradient id="p1cap" x1="60" y1="0" x2="100" y2="0" >
            <Stop offset="0%" stopColor="#1b5e20" />
            <Stop offset="35%" stopColor="#2e7d32" />
            <Stop offset="65%" stopColor="#4caf50" />
            <Stop offset="100%" stopColor="#0d5c14" />
          </LinearGradient>
          <LinearGradient id="p1wrap" x1="60" y1="0" x2="100" y2="0" >
            <Stop offset="0%" stopColor="#e8e5dc" />
            <Stop offset="35%" stopColor="#f7f4ee" />
            <Stop offset="70%" stopColor="#ffffff" />
            <Stop offset="100%" stopColor="#d9d6cd" />
          </LinearGradient>
          <LinearGradient id="p1body" x1="30" y1="0" x2="130" y2="0" >
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
    )
  },
  "Ola Kombucha": {
    category: "Probiotic Tea",
    desc: "Naturally fermented sparkling kombucha tea packed with probiotics and organic nutrients. A crisp, healthy beverage that refreshes and revitalizes.",
    sizes: ["330ml Can", "500ml"],
    basePrice: 11.00,
    gradient: ["#1a1006", "#3d2314"],
    svg: (
      <Svg viewBox="0 0 160 220" width={100} height={130}>
        <Rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p2cap)" />
        <Path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p2body)" />
        <Path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p2body)" />
        <Rect x="42" y="105" width="76" height="85" rx="6" fill="#0a1a06" opacity="0.8" />
        <Defs>
          <LinearGradient id="p2cap" x1="60" y1="0" x2="100" y2="0" >
            <Stop offset="0%" stopColor="#8d4f16" />
            <Stop offset="100%" stopColor="#c9a84c" />
          </LinearGradient>
          <LinearGradient id="p2body" x1="36" y1="0" x2="124" y2="0" >
            <Stop offset="0%" stopColor="#4e2508" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#2c1404" stopOpacity="0.95" />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  },
  "Ginger Punch": {
    category: "Spiced Beverage",
    desc: "Zesty, fiery, and bold ginger beverage brewed from finest local ginger root and natural spices. Delivers a refreshing kick in every glass.",
    sizes: ["330ml Can", "500ml", "1.5L"],
    basePrice: 12.50,
    gradient: ["#1a1a06", "#3d3a14"],
    svg: (
      <Svg viewBox="0 0 160 220" width={100} height={130}>
        <Rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p3cap)" />
        <Path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p3body)" />
        <Path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p3body)" />
        <Rect x="42" y="105" width="76" height="85" rx="6" fill="#1a0606" opacity="0.8" />
        <Defs>
          <LinearGradient id="p3cap" x1="60" y1="0" x2="100" y2="0" >
            <Stop offset="0%" stopColor="#c9a84c" />
            <Stop offset="100%" stopColor="#ffd600" />
          </LinearGradient>
          <LinearGradient id="p3body" x1="36" y1="0" x2="124" y2="0" >
            <Stop offset="0%" stopColor="#6e500a" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#3d2c05" stopOpacity="0.95" />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  },
  "Hard Rock": {
    category: "Energy Drink",
    desc: "High-performance energy drink formulated to deliver sustained physical stamina and mental focus. Packed with B-vitamins, taurine, and natural caffeine.",
    sizes: ["250ml Can", "500ml Can"],
    basePrice: 18.00,
    gradient: ["#0e051c", "#2a0b4e"],
    svg: (
      <Svg viewBox="0 0 160 220" width={100} height={130}>
        <Rect x="58" y="3" width="44" height="24" rx="6" fill="url(#p4cap)" />
        <Path d="M58 27 Q48 50 46 72 L114 72 Q112 50 102 27Z" fill="url(#p4body)" />
        <Path d="M46 72 Q32 88 30 114 L30 186 Q30 218 80 220 Q130 218 130 186 L130 114 Q128 88 114 72Z" fill="url(#p4body)" />
        <Rect x="38" y="110" width="84" height="82" rx="6" fill="#0a0a04" opacity="0.85" />
        <Defs>
          <LinearGradient id="p4cap" x1="58" y1="0" x2="102" y2="0" >
            <Stop offset="0%" stopColor="#ffd600" />
            <Stop offset="100%" stopColor="#ffee58" />
          </LinearGradient>
          <LinearGradient id="p4body" x1="30" y1="0" x2="130" y2="0" >
            <Stop offset="0%" stopColor="#3a0f7e" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#160438" stopOpacity="0.98" />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  }
};

export default function Products({ onProductSelect }) {
  return (
    <View style={styles.productsSection}>
      <View style={GLOBAL_STYLES.container}>
        <View style={GLOBAL_STYLES.tag}>
          <Text style={GLOBAL_STYLES.tagText}>Catalog</Text>
        </View>
        <Text style={GLOBAL_STYLES.sectionTitle}>Our Beverages</Text>
        <Text style={GLOBAL_STYLES.sectionSubtitle}>
          Crafted under strict QA controls to ensure refreshment, purity, and taste in every sip.
        </Text>

        <View style={styles.grid}>
          {Object.entries(PRODUCT_DATA).map(([name, data]) => (
            <Pressable 
              key={name} 
              style={styles.card}
              onPress={() => onProductSelect(name)}
            >
              {({ pressed }) => (
                <View style={styles.cardInner}>
                  {/* Image container with gradient bg */}
                  <View style={[styles.imgContainer, { backgroundColor: data.gradient[0] }]}>
                    {/* Watermark Lion Emoji */}
                    <Text 
                      style={[
                        styles.watermark,
                        pressed && styles.watermarkPressed
                      ]}
                    >
                      🦁
                    </Text>
                    {data.svg}
                  </View>

                  {/* Body */}
                  <View style={styles.cardBody}>
                    <Text style={styles.category}>{data.category}</Text>
                    <Text style={styles.titleText}>{name}</Text>
                    <Text style={styles.descText} numberOfLines={2}>{data.desc}</Text>
                    
                    <View style={styles.tagRow}>
                      {data.sizes.map(size => (
                        <View key={size} style={styles.sizeTag}>
                          <Text style={styles.sizeTagText}>{size}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productsSection: {
    backgroundColor: COLORS.navy,
  },
  grid: {
    gap: 24,
  },
  card: {
    backgroundColor: COLORS.navy2,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.12)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardInner: {
    width: '100%',
  },
  imgContainer: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    fontSize: 100,
    opacity: 0.04,
    transform: [{ scale: 0.9 }, { rotate: '0deg' }],
  },
  watermarkPressed: {
    opacity: 0.16,
    transform: [{ scale: 1.15 }, { rotate: '-5deg' }],
  },
  cardBody: {
    padding: 20,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 18,
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  sizeTag: {
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.15)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  sizeTagText: {
    fontSize: 10,
    color: COLORS.gold2,
    fontWeight: '500',
  },
});

