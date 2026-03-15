import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 178;
const FRAME_SPEED = 2.0;
const IMAGE_SCALE = 0.88;

function getFramePath(index: number): string {
  const padded = String(index).padStart(4, '0');
  return `/frames/frame_${padded}.webp`;
}

export default function HeroCanvas() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroStandaloneRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const bgColorRef = useRef('#58585A');
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const sampleBgColor = useCallback((img: HTMLImageElement) => {
    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.naturalWidth;
      tempCanvas.height = img.naturalHeight;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      tempCtx.drawImage(img, 0, 0);
      const corners = [
        tempCtx.getImageData(2, 2, 1, 1).data,
        tempCtx.getImageData(img.naturalWidth - 3, 2, 1, 1).data,
        tempCtx.getImageData(2, img.naturalHeight - 3, 1, 1).data,
        tempCtx.getImageData(img.naturalWidth - 3, img.naturalHeight - 3, 1, 1).data,
      ];
      const avg = [0, 1, 2].map(
        (ch) => Math.round(corners.reduce((s, c) => s + c[ch], 0) / corners.length)
      );
      bgColorRef.current = `rgb(${avg[0]},${avg[1]},${avg[2]})`;
    } catch {
      // CORS or other error, keep default
    }
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.fillStyle = bgColorRef.current;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Load frames
  useEffect(() => {
    let loaded = 0;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = frames;

    const loadFrame = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          frames[i] = img;
          loaded++;
          setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
          if (i % 20 === 0) sampleBgColor(img);
          if (loaded === FRAME_COUNT) setIsLoaded(true);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
          if (loaded === FRAME_COUNT) setIsLoaded(true);
          resolve();
        };
        img.src = getFramePath(i + 1);
      });
    };

    // Phase 1: load first 10 frames immediately
    const phase1 = Array.from({ length: Math.min(10, FRAME_COUNT) }, (_, i) => loadFrame(i));
    Promise.all(phase1).then(() => {
      // Phase 2: load remaining in batches of 10
      const remaining = Array.from({ length: FRAME_COUNT - 10 }, (_, i) => i + 10);
      let idx = 0;
      const loadBatch = () => {
        const batch = remaining.slice(idx, idx + 10);
        if (batch.length === 0) return;
        idx += 10;
        Promise.all(batch.map((i) => loadFrame(i))).then(loadBatch);
      };
      loadBatch();
    });
  }, [sampleBgColor]);

  // Setup canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      // Redraw with unscaled dimensions
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const scrollContainer = scrollContainerRef.current;
    const heroStandalone = heroStandaloneRef.current;
    const canvasWrap = canvasWrapRef.current;
    if (!canvas || !scrollContainer || !heroStandalone || !canvasWrap) return;

    // Draw first frame
    drawFrame(0);

    const marquee = marqueeRef.current;

    // Hero circle-wipe transition + hide canvas/marquee after scroll-container
    const heroTrigger = ScrollTrigger.create({
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Hero fades out
        heroStandalone.style.opacity = String(Math.max(0, 1 - p * 15));
        // Canvas reveals via expanding circle
        const wipeProgress = Math.min(1, Math.max(0, (p - 0.005) / 0.06));
        const radius = wipeProgress * 75;
        canvasWrap.style.clipPath = `circle(${radius}% at 50% 50%)`;

        // Fade out canvas and marquee near the end of scroll container
        const fadeOutStart = 0.88;
        if (p > fadeOutStart) {
          const fadeProgress = Math.min(1, (p - fadeOutStart) / 0.1);
          canvasWrap.style.opacity = String(1 - fadeProgress);
          if (marquee) marquee.style.opacity = String(0.06 * (1 - fadeProgress));
        } else {
          canvasWrap.style.opacity = '1';
          if (marquee) marquee.style.opacity = '0.06';
        }
      },
      onLeave: () => {
        // Fully hide when scrolled past
        canvasWrap.style.opacity = '0';
        canvasWrap.style.pointerEvents = 'none';
        heroStandalone.style.pointerEvents = 'none';
        if (marquee) marquee.style.opacity = '0';
      },
      onEnterBack: () => {
        canvasWrap.style.opacity = '1';
        canvasWrap.style.pointerEvents = 'auto';
        heroStandalone.style.pointerEvents = 'auto';
        if (marquee) marquee.style.opacity = '0.06';
      },
    });

    // Frame-to-scroll binding
    const frameTrigger = ScrollTrigger.create({
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
        const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
        if (index !== currentFrameRef.current) {
          currentFrameRef.current = index;
          requestAnimationFrame(() => drawFrame(index));
        }
      },
    });

    // Section animations
    const sections = scrollContainer.querySelectorAll<HTMLElement>('.scroll-section');
    const sectionTriggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const type = section.dataset.animation || 'fade-up';
      const persist = section.dataset.persist === 'true';
      const enter = parseFloat(section.dataset.enter || '0') / 100;
      const leave = parseFloat(section.dataset.leave || '100') / 100;
      const children = section.querySelectorAll(
        '.section-label, .section-heading, .section-body, .section-tagline, .cta-button'
      );

      // Position section at midpoint
      const midpoint = (enter + leave) / 2;
      section.style.position = 'absolute';
      section.style.top = `${midpoint * 100}%`;
      section.style.transform = 'translateY(-50%)';
      section.style.width = '100%';

      const tl = gsap.timeline({ paused: true });

      switch (type) {
        case 'fade-up':
          tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
          break;
        case 'slide-left':
          tl.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out' });
          break;
        case 'slide-right':
          tl.from(children, { x: 80, opacity: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out' });
          break;
        case 'scale-up':
          tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power2.out' });
          break;
        case 'clip-reveal':
          tl.from(children, {
            clipPath: 'inset(100% 0 0 0)',
            opacity: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power4.inOut',
          });
          break;
        default:
          tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
      }

      let hasPlayed = false;

      const st = ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: false,
        onUpdate: (self) => {
          const p = self.progress;
          const fadeIn = enter + 0.02;
          const fadeOut = leave - 0.02;

          if (p >= fadeIn && p <= fadeOut) {
            if (!hasPlayed) {
              tl.play();
              hasPlayed = true;
            }
            section.style.opacity = '1';
            section.style.pointerEvents = 'auto';
          } else if (persist && p > fadeOut) {
            section.style.opacity = '1';
            section.style.pointerEvents = 'auto';
          } else {
            if (hasPlayed && !persist) {
              tl.reverse();
              hasPlayed = false;
            }
            section.style.opacity = '0';
            section.style.pointerEvents = 'none';
          }
        },
      });

      sectionTriggers.push(st);
    });

    // Marquee scroll
    const marquees = scrollContainer.parentElement?.querySelectorAll<HTMLElement>('.marquee-wrap');
    const marqueeTriggers: gsap.core.Tween[] = [];
    marquees?.forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed || '-25');
      const text = el.querySelector('.marquee-text');
      if (text) {
        const tween = gsap.to(text, {
          xPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollContainer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
        marqueeTriggers.push(tween);
      }
    });

    return () => {
      heroTrigger.kill();
      frameTrigger.kill();
      sectionTriggers.forEach((st) => st.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded, drawFrame]);

  return (
    <>
      {/* Loader */}
      {!isLoaded && (
        <div
          id="loader"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#58585A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.6s ease',
          }}
        >
          <div
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.5rem',
              color: '#f5f5f0',
              marginBottom: '2rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            ΔΗΜΗΤΡΑ Κ. ΜΑΡΙΝΗ
          </div>
          <div
            style={{
              width: '200px',
              height: '2px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${loadProgress}%`,
                height: '100%',
                background: '#8a8a8c',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(245,245,240,0.5)',
              marginTop: '1rem',
              letterSpacing: '0.1em',
            }}
          >
            {loadProgress}%
          </div>
        </div>
      )}

      {/* Hero Standalone — fixed so it stays during circle-wipe */}
      <div
        ref={heroStandaloneRef}
        className="hero-standalone"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          background: '#58585A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
          <span
            className="section-label"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,240,0.5)',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          >
            Δικηγορικό Γραφείο
          </span>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 400,
              color: '#f5f5f0',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            <span style={{ display: 'block' }}>Δήμητρα</span>
            <span style={{ display: 'block', fontWeight: 700, fontStyle: 'italic' }}>Κ. Μαρίνη</span>
          </h1>
          <p
            className="hero-tagline"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
              color: 'rgba(245,245,240,0.6)',
              marginTop: '2rem',
              fontWeight: 300,
              letterSpacing: '0.05em',
              lineHeight: 1.7,
            }}
          >
            Με σεβασμό, ειλικρίνεια και επαγγελματική αφοσίωση
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,240,0.4)',
            }}
          >
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ opacity: 0.4, animation: 'heroArrowBounce 2s ease-in-out infinite' }}
          >
            <path d="M8 4v12m0 0l-4-4m4 4l4-4" stroke="#f5f5f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Spacer to occupy the hero's scroll height */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 0 }} />

      {/* Canvas (fixed behind content) */}
      <div
        ref={canvasWrapRef}
        className="canvas-wrap"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          clipPath: 'circle(0% at 50% 50%)',
          transition: 'opacity 0.4s ease',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="marquee-wrap"
        data-scroll-speed="-20"
        style={{
          position: 'fixed',
          bottom: '8vh',
          left: 0,
          width: '100%',
          zIndex: 3,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.06,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          className="marquee-text"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '12vw',
            fontWeight: 700,
            color: '#f5f5f0',
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
        >
          ΔΙΚΑΙΟΣΥΝΗ &nbsp;&bull;&nbsp; ΑΦΟΣΙΩΣΗ &nbsp;&bull;&nbsp; ΕΜΠΙΣΤΟΣΥΝΗ &nbsp;&bull;&nbsp; ΔΙΚΑΙΟΣΥΝΗ &nbsp;&bull;&nbsp; ΑΦΟΣΙΩΣΗ
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        id="scroll-container"
        style={{
          position: 'relative',
          height: '500vh',
          zIndex: 3,
        }}
      >
        {/* Section 1: Tagline */}
        <section
          className="scroll-section"
          data-enter="5"
          data-leave="30"
          data-animation="fade-up"
          style={{
            opacity: 0,
            pointerEvents: 'none',
            padding: '0 5vw',
            paddingRight: '50vw',
          }}
        >
          <div style={{ maxWidth: '40vw', background: 'rgba(88, 88, 90, 0.75)', padding: '2rem', borderRadius: '6px', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <span
              className="section-label"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,240,0.5)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Αξίες
            </span>
            <h2
              className="section-heading"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                fontWeight: 400,
                color: '#f5f5f0',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 1.25rem 0',
              }}
            >
              Νομική <em style={{ fontWeight: 700, fontStyle: 'italic' }}>Αριστεία</em>
            </h2>
            <p
              className="section-body"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                color: 'rgba(245,245,240,0.65)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Με σεβασμό στον πελάτη και αφοσίωση στη λεπτομέρεια, παρέχουμε νομικές υπηρεσίες υψηλών προδιαγραφών.
            </p>
          </div>
        </section>

        {/* Section 2: Experience */}
        <section
          className="scroll-section"
          data-enter="30"
          data-leave="58"
          data-animation="slide-right"
          style={{
            opacity: 0,
            pointerEvents: 'none',
            padding: '0 5vw',
            paddingLeft: '55vw',
          }}
        >
          <div style={{ maxWidth: '40vw', background: 'rgba(88, 88, 90, 0.75)', padding: '2rem', borderRadius: '6px', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <span
              className="section-label"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,240,0.5)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Εμπειρία
            </span>
            <h2
              className="section-heading"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                fontWeight: 400,
                color: '#f5f5f0',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 1.25rem 0',
              }}
            >
              Δίπλα σας σε κάθε <em style={{ fontWeight: 700, fontStyle: 'italic' }}>Βήμα</em>
            </h2>
            <p
              className="section-body"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                color: 'rgba(245,245,240,0.65)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Από αστικές και ποινικές υποθέσεις μέχρι οικογενειακό και κληρονομικό δίκαιο — καλύπτουμε κάθε νομικό ζήτημα.
            </p>
          </div>
        </section>

        {/* Section 3: Location */}
        <section
          className="scroll-section"
          data-enter="58"
          data-leave="82"
          data-animation="scale-up"
          style={{
            opacity: 0,
            pointerEvents: 'none',
            padding: '0 5vw',
            paddingRight: '50vw',
          }}
        >
          <div style={{ maxWidth: '40vw', background: 'rgba(88, 88, 90, 0.75)', padding: '2rem', borderRadius: '6px', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <span
              className="section-label"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,240,0.5)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Τοποθεσία
            </span>
            <h2
              className="section-heading"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                fontWeight: 400,
                color: '#f5f5f0',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 1.25rem 0',
              }}
            >
              Κόρινθος, <em style={{ fontWeight: 700, fontStyle: 'italic' }}>Ελλάδα</em>
            </h2>
            <p
              className="section-body"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                color: 'rgba(245,245,240,0.65)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Κολιάτσου 34, Κόρινθος — Εξυπηρετούμε πελάτες σε ολόκληρη την Ελλάδα.
            </p>
          </div>
        </section>

        {/* Section 4: CTA (persist) */}
        <section
          className="scroll-section"
          data-enter="82"
          data-leave="98"
          data-animation="clip-reveal"
          data-persist="true"
          style={{
            opacity: 0,
            pointerEvents: 'none',
            padding: '0 5vw',
            paddingLeft: '55vw',
          }}
        >
          <div style={{ maxWidth: '40vw', background: 'rgba(88, 88, 90, 0.75)', padding: '2rem', borderRadius: '6px', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
            <span
              className="section-label"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,240,0.5)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Επικοινωνία
            </span>
            <h2
              className="section-heading"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                fontWeight: 400,
                color: '#f5f5f0',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 1.25rem 0',
              }}
            >
              Κλείστε <em style={{ fontWeight: 700, fontStyle: 'italic' }}>Ραντεβού</em>
            </h2>
            <p
              className="section-body"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                color: 'rgba(245,245,240,0.65)',
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: '2rem',
              }}
            >
              Επικοινωνήστε μαζί μας για μια πρώτη δωρεάν συμβουλευτική συνεδρία.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.85rem 2.5rem',
                border: '1px solid rgba(245,245,240,0.3)',
                background: 'transparent',
                color: '#f5f5f0',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f5f0';
                e.currentTarget.style.color = '#58585A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#f5f5f0';
              }}
            >
              Επικοινωνία
            </button>
          </div>
        </section>
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes heroArrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (max-width: 768px) {
          #scroll-container {
            height: 400vh !important;
          }
          #scroll-container .scroll-section {
            padding: 0 1.5rem !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          #scroll-container .scroll-section > div {
            max-width: 100% !important;
            background: rgba(88, 88, 90, 0.85);
            padding: 1.5rem;
            border-radius: 4px;
          }
          .marquee-wrap {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
