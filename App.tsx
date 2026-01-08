import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { SectionPage } from './pages/SectionPage';
import { Trades } from './pages/Trades';
import MetaPitch from './pages/articles/MetaPitch';
import { Thoughts } from './pages/Thoughts';
import QubieeAI from './pages/articles/QubieeAI';
import WealthRodApp from './pages/WealthRodApp';
import { NAV_ITEMS } from './constants';

// --- Types ---
interface Point { x: number; y: number; age: number; }
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number; // Added size property
  type: 'rocket' | 'spark' | 'star';
  color: string;
  twinkleSpeed?: number; // For stars
}

const AppContent: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showNyBackground, setShowNyBackground] = useState(true);
  const [isHoveringName, setIsHoveringName] = useState(false);

  // Refs for animation state (mutable to avoid re-renders)
  const mouseRef = useRef<{ x: number, y: number }>({ x: -100, y: -100 });
  const pointsRef = useRef<Point[]>([]); // Trail
  const particlesRef = useRef<Particle[]>([]); // Fireworks
  const starsRef = useRef<Particle[]>([]); // Stars
  const lastTriggerRef = useRef<number>(0); // Cooldown for fireworks
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const globalStarAlphaRef = useRef<number>(0); // For fading stars in/out

  // Handle hover with persistence
  const handleHoverName = (isHovering: boolean) => {
    if (isHovering) {
      // If hovering, clear any pending timeout and show stars immediately
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsHoveringName(true);
    } else {
      // If leaving, set timeout to hide stars after 3 seconds
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHoveringName(false);
      }, 3000);
    }
  };

  // Initialize Stars
  const initStars = (width: number, height: number) => {
    const stars: Particle[] = [];
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height / 2), // Top half only
        vx: 0,
        vy: 0,
        alpha: Math.random(),
        size: Math.random() * 2 + 0.5,
        type: 'star',
        color: '255, 255, 255',
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
    starsRef.current = stars;
  };

  // Trigger Fireworks
  const triggerFireworks = () => {
    if (showNyBackground) return; // Disable fireworks in Scene View

    const now = Date.now();
    // 800ms cooldown to prevent spamming
    if (now - lastTriggerRef.current < 800) return;
    lastTriggerRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Spawn rockets from bottom
    // INCREASED COUNT: More fireworks (25)
    for (let i = 0; i < 25; i++) {
      const x = (canvas.width * 0.15) + Math.random() * (canvas.width * 0.7);
      particlesRef.current.push({
        x: x,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 3,
        // LOWER VELOCITY: Reduced from -7 base to -4 base to keep them lower
        vy: -(4 + Math.random() * 5),
        alpha: 1,
        size: Math.random() * 2 + 1.5, // Random rocket size
        type: 'rocket',
        color: '255, 255, 255' // White
      });
    }
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (showNyBackground) {
        initStars(canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mouseRef.current = { x, y };

      // Add to trail
      pointsRef.current.push({ x, y, age: 1.0 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- 1. Spotlight Animation (Breathing) ---
      if (spotlightRef.current) {
        const { x, y } = mouseRef.current;
        // Breathe between 40px and 50px
        const radius = 45 + Math.sin(time) * 5;
        const opacity = 0.2 + Math.sin(time) * 0.05;
        spotlightRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(230, 220, 207, ${opacity}), transparent 100%)`;
      }

      // --- 2. Mouse Trail Logic ---
      pointsRef.current = pointsRef.current
        .map(p => ({ ...p, age: p.age - 0.03 })) // Fade speed
        .filter(p => p.age > 0);

      if (pointsRef.current.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < pointsRef.current.length - 1; i++) {
          const p1 = pointsRef.current[i];
          const p2 = pointsRef.current[i + 1];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(230, 220, 207, ${p1.age})`;
          ctx.stroke();
        }
      }

      if (showNyBackground) {
        // --- 3a. Star Logic (Scene View) ---

        // Smoothly transition global alpha
        const targetAlpha = isHoveringName ? 1 : 0;
        // Lerp factor 0.05 for smooth fade
        globalStarAlphaRef.current += (targetAlpha - globalStarAlphaRef.current) * 0.05;

        // Only render if visible enough
        if (globalStarAlphaRef.current > 0.01) {
          for (const star of starsRef.current) {
            // Twinkle effect
            star.alpha += (star.twinkleSpeed || 0.01) * Math.sin(time * 2 + star.x);
            if (star.alpha > 1) star.alpha = 1;
            if (star.alpha < 0.2) star.alpha = 0.2;

            // Combine individual star alpha with global fade alpha
            ctx.globalAlpha = star.alpha * globalStarAlphaRef.current;
            ctx.fillStyle = `rgb(${star.color})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }
      } else {
        // --- 3b. Fireworks Logic (Default View) ---
        // Add gravity and update positions
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];

          if (p.type === 'rocket') {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.12; // Gravity
            p.alpha -= 0.01;

            // Explode when velocity nears zero (peak of arc)
            // Since initial velocity is lower, this happens in bottom half
            if (p.vy >= -0.5) {
              particlesRef.current.splice(i, 1);
              // Spawn sparks with random count and size
              const sparkCount = 30 + Math.floor(Math.random() * 20);
              for (let j = 0; j < sparkCount; j++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 0.5; // Varying speed
                particlesRef.current.push({
                  x: p.x,
                  y: p.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  alpha: 1,
                  size: Math.random() * 1.5 + 0.5, // Random spark size
                  type: 'spark',
                  color: '255, 255, 255'
                });
              }
            }
          } else {
            // Spark logic
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08; // Gravity
            p.vx *= 0.95; // Drag
            p.vy *= 0.95;
            p.alpha -= 0.015; // Fade

            if (p.alpha <= 0) {
              particlesRef.current.splice(i, 1);
            }
          }
        }

        // Draw Particles
        for (const p of particlesRef.current) {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = `rgb(${p.color})`;
          ctx.beginPath();
          // Use the dynamic size property
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showNyBackground, isHoveringName]); // Re-run effect when background or hover state changes

  // Initialize stars when switching to NY background
  useEffect(() => {
    if (showNyBackground && canvasRef.current) {
      initStars(canvasRef.current.width, canvasRef.current.height);
    }
  }, [showNyBackground]);

  return (
    <div className={`relative min-h-screen w-full text-primary overflow-hidden font-sans selection:bg-primary/20 transition-all duration-700 ${showNyBackground
      ? 'bg-cover bg-center bg-no-repeat'
      : 'bg-gradient-to-br from-[#2e241d] via-[#1a120b] to-[#0f0a06]'
      }`}
      style={showNyBackground ? {
        backgroundImage: 'url(/ny_night.JPG)',
      } : {}}
    >

      {/* Dark overlay filter for NY background */}
      {showNyBackground && (
        <div className="fixed inset-0 bg-black/60 z-[5] pointer-events-none transition-opacity duration-700" />
      )}

      {/* Spotlight Overlay (Controlled by JS loop now) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-75 ease-out"
      />

      {/* Canvas for Mouse Trail & Fireworks */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-20"
      />

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3d2b1f] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-[#4a3728] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-[#2c1f16] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <NavBar
        showNyBackground={showNyBackground}
        setShowNyBackground={setShowNyBackground}
        onHoverName={handleHoverName}
      />

      <main className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home onTriggerFireworks={triggerFireworks} onHoverName={handleHoverName} />} />
          <Route path="/wealth-rod/app" element={<WealthRodApp />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/trades/meta-pitch" element={<MetaPitch />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/thoughts/qubiee-ai" element={<QubieeAI />} />

          {NAV_ITEMS.flatMap(item => [item, ...(item.subItems || [])])
            .filter(item => item.path !== '/trades' && item.path !== '/thoughts')
            .map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<SectionPage title={item.label} description={item.description} />}
              />
            ))}
        </Routes>
      </main>

      <footer className="relative z-10 py-6 text-center text-secondary/40 text-xs tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Liting Huang. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;