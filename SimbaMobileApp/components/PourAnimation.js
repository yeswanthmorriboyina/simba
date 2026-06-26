import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import Svg, { G, Rect, Path, Circle, Defs, LinearGradient, Stop, ClipPath, Ellipse, Line, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../styles';

const { width } = Dimensions.get('window');

export default function PourAnimation({ scrollY, layoutY }) {
  const [progress, setProgress] = useState(0);
  const [animatedProgress] = useState(new Animated.Value(0));
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [stage, setStage] = useState(0);

  const windowHeight = Dimensions.get('window').height;

  // Trigger choreographed animation when visible in viewport
  useEffect(() => {
    if (!animationTriggered && layoutY > 0) {
      const triggerPosition = layoutY - windowHeight * 0.4;
      const listenerId = scrollY.addListener(({ value }) => {
        if (value >= triggerPosition) {
          setAnimationTriggered(true);
          scrollY.removeListener(listenerId);
        }
      });
      return () => scrollY.removeListener(listenerId);
    }
  }, [scrollY, layoutY, animationTriggered, windowHeight]);

  // Run the 4.5-second choreographed animation once triggered
  useEffect(() => {
    if (animationTriggered) {
      Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 4500,
        useNativeDriver: false,
      }).start();

      const listenerId = animatedProgress.addListener(({ value }) => {
        setProgress(value);
        
        // Map stage labels based on progress values
        if (value < 0.22) setStage(0); // Depressurise
        else if (value < 0.44) setStage(1); // Tilt
        else if (value < 0.6) setStage(2); // Pour
        else if (value < 0.8) setStage(3); // Fill
        else setStage(4); // Complete
      });

      return () => animatedProgress.removeListener(listenerId);
    }
  }, [animationTriggered]);

  // Clamp & Easing Helpers
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const easeIO = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  // Eased parameters
  const cueOpacity = clamp(1 - progress / 0.06, 0, 1);

  // Cap lift
  const pCapLift = easeOut(clamp((progress - 0.04) / 0.2, 0, 1));
  const capY = -pCapLift * 65;
  const capOpacity = clamp(1 - easeOut(clamp((progress - 0.14) / 0.1, 0, 1)), 0, 1);

  // Bottle tilt
  const pTilt = easeIO(clamp((progress - 0.22) / 0.22, 0, 1));
  const ang = -65 * pTilt;
  const bottleTransform = `rotate(${ang}, 300, 280)`;

  // Glass fade-in
  const glassOpacity = easeOut(clamp((progress - 0.28) / 0.14, 0, 1));
  const shadowRx = glassOpacity * 44;
  const shadowRy = glassOpacity * 5.5;

  // Pour stage
  const pPour = clamp((progress - 0.44) / 0.34, 0, 1);
  const streamOpacity = easeOut(Math.min(pPour * 5, 1));

  // Geometry
  const PX = 300, PY = 280; // Pivot
  const MX = 300, MY = 90;  // Bottle mouth upright
  const GLASS_CX = 200;
  const GLASS_TOP = 530;    // liquid top y (full)
  const GLASS_BOT = 655;    // liquid bottom y (base)

  // Calculations for stream & glass
  const radA = (ang * Math.PI) / 180;
  const exitVx = Math.sin(radA);
  const rx_c = 0, ry_c = -190;
  
  const m_center = {
    x: PX + rx_c * Math.cos(radA) - ry_c * Math.sin(radA),
    y: PY + rx_c * Math.sin(radA) + ry_c * Math.cos(radA),
  };
  const m_left = {
    x: PX - 12 * Math.cos(radA) - ry_c * Math.sin(radA),
    y: PY - 12 * Math.sin(radA) + ry_c * Math.cos(radA),
  };
  const m_right = {
    x: PX + 12 * Math.cos(radA) - ry_c * Math.sin(radA),
    y: PY + 12 * Math.sin(radA) + ry_c * Math.cos(radA),
  };

  const g_left_x = GLASS_CX - 3;
  const g_right_x = GLASS_CX + 3;

  // Wobble simulation based on progress
  const wobble = pPour > 0 && pPour < 0.98 ? Math.sin(progress * 130) * 1.5 : 0;

  var cp1_left_x = m_left.x + exitVx * 45 + wobble;
  var cp1_left_y = m_left.y + 80;
  var cp2_left_x = g_left_x + wobble * 0.4;
  var cp2_left_y = GLASS_TOP - 50;

  var cp1_right_x = m_right.x + exitVx * 45 + wobble;
  var cp1_right_y = m_right.y + 80;
  var cp2_right_x = g_right_x + wobble * 0.4;
  var cp2_right_y = GLASS_TOP - 50;

  var cp1x = m_center.x + exitVx * 45 + wobble;
  var cp1y = m_center.y + 80;
  var cp2x = GLASS_CX + wobble * 0.4;
  var cp2y = GLASS_TOP - 50;

  // Path shapes
  const pathFilled = `M${m_left.x.toFixed(1)} ${m_left.y.toFixed(1)} C${cp1_left_x.toFixed(1)} ${cp1_left_y.toFixed(1)} ${cp2_left_x.toFixed(1)} ${cp2_left_y.toFixed(1)} ${g_left_x.toFixed(1)} ${GLASS_TOP.toFixed(1)} L${g_right_x.toFixed(1)} ${GLASS_TOP.toFixed(1)} C${cp2_right_x.toFixed(1)} ${cp2_right_y.toFixed(1)} ${cp1_right_x.toFixed(1)} ${cp1_right_y.toFixed(1)} ${m_right.x.toFixed(1)} ${m_right.y.toFixed(1)} Z`;
  const pathSpine = `M${m_center.x.toFixed(1)} ${m_center.y.toFixed(1)} C${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${GLASS_CX} ${GLASS_TOP}`;

  // Draining level inside bottle
  const liqY = 130 + pPour * 300;

  // Glass fill rises
  const maxH = GLASS_BOT - GLASS_TOP; // 125 units
  const fillH = easeIO(pPour) * maxH;
  const fillY = GLASS_BOT - fillH;

  // Wavy glass surface sloshing
  const wave = pPour > 0 && pPour < 0.98 ? Math.sin(progress * 160) * 2.2 : 0;
  const pathGfill = `M120 680 L120 ${fillY.toFixed(1)} Q160 ${(fillY + wave).toFixed(1)} 200 ${fillY.toFixed(1)} Q240 ${(fillY - wave).toFixed(1)} 280 ${fillY.toFixed(1)} L280 680 Z`;

  // Foam RX, RY & wobble
  const foamRx = Math.min((fillH / maxH) * 56, 56);
  const foamRy = Math.min((fillH / maxH) * 9, 9);
  const foamWobble = pPour > 0 && pPour < 0.98 ? Math.sin(progress * 190) * 0.4 : 0;
  const finalFry = foamRy + foamWobble;

  // Foam dots opacity
  const foamDotsOpacity = fillH > 20 ? Math.min(1, (fillH - 20) / 30) : 0;

  // Splash ring at surface
  const splashRadiusX = Math.min(pPour * 18, 14);
  const splashRadiusY = splashRadiusX * 0.25;
  const splashOpacity = pPour > 0.05 && pPour < 0.98 ? 0.65 : 0;

  // Sparkles
  const sparkOpacity = fillH > 90 ? easeOut((fillH - 90) / 24) : 0;

  // Leveled liquid inside bottle (counter-rotation)
  const bottleLiqTransform = `rotate(${-ang}, 300, 280)`;

  // Return bottle upright
  const pReturn = easeIO(clamp((progress - 0.78) / 0.12, 0, 1));
  const finalAng = ang * (1 - pReturn);
  const finalBottleTransform = `rotate(${finalAng}, 300, 280)`;
  const finalBottleLiqTransform = `rotate(${-finalAng}, 300, 280)`;

  // Brand reveal
  const pBrandReveal = clamp((progress - 0.88) / 0.12, 0, 1);
  const textRevealOpacity = pBrandReveal;

  // Company intro panel opacity
  const companyOpacity = easeOut(Math.min(pPour * 3, 1));
  const pit1Opacity = easeOut(clamp((pPour - 0.04) / 0.22, 0, 1));
  const pit2Opacity = easeOut(clamp((pPour - 0.30) / 0.22, 0, 1));

  // Dynamic bubbles math simulation (no async timers, scrolls smoothly)
  const bubbleCoords = [0, 1, 2, 3, 4, 5].map((idx) => {
    const t = (progress * 4.5 + idx * 0.22) % 1.0;
    const y = GLASS_BOT - t * (GLASS_BOT - fillY);
    const x = 165 + ((idx * 23) % 70);
    const op = fillH > 10 ? Math.sin(t * Math.PI) * 0.5 : 0;
    return { x, y, op };
  });

  // Splash particles simulation (based on progress time)
  const splashParticlesCoords = [0, 1, 2, 3, 4].map((idx) => {
    const t = (progress * 12 + idx * 0.28) % 1.0;
    const vx = ((idx * 17) % 5) - 2.0;
    const vy = -3.5 - ((idx * 7) % 4);
    const gravity = 0.15;
    
    const tMs = t * 10;
    const x = GLASS_CX + vx * tMs;
    const y = fillY + vy * tMs + 0.5 * gravity * Math.pow(tMs, 2);
    const op = pPour > 0.05 && pPour < 0.98 ? (1 - t) * 0.75 : 0;
    
    return { x, y, op };
  });

  return (
    <View style={styles.pourScene}>
      <Text style={styles.cueText} opacity={cueOpacity}>Scroll down to see the magic pour</Text>

      <View style={styles.svgWrapper}>
        <Svg
          viewBox="0 0 600 760"
          style={styles.svg}
        >
          <Defs>
            {/* Premium Amber-Gold Beverage Gradient */}
            <LinearGradient id="ps-liq" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#ffeb84" />
              <Stop offset="15%" stopColor="#e8c96b" />
              <Stop offset="55%" stopColor="#b88328" />
              <Stop offset="100%" stopColor="#6e3e08" stopOpacity={0.95} />
            </LinearGradient>
            {/* Cylindrical 3D Light Reflection Gradient */}
            <LinearGradient id="ps-stream-grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#ab751b" />
              <Stop offset="25%" stopColor="#e8c96b" />
              <Stop offset="50%" stopColor="#fff4bd" />
              <Stop offset="75%" stopColor="#e8c96b" />
              <Stop offset="100%" stopColor="#8a5308" />
            </LinearGradient>
            {/* Inside-bottle Liquid Gradient (Green glass style) */}
            <LinearGradient id="ps-liq-inside" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#0f3d1b" stopOpacity={0.85} />
              <Stop offset="50%" stopColor="#2e7d32" stopOpacity={0.75} />
              <Stop offset="100%" stopColor="#092410" stopOpacity={0.90} />
            </LinearGradient>
            <LinearGradient id="ps-liq-h" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <Stop offset="100%" stopColor="transparent" />
            </LinearGradient>
            {/* Green ribbed cap gradient */}
            <LinearGradient id="ps-cap-green" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#1b5e20" />
              <Stop offset="35%" stopColor="#2e7d32" />
              <Stop offset="65%" stopColor="#4caf50" />
              <Stop offset="100%" stopColor="#0d5c14" />
            </LinearGradient>
            {/* Clear glass filled with brown beverage gradient */}
            <LinearGradient id="ps-bot-liq-grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#0f3d1b" />
              <Stop offset="50%" stopColor="#1b5e20" />
              <Stop offset="100%" stopColor="#092410" />
            </LinearGradient>
            {/* White wrapper sleeve gradient */}
            <LinearGradient id="ps-bot-wrap-grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#e8e5dc" />
              <Stop offset="35%" stopColor="#f7f4ee" />
              <Stop offset="70%" stopColor="#ffffff" />
              <Stop offset="100%" stopColor="#d9d6cd" />
            </LinearGradient>
            {/* Silhouette bottle clip path */}
            <ClipPath id="ps-bottle-clip">
              <Path d="M273 107 Q261 146 256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Q339 146 327 107 Z" />
            </ClipPath>
            {/* Bottle label clip path */}
            <ClipPath id="ps-label-clip">
              <Rect x="242" y="258" width="116" height="144" rx="13" />
            </ClipPath>
            {/* Glass clip path */}
            <ClipPath id="ps-gcl">
              <Path d="M152 520 L135 655 L265 655 L248 520 Z" />
            </ClipPath>
          </Defs>

          {/* Ambient Glow */}
          <Ellipse cx="300" cy="360" rx={290} ry={260} fill="rgba(201,168,76,0.06)" />

          {/* BOTTLE GROUP */}
          <G transform={progress >= 0.78 ? finalBottleTransform : bottleTransform}>
            {/* Cap — lifted off before pour (Ribbed Green Cap) */}
            <G opacity={capOpacity} transform={`translate(0, ${capY})`}>
              <Rect x="273" y="73" width="54" height="34" rx="3" fill="url(#ps-cap-green)" />
              <Rect x="279" y="63" width="42" height="11" rx="2" fill="url(#ps-cap-green)" />
              <Line x1="280" y1="73" x2="280" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="286" y1="73" x2="286" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="292" y1="73" x2="292" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="298" y1="73" x2="298" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="304" y1="73" x2="304" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="310" y1="73" x2="310" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="316" y1="73" x2="316" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
              <Line x1="322" y1="73" x2="322" y2="107" stroke="#1b5e20" strokeWidth={1.8} />
            </G>

            {/* Neck (Clear green glass) */}
            <Path d="M273 107 Q261 146 256 180 L344 180 Q339 146 327 107 Z" fill="url(#ps-bot-liq-grad)" />
            <Path d="M273 107 Q261 146 256 180 L344 180 Q339 146 327 107 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5} />

            {/* Body (Clear glass filled with brown beverage) */}
            <Path d="M256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Z" fill="url(#ps-bot-liq-grad)" />
            <Path d="M256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Z" fill="none" stroke="rgba(129,199,132,0.35)" strokeWidth={2} />

            {/* Shoulder Wrapper (White Sleeve) */}
            <Path d="M256 180 Q233 208 231 250 L231 326 L369 326 L369 250 Q367 208 344 180 Z" fill="url(#ps-bot-wrap-grad)" />

            {/* Decorative Chevron Band */}
            <Line x1="256" y1="178" x2="344" y2="178" stroke="#311b0b" strokeWidth={0.8} />
            <Line x1="256" y1="184" x2="344" y2="184" stroke="#311b0b" strokeWidth={0.8} />
            <Path d="M256 178 L 260 184 L 264 178 L 268 184 L 272 178 L 276 184 L 280 178 L 284 184 L 288 178 L 292 184 L 296 178 L 300 184 L 304 178 L 308 184 L 312 178 L 316 184 L 320 178 L 324 184 L 328 178 L 332 184 L 336 178 L 340 184 L 344 178" stroke="#311b0b" strokeWidth={0.8} fill="none" />

            {/* Dark Brown label */}
            <Rect x="231" y="326" width="138" height="94" fill="#311b0b" />

            {/* Badge Circle & Logo */}
            <Circle cx="300" cy="292" r="19" fill="#ffffff" stroke="#d4af37" strokeWidth={1.2} />
            <G transform="translate(300, 292)">
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

            {/* Brand Texts on Dark Brown */}
            <SvgText x="300" y="348" textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={13.5} fill="#ffffff" letterSpacing={0.8}>VIN</SvgText>
            <SvgText x="300" y="362" textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={13.5} fill="none" stroke="#ffffff" strokeWidth={2.2} letterSpacing={0.8}>NKOLO</SvgText>
            <SvgText x="300" y="362" textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={13.5} fill="none" stroke="#311b0b" strokeWidth={0.8} letterSpacing={0.8}>NKOLO</SvgText>
            <SvgText x="300" y="376" textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={13.5} fill="none" stroke="#ffffff" strokeWidth={2.2} letterSpacing={0.8}>MBOKA</SvgText>
            <SvgText x="300" y="376" textAnchor="middle" fontFamily="System" fontWeight="800" fontSize={13.5} fill="none" stroke="#311b0b" strokeWidth={0.8} letterSpacing={0.8}>MBOKA</SvgText>
            <SvgText x="300" y="386" textAnchor="middle" fontFamily="System" fontSize={4.5} fill="#d4af37" letterSpacing={0.2}>GINGER-BASED ALCOHOLIC BEVERAGE</SvgText>
            
            {/* Red Swahili banner */}
            <Rect x="231" y="398" width="138" height={22} fill="#b71c1c" />
            <SvgText x="300" y="411" textAnchor="middle" fontFamily="System" fontWeight="700" fontSize={4.2} fill="#ffffff" letterSpacing={0.1}>NGUVU YA SIMBA, FAHARI YA TANZANIA</SvgText>
            
            {/* Reflections */}
            <Path d="M240 184 Q236 306 240 446" stroke="rgba(255,255,255,0.09)" strokeWidth="8" />

            {/* Dynamic liquid inside bottle */}
            <G clipPath="url(#ps-bottle-clip)">
              <G transform={progress >= 0.78 ? finalBottleLiqTransform : bottleLiqTransform}>
                <Rect x="100" y={liqY} width="400" height={470 - liqY} fill="url(#ps-liq-inside)" />
                <Ellipse cx="300" cy={liqY} rx="200" ry="7" fill="#81c784" opacity={0.65} />
              </G>
            </G>
          </G>

          {/* LIQUID STREAM */}
          {pPour > 0 && (
            <G opacity={streamOpacity}>
              {/* Outer soft glow */}
              <Path d={pathSpine} stroke="rgba(201,168,76,0.18)" strokeWidth="24" fill="none" opacity={0.3} />
              {/* Main cylindrical stream */}
              <Path d={pathFilled} fill="url(#ps-stream-grad)" />
              {/* Thin specular highlight */}
              <Path d={pathSpine} stroke="rgba(255,248,200,0.75)" strokeWidth="1.8" fill="none" />
              
              {/* Splash Ring */}
              <Ellipse
                cx={GLASS_CX}
                cy={fillY}
                rx={splashRadiusX}
                ry={splashRadiusY}
                fill="none"
                stroke="rgba(201,168,76,0.5)"
                strokeWidth="1.5"
                opacity={splashOpacity}
              />

              {/* Splash droplets */}
              {splashParticlesCoords.map((particle, idx) => (
                <Circle
                  key={`splash-droplet-${idx}`}
                  cx={particle.x}
                  cy={particle.y}
                  r={1.8}
                  fill="#ffe082"
                  opacity={particle.op}
                />
              ))}
            </G>
          )}

          {/* COMPANY INTRO */}
          <G opacity={companyOpacity}>
            <Rect x="296" y="310" width="2" height="120" rx="1" fill="url(#ps-liq)" opacity={0.35} />
            <G opacity={pit1Opacity}>
              <SvgText x="310" y="348" fontFamily="Playfair Display" fontSize="22" fontWeight="700" fill="#c9a84c">Est. 1998</SvgText>
              <SvgText x="310" y="368" fontFamily="Inter" fontSize="8.5" fill="#e8c96b" letterSpacing={2.5}>DAR ES SALAAM, Tanzania</SvgText>
            </G>
            <Line x1="310" y1="380" x2="510" y2="380" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" />
            <G opacity={pit2Opacity}>
              <SvgText x="310" y="400" fontFamily="Inter" fontSize="9.5" fill="#d0c8b8">12M+ Litres Annually</SvgText>
              <SvgText x="310" y="418" fontFamily="Inter" fontSize="9.5" fill="#d0c8b8">ISO Certified Quality</SvgText>
              <SvgText x="310" y="436" fontFamily="Inter" fontSize="9.5" fill="#d0c8b8">Proudly African · Premidis Group</SvgText>
            </G>
          </G>

          {/* GLASS */}
          <G opacity={glassOpacity}>
            {/* Tumbler body */}
            <Path d="M152 520 L132 680 L268 680 L248 520 Z" fill="rgba(201,168,76,0.02)" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5" />
            {/* Heavy crystal base line & refractions */}
            <Line x1="135" y1="655" x2="265" y2="655" stroke="rgba(201,168,76,0.35)" strokeWidth="1.5" />
            <Path d="M142 670 L149 660 M258 670 L251 660" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            
            {/* Glass Fill Path */}
            {pPour > 0 && (
              <Path d={pathGfill} fill="url(#ps-liq)" clipPath="url(#ps-gcl)" />
            )}

            {/* Foam Ellipse */}
            <Ellipse cx={GLASS_CX} cy={fillY} rx={foamRx} ry={finalFry} fill="rgba(245,240,225,0.38)" clipPath="url(#ps-gcl)" />
            
            {/* Foam dots */}
            <G opacity={foamDotsOpacity}>
              <Circle cx="163" cy={fillY} r="4" fill="rgba(255,255,255,0.32)" />
              <Circle cx="181" cy={fillY} r="3" fill="rgba(255,255,255,0.25)" />
              <Circle cx="200" cy={fillY} r="5" fill="rgba(255,255,255,0.22)" />
              <Circle cx="218" cy={fillY} r="3.5" fill="rgba(255,255,255,0.28)" />
              <Circle cx="237" cy={fillY} r="4" fill="rgba(255,255,255,0.24)" />
            </G>

            {/* Tumbler stem and bottom base (decorative) */}
            <Rect x="194" y="680" width="12" height="26" fill="rgba(201,168,76,0.14)" stroke="rgba(201,168,76,0.3)" strokeWidth={1} />
            <Ellipse cx="200" cy="706" rx="36" ry="7" fill="rgba(201,168,76,0.07)" stroke="rgba(201,168,76,0.28)" strokeWidth={1} />
            <Line x1="158" y1="527" x2="138" y2="674" stroke="rgba(255,255,255,0.18)" strokeWidth="3.5" />
            <Line x1="180" y1="523" x2="162" y2="674" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

            {/* Rising Bubbles */}
            <G>
              {bubbleCoords.map((bubble, idx) => (
                <Circle
                  key={`rising-bubble-${idx}`}
                  cx={bubble.x}
                  cy={bubble.y}
                  r={idx % 2 === 0 ? 3.5 : 2.5}
                  fill="rgba(255,255,255,0.22)"
                  opacity={bubble.op}
                />
              ))}
            </G>

            {/* Glass Sparkles when full */}
            <G opacity={sparkOpacity}>
              <SvgText x="122" y="512" fontSize="14" fill="#e8c96b" opacity={0.85}>✨</SvgText>
              <SvgText x="256" y="510" fontSize="12" fill="#c9a84c" opacity={0.70}>✦</SvgText>
              <SvgText x="108" y="546" fontSize="10" fill="#e8c96b" opacity={0.50}>⋆</SvgText>
              <SvgText x="270" y="548" fontSize="9" fill="#c9a84c" opacity={0.45}>✦</SvgText>
            </G>
          </G>

          {/* Under-glass floor shadow */}
          <Ellipse cx="200" cy="718" rx={shadowRx} ry={shadowRy} fill="rgba(0,0,0,0.35)" />
        </Svg>
      </View>

      {/* Dynamic Brand Text Reveal Overlay */}
      {textRevealOpacity > 0 && (
        <View style={[styles.brandOverlay, { opacity: textRevealOpacity }]}>
          <Text style={styles.brandTitle}>SIMBA</Text>
          <Text style={styles.brandSub}>PREMIUM BEVERAGES</Text>
        </View>
      )}

      {/* Stage Labels on right */}
      <View style={styles.stageContainer}>
        <Text style={[styles.stageText, stage === 0 && styles.stageTextActive]}>Depressurise</Text>
        <Text style={[styles.stageText, stage === 1 && styles.stageTextActive]}>Tilt Angle</Text>
        <Text style={[styles.stageText, stage === 2 && styles.stageTextActive]}>Straight Pour</Text>
        <Text style={[styles.stageText, stage === 3 && styles.stageTextActive]}>Rising Fill</Text>
        <Text style={[styles.stageText, stage === 4 && styles.stageTextActive]}>Pure Chill</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pourScene: {
    backgroundColor: COLORS.navy,
    height: 600,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cueText: {
    position: 'absolute',
    top: 20,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  svgWrapper: {
    width: '100%',
    height: 520,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    width: width * 0.85,
    height: '100%',
  },
  brandOverlay: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.gold,
    letterSpacing: 4,
  },
  brandSub: {
    fontSize: 10,
    color: COLORS.white,
    letterSpacing: 2,
    marginTop: 4,
  },
  stageContainer: {
    position: 'absolute',
    right: 20,
    top: '30%',
    gap: 16,
  },
  stageText: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'right',
  },
  stageTextActive: {
    color: COLORS.gold,
  },
});
