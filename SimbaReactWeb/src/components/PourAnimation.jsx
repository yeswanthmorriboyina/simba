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
    var MX = 300, MY = 90;        // Mouth upright
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

      // Phase 0.22 -> 0.44: bottle tilts
      var p2  = easeIO(clamp((p - 0.22) / 0.22, 0, 1));
      var ang = -65 * p2;
      var dx  = 0;
      var dy  = 0;
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
        var m_left = mouthEdgePos(ang, dx, dy, -12);
        var m_right = mouthEdgePos(ang, dx, dy, 12);
        var g_left_x = GLASS_CX - 3;
        var g_right_x = GLASS_CX + 3;

        var radA = ang * Math.PI / 180;
        var exitVx = Math.sin(radA);
        var wobble = Math.sin(Date.now() * 0.005) * 1.5;

        // Bezier points
        var cp1_left_x = m_left.x + exitVx * 45 + wobble;
        var cp1_left_y = m_left.y + 80;
        var cp2_left_x = g_left_x + wobble * 0.4;
        var cp2_left_y = GLASS_TOP - 50;

        var cp1_right_x = m_right.x + exitVx * 45 + wobble;
        var cp1_right_y = m_right.y + 80;
        var cp2_right_x = g_right_x + wobble * 0.4;
        var cp2_right_y = GLASS_TOP - 50;

        var cp1x = m.x + exitVx * 45 + wobble;
        var cp1y = m.y + 80;
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
            {/* Inside-bottle Liquid Gradient */}
            <linearGradient id="ps-liq-inside" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a5308" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#e8c96b" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#6e3e08" stopOpacity="0.9"/>
            </linearGradient>
            <linearGradient id="ps-liq-h" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(255,255,255,.35)"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            {/* Green ribbed cap gradient */}
            <linearGradient id="ps-cap-green" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1b5e20"/>
              <stop offset="35%" stopColor="#2e7d32"/>
              <stop offset="65%" stopColor="#4caf50"/>
              <stop offset="100%" stopColor="#0d5c14"/>
            </linearGradient>
            {/* Clear glass filled with brown beverage gradient */}
            <linearGradient id="ps-bot-liq-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3c1e08"/>
              <stop offset="50%" stopColor="#5a2d0d"/>
              <stop offset="100%" stopColor="#2a1202"/>
            </linearGradient>
            {/* White wrapper sleeve gradient */}
            <linearGradient id="ps-bot-wrap-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e8e5dc"/>
              <stop offset="35%" stopColor="#f7f4ee"/>
              <stop offset="70%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#d9d6cd"/>
            </linearGradient>
            <radialGradient id="ps-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%"   stopColor="#c9a84c" stopOpacity=".10"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
            <clipPath id="ps-bottle-clip">
              <path d="M273 107 Q261 146 256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Q339 146 327 107 Z"/>
            </clipPath>
            {/* Bottle label clip path */}
            <clipPath id="ps-label-clip">
              <rect x="242" y="258" width="116" height="144" rx="13" />
            </clipPath>
            {/* Glass clip (above heavy base) */}
            <clipPath id="ps-gcl">
              <polygon points="152,520 135,655 265,655 248,520"/>
            </clipPath>
            {/* Splash clip */}
            <clipPath id="ps-scl">
              <rect x="120" y="490" width="160" height="200"/>
            </clipPath>
            <filter id="ps-blur" x="-60%" y="-20%" width="220%" height="140%">
              <feGaussianBlur stdDeviation="5"/>
            </filter>
          </defs>

          {/* Ambient glow */}
          <ellipse cx="300" cy="360" rx="290" ry="260" fill="url(#ps-glow)"/>

          {/* BOTTLE GROUP */}
          <g id="ps-bot-grp" ref={bottleGrpRef}>
            {/* CAP — lifted off before pour (Ribbed Green Cap) */}
            <g id="ps-cap-grp" ref={capGrpRef}>
              <rect x="273" y="73" width="54" height="34" rx="3" fill="url(#ps-cap-green)"/>
              <rect x="279" y="63" width="42" height="11" rx="2" fill="url(#ps-cap-green)"/>
              {/* Cap ribs */}
              <line x1="280" y1="73" x2="280" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="286" y1="73" x2="286" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="292" y1="73" x2="292" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="298" y1="73" x2="298" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="304" y1="73" x2="304" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="310" y1="73" x2="310" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="316" y1="73" x2="316" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
              <line x1="322" y1="73" x2="322" y2="107" stroke="#1b5e20" strokeWidth="1.8"/>
            </g>

            {/* NECK (White wrapper sleeve) */}
            <path d="M273 107 Q261 146 256 180 L344 180 Q339 146 327 107 Z" fill="url(#ps-bot-wrap-grad)"/>
            <path d="M273 107 Q261 146 256 180 L344 180 Q339 146 327 107 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>

            {/* BODY (Clear glass filled with brown beverage) */}
            <path d="M256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Z" fill="url(#ps-bot-liq-grad)"/>
            <path d="M256 180 Q233 208 231 250 L231 402 Q231 458 300 466 Q369 458 369 402 L369 250 Q367 208 344 180 Z" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2"/>

            {/* LABEL (Nkolo Mboka Premium Label) */}
            <g clipPath="url(#ps-label-clip)">
              {/* Top Half White */}
              <rect x="242" y="258" width="116" height="68" fill="#f7f4ee" />
              {/* Bottom Half Dark Brown */}
              <rect x="242" y="326" width="116" height="76" fill="#311b0b" />
              
              {/* Lion Circle & Gold Crown */}
              <circle cx="300" cy="292" r="19" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="2,1" />
              <path d="M291 264 L295 269 L300 265 L305 269 L309 264 L306 272 L294 272 Z" fill="#d4af37" />
              <text x="300" y="298" textAnchor="middle" fontSize="21">🦁</text>

              {/* Brand Texts on Dark Brown */}
              <text x="300" y="344" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="13" fill="#ffffff" letterSpacing="0.8">VIN</text>
              <text x="300" y="358" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="13" fill="#ffffff" letterSpacing="0.8">NKOLO</text>
              <text x="300" y="372" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="13" fill="#ffffff" letterSpacing="0.8">MBOKA</text>
              <text x="300" y="381" text-anchor="middle" fontFamily="Inter,sans-serif" fontSize="4.5" fill="#d4af37" letterSpacing="0.2">GINGER-BASED ALCOHOLIC BEVERAGE</text>
              
              {/* Red Swahili banner */}
              <rect x="242" y="388" width="116" height="14" fill="#b71c1c" />
              <text x="300" y="398" text-anchor="middle" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="4.2" fill="#ffffff" letterSpacing="0.1">NGUVU YA SIMBA, FAHARI YA TANZANIA</text>
            </g>

            {/* Shines */}
            <path d="M240 184 Q236 306 240 446" stroke="rgba(255,255,255,.09)" strokeWidth="8" stroke-linecap="round"/>
            <path d="M255 182 Q252 246 255 336" stroke="rgba(255,255,255,.06)" strokeWidth="3.5" stroke-linecap="round"/>

            {/* Dynamic liquid inside bottle */}
            <g clipPath="url(#ps-bottle-clip)">
              <g id="ps-bottle-liq-level-grp" ref={bottleLiqLevelGrpRef}>
                <rect id="ps-bottle-liq" ref={bottleLiqRef} x="100" y="130" width="400" height="340" fill="url(#ps-liq-inside)" />
                <ellipse id="ps-bottle-liq-surface" ref={bottleSurfaceRef} cx="300" cy="130" rx="200" ry="7" fill="#ffee58" opacity="0.65" />
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
            <polygon points="152,520 132,680 268,680 248,520" fill="rgba(201,168,76,.02)" stroke="rgba(201,168,76,.45)" strokeWidth="1.5"/>
            <line x1="135" y1="655" x2="265" y2="655" stroke="rgba(201,168,76,.35)" strokeWidth="1.5"/>
            <path d="M142 670 L149 660 M258 670 L251 660" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
            
            {/* Liquid fill path */}
            <path id="ps-gfill" ref={gfillRef} d="" fill="url(#ps-liq)" opacity=".82" clipPath="url(#ps-gcl)"/>
            
            <ellipse id="ps-foam" ref={foamRef} cx="200" cy="680" rx="0" ry="0" fill="rgba(245,240,225,.38)" clipPath="url(#ps-gcl)"/>
            <g id="ps-foam-dots" ref={foamDotsRef} style={{ opacity: 0 }}>
              <circle cx="163" cy="680" r="4"   fill="rgba(255,255,255,.32)"/>
              <circle cx="181" cy="680" r="3"   fill="rgba(255,255,255,.25)"/>
              <circle cx="200" cy="680" r="5"   fill="rgba(255,255,255,.22)"/>
              <circle cx="218" cy="680" r="3.5" fill="rgba(255,255,255,.28)"/>
              <circle cx="237" cy="680" r="4"   fill="rgba(255,255,255,.24)"/>
            </g>
            <rect x="194" y="680" width="12" height="26" fill="rgba(201,168,76,.14)" stroke="rgba(201,168,76,.30)" strokeWidth="1"/>
            <ellipse cx="200" cy="706" rx="36" ry="7" fill="rgba(201,168,76,.07)" stroke="rgba(201,168,76,.28)" strokeWidth="1"/>
            <line x1="158" y1="527" x2="138" y2="674" stroke="rgba(255,255,255,.18)" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="180" y1="523" x2="162" y2="674" stroke="rgba(255,255,255,.06)" strokeWidth="2" stroke-linecap="round"/>
            
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
            
            {/* Sparkles */}
            <g id="ps-sparkles" ref={sparklesRef} style={{ opacity: 0 }}>
              <text x="122" y="512" fontSize="14" fill="#e8c96b" opacity=".85">✨</text>
              <text x="256" y="510" fontSize="12" fill="#c9a84c" opacity=".70">✦</text>
              <text x="108" y="546" fontSize="10" fill="#e8c96b" opacity=".50">⋆</text>
              <text x="270" y="548" fontSize="9"  fill="#c9a84c" opacity=".45">✦</text>
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
