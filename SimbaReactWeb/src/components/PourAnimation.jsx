import React, { useEffect, useRef } from 'react';

export default function PourAnimation() {
  const sceneRef = useRef(null);
  const progRef = useRef(null);
  
  // Bottle elements
  const bottleGrpRef = useRef(null);
  const capGrpRef = useRef(null);
  const bottleLiqLevelGrpRef = useRef(null);
  const bottleLiqRef = useRef(null);
  const bottleSurfaceRef = useRef(null);

  // Stream elements
  const streamRef = useRef(null);
  const spRef = useRef(null);
  const sp2Ref = useRef(null);
  const sp3Ref = useRef(null);
  const splashRef = useRef(null);

  // Glass elements
  const glassRef = useRef(null);
  const gfillRef = useRef(null);
  const foamRef = useRef(null);
  const foamDotsRef = useRef(null);
  const sparklesRef = useRef(null);
  const shadowRef = useRef(null);

  // Title / cues
  const cueRef = useRef(null);
  const titleWrapRef = useRef(null);
  const brandDivRef = useRef(null);
  const subDivRef = useRef(null);
  const companyRef = useRef(null);
  
  // Intro cards
  const pit1Ref = useRef(null);
  const pit2Ref = useRef(null);

  // Stage labels
  const psl1Ref = useRef(null);
  const psl2Ref = useRef(null);
  const psl3Ref = useRef(null);
  const psl4Ref = useRef(null);
  const psl5Ref = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Select elements that need arrays
    const stageLabels = [
      psl1Ref.current,
      psl2Ref.current,
      psl3Ref.current,
      psl4Ref.current,
      psl5Ref.current
    ];

    const bubbles = Array.from(scene.querySelectorAll('#ps-bubbles circle'));
    const splashParticles = Array.from(scene.querySelectorAll('.ps-sub-spark'));
    const mdrips = Array.from(scene.querySelectorAll('.ps-mdrip'));
    const letters = Array.from(brandDivRef.current.querySelectorAll('.brand-letter'));

    // State trackers
    var curStage = -1;
    var liveFillY = 655; // GLASS_BOT
    var bubblesAlive = false;
    var splashAlive = false;
    var prevP = -1;

    // Clamp & easing helpers
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function easeIO(t)       { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function easeOut(t)      { return 1 - Math.pow(1 - t, 3); }

    // Bottle geometry
    var PX = 300, PY = 280;       // Pivot
    var MX = 300, MY = 107;        // Mouth upright (slender bottle mouth tip at y=107)
    var GLASS_CX  = 200;
    var GLASS_TOP = 530;          // liquid top y (full)
    var GLASS_BOT = 655;          // liquid bottom y (base)

    function setBottle(angleDeg, dx, dy) {
      if (bottleGrpRef.current) {
        bottleGrpRef.current.setAttribute('transform',
          'translate(' + dx + ',' + dy + ')' +
          ' rotate(' + angleDeg + ',' + (PX - dx) + ',' + (PY - dy) + ')'
        );
      }
    }

    function mouthPos(angleDeg, dx, dy) {
      var rad = angleDeg * Math.PI / 180;
      var rx  = MX - PX; // 0
      var ry  = MY - PY; // -190
      return {
        x: PX + dx + rx * Math.cos(rad) - ry * Math.sin(rad),
        y: PY + dy + rx * Math.sin(rad) + ry * Math.cos(rad)
      };
    }

    function mouthEdgePos(angleDeg, dx, dy, offsetX) {
      var rad = angleDeg * Math.PI / 180;
      var rx  = offsetX;
      var ry  = MY - PY; // -190
      return {
        x: PX + dx + rx * Math.cos(rad) - ry * Math.sin(rad),
        y: PY + dy + rx * Math.sin(rad) + ry * Math.cos(rad)
      };
    }

    function setStage(idx) {
      if (idx === curStage) return;
      curStage = idx;
      stageLabels.forEach(function(l, i) {
        if (l) l.classList.toggle('show', i === idx);
      });
    }

    // Dynamic Bubbles Loop
    function startBubbles() {
      if (bubblesAlive) return;
      bubblesAlive = true;
      bubbles.forEach(function(b, i) {
        var delay = i * 200 + Math.random() * 100;
        setTimeout(function loop() {
          if (!bubblesAlive) return;
          var start = performance.now();
          var dur   = 1000 + Math.random() * 800;
          var rx    = 160 + Math.random() * 80;
          b.setAttribute('cx', '' + rx);

          (function tick(now) {
            if (!bubblesAlive) return;
            var t = Math.min(1, (now - start) / dur);
            
            var currentFillY = liveFillY;
            var y = GLASS_BOT - t * (GLASS_BOT - currentFillY);
            b.setAttribute('cy', '' + y.toFixed(1));

            var op = 0;
            if (t < 0.15) op = (t / 0.15) * 0.55;
            else if (t > 0.85) op = ((1 - t) / 0.15) * 0.55;
            else op = 0.55;
            b.setAttribute('opacity', '' + op.toFixed(2));

            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              setTimeout(loop, 200 + Math.random() * 500);
            }
          })(start);
        }, delay);
      });
    }

    // Splash Particles Loop
    function animateSplashParticles() {
      if (splashAlive) return;
      splashAlive = true;

      splashParticles.forEach(function(p, i) {
        var delay = i * 120;
        setTimeout(function loop() {
          if (!splashAlive) return;
          var start = performance.now();
          var dur = 400 + Math.random() * 300;

          var vx = (Math.random() - 0.5) * 4.5;
          var vy = -3.5 - Math.random() * 5;
          var gravity = 0.16;

          (function tick(now) {
            var tMs = now - start;
            var t = Math.min(1, tMs / dur);

            var currentFillY = liveFillY;
            var x = GLASS_CX + vx * (tMs * 0.05);
            var y = currentFillY + vy * (tMs * 0.05) + 0.5 * gravity * Math.pow(tMs * 0.05, 2);

            p.setAttribute('cx', '' + x.toFixed(1));
            p.setAttribute('cy', '' + y.toFixed(1));
            p.setAttribute('opacity', '' + (1 - t).toFixed(2));

            var streamOpacity = parseFloat(streamRef.current.style.opacity) || 0;
            if (t < 1 && streamOpacity > 0.1) {
              requestAnimationFrame(tick);
            } else {
              p.setAttribute('opacity', '0');
              if (streamOpacity > 0.1) {
                setTimeout(loop, Math.random() * 80);
              } else {
                splashAlive = false;
              }
            }
          })(start);
        }, delay);
      });
    }

    // Main render frame calculator
    function render(p) {
      if (progRef.current) progRef.current.style.height = (p * 100) + '%';

      // Phase 0 -> 0.08: scroll cue
      if (cueRef.current) cueRef.current.style.opacity = '' + clamp(1 - p / 0.06, 0, 1);

      // Phase 0.04 -> 0.24: cap lifts
      var p1 = easeOut(clamp((p - 0.04) / 0.20, 0, 1));
      if (capGrpRef.current) {
        capGrpRef.current.setAttribute('transform', 'translate(0,' + (-p1 * 65) + ')');
        capGrpRef.current.style.opacity = '' + clamp(1 - easeOut(clamp((p - 0.14) / 0.10, 0, 1)), 0, 1);
      }
      if (p >= 0.04 && p < 0.24) setStage(0);

      // Phase 0.22 -> 0.44: bottle tilts and translates over the glass
      var p2  = easeIO(clamp((p - 0.22) / 0.22, 0, 1));
      var ang = -65 * p2;
      var dx  = 65 * p2;
      var dy  = 15 * p2;
      setBottle(ang, dx, dy);

      // Counter-rotate liquid body inside bottle
      if (bottleLiqLevelGrpRef.current) {
        bottleLiqLevelGrpRef.current.setAttribute('transform', 'rotate(' + (-ang) + ', 300, 280)');
      }

      if (p >= 0.22 && p < 0.44) setStage(1);

      // Glass appears
      var gA = easeOut(clamp((p - 0.28) / 0.14, 0, 1));
      if (glassRef.current) glassRef.current.style.opacity = '' + gA;
      if (shadowRef.current) {
        shadowRef.current.setAttribute('rx', '' + gA * 44);
        shadowRef.current.setAttribute('ry', '' + gA * 5.5);
      }

      // Phase 0.44 -> 0.78: pour phase
      var p3 = clamp((p - 0.44) / 0.34, 0, 1);

      // Draining liquid inside bottle
      var liqY = 130 + p3 * 300;
      if (bottleLiqRef.current && bottleSurfaceRef.current) {
        bottleLiqRef.current.setAttribute('y', '' + liqY);
        bottleLiqRef.current.setAttribute('height', '' + (470 - liqY));
        bottleSurfaceRef.current.setAttribute('cy', '' + liqY);
      }

      if (p3 > 0) {
        if (streamRef.current) streamRef.current.style.opacity = '' + easeOut(Math.min(p3 * 5, 1));

        var m = mouthPos(ang, dx, dy);
        var m_left = mouthEdgePos(ang, dx, dy, -14);
        var m_right = mouthEdgePos(ang, dx, dy, 14);
        var g_left_x = GLASS_CX - 4.5;
        var g_right_x = GLASS_CX + 4.5;

        var radA = ang * Math.PI / 180;
        var exitVx = Math.sin(radA);
        var wobble = Math.sin(Date.now() * 0.005) * 1.5;

        // Bezier points (straight pour stream)
        var cp1_left_x = m_left.x + exitVx * 5 + wobble;
        var cp1_left_y = m_left.y + 40;
        var cp2_left_x = g_left_x + wobble * 0.4;
        var cp2_left_y = GLASS_TOP - 50;

        var cp1_right_x = m_right.x + exitVx * 5 + wobble;
        var cp1_right_y = m_right.y + 40;
        var cp2_right_x = g_right_x + wobble * 0.4;
        var cp2_right_y = GLASS_TOP - 50;

        var cp1x = m.x + exitVx * 5 + wobble;
        var cp1y = m.y + 40;
        var cp2x = GLASS_CX + wobble * 0.4;
        var cp2y = GLASS_TOP - 50;

        // Path definitions
        var pathFilled = 'M' + m_left.x.toFixed(1) + ' ' + m_left.y.toFixed(1) +
                         ' C' + cp1_left_x.toFixed(1) + ' ' + cp1_left_y.toFixed(1) +
                         ' ' + cp2_left_x.toFixed(1) + ' ' + cp2_left_y.toFixed(1) +
                         ' ' + g_left_x.toFixed(1) + ' ' + GLASS_TOP.toFixed(1) +
                         ' L' + g_right_x.toFixed(1) + ' ' + GLASS_TOP.toFixed(1) +
                         ' C' + cp2_right_x.toFixed(1) + ' ' + cp2_right_y.toFixed(1) +
                         ' ' + cp1_right_x.toFixed(1) + ' ' + cp1_right_y.toFixed(1) +
                         ' ' + m_right.x.toFixed(1) + ' ' + m_right.y.toFixed(1) +
                         ' Z';

        var pathSpine = 'M' + m.x.toFixed(1) + ' ' + m.y.toFixed(1) +
                        ' C' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) +
                        ' ' + cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) +
                        ' ' + GLASS_CX + ' ' + GLASS_TOP;

        if (spRef.current) spRef.current.setAttribute('d', pathFilled);
        if (sp2Ref.current) sp2Ref.current.setAttribute('d', pathSpine);
        if (sp3Ref.current) sp3Ref.current.setAttribute('d', pathSpine);

        // Glass filling calculations
        var maxH = GLASS_BOT - GLASS_TOP; // 125 units
        var fillH = easeIO(p3) * maxH;
        var fillY = GLASS_BOT - fillH;
        liveFillY = fillY; // Update level globally

        // Splash ring
        if (splashRef.current) {
          var sr = Math.min(p3 * 18, 14);
          splashRef.current.setAttribute('cx', '' + GLASS_CX);
          splashRef.current.setAttribute('cy', '' + fillY);
          splashRef.current.setAttribute('rx', '' + sr);
          splashRef.current.setAttribute('ry', '' + (sr * 0.25));
          splashRef.current.style.opacity = '' + (p3 > 0.05 && p3 < 0.98 ? 0.65 : 0);
        }

        // Falling droplets
        mdrips.forEach(function(d, idx) {
          if (!d) return;
          var t = [0.25, 0.55, 0.78][idx];
          var bx = Math.pow(1-t,3)*m.x + 3*Math.pow(1-t,2)*t*cp1x + 3*(1-t)*t*t*cp2x + t*t*t*GLASS_CX;
          var by = Math.pow(1-t,3)*m.y + 3*Math.pow(1-t,2)*t*cp1y + 3*(1-t)*t*t*cp2y + t*t*t*GLASS_TOP;
          d.setAttribute('cx', '' + bx.toFixed(1));
          d.setAttribute('cy', '' + by.toFixed(1));
          d.style.opacity = p3 > 0.15 && p3 < 0.98 ? '0.55' : '0';
        });

        // Wavy sloshing surface path
        var wave = Math.sin(Date.now() * 0.008) * 2.2;
        if (p3 === 0 || p3 >= 0.98) wave = 0;
        var pathGfill = 'M 120 680 L 120 ' + fillY.toFixed(1) + 
                       ' Q 160 ' + (fillY + wave).toFixed(1) + ' 200 ' + fillY.toFixed(1) + 
                       ' Q 240 ' + (fillY - wave).toFixed(1) + ' 280 ' + fillY.toFixed(1) + 
                       ' L 280 680 Z';
        if (gfillRef.current) gfillRef.current.setAttribute('d', pathGfill);

        // Foam rx, ry and slight wobble
        var fr = Math.min((fillH / maxH) * 56, 56);
        var fry = Math.min((fillH / maxH) * 9, 9);
        var foamWobble = Math.sin(Date.now() * 0.004) * 0.4;
        if (p3 >= 0.98) foamWobble = 0;
        if (foamRef.current) {
          foamRef.current.setAttribute('cx', '' + GLASS_CX);
          foamRef.current.setAttribute('cy', '' + fillY);
          foamRef.current.setAttribute('rx', '' + fr);
          foamRef.current.setAttribute('ry', '' + (fry + foamWobble).toFixed(2));
        }

        if (foamDotsRef.current) {
          foamDotsRef.current.style.opacity = fillH > 20 ? '' + Math.min(1, (fillH - 20) / 30) : '0';
          foamDotsRef.current.querySelectorAll('circle').forEach(function(d, idx) {
            var dotWobble = Math.sin(Date.now() * 0.003 + idx) * 1.2;
            if (p3 >= 0.98) dotWobble = 0;
            d.setAttribute('cy', '' + (fillY + dotWobble).toFixed(1));
          });
        }

        if (fillH > 10) {
          startBubbles();
          if (p3 < 0.98) animateSplashParticles();
        }
        if (sparklesRef.current) sparklesRef.current.style.opacity = fillH > 90 ? '' + easeOut((fillH - 90) / 24) : '0';

        // Company info fade-in
        if (companyRef.current) companyRef.current.style.opacity = '' + easeOut(Math.min(p3 * 3, 1));
        if (pit1Ref.current) pit1Ref.current.style.opacity = '' + easeOut(clamp((p3 - 0.04) / 0.22, 0, 1));
        if (pit2Ref.current) pit2Ref.current.style.opacity = '' + easeOut(clamp((p3 - 0.30) / 0.22, 0, 1));

        if (p3 < 0.5) setStage(2); else setStage(3);
      } else {
        if (streamRef.current) streamRef.current.style.opacity = '0';
        if (gfillRef.current) gfillRef.current.setAttribute('d', '');
        if (foamRef.current) {
          foamRef.current.setAttribute('rx', '0');
          foamRef.current.setAttribute('ry', '0');
        }
        if (foamDotsRef.current) foamDotsRef.current.style.opacity = '0';
        if (sparklesRef.current) sparklesRef.current.style.opacity = '0';
        if (companyRef.current) companyRef.current.style.opacity = '0';
        if (pit1Ref.current) pit1Ref.current.style.opacity = '0';
        if (pit2Ref.current) pit2Ref.current.style.opacity = '0';
        splashAlive = false;
        bubblesAlive = false;
      }

      // Phase 0.78 -> 0.90: returns upright
      var p4 = easeIO(clamp((p - 0.78) / 0.12, 0, 1));
      if (p4 > 0) {
        setBottle(ang * (1 - p4), dx * (1 - p4), dy * (1 - p4));
        if (streamRef.current) streamRef.current.style.opacity = '' + clamp(1 - easeOut(p4) * 1.6, 0, 1);
        if (companyRef.current) companyRef.current.style.opacity = '' + clamp(1 - easeOut(p4), 0, 1);
        if (capGrpRef.current) capGrpRef.current.style.opacity = '0';
        splashAlive = false;

        if (bottleLiqLevelGrpRef.current) {
          bottleLiqLevelGrpRef.current.setAttribute('transform', 'rotate(' + (-ang * (1 - p4)) + ', 300, 280)');
        }
      }

      // Phase 0.88 -> 1.0: letters reveal
      var p5 = clamp((p - 0.88) / 0.12, 0, 1);
      if (titleWrapRef.current) titleWrapRef.current.style.opacity = p5 > 0 ? '1' : '0';
      if (p5 > 0) {
        setStage(4);
        letters.forEach(function(s, i) {
          if (!s) return;
          var fe = easeOut(clamp((p5 - i * 0.048), 0, 1));
          s.style.opacity = '' + fe;
          var rot = (i % 2 === 0 ? 14 : -14) * (1 - fe);
          s.style.transform = 'translateY(' + (24 * (1 - fe)).toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg)';
        });
        if (subDivRef.current) subDivRef.current.classList.toggle('show', p5 > 0.55);
      } else {
        if (subDivRef.current) subDivRef.current.classList.remove('show');
      }
    }

    // Performance-Optimized Scroll Loop with Layout Caching
    var sceneTop = 0;
    var sceneHeight = 0;
    var isIntersecting = false;

    function cacheLayout() {
      if (window.innerWidth <= 1024) return;
      var rect = scene.getBoundingClientRect();
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      sceneTop = rect.top + scrollTop;
      sceneHeight = scene.offsetHeight;
    }

    // Cache layout on load, resize, and font ready events to handle layout shifts
    window.addEventListener('resize', cacheLayout);
    window.addEventListener('orientationchange', cacheLayout);
    window.addEventListener('load', cacheLayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(cacheLayout);
    }
    cacheLayout();

    var scrollScheduled = false;
    function onScroll() {
      if (!isIntersecting || window.innerWidth <= 1024) return;
      if (!scrollScheduled) {
        scrollScheduled = true;
        requestAnimationFrame(function() {
          var scrollTop = window.scrollY || document.documentElement.scrollTop;
          var total = sceneHeight - window.innerHeight;
          var p = clamp((scrollTop - sceneTop) / total, 0, 1);
          if (Math.abs(p - prevP) > 0.0004) {
            prevP = p;
            render(p);
          }
          scrollScheduled = false;
        });
      }
    }

    // Use IntersectionObserver to completely suspend scroll listeners when offscreen
    var sceneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cacheLayout();
          window.addEventListener('scroll', onScroll, { passive: true });
          
          // Trigger initial render
          var scrollTop = window.scrollY || document.documentElement.scrollTop;
          var total = sceneHeight - window.innerHeight;
          var p = clamp((scrollTop - sceneTop) / total, 0, 1);
          prevP = p;
          render(p);
        } else {
          window.removeEventListener('scroll', onScroll);
          bubblesAlive = false;
          splashAlive = false;
        }
      });
    }, { threshold: 0, rootMargin: '100px 0px 100px 0px' });

    // Handle mobile vs desktop
    if (window.innerWidth <= 1024) {
      render(0.75);
    } else {
      sceneObserver.observe(scene);
    }

    return () => {
      window.removeEventListener('resize', cacheLayout);
      window.removeEventListener('orientationchange', cacheLayout);
      window.removeEventListener('load', cacheLayout);
      window.removeEventListener('scroll', onScroll);
      if (sceneObserver && scene) sceneObserver.unobserve(scene);
      bubblesAlive = false;
      splashAlive = false;
    };
  }, []);

  const brandTitleText = "SIMBA BEVERAGES";
  const letters = brandTitleText.split("");

  return (
    <section id="pour-scene" ref={sceneRef}>
      <div className="pour-sticky">
        
        {/* Side progress bar */}
        <div className="pour-progress-bar">
          <div className="pour-progress-fill" ref={progRef}></div>
        </div>

        {/* Stage labels */}
        <div className="pour-stage-label" ref={psl1Ref} id="psl-1">Opening the bottle</div>
        <div className="pour-stage-label" ref={psl2Ref} id="psl-2">Ready to pour</div>
        <div className="pour-stage-label" ref={psl3Ref} id="psl-3">Pouring the drink</div>
        <div className="pour-stage-label" ref={psl4Ref} id="psl-4">Filling the glass</div>
        <div className="pour-stage-label" ref={psl5Ref} id="psl-5">Enjoy every drop</div>

        <svg id="pour-svg" viewBox="0 0 600 760" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Premium Amber-Gold Beverage Gradient for Glass Fill */}
            <linearGradient id="ps-liq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#ffeb84"/>
              <stop offset="15%"  stopColor="#e8c96b"/>
              <stop offset="55%"  stopColor="#b88328"/>
              <stop offset="100%" stopColor="#6e3e08" stopOpacity=".95"/>
            </linearGradient>
            {/* Cylindrical 3D Light Reflection Gradient for Stream */}
            <linearGradient id="ps-stream-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ab751b"/>
              <stop offset="25%" stopColor="#e8c96b"/>
              <stop offset="50%" stopColor="#fff4bd"/>
              <stop offset="75%" stopColor="#e8c96b"/>
              <stop offset="100%" stopColor="#8a5308"/>
            </linearGradient>
            {/* Inside-bottle Liquid (warm amber) */}
            <linearGradient id="ps-liq-inside" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3d1c00" stopOpacity="0.85"/>
              <stop offset="50%" stopColor="#7a3a00" stopOpacity="0.75"/>
              <stop offset="100%" stopColor="#2a1000" stopOpacity="0.90"/>
            </linearGradient>
            <linearGradient id="ps-liq-h" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(255,255,255,.35)"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            {/* Gold cap gradient */}
            <linearGradient id="ps-cap-green" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6b4c11"/>
              <stop offset="30%" stopColor="#c9a84c"/>
              <stop offset="60%" stopColor="#e8c96b"/>
              <stop offset="100%" stopColor="#8a6010"/>
            </linearGradient>
            {/* Gold foil neck gradient */}
            <linearGradient id="ps-foil" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7a5a10"/>
              <stop offset="40%" stopColor="#d4af37"/>
              <stop offset="70%" stopColor="#f0d060"/>
              <stop offset="100%" stopColor="#6b4c11"/>
            </linearGradient>
            {/* Deep amber glass body */}
            <linearGradient id="ps-bot-liq-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a0800"/>
              <stop offset="25%" stopColor="#3d1c00"/>
              <stop offset="55%" stopColor="#5c2a00"/>
              <stop offset="80%" stopColor="#3d1c00"/>
              <stop offset="100%" stopColor="#1a0800"/>
            </linearGradient>
            {/* Amber glass shine overlay */}
            <linearGradient id="ps-bot-wrap-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,180,80,0)"/>
              <stop offset="30%" stopColor="rgba(255,180,80,0.12)"/>
              <stop offset="55%" stopColor="rgba(255,220,130,0.22)"/>
              <stop offset="80%" stopColor="rgba(255,180,80,0.08)"/>
              <stop offset="100%" stopColor="rgba(255,180,80,0)"/>
            </linearGradient>
            {/* Cream label gradient */}
            <linearGradient id="ps-label-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5f0e8"/>
              <stop offset="100%" stopColor="#ede5d0"/>
            </linearGradient>
            {/* Badge bg */}
            <linearGradient id="ps-badge-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c1a00"/>
              <stop offset="100%" stopColor="#1a0e00"/>
            </linearGradient>
            <radialGradient id="ps-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%"   stopColor="#c9a84c" stopOpacity=".10"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>

            {/* ══ PREMIUM GLASS GRADIENTS ══ */}
            <linearGradient id="ps-glass-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(180,210,240,0.08)"/>
              <stop offset="20%"  stopColor="rgba(220,235,255,0.12)"/>
              <stop offset="50%"  stopColor="rgba(255,255,255,0.06)"/>
              <stop offset="80%"  stopColor="rgba(200,220,245,0.10)"/>
              <stop offset="100%" stopColor="rgba(160,190,225,0.05)"/>
            </linearGradient>
            <linearGradient id="ps-glass-highlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.35)"/>
              <stop offset="30%"  stopColor="rgba(255,255,255,0.18)"/>
              <stop offset="60%"  stopColor="rgba(255,255,255,0.06)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>
            <linearGradient id="ps-glass-stem" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(180,200,230,0.06)"/>
              <stop offset="30%"  stopColor="rgba(220,235,255,0.14)"/>
              <stop offset="50%"  stopColor="rgba(255,255,255,0.10)"/>
              <stop offset="70%"  stopColor="rgba(220,235,255,0.12)"/>
              <stop offset="100%" stopColor="rgba(180,200,230,0.04)"/>
            </linearGradient>
            <linearGradient id="ps-glass-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(255,255,255,0)"/>
              <stop offset="20%"  stopColor="rgba(255,255,255,0.45)"/>
              <stop offset="50%"  stopColor="rgba(255,255,255,0.60)"/>
              <stop offset="80%"  stopColor="rgba(255,255,255,0.35)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>
            <linearGradient id="ps-glass-base" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(180,200,230,0.04)"/>
              <stop offset="25%"  stopColor="rgba(220,240,255,0.12)"/>
              <stop offset="50%"  stopColor="rgba(255,255,255,0.16)"/>
              <stop offset="75%"  stopColor="rgba(220,240,255,0.10)"/>
              <stop offset="100%" stopColor="rgba(180,200,230,0.03)"/>
            </linearGradient>

            <clipPath id="ps-bottle-clip">
              <path d="M273 107 Q261 146 256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Q339 146 327 107 Z"/>
            </clipPath>
            {/* Bottle label clip path */}
            <clipPath id="ps-label-clip">
              <rect x="242" y="258" width="116" height="144" rx="13" />
            </clipPath>
            {/* Glass clip (above heavy base) */}
            <clipPath id="ps-gcl">
              <polygon points="140,520 125,655 275,655 260,520"/>
            </clipPath>
            {/* Splash clip */}
            <clipPath id="ps-scl">
              <rect x="110" y="490" width="180" height="200"/>
            </clipPath>
            <filter id="ps-blur" x="-60%" y="-20%" width="220%" height="140%">
              <feGaussianBlur stdDeviation="5"/>
            </filter>
             
             {/* High-Fidelity Vector Lion Face and Gold Crown Logo */}
             <g id="lion-logo">
               {/* Gold Crown */}
               <path d="M-10 -7 Q-5 -9 0 -9 Q5 -9 10 -7 L12 -12 L6 -16 L3 -12 L0 -20 L-3 -12 L-6 -16 L-12 -12 Z" fill="#d4af37"/>
               {/* Crown Tip Circles */}
               <circle cx="0" cy="-20" r="1.5" fill="#d4af37"/>
               <circle cx="-6" cy="-16" r="1.2" fill="#d4af37"/>
               <circle cx="6" cy="-16" r="1.2" fill="#d4af37"/>
               <circle cx="-12" cy="-12" r="1.0" fill="#d4af37"/>
               <circle cx="12" cy="-12" r="1.0" fill="#d4af37"/>
               
               {/* Lion Face */}
               <path d="M-2.5 3 L2.5 3 L1 7 L-1 7 Z" fill="#000000"/>
               <path d="M-1 7 Q0 8 1 7 Q0 9.5 0 12" stroke="#000000" strokeWidth="0.8" fill="none"/>
               <path d="M-4 6 Q-2 7 0 6.5 Q2 7 4 6" stroke="#000000" strokeWidth="0.8" fill="none"/>
               <path d="M-6 -0.5 Q-4 -2.5 -2 -1.5" stroke="#000000" strokeWidth="1.2" fill="none"/>
               <path d="M2 -1.5 Q4 -2.5 6 -0.5" stroke="#000000" strokeWidth="1.2" fill="none"/>
               <polygon points="-5,-1 -3,-1.5 -2,-1 -3,-0.5" fill="#000000"/>
               <polygon points="5,-1 3,-1.5 2,-1 3,-0.5" fill="#000000"/>
               <path d="M-3 -4 Q0 -5.5 3 -4" stroke="#000000" strokeWidth="0.8" fill="none"/>
               <path d="M-2.5 -6 Q0 -8 2.5 -6" stroke="#000000" strokeWidth="0.8" fill="none"/>
               <path d="M-1.5 -8 Q0 -9.5 1.5 -8" stroke="#000000" strokeWidth="0.8" fill="none"/>
               
               {/* Mane locks */}
               <path d="M-3 -8 L0 -12 L3 -8 L0 -9 Z" fill="#000000"/>
               <path d="M-2 -10 C-6 -10 -9 -7 -10 -4 L-8 -5 C-7 -7 -5 -8 -2 -8 Z" fill="#000000"/>
               <path d="M-10 -4 C-13 -3 -15 0 -15 4 L-12 2 C-12 0 -10 -2 -8 -3 Z" fill="#000000"/>
               <path d="M-15 4 C-16 8 -14 11 -11 13 L-10 10 C-11 9 -12 7 -12 4 Z" fill="#000000"/>
               <path d="M-11 13 C-8 15 -5 15 -2 13 L-3 11 C-5 12 -7 12 -9 11 Z" fill="#000000"/>
               <path d="M-6 -8 C-9 -9 -11 -7 -12 -5 L-10 -5 C-9 -6 -8 -7 -6 -7 Z" fill="#000000"/>
               <path d="M-11 -5 C-13 -4 -14 -1 -14 2 L-12 1 C-12 -1 -11 -2 -10 -3 Z" fill="#000000"/>
               <path d="M-14 2 C-15 5 -14 8 -12 10 L-10 8 C-11 7 -11 5 -11 3 Z" fill="#000000"/>
               
               <path d="M2 -10 C6 -10 9 -7 10 -4 L8 -5 C7 -7 5 -8 2 -8 Z" fill="#000000"/>
               <path d="M10 -4 C13 -3 15 0 15 4 L12 2 C12 0 10 -2 8 -3 Z" fill="#000000"/>
               <path d="M15 4 C16 8 14 11 11 13 L10 10 C11 9 12 7 12 4 Z" fill="#000000"/>
               <path d="M11 13 C8 15 5 15 2 13 L3 11 C5 12 7 12 9 11 Z" fill="#000000"/>
               <path d="M6 -8 C9 -9 11 -7 12 -5 L10 -5 C9 -6 8 -7 6 -7 Z" fill="#000000"/>
               <path d="M11 -5 C13 -4 14 -1 14 2 L12 1 C12 -1 11 -2 10 -3 Z" fill="#000000"/>
               <path d="M14 2 C15 5 14 8 12 10 L10 8 C11 7 11 5 11 3 Z" fill="#000000"/>
               
               <path d="M0 12 L-2 15 L0 18 L2 15 Z" fill="#000000"/>
               <path d="M-3 11 L-5 14 L-2 15 L-1 13 Z" fill="#000000"/>
               <path d="M3 11 L5 14 L2 15 L1 13 Z" fill="#000000"/>
             </g>
           </defs>

          {/* Ambient glow */}
          <ellipse cx="300" cy="360" rx="290" ry="260" fill="url(#ps-glow)"/>

          {/* BOTTLE GROUP */}
          <g id="ps-bot-grp" ref={bottleGrpRef}>
            {/* ══ CAP (gold screw-top) — slender ══ */}
            <g id="ps-cap-grp" ref={capGrpRef}>
              <rect x="286" y="70" width="28" height="8" rx="2" fill="url(#ps-cap-green)"/>
              <rect x="280" y="78" width="40" height="30" rx="3" fill="url(#ps-cap-green)"/>
              {/* Cap ribs */}
              <line x1="286" y1="78" x2="286" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <line x1="291" y1="78" x2="291" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <line x1="296" y1="78" x2="296" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <line x1="301" y1="78" x2="301" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <line x1="306" y1="78" x2="306" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <line x1="311" y1="78" x2="311" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <line x1="316" y1="78" x2="316" y2="108" stroke="rgba(100,70,10,0.5)" strokeWidth="1.5"/>
              <rect x="280" y="80" width="40" height="5" rx="1" fill="rgba(255,220,100,0.2)"/>
            </g>

            {/* ══ GOLD FOIL NECK ══ */}
            <path d="M280 107 Q274 125 272 145 L328 145 Q326 125 320 107 Z" fill="url(#ps-foil)"/>
            <line x1="286" y1="107" x2="282" y2="145" stroke="rgba(100,70,10,0.35)" strokeWidth="1"/>
            <line x1="300" y1="107" x2="300" y2="145" stroke="rgba(255,230,120,0.25)" strokeWidth="0.8"/>
            <line x1="314" y1="107" x2="318" y2="145" stroke="rgba(100,70,10,0.35)" strokeWidth="1"/>
            <line x1="272" y1="143" x2="328" y2="143" stroke="#d4af37" strokeWidth="1.4"/>
            <line x1="272" y1="146" x2="328" y2="146" stroke="#8a6010" strokeWidth="0.7"/>

            {/* ══ GLASS BODY (slender deep amber) ══ */}
            <path d="M272 145 Q262 170 260 205 L260 425 Q260 460 300 466 Q340 460 340 425 L340 205 Q338 170 328 145 Z" fill="url(#ps-bot-liq-grad)"/>
            <path d="M272 145 Q262 170 260 205 L260 425 Q260 460 300 466 Q340 460 340 425 L340 205 Q338 170 328 145 Z" fill="url(#ps-bot-wrap-grad)"/>
            <path d="M272 145 Q262 170 260 205 L260 425 Q260 460 300 466 Q340 460 340 425 L340 205 Q338 170 328 145 Z" fill="none" stroke="rgba(201,140,30,0.4)" strokeWidth="2.5"/>

            {/* ══ GOLD SHOULDER BAND ══ */}
            <rect x="260" y="298" width="80" height="7" fill="#c9a84c" rx="1"/>
            <rect x="260" y="304" width="80" height="3" fill="#8a6010"/>

            {/* ══ CREAM LABEL ══ */}
            <rect x="262" y="305" width="76" height="128" rx="5" fill="url(#ps-label-grad)"/>
            <rect x="262" y="305" width="76" height="128" rx="5" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
            <rect x="267" y="311" width="66" height="116" rx="3" fill="none" stroke="#c9a84c" strokeWidth="0.9"/>

            {/* Lion badge */}
            <circle cx="300" cy="340" r="17" fill="url(#ps-badge-bg)" stroke="#d4af37" strokeWidth="1.5"/>
            <circle cx="300" cy="340" r="12" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.7"/>
            <use href="#lion-logo" x="300" y="340" transform="scale(0.72)" transformOrigin="300 340"/>

            {/* Brand text */}
            <text x="300" y="367" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="8" fill="#1a0e00" letterSpacing="1.5">VIN</text>
            <line x1="272" y1="370" x2="328" y2="370" stroke="#c9a84c" strokeWidth="0.7"/>
            <text x="300" y="381" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="10.5" fill="#1a0e00" letterSpacing="1.5">NKOLO</text>
            <text x="300" y="394" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="10.5" fill="#1a0e00" letterSpacing="1.5">MBOKA</text>
            <line x1="272" y1="398" x2="328" y2="398" stroke="#c9a84c" strokeWidth="0.7"/>
            <text x="300" y="407" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="3.2" fill="#6b4c11" letterSpacing="0.8">GINGER-BASED ALCOHOLIC BEVERAGE</text>
            <text x="300" y="416" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="3.0" fill="#8a6010" letterSpacing="0.4">330 ml · 12% Vol · Dar es Salaam</text>

            {/* ══ RED BANNER ══ */}
            <rect x="262" y="430" width="76" height="20" rx="3" fill="#b71c1c"/>
            <text x="300" y="443" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="2.8" fill="#ffffff" letterSpacing="0.1">NGUVU YA SIMBA · FAHARI YA TANZANIA</text>

            {/* ══ GLASS SHEEN ══ */}
            <path d="M266 149 Q263 260 266 440" stroke="rgba(255,180,80,0.16)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M272 147 Q270 220 272 380" stroke="rgba(255,220,140,0.10)" strokeWidth="4" strokeLinecap="round"/>
            <path d="M280 149 Q300 155 320 149" stroke="rgba(255,220,100,0.22)" strokeWidth="4" strokeLinecap="round"/>
            
            {/* Dynamic liquid inside bottle */}
            <g clipPath="url(#ps-bottle-clip)">
              <g id="ps-bottle-liq-level-grp" ref={bottleLiqLevelGrpRef}>
                <rect id="ps-bottle-liq" ref={bottleLiqRef} x="100" y="130" width="400" height="340" fill="url(#ps-liq-inside)" />
                <ellipse id="ps-bottle-liq-surface" ref={bottleSurfaceRef} cx="300" cy="130" rx="200" ry="7" fill="#c9a84c" opacity="0.55" />
              </g>
            </g>
          </g>

          {/* LIQUID STREAM */}
          <g id="ps-stream" ref={streamRef} style={{ opacity: 0 }}>
            <path id="ps-sp3" ref={sp3Ref} d="" stroke="rgba(201,168,76,.18)" strokeWidth="24" fill="none" strokeLinecap="round" filter="url(#ps-blur)"/>
            <path id="ps-sp" ref={spRef} d="" fill="url(#ps-stream-grad)" opacity=".80"/>
            <path id="ps-sp2" ref={sp2Ref} d="" stroke="rgba(255,248,200,.75)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <ellipse id="ps-splash" ref={splashRef} cx="200" cy="520" rx="0" ry="0" fill="none" stroke="rgba(201,168,76,.50)" strokeWidth="1.5"/>
            <circle className="ps-mdrip" cx="0" cy="0" r="2.5" fill="#e8c96b" opacity="0"/>
            <circle className="ps-mdrip" cx="0" cy="0" r="1.8" fill="#c9a84c" opacity="0"/>
            <circle className="ps-mdrip" cx="0" cy="0" r="2"   fill="#e8c96b" opacity="0"/>
            {/* Physics splash droplets */}
            <circle className="ps-sub-spark" cx="200" cy="655" r="2.2" fill="#ffe082" opacity="0"/>
            <circle className="ps-sub-spark" cx="200" cy="655" r="1.5" fill="#ffd54f" opacity="0"/>
            <circle className="ps-sub-spark" cx="200" cy="655" r="2.8" fill="#fff9c4" opacity="0"/>
            <circle className="ps-sub-spark" cx="200" cy="655" r="1.8" fill="#ffca28" opacity="0"/>
            <circle className="ps-sub-spark" cx="200" cy="655" r="2.0" fill="#ffe082" opacity="0"/>
          </g>

          {/* COMPANY INTRO */}
          <g id="ps-company" ref={companyRef} style={{ opacity: 0 }}>
            <rect x="296" y="310" width="2" height="120" rx="1" fill="url(#ps-liq)" opacity=".35"/>
            <g id="pit-1" ref={pit1Ref} style={{ opacity: 0 }}>
              <text x="310" y="348" fontFamily="Playfair Display,serif" fontSize="22" fontWeight="700" fill="#c9a84c">Est. 1998</text>
              <text x="310" y="368" fontFamily="Inter,sans-serif" fontSize="8.5" fill="#e8c96b" letterSpacing="2.5">DAR ES SALAAM, Tanzania</text>
            </g>
            <line id="pit-div" x1="310" y1="380" x2="510" y2="380" stroke="rgba(201,168,76,.2)" strokeWidth=".8"/>
            <g id="pit-2" ref={pit2Ref} style={{ opacity: 0 }}>
              <text x="310" y="400" fontFamily="Inter,sans-serif" fontSize="9.5" fill="#d0c8b8">12M+ Litres Annually</text>
              <text x="310" y="418" fontFamily="Inter,sans-serif" fontSize="9.5" fill="#d0c8b8">ISO Certified Quality</text>
              <text x="310" y="436" fontFamily="Inter,sans-serif" fontSize="9.5" fill="#d0c8b8">Proudly African · Premidis Group</text>
            </g>
          </g>

          {/* GLASS */}
          <g id="ps-glass" ref={glassRef} style={{ opacity: 0 }}>
            {/* Outer glass body with premium transparent gradient */}
            <polygon points="140,520 125,655 275,655 260,520"
                     fill="url(#ps-glass-body)" stroke="rgba(200,220,255,0.22)" strokeWidth="2"/>
            {/* Inner glass refraction body */}
            <polygon points="146,524 131,652 269,652 254,524"
                     fill="none" stroke="rgba(200,220,255,0.10)" strokeWidth="1"/>

            {/* Glass rim — shiny top edge */}
            <line x1="138" y1="520" x2="262" y2="520"
                  stroke="url(#ps-glass-rim)" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Thin inner rim line */}
            <line x1="144" y1="522" x2="256" y2="522"
                  stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>

            {/* Heavy crystal base zone */}
            <rect x="122" y="655" width="156" height="25" rx="2"
                  fill="url(#ps-glass-base)"/>
            {/* Base horizontal divider line */}
            <line x1="125" y1="655" x2="275" y2="655"
                  stroke="rgba(200,220,255,0.30)" strokeWidth="1.8"/>
            {/* Crystal base refraction lines */}
            <line x1="145" y1="658" x2="140" y2="675" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
            <line x1="175" y1="657" x2="172" y2="677" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
            <line x1="200" y1="656" x2="200" y2="678" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
            <line x1="225" y1="657" x2="228" y2="677" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
            <line x1="255" y1="658" x2="260" y2="675" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>

            {/* Left-edge glass reflections / highlights */}
            <path d="M145,526 L130,650"
                  stroke="url(#ps-glass-highlight)" strokeWidth="5" strokeLinecap="round" opacity="0.7"/>
            <path d="M151,524 L137,650"
                  stroke="rgba(255,255,255,0.10)" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Right-edge subtle reflection */}
            <path d="M255,528 L268,648"
                  stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeLinecap="round"/>

            {/* Liquid fill path */}
            <path id="ps-gfill" ref={gfillRef} d="" fill="url(#ps-liq)" opacity=".82" clipPath="url(#ps-gcl)"/>

            <ellipse id="ps-foam" ref={foamRef} cx="200" cy="680" rx="0" ry="0" fill="rgba(245,240,225,.38)" clipPath="url(#ps-gcl)"/>
            <g id="ps-foam-dots" ref={foamDotsRef} style={{ opacity: 0 }}>
              <circle cx="155" cy="680" r="4.5" fill="rgba(255,255,255,.30)"/>
              <circle cx="175" cy="680" r="3"   fill="rgba(255,255,255,.25)"/>
              <circle cx="200" cy="680" r="5.5" fill="rgba(255,255,255,.22)"/>
              <circle cx="225" cy="680" r="3.5" fill="rgba(255,255,255,.28)"/>
              <circle cx="245" cy="680" r="4"   fill="rgba(255,255,255,.24)"/>
            </g>
            
            {/* Stem — filled with glass-like gradient */}
            <rect x="192" y="680" width="16" height="26" rx="2"
                  fill="url(#ps-glass-stem)" stroke="rgba(200,220,255,0.18)" strokeWidth="1"/>
            {/* Stem centre shine */}
            <line x1="200" y1="682" x2="200" y2="704"
                  stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeLinecap="round"/>

            {/* Base — filled ellipse with gradient */}
            <ellipse cx="200" cy="706" rx="42" ry="8"
                     fill="url(#ps-glass-base)" stroke="rgba(200,220,255,0.22)" strokeWidth="1.2"/>
            {/* Base top shine arc */}
            <ellipse cx="200" cy="705" rx="30" ry="3"
                     fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>

            {/* Rising Bubbles */}
            <g id="ps-bubbles">
              <circle cx="156" cy="665" r="4"   fill="rgba(255,255,255,.30)" opacity="0"/>
              <circle cx="186" cy="648" r="3"   fill="rgba(255,255,255,.25)" opacity="0"/>
              <circle cx="222" cy="660" r="5"   fill="rgba(255,255,255,.20)" opacity="0"/>
              <circle cx="174" cy="636" r="3.5" fill="rgba(255,255,255,.22)" opacity="0"/>
              <circle cx="216" cy="624" r="4"   fill="rgba(255,255,255,.18)" opacity="0"/>
              <circle cx="204" cy="668" r="2.5" fill="rgba(255,255,255,.28)" opacity="0"/>
              <circle cx="168" cy="620" r="3"   fill="rgba(255,255,255,.22)" opacity="0"/>
            </g>

            {/* Sparkles when full — subtle SVG star/diamond shapes (NO emoji) */}
            <g id="ps-sparkles" ref={sparklesRef} style={{ opacity: 0 }}>
              {/* 4-point star top-left */}
              <path d="M125,510 L127,507 L129,510 L127,513 Z" fill="#e8c96b" opacity="0.80"/>
              <path d="M125,510 L127,504 L129,510 L127,516 Z" fill="#e8c96b" opacity="0.35"/>
              {/* Small diamond top-right */}
              <path d="M265,508 L267,505 L269,508 L267,511 Z" fill="#c9a84c" opacity="0.65"/>
              {/* 4-point star bottom-left */}
              <path d="M112,544 L114,541 L116,544 L114,547 Z" fill="#e8c96b" opacity="0.50"/>
              <path d="M112,544 L114,538 L116,544 L114,550 Z" fill="#e8c96b" opacity="0.20"/>
              {/* Small diamond bottom-right */}
              <path d="M276,546 L278,543 L280,546 L278,549 Z" fill="#c9a84c" opacity="0.45"/>
              {/* Tiny sparkle accent */}
              <circle cx="135" cy="525" r="1.5" fill="#ffe082" opacity="0.55"/>
              <circle cx="270" cy="530" r="1.2" fill="#ffe082" opacity="0.40"/>
            </g>
          </g>

          {/* Shadow under glass */}
          <ellipse id="ps-shadow" ref={shadowRef} cx="200" cy="718" rx="0" ry="0" fill="rgba(0,0,0,.35)"/>
        </svg>

        {/* Brand title */}
        <div className="pour-title-overlay" ref={titleWrapRef}>
          <div className="pour-brand" ref={brandDivRef}>
            {letters.map((char, idx) => {
              if (char === " ") return <span key={idx} style={{ display: 'inline-block', width: '.3em' }}>&nbsp;</span>;
              return (
                <span
                  key={idx}
                  className="brand-letter"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    transform: 'translateY(24px) rotate(' + (idx % 2 === 0 ? 14 : -14) + 'deg)',
                    transition: 'opacity .4s ease, transform .4s ease'
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
          <div className="pour-sub" ref={subDivRef}>Premium Quality · Tanzania · Est. 1998</div>
        </div>

        {/* Scroll cue */}
        <div className="pour-scroll-cue" ref={cueRef}>
          <div>Scroll to experience</div>
          <div className="pour-arrow">↓</div>
        </div>

      </div>
    </section>
  );
}
