// --- Navbar scroll ---
const nav = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  lastScroll = y;
}, { passive: true });

// --- Scroll reveal (IntersectionObserver) ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// --- Counter animation ---
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const text = n.textContent;
        const match = text.match(/(\d+)(\+?[A-Za-z]*)/);
        if (match) animateCount(n, parseInt(match[1]), match[2]);
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// --- Smooth active nav link ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
}, { passive: true });

// ============================================================
//  POUR ANIMATION — scroll-driven, sticky section
//
//  Geometry recap:
//    Bottle pivot  : (300, 466)
//    Bottle mouth  : (300,  90) when upright
//    Max tilt      : -22° (gentle pour, mouth stays nearly above glass)
//    Mouth at -22° : ≈ (179, 102) in SVG coords
//    Glass center  : x=200, top y=648
//    Stream angle  : Δx=21 Δy=546 → only 2.2° from vertical
// ============================================================
(function pourInit() {
  var scene = document.getElementById('pour-scene');
  if (!scene) return;

  var botGrp    = document.getElementById('ps-bot-grp');
  var capGrp    = document.getElementById('ps-cap-grp');
  var stream    = document.getElementById('ps-stream');
  var sp        = document.getElementById('ps-sp');
  var sp2       = document.getElementById('ps-sp2');
  var drip      = document.getElementById('ps-drip');
  var glass     = document.getElementById('ps-glass');
  var gfill     = document.getElementById('ps-gfill');
  var foam      = document.getElementById('ps-foam');
  var foamDots  = document.getElementById('ps-foam-dots');
  var bubbles   = Array.from(document.querySelectorAll('#ps-bubbles circle'));
  var sparks    = document.getElementById('ps-sparkles');
  var shadow    = document.getElementById('ps-shadow');
  var cue       = document.getElementById('ps-cue');
  var titleWrap = document.getElementById('ps-title');
  var brandDiv  = document.getElementById('ps-brand');
  var subDiv    = document.getElementById('ps-sub');
  var progFill  = document.getElementById('ps-prog');
  var company   = document.getElementById('ps-company');
  var pit1      = document.getElementById('pit-1');
  var pit2      = document.getElementById('pit-2');
  var stageLabels = [
    document.getElementById('psl-1'),
    document.getElementById('psl-2'),
    document.getElementById('psl-3'),
    document.getElementById('psl-4'),
    document.getElementById('psl-5')
  ];

  // ── Build letter-by-letter brand title ────────────────────
  var txt = 'SIMBA BEVERAGES';
  brandDiv.innerHTML = txt.split('').map(function(c, i) {
    if (c === ' ') return '<span style="display:inline-block;width:.3em;">&nbsp;</span>';
    var rot = (i % 2 === 0 ? 14 : -14);
    return '<span style="display:inline-block;opacity:0;' +
           'transform:translateY(24px) rotate(' + rot + 'deg);' +
           'transition:opacity .4s ease,transform .4s ease;">' + c + '</span>';
  }).join('');
  var letters = Array.from(brandDiv.querySelectorAll('span'))
                    .filter(function(s){ return !/width/.test(s.style.cssText); });

  // ── Helpers ───────────────────────────────────────────────
  function clamp(v,lo,hi){ return Math.max(lo,Math.min(hi,v)); }
  function lerp(a,b,t)   { return a+(b-a)*t; }
  function easeIO(t)     { return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2; }
  function easeOut(t)    { return 1-Math.pow(1-t,3); }

  // ── Bottle geometry ───────────────────────────────────────
  var PX = 300, PY = 280;       // pivot at mid-bottle (natural hand-hold)
  var MX = 300, MY = 90;        // mouth when upright
  var GLASS_CX  = 200;          // glass centre-x
  var GLASS_TOP = 530;          // liquid top y (full)
  var GLASS_BOT = 655;          // liquid bottom y (base)

  function setBottle(angleDeg, dx, dy) {
    botGrp.setAttribute('transform',
      'translate(' + dx + ',' + dy + ')' +
      ' rotate(' + angleDeg + ',' + (PX-dx) + ',' + (PY-dy) + ')'
    );
  }

  // World position of bottle mouth after rotation + translation
  function mouthPos(angleDeg, dx, dy) {
    var rad = angleDeg * Math.PI / 180;
    var rx  = MX - PX;   // = 0
    var ry  = MY - PY;   // = -190
    return {
      x: PX + dx + rx*Math.cos(rad) - ry*Math.sin(rad),
      y: PY + dy + rx*Math.sin(rad) + ry*Math.cos(rad)
    };
  }

  // World position of mouth edges for sheet pour
  function mouthEdgePos(angleDeg, dx, dy, offsetX) {
    var rad = angleDeg * Math.PI / 180;
    var rx  = offsetX;
    var ry  = MY - PY;   // = -190
    return {
      x: PX + dx + rx*Math.cos(rad) - ry*Math.sin(rad),
      y: PY + dy + rx*Math.sin(rad) + ry*Math.cos(rad)
    };
  }

  // ── Bubble animation (looping, dynamic tracking of liquid level) ────────────────────────────
  var bubblesAlive = false;
  function startBubbles() {
    if (bubblesAlive) return;
    bubblesAlive = true;
    bubbles.forEach(function(b, i) {
      var delay = i * 200 + Math.random() * 100;
      setTimeout(function loop() {
        if (!bubblesAlive) return;
        var start = performance.now();
        var dur   = 1000 + Math.random() * 800;
        // Randomize bubble X positions inside the glass width
        var rx = 160 + Math.random() * 80;
        b.setAttribute('cx', '' + rx);

        (function tick(now) {
          if (!bubblesAlive) return;
          var t = Math.min(1, (now - start) / dur);
          
          var currentFillY = liveFillY;
          var y = GLASS_BOT - t * (GLASS_BOT - currentFillY);
          b.setAttribute('cy', '' + y.toFixed(1));

          // Fade in at bottom, pop/fade out right at the surface
          var op = 0;
          if (t < 0.15) {
            op = (t / 0.15) * 0.55;
          } else if (t > 0.85) {
            op = ((1 - t) / 0.15) * 0.55;
          } else {
            op = 0.55;
          }
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

  // ── Physics-based Splash Particles Animation Loop ────────────────────
  var splashParticles = Array.from(document.querySelectorAll('.ps-sub-spark'));
  var splashAlive = false;

  function animateSplashParticles() {
    if (splashAlive) return;
    splashAlive = true;

    splashParticles.forEach(function(p, i) {
      var delay = i * 120;
      setTimeout(function loop() {
        if (!splashAlive) return;
        var start = performance.now();
        var dur = 400 + Math.random() * 300;

        // Launch physics variables: upward and outward
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

          var streamOpacity = parseFloat(stream.style.opacity) || 0;
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

  // ── State variables ───────────────────────────────────────
  var curStage = -1;
  var liveFillY = GLASS_BOT;

  function setStage(idx) {
    if (idx === curStage) return;
    curStage = idx;
    stageLabels.forEach(function(l,i){ l.classList.toggle('show', i===idx); });
  }

  // ── Main render ───────────────────────────────────────────
  var prevP = -1;
  function render(p) {
    if (progFill) progFill.style.height = (p*100)+'%';

    // Phase 0 → 0.08: scroll cue fades
    cue.style.opacity = ''+clamp(1-p/0.06, 0, 1);

    // Phase 0.04 → 0.24: cap lifts and vanishes
    var p1 = easeOut(clamp((p-0.04)/0.20, 0, 1));
    capGrp.setAttribute('transform','translate(0,'+(-p1*65)+')');
    capGrp.style.opacity = ''+clamp(1-easeOut(clamp((p-0.14)/0.10,0,1)),0,1);
    if (p>=0.04 && p<0.24) setStage(0);

    // Phase 0.22 → 0.44: bottle tilts and translates over the glass
    var p2  = easeIO(clamp((p-0.22)/0.22, 0, 1));
    var ang = -65 * p2;       // natural pour tilt (-65°)
    var dx  = 65 * p2;        // translate bottle right to align mouth above glass
    var dy  = 15 * p2;        // translate bottle down slightly
    setBottle(ang, dx, dy);
    
    // Liquid level inside bottle sloshes to stay horizontal relative to ground
    var liqLevelGrp = document.getElementById('ps-bottle-liq-level-grp');
    if (liqLevelGrp) {
      liqLevelGrp.setAttribute('transform', 'rotate(' + (-ang) + ', 300, 280)');
    }
    
    if (p>=0.22 && p<0.44) setStage(1);

    // Glass appears below
    var gA = easeOut(clamp((p-0.28)/0.14, 0, 1));
    glass.style.opacity  = ''+gA;
    shadow.setAttribute('rx',''+gA*44);
    shadow.setAttribute('ry',''+gA*5.5);

    // Phase 0.44 → 0.78: liquid falls into glass
    var p3 = clamp((p-0.44)/0.34, 0, 1);
    
    // Liquid level inside bottle drains
    var bottleLiq = document.getElementById('ps-bottle-liq');
    var bottleSurface = document.getElementById('ps-bottle-liq-surface');
    var liqY = 130 + p3 * 300; // drains from 130 to 430
    if (bottleLiq && bottleSurface) {
      bottleLiq.setAttribute('y', '' + liqY);
      bottleLiq.setAttribute('height', '' + (470 - liqY));
      bottleSurface.setAttribute('cy', '' + liqY);
    }

    if (p3 > 0) {
      stream.style.opacity = ''+easeOut(Math.min(p3*5,1));

      // Get mouth positions (wider offset for a richer, premium stream thickness)
      var m = mouthPos(ang, dx, dy);
      var m_left = mouthEdgePos(ang, dx, dy, -14);
      var m_right = mouthEdgePos(ang, dx, dy, 14);
      
      var g_left_x = GLASS_CX - 4.5;
      var g_right_x = GLASS_CX + 4.5;

      var radA   = ang * Math.PI / 180;
      var exitVx = Math.sin(radA);
      var wobble = Math.sin(Date.now() * 0.005) * 1.5;

      // Left stream control points (very small exitVx multiplier for a straight fall)
      var cp1_left_x = m_left.x + exitVx * 5 + wobble;
      var cp1_left_y = m_left.y + 40;
      var cp2_left_x = g_left_x + wobble * 0.4;
      var cp2_left_y = GLASS_TOP - 50;

      // Right stream control points
      var cp1_right_x = m_right.x + exitVx * 5 + wobble;
      var cp1_right_y = m_right.y + 40;
      var cp2_right_x = g_right_x + wobble * 0.4;
      var cp2_right_y = GLASS_TOP - 50;

      // Spine control points (for spine highlight and glow)
      var cp1x = m.x + exitVx * 5 + wobble;
      var cp1y = m.y + 40;
      var cp2x = GLASS_CX + wobble * 0.4;
      var cp2y = GLASS_TOP - 50;

      // 3D Tapered sheet path for stream
      var pathFilled = 'M' + m_left.x.toFixed(1) + ' ' + m_left.y.toFixed(1) +
                       ' C' + cp1_left_x.toFixed(1) + ' ' + cp1_left_y.toFixed(1) +
                       ' ' + cp2_left_x.toFixed(1) + ' ' + cp2_left_y.toFixed(1) +
                       ' ' + g_left_x.toFixed(1) + ' ' + GLASS_TOP.toFixed(1) +
                       ' L' + g_right_x.toFixed(1) + ' ' + GLASS_TOP.toFixed(1) +
                       ' C' + cp2_right_x.toFixed(1) + ' ' + cp2_right_y.toFixed(1) +
                       ' ' + cp1_right_x.toFixed(1) + ' ' + cp1_right_y.toFixed(1) +
                       ' ' + m_right.x.toFixed(1) + ' ' + m_right.y.toFixed(1) +
                       ' Z';

      var pathSpine = 'M'+m.x.toFixed(1)+' '+m.y.toFixed(1)+
                      ' C'+cp1x.toFixed(1)+' '+cp1y.toFixed(1)+
                      ' '+cp2x.toFixed(1)+' '+cp2y.toFixed(1)+
                      ' '+GLASS_CX+' '+GLASS_TOP;

      sp.setAttribute('d',  pathFilled);
      sp2.setAttribute('d', pathSpine);  // highlight reuses spine path

      // Shadow / depth layer
      var sp3 = document.getElementById('ps-sp3');
      if (sp3) sp3.setAttribute('d', pathSpine);

      // Glass fill rises from bottom (655 to 530)
      var maxH  = GLASS_BOT - GLASS_TOP; // 125 units
      var fillH = easeIO(p3) * maxH;
      var fillY = GLASS_BOT - fillH;
      liveFillY = fillY; // update global state

      // Animate splash ring at the live liquid surface
      var splash = document.getElementById('ps-splash');
      if (splash) {
        var sr = Math.min(p3 * 18, 14);
        splash.setAttribute('cx', ''+GLASS_CX);
        splash.setAttribute('cy', ''+fillY);
        splash.setAttribute('rx', ''+sr);
        splash.setAttribute('ry', ''+(sr*0.25));
        splash.style.opacity = ''+(p3 > 0.05 && p3 < 0.98 ? 0.65 : 0);
      }

      // Micro-droplets along the falling stream
      var mdrips = document.querySelectorAll('.ps-mdrip');
      if (mdrips.length >= 3) {
        var t1=0.25, t2=0.55, t3=0.78;
        [[t1,0],[t2,1],[t3,2]].forEach(function(td) {
          var t=td[0], i=td[1];
          var bx = Math.pow(1-t,3)*m.x + 3*Math.pow(1-t,2)*t*cp1x + 3*(1-t)*t*t*cp2x + t*t*t*GLASS_CX;
          var by = Math.pow(1-t,3)*m.y + 3*Math.pow(1-t,2)*t*cp1y + 3*(1-t)*t*t*cp2y + t*t*t*GLASS_TOP;
          mdrips[i].setAttribute('cx',''+bx.toFixed(1));
          mdrips[i].setAttribute('cy',''+by.toFixed(1));
          mdrips[i].style.opacity = p3 > 0.15 && p3 < 0.98 ? '0.55' : '0';
        });
      }

      // Sloshing / wavy liquid surface
      var wave = Math.sin(Date.now() * 0.008) * 2.2;
      if (p3 === 0 || p3 >= 0.98) wave = 0;
      var pathGfill = 'M 120 680 L 120 ' + fillY.toFixed(1) + 
                     ' Q 160 ' + (fillY + wave).toFixed(1) + ' 200 ' + fillY.toFixed(1) + 
                     ' Q 240 ' + (fillY - wave).toFixed(1) + ' 280 ' + fillY.toFixed(1) + 
                     ' L 280 680 Z';
      gfill.setAttribute('d', pathGfill);

      // Foam on liquid surface
      var fr  = Math.min(fillH/maxH*56, 56);
      var fry = Math.min(fillH/maxH*9,   9);
      var foamWobble = Math.sin(Date.now() * 0.004) * 0.4;
      if (p3 >= 0.98) foamWobble = 0;
      foam.setAttribute('cx',''+GLASS_CX);
      foam.setAttribute('cy',''+fillY);
      foam.setAttribute('rx',''+fr);
      foam.setAttribute('ry',''+(fry + foamWobble).toFixed(2));

      if (foamDots) {
        foamDots.style.opacity = fillH>20 ? ''+Math.min(1,(fillH-20)/30) : '0';
        foamDots.querySelectorAll('circle').forEach(function(d, idx){
          var dotWobble = Math.sin(Date.now() * 0.003 + idx) * 1.2;
          if (p3 >= 0.98) dotWobble = 0;
          d.setAttribute('cy',''+(fillY + dotWobble).toFixed(1));
        });
      }

      if (fillH > 10) {
        startBubbles();
        if (p3 < 0.98) animateSplashParticles();
      }
      sparks.style.opacity = fillH>90 ? ''+easeOut((fillH-90)/24) : '0';

      // Company intro fades in while liquid is mid-fall
      company.style.opacity = ''+easeOut(Math.min(p3*3, 1));
      pit1.style.opacity    = ''+easeOut(clamp((p3-0.04)/0.22,0,1));
      pit2.style.opacity    = ''+easeOut(clamp((p3-0.30)/0.22,0,1));

      if (p3<0.5) setStage(2); else setStage(3);
    } else {
      stream.style.opacity = '0';
      gfill.setAttribute('d', '');
      foam.setAttribute('rx','0'); foam.setAttribute('ry','0');
      if (foamDots) foamDots.style.opacity = '0';
      sparks.style.opacity = '0';
      company.style.opacity = '0';
      if (pit1) pit1.style.opacity = '0';
      if (pit2) pit2.style.opacity = '0';
      splashAlive = false;
      bubblesAlive = false;
    }

    // Phase 0.78 → 0.90: bottle returns upright
    var p4 = easeIO(clamp((p-0.78)/0.12, 0, 1));
    if (p4 > 0) {
      setBottle(ang*(1-p4), dx*(1-p4), dy*(1-p4));
      stream.style.opacity  = ''+clamp(1-easeOut(p4)*1.6, 0, 1);
      company.style.opacity = ''+clamp(1-easeOut(p4),     0, 1);
      capGrp.style.opacity  = '0';
      splashAlive = false;
      
      // Keep liquid inside bottle upright and counter-rotated
      if (liqLevelGrp) {
        liqLevelGrp.setAttribute('transform', 'rotate(' + (-ang*(1-p4)) + ', 300, 280)');
      }
    }

    // Phase 0.88 → 1.0: brand title reveals letter by letter
    var p5 = clamp((p-0.88)/0.12, 0, 1);
    titleWrap.style.opacity = p5 > 0 ? '1' : '0';
    if (p5 > 0) {
      setStage(4);
      letters.forEach(function(s, i) {
        var fe = easeOut(clamp((p5-i*0.048),0,1));
        s.style.opacity   = ''+fe;
        var rot = (i%2===0?14:-14)*(1-fe);
        s.style.transform = 'translateY('+(24*(1-fe)).toFixed(1)+'px) rotate('+rot.toFixed(1)+'deg)';
      });
      subDiv.classList.toggle('show', p5>0.55);
    } else {
      subDiv.classList.remove('show');
    }
  }

  // ── Performance-Optimized Scroll Loop with Layout Caching ──
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

  // Use IntersectionObserver to completely suspend execution when offscreen
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
        // Turn off running loops
        bubblesAlive = false;
        splashAlive = false;
      }
    });
  }, { threshold: 0, rootMargin: '100px 0px 100px 0px' });

  // Handle mobile immediately
  if (window.innerWidth <= 1024) {
    render(0.75);
  } else {
    sceneObserver.observe(scene);
  }
})();

// ============================================================
//  PRODUCT SPECIFICATIONS DATABASE
// ============================================================
const productData = {
  "Nkolo Mboka": {
    category: "Traditional Wine",
    desc: "A premium traditional wine crafted with natural ingredients, offering a rich and authentic taste of African heritage. Perfectly matured and blended.",
    nutrition: {
      "Alcohol Content": "12% Vol",
      "Sugars": "6.5g/100ml",
      "Energy": "72 kcal",
      "Ingredients": "Fermented Grapes & Herbs"
    },
    sizes: ["330ml"],
    basePrice: 14.50,
    icon: `<rect x="60" y="5" width="40" height="22" rx="3" fill="url(#p1cap)"/><line x1="65" y1="5" x2="65" y2="27" stroke="#1b5e20" stroke-width="1.2"/><line x1="70" y1="5" x2="70" y2="27" stroke="#1b5e20" stroke-width="1.2"/><line x1="75" y1="5" x2="75" y2="27" stroke="#1b5e20" stroke-width="1.2"/><line x1="80" y1="5" x2="80" y2="27" stroke="#1b5e20" stroke-width="1.2"/><line x1="85" y1="5" x2="85" y2="27" stroke="#1b5e20" stroke-width="1.2"/><line x1="90" y1="5" x2="90" y2="27" stroke="#1b5e20" stroke-width="1.2"/><line x1="95" y1="5" x2="95" y2="27" stroke="#1b5e20" stroke-width="1.2"/><path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p1body)"/><path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p1body)" stroke="rgba(129,199,132,0.35)" stroke-width="1.5"/><path d="M50 70 Q38 85 36 110 L36 140 L124 140 L124 110 Q122 85 110 70Z" fill="url(#p1wrap)"/><line x1="50" y1="68" x2="110" y2="68" stroke="#311b0b" stroke-width="0.5"/><line x1="50" y1="72" x2="110" y2="72" stroke="#311b0b" stroke-width="0.5"/><path d="M50 68 L 54 72 L 58 68 L 62 72 L 66 68 L 70 72 L 74 68 L 78 72 L 82 68 L 86 72 L 90 68 L 94 72 L 98 68 L 102 72 L 106 68 L 110 72" stroke="#311b0b" stroke-width="0.5" fill="none"/><rect x="36" y="140" width="88" height="58" fill="#311b0b"/><circle cx="80" cy="122" r="12" fill="#ffffff" stroke="#d4af37" stroke-width="0.8"/><use href="#lion-logo" transform="translate(80, 122) scale(0.6)"/><text x="80" y="153" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="6.5" fill="#ffffff" letter-spacing="0.4">VIN</text><text x="80" y="162" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="6.5" fill="none" stroke="#ffffff" stroke-width="1.2" letter-spacing="0.4">NKOLO</text><text x="80" y="162" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="6.5" fill="none" stroke="#311b0b" stroke-width="0.4" letter-spacing="0.4">NKOLO</text><text x="80" y="171" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="6.5" fill="none" stroke="#ffffff" stroke-width="1.2" letter-spacing="0.4">MBOKA</text><text x="80" y="171" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="6.5" fill="none" stroke="#311b0b" stroke-width="0.4" letter-spacing="0.4">MBOKA</text><text x="80" y="177" text-anchor="middle" font-family="Inter,sans-serif" font-size="2.0" fill="#d4af37" letter-spacing="0.1">GINGER BEVERAGE</text><rect x="36" y="182" width="88" height="14" fill="#b71c1c"/><text x="80" y="191" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="2.4" fill="#ffffff" letter-spacing="0.05">NGUVU YA SIMBA</text><defs><linearGradient id="p1cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#1b5e20"/><stop offset="35%" stop-color="#2e7d32"/><stop offset="65%" stop-color="#4caf50"/><stop offset="100%" stop-color="#0d5c14"/></linearGradient><linearGradient id="p1wrap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#e8e5dc"/><stop offset="35%" stop-color="#f7f4ee"/><stop offset="70%" stop-color="#ffffff"/><stop offset="100%" stop-color="#d9d6cd"/></linearGradient><linearGradient id="p1body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#0f3d1b"/><stop offset="50%" stop-color="#1b5e20"/><stop offset="100%" stop-color="#092410"/></linearGradient></defs>`
  },
  "Ola Kombucha": {
    category: "Probiotic Tea",
    desc: "Naturally fermented sparkling kombucha tea packed with probiotics and organic nutrients. A crisp, healthy beverage that refreshes and revitalizes.",
    nutrition: {
      "Probiotics Count": "1 Billion CFU",
      "Energy": "22 kcal",
      "Sugars": "4.2g/100ml",
      "Organic Acids": "0.5%"
    },
    sizes: ["330ml Can", "500ml"],
    basePrice: 11.00,
    icon: `<rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p2cap)"/><path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p2body)"/><path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p2body)"/><rect x="42" y="105" width="76" height="85" rx="6" fill="#0a1a06" opacity=".8"/><text x="80" y="143" text-anchor="middle" font-family="Playfair Display,serif" font-size="11" font-weight="700" fill="#c9a84c">SIMBA</text><text x="80" y="158" text-anchor="middle" font-family="Inter,sans-serif" font-size="6" fill="#a5d6a7" letter-spacing="1.5">OLA KOMBUCHA</text><text x="80" y="175" text-anchor="middle" font-size="14" fill="#aed581">🍃</text><path d="M56 72 Q58 140 54 188" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round"/><defs><linearGradient id="p2cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#8d4f16"/><stop offset="100%" stop-color="#c9a84c"/></linearGradient><linearGradient id="p2body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#4e2508" stop-opacity=".9"/><stop offset="100%" stop-color="#2c1404" stop-opacity=".95"/></linearGradient></defs>`
  },
  "Ginger Punch": {
    category: "Spiced Beverage",
    desc: "Zesty, fiery, and bold ginger beverage brewed from finest local ginger root and natural spices. Delivers a refreshing kick in every glass.",
    nutrition: {
      "Ginger Extract": "15%",
      "Energy": "38 kcal",
      "Sugars": "9.2g/100ml",
      "Sodium": "8mg"
    },
    sizes: ["330ml Can", "500ml", "1.5L"],
    basePrice: 12.50,
    icon: `<rect x="60" y="5" width="40" height="22" rx="5" fill="url(#p3cap)"/><path d="M60 27 Q52 50 50 70 L110 70 Q108 50 100 27Z" fill="url(#p3body)"/><path d="M50 70 Q38 85 36 110 L36 185 Q36 215 80 220 Q124 215 124 185 L124 110 Q122 85 110 70Z" fill="url(#p3body)"/><rect x="42" y="105" width="76" height="85" rx="6" fill="#1a0606" opacity=".8"/><text x="80" y="143" text-anchor="middle" font-family="Playfair Display,serif" font-size="11" font-weight="700" fill="#c9a84c">SIMBA</text><text x="80" y="158" text-anchor="middle" font-family="Inter,sans-serif" font-size="6" fill="#ef9a9a" letter-spacing="1.5">GINGER PUNCH</text><text x="80" y="175" text-anchor="middle" font-size="14" fill="#ef5350">🍋</text><path d="M56 72 Q58 140 54 188" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round"/><defs><linearGradient id="p3cap" x1="60" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#ffd600"/></linearGradient><linearGradient id="p3body" x1="36" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#6e500a" stop-opacity=".9"/><stop offset="100%" stop-color="#3d2c05" stop-opacity=".95"/></linearGradient></defs>`
  },
  "Hard Rock": {
    category: "Energy Drink",
    desc: "High-performance energy drink formulated to deliver sustained physical stamina and mental focus. Packed with B-vitamins, taurine, and natural caffeine.",
    nutrition: {
      "Energy": "46 kcal",
      "Caffeine": "32mg/100ml",
      "Taurine": "400mg/100ml",
      "Vitamin B12": "1.5mcg"
    },
    sizes: ["250ml Can", "500ml Can"],
    basePrice: 18.00,
    icon: `<rect x="58" y="3" width="44" height="24" rx="6" fill="url(#p4cap)"/><path d="M58 27 Q48 50 46 72 L114 72 Q112 50 102 27Z" fill="url(#p4body)"/><path d="M46 72 Q32 88 30 114 L30 186 Q30 218 80 220 Q130 218 130 186 L130 114 Q128 88 114 72Z" fill="url(#p4body)"/><rect x="38" y="110" width="84" height="82" rx="6" fill="#0a0a04" opacity=".85"/><text x="80" y="147" text-anchor="middle" font-family="Playfair Display,serif" font-size="10" font-weight="700" fill="#ffd600">SIMBA</text><text x="80" y="161" text-anchor="middle" font-family="Inter,sans-serif" font-size="5.5" fill="#ffee58" letter-spacing="1.5">HARD ROCK</text><text x="80" y="180" text-anchor="middle" font-size="14">⚡</text><path d="M52 74 Q54 144 50 188" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round"/><defs><linearGradient id="p4cap" x1="58" y1="0" x2="102" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ffd600"/><stop offset="100%" stop-color="#ffee58"/></linearGradient><linearGradient id="p4body" x1="30" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#3a0f7e" stop-opacity=".95"/><stop offset="100%" stop-color="#160438" stop-opacity=".98"/></linearGradient></defs>`
  }
};

// ============================================================
//  PRODUCT DETAILS MODAL LOGIC
// ============================================================
const modalOverlay = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-card-content');

function openProductModal(productName) {
  const p = productData[productName];
  if (!p) return;

  // Build specifications list
  let specsHtml = '';
  for (const [key, value] of Object.entries(p.nutrition)) {
    specsHtml += `
      <div class="modal-spec-item">
        <span class="modal-spec-label">${key}</span>
        <span class="modal-spec-val">${value}</span>
      </div>
    `;
  }

  // Build sizes selector
  let sizesHtml = p.sizes.map((s, idx) => `
    <button class="modal-size-btn ${idx === 0 ? 'active' : ''}" onclick="selectModalSize(this)">${s}</button>
  `).join('');

  // Dynamically set content
  modalContent.innerHTML = `
    <div class="modal-visual-panel">
      <svg viewBox="0 0 160 220" style="width:120px;height:auto;">
        ${p.icon}
      </svg>
    </div>
    <div class="modal-info-panel">
      <div class="modal-category">${p.category}</div>
      <h2>${productName}</h2>
      <p class="modal-desc">${p.desc}</p>
      
      <div class="modal-specs-title">Nutritional Information / Profile</div>
      <div class="modal-specs-grid">
        ${specsHtml}
      </div>

      <div class="modal-specs-title">Available Packaging</div>
      <div class="modal-sizes">
        ${sizesHtml}
      </div>

      <div style="display:flex; gap: 16px; margin-top:10px;">
        <button class="btn btn-gold" onclick="enquireProduct('${productName}')">Enquire B2B Pricing →</button>
        <button class="btn btn-outline" onclick="closeModal()">Close Details</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function selectModalSize(btn) {
  const siblings = btn.parentElement.querySelectorAll('.modal-size-btn');
  siblings.forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
}

function enquireProduct(productName) {
  closeModal();
  
  const targetSec = document.getElementById('calculator') || document.getElementById('contact');
  if (targetSec) {
    targetSec.scrollIntoView({ behavior: 'smooth' });
  }

  const prodSelect = document.getElementById('calc-product');
  if (prodSelect) {
    prodSelect.value = productName;
    updateCalculator();
  }

  const msgText = document.querySelector('#contact textarea');
  if (msgText) {
    msgText.value = `Hello Simba Team, \n\nI am interested in B2B distribution/retail pricing for ${productName}. Please get back to me with your volume catalogs and logistics pricing.`;
  }
  
  const roleSelect = document.querySelector('#contact select');
  if (roleSelect) {
    roleSelect.value = "Retailer / Shop Owner"; 
  }
}

// Attach closeModal to overlay click
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Expose functions to global scope (required because of standard inline HTML onclick attributes)
window.openProductModal = openProductModal;
window.closeModal = closeModal;
window.selectModalSize = selectModalSize;
window.enquireProduct = enquireProduct;

// ============================================================
//  B2B PRICING CALCULATOR LOGIC
// ============================================================
function updateCalculator() {
  const prodSelect = document.getElementById('calc-product');
  const qtySlider = document.getElementById('calc-quantity');
  
  if (!prodSelect || !qtySlider) return;

  const prodName = prodSelect.value;
  const qty = parseInt(qtySlider.value);
  
  const qtyDisplay = document.getElementById('calc-qty-val');
  if (qtyDisplay) qtyDisplay.textContent = qty + " cases";

  const p = productData[prodName];
  if (!p) return;

  const basePrice = p.basePrice;
  const baseValEl = document.getElementById('calc-base-val');
  if (baseValEl) baseValEl.textContent = "$" + basePrice.toFixed(2);

  // volume discounts tiers
  let discountPercent = 0;
  if (qty >= 1000) {
    discountPercent = 15;
  } else if (qty >= 500) {
    discountPercent = 10;
  } else if (qty >= 100) {
    discountPercent = 5;
  }

  const subtotal = basePrice * qty;
  const savings = subtotal * (discountPercent / 100);
  const total = subtotal - savings;
  const unitPrice = total / qty;

  const unitEl = document.getElementById('calc-unit-val');
  const discountEl = document.getElementById('calc-discount-val');
  const savingsEl = document.getElementById('calc-savings-val');
  const totalEl = document.getElementById('calc-total-val');

  if (unitEl) unitEl.textContent = "$" + unitPrice.toFixed(2);
  if (discountEl) discountEl.textContent = discountPercent + "%";
  if (savingsEl) savingsEl.textContent = "$" + savings.toFixed(2);
  if (totalEl) totalEl.textContent = "$" + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function initCalculator() {
  const qtySlider = document.getElementById('calc-quantity');
  const prodSelect = document.getElementById('calc-product');
  const calcBtn = document.getElementById('calc-enquiry-btn');

  if (qtySlider) qtySlider.addEventListener('input', updateCalculator);
  if (prodSelect) prodSelect.addEventListener('change', updateCalculator);

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const prodName = prodSelect ? prodSelect.value : "";
      const qty = qtySlider ? qtySlider.value : 0;
      
      const totalEl = document.getElementById('calc-total-val');
      const discountEl = document.getElementById('calc-discount-val');
      const totalStr = totalEl ? totalEl.textContent : "";
      const discount = discountEl ? discountEl.textContent : "";

      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }

      // Populate form message with calculator details
      const msgText = document.querySelector('#contact textarea');
      if (msgText) {
        msgText.value = `Hello Simba Team, \n\nI calculated an estimated bulk pricing quote on your portal:\n- Product: ${prodName}\n- Quantity: ${qty} cases\n- Volume Discount Applied: ${discount}\n- Total Estimated Cost: ${totalStr}\n\nPlease verify this quote and send me a formal contract invoice.`;
      }
      
      const roleSelect = document.querySelector('#contact select');
      if (roleSelect) {
        roleSelect.value = "Distributor / Wholesaler";
      }
    });
  }

  updateCalculator(); // initial run
  window.updateCalculator = updateCalculator;
}

// Initialize DOM dependent scripts
document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});

