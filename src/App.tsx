import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Settings, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Award, 
  Cpu, 
  TrendingUp, 
  Zap, 
  Heart, 
  User, 
  ShoppingBag, 
  ChevronRight, 
  Info, 
  HelpCircle,
  Clock,
  MousePointerClick,
  Database,
  Factory,
  Compass,
  Atom,
  Save
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Building {
  id: string;
  name: string;
  cost: number;
  baseCost: number;
  cps: number;
  count: number;
  icon: string;
  description: string;
}

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  multiplier: number;
  description: string;
  purchased: boolean;
  buildingId?: string; // If it boosts a specific building
  clickMultiplier?: number; // If it boosts clicking directly
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  condition: (stats: GameStats) => boolean;
  icon: string;
}

interface GameStats {
  cookies: number;
  totalCookiesBaked: number;
  totalClicks: number;
  heavenlyChips: number;
  prestigeCount: number;
  timePlayed: number; // in seconds
}

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  text: string;
}

type Theme = 'classic' | 'cyber' | 'space';

export default function App() {
  // ==========================================
  // CORE GAME STATE
  // ==========================================
  const [cookies, setCookies] = useState<number>(0);
  const [totalCookiesBaked, setTotalCookiesBaked] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [prestigeCount, setPrestigeCount] = useState<number>(0);
  const [heavenlyChips, setHeavenlyChips] = useState<number>(0);
  const [timePlayed, setTimePlayed] = useState<number>(0);

  // Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>('cyber');
  const [activeTab, setActiveTab] = useState<'shop' | 'upgrades' | 'achievements' | 'stats'>('shop');

  // Floating Click Particles
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const particleIdCounter = useRef<number>(0);

  // Sound Synth Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Golden Cookie State
  const [goldenCookie, setGoldenCookie] = useState<{ x: number; y: number; active: boolean; type: 'frenzy' | 'lucky' } | null>(null);
  const [buffActive, setBuffActive] = useState<boolean>(false);
  const [buffTimer, setBuffTimer] = useState<number>(0);
  const [buffType, setBuffType] = useState<'frenzy' | null>(null);

  // Toasts / Notifications
  const [toasts, setToasts] = useState<{ id: number; message: string; title: string }[]>([]);
  const toastIdCounter = useRef<number>(0);

  // ==========================================
  // BUILDINGS DEFINITION
  // ==========================================
  const [buildings, setBuildings] = useState<Building[]>([
    { id: 'clicker', name: 'Auto-Clicker', cost: 15, baseCost: 15, cps: 0.1, count: 0, icon: 'MousePointerClick', description: 'Clicks the cookie automatically once every 10 seconds.' },
    { id: 'grandma', name: 'Grandma Bakesmith', cost: 100, baseCost: 100, cps: 1, count: 0, icon: 'User', description: 'A nice grandmother to bake cookies for you.' },
    { id: 'mine', name: 'Cookie Mine', cost: 1100, baseCost: 1100, cps: 8, count: 0, icon: 'Compass', description: 'Mines cookie dough directly from the core of the planet.' },
    { id: 'factory', name: 'Cookie Factory', cost: 12000, baseCost: 12000, cps: 47, count: 0, icon: 'Factory', description: 'Mass-produces cookies with automated machinery.' },
    { id: 'quantum', name: 'Quantum Bakery', cost: 130000, baseCost: 130000, cps: 260, count: 0, icon: 'Atom', description: 'Bakes cookies in multiple parallel universes simultaneously.' },
    { id: 'ai', name: 'AI Super-Bake', cost: 1400000, baseCost: 1400000, cps: 1400, count: 0, icon: 'Cpu', description: 'A superintelligent neural network optimizing chocolate chip density.' },
  ]);

  // ==========================================
  // UPGRADES DEFINITION
  // ==========================================
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: 'click_01', name: 'Reinforced Index Finger', cost: 100, multiplier: 2, description: 'The mouse and clicking are twice as efficient.', purchased: false, clickMultiplier: 2 },
    { id: 'click_02', name: 'Titanium Mousepad', cost: 500, multiplier: 2, description: 'The mouse and clicking are twice as efficient.', purchased: false, clickMultiplier: 2 },
    { id: 'click_03', name: 'Quantum Clicker', cost: 10000, multiplier: 5, description: 'Clicking is 5x more powerful!', purchased: false, clickMultiplier: 5 },
    { id: 'clicker_01', name: 'Forced Labor', cost: 250, multiplier: 2, description: 'Auto-Clickers are twice as efficient.', purchased: false, buildingId: 'clicker' },
    { id: 'grandma_01', name: 'Rolling Pins', cost: 1000, multiplier: 2, description: 'Grandmas are twice as efficient.', purchased: false, buildingId: 'grandma' },
    { id: 'mine_01', name: 'Sugar Drills', cost: 11000, multiplier: 2, description: 'Cookie Mines are twice as efficient.', purchased: false, buildingId: 'mine' },
    { id: 'factory_01', name: 'Steam Engines', cost: 120000, multiplier: 2, description: 'Cookie Factories are twice as efficient.', purchased: false, buildingId: 'factory' },
    { id: 'quantum_01', name: 'Schrodinger\'s Batter', cost: 1300000, multiplier: 2, description: 'Quantum Bakeries are twice as efficient.', purchased: false, buildingId: 'quantum' },
    { id: 'ai_01', name: 'Deep Learning Recipes', cost: 14000000, multiplier: 2, description: 'AI Super-Bakes are twice as efficient.', purchased: false, buildingId: 'ai' },
  ]);

  // ==========================================
  // ACHIEVEMENTS DEFINITION
  // ==========================================
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'ach_1', name: 'First Crumb', description: 'Bake 1 cookie all-time.', unlocked: false, condition: (s) => s.totalCookiesBaked >= 1, icon: 'Sparkles' },
    { id: 'ach_100', name: 'Cookie Cadet', description: 'Bake 100 cookies all-time.', unlocked: false, condition: (s) => s.totalCookiesBaked >= 100, icon: 'Flame' },
    { id: 'ach_10k', name: 'Bakery Boss', description: 'Bake 10,000 cookies all-time.', unlocked: false, condition: (s) => s.totalCookiesBaked >= 10000, icon: 'Award' },
    { id: 'ach_1m', name: 'Cookie Tycoon', description: 'Bake 1,000,000 cookies all-time.', unlocked: false, condition: (s) => s.totalCookiesBaked >= 1000000, icon: 'Zap' },
    { id: 'ach_100m', name: 'Intergalactic Baker', description: 'Bake 100,000,000 cookies all-time.', unlocked: false, condition: (s) => s.totalCookiesBaked >= 100000000, icon: 'Atom' },
    { id: 'ach_click_1', name: 'Active Finger', description: 'Click the giant cookie 10 times.', unlocked: false, condition: (s) => s.totalClicks >= 10, icon: 'MousePointerClick' },
    { id: 'ach_click_100', name: 'Clicking Frenzy', description: 'Click the giant cookie 250 times.', unlocked: false, condition: (s) => s.totalClicks >= 250, icon: 'Zap' },
    { id: 'ach_prestige_1', name: 'Reborn Baker', description: 'Ascend/Prestige at least once.', unlocked: false, condition: (s) => s.prestigeCount >= 1, icon: 'RotateCcw' },
  ]);

  // ==========================================
  // SOUND SYNTHESIZER (Web Audio API)
  // ==========================================
  const playSound = (type: 'click' | 'buy' | 'achievement' | 'golden' | 'prestige') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        // High pitch quick retro synth pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'buy') {
        // Retro coin ring
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'achievement') {
        // Glorious fanfare rising chords
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(554.37, now + 0.1); // C#5
        osc.frequency.setValueAtTime(659.25, now + 0.2); // E5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.4); // A5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'golden') {
        // Magical chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15); // E6
        osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.3); // G6
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'prestige') {
        // Cosmic sweeping sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(2000, now + 1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
        osc.start(now);
        osc.stop(now + 1);
      }
    } catch (e) {
      console.warn("Web Audio API failed or blocked: ", e);
    }
  };

  // ==========================================
  // TOAST / NOTIFICATION HELPER
  // ==========================================
  const triggerToast = (title: string, message: string) => {
    const id = toastIdCounter.current++;
    setToasts(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // ==========================================
  // LOCAL STORAGE SAVE & LOAD
  // ==========================================
  const saveGame = () => {
    const saveData = {
      cookies,
      totalCookiesBaked,
      totalClicks,
      prestigeCount,
      heavenlyChips,
      timePlayed,
      buildings: buildings.map(b => ({ id: b.id, count: b.count, cost: b.cost })),
      upgrades: upgrades.map(u => ({ id: u.id, purchased: u.purchased })),
      achievements: achievements.map(a => ({ id: a.id, unlocked: a.unlocked })),
      theme,
      soundEnabled
    };
    localStorage.setItem('sycord_cookie_clicker_save', JSON.stringify(saveData));
    triggerToast("Game Saved!", "Your bakery progress is stored locally.");
  };

  const loadGame = () => {
    try {
      const saved = localStorage.getItem('sycord_cookie_clicker_save');
      if (!saved) return;
      const data = JSON.parse(saved);

      setCookies(data.cookies ?? 0);
      setTotalCookiesBaked(data.totalCookiesBaked ?? 0);
      setTotalClicks(data.totalClicks ?? 0);
      setPrestigeCount(data.prestigeCount ?? 0);
      setHeavenlyChips(data.heavenlyChips ?? 0);
      setTimePlayed(data.timePlayed ?? 0);
      setTheme(data.theme ?? 'cyber');
      setSoundEnabled(data.soundEnabled ?? true);

      if (data.buildings) {
        setBuildings(prev => prev.map(b => {
          const savedB = data.buildings.find((x: any) => x.id === b.id);
          if (savedB) {
            return { ...b, count: savedB.count, cost: savedB.cost };
          }
          return b;
        }));
      }

      if (data.upgrades) {
        setUpgrades(prev => prev.map(u => {
          const savedU = data.upgrades.find((x: any) => x.id === u.id);
          if (savedU) {
            return { ...u, purchased: savedU.purchased };
          }
          return u;
        }));
      }

      if (data.achievements) {
        setAchievements(prev => prev.map(a => {
          const savedA = data.achievements.find((x: any) => x.id === a.id);
          if (savedA) {
            return { ...a, unlocked: savedA.unlocked };
          }
          return a;
        }));
      }

      triggerToast("Bakery Loaded!", "Welcome back to your cookie empire.");
    } catch (e) {
      console.error("Error loading save game: ", e);
    }
  };

  const resetGame = () => {
    if (confirm("Are you sure you want to completely wipe your cookie empire? This cannot be undone!")) {
      localStorage.removeItem('sycord_cookie_clicker_save');
      setCookies(0);
      setTotalCookiesBaked(0);
      setTotalClicks(0);
      setPrestigeCount(0);
      setHeavenlyChips(0);
      setTimePlayed(0);
      setBuildings(prev => prev.map(b => ({ ...b, count: 0, cost: b.baseCost })));
      setUpgrades(prev => prev.map(u => ({ ...u, purchased: false })));
      setAchievements(prev => prev.map(a => ({ ...a, unlocked: false })));
      triggerToast("Reset Complete", "A brand new bakery has been opened.");
    }
  };

  // ==========================================
  // CALCULATIONS (CPS & Click Power)
  // ==========================================
  const getClickPower = () => {
    let power = 1;

    // Upgrades boost click power
    upgrades.forEach(u => {
      if (u.purchased && u.clickMultiplier) {
        power *= u.clickMultiplier;
      }
    });

    // Heavenly chips boost click power (+2% per chip)
    const prestigeMultiplier = 1 + (heavenlyChips * 0.02);
    power *= prestigeMultiplier;

    // Golden cookie frenzy boost (7x click power)
    if (buffActive && buffType === 'frenzy') {
      power *= 7;
    }

    return power;
  };

  const getCookiesPerSecond = () => {
    let totalCps = 0;

    buildings.forEach(b => {
      let buildingCps = b.cps * b.count;

      // Apply upgrades for this specific building
      upgrades.forEach(u => {
        if (u.purchased && u.buildingId === b.id) {
          buildingCps *= u.multiplier;
        }
      });

      totalCps += buildingCps;
    });

    // Heavenly chips boost CPS (+2% per chip)
    const prestigeMultiplier = 1 + (heavenlyChips * 0.02);
    totalCps *= prestigeMultiplier;

    // Golden cookie frenzy boost (7x CPS)
    if (buffActive && buffType === 'frenzy') {
      totalCps *= 7;
    }

    return totalCps;
  };

  // ==========================================
  // INTERACTIONS
  // ==========================================
  const handleCookieClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const power = getClickPower();
    setCookies(prev => prev + power);
    setTotalCookiesBaked(prev => prev + power);
    setTotalClicks(prev => prev + 1);

    playSound('click');

    // Add floating particle text
    const newParticle: ClickParticle = {
      id: particleIdCounter.current++,
      x,
      y,
      text: `+${power.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    };
    setParticles(prev => [...prev, newParticle]);

    // Clean up particle after animation ends
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  // Buy Building
  const buyBuilding = (id: string) => {
    const bIndex = buildings.findIndex(b => b.id === id);
    if (bIndex === -1) return;
    const building = buildings[bIndex];

    if (cookies >= building.cost) {
      setCookies(prev => prev - building.cost);
      
      const updatedBuildings = [...buildings];
      updatedBuildings[bIndex] = {
        ...building,
        count: building.count + 1,
        cost: Math.floor(building.cost * 1.15) // Inflation rate 15%
      };
      setBuildings(updatedBuildings);
      playSound('buy');
    }
  };

  // Buy Upgrade
  const buyUpgrade = (id: string) => {
    const uIndex = upgrades.findIndex(u => u.id === id);
    if (uIndex === -1) return;
    const upgrade = upgrades[uIndex];

    if (cookies >= upgrade.cost && !upgrade.purchased) {
      setCookies(prev => prev - upgrade.cost);
      
      const updatedUpgrades = [...upgrades];
      updatedUpgrades[uIndex] = {
        ...upgrade,
        purchased: true
      };
      setUpgrades(updatedUpgrades);
      playSound('buy');
      triggerToast("Upgrade Unlocked!", `Purchased "${upgrade.name}"`);
    }
  };

  // Golden Cookie Click
  const handleGoldenCookieClick = () => {
    if (!goldenCookie) return;
    playSound('golden');

    if (goldenCookie.type === 'frenzy') {
      setBuffActive(true);
      setBuffType('frenzy');
      setBuffTimer(15); // 15 seconds
      triggerToast("🍪 COOKIE FRENZY!", "Production and clicking power are 7x for 15 seconds!");
    } else {
      // Lucky: instant cookie burst (either 15 mins of CPS or 15% of current bank, whichever is smaller + min 13)
      const currentCps = getCookiesPerSecond();
      const reward = Math.max(13, Math.min(cookies * 0.15, currentCps * 900));
      setCookies(prev => prev + reward);
      setTotalCookiesBaked(prev => prev + reward);
      triggerToast("✨ LUCKY BREAK!", `Gained ${reward.toLocaleString(undefined, { maximumFractionDigits: 0 })} cookies instantly!`);
    }

    setGoldenCookie(null);
  };

  // Prestige Reset
  const claimPrestige = () => {
    // Earn 1 Heavenly Chip for every 1,000,000 total baked cookies
    const pendingChips = Math.floor(totalCookiesBaked / 1000000);
    if (pendingChips <= 0) {
      alert("You need at least 1,000,000 all-time cookies to prestige! Keep baking!");
      return;
    }

    if (confirm(`Are you ready to ascend? You will reset your cookies, buildings, and upgrades, but gain +${pendingChips} Heavenly Chips! Each chip permanently boosts your production by +2%.`)) {
      setPrestigeCount(prev => prev + 1);
      setHeavenlyChips(prev => prev + pendingChips);
      setCookies(0);
      setBuildings(prev => prev.map(b => ({ ...b, count: 0, cost: b.baseCost })));
      setUpgrades(prev => prev.map(u => ({ ...u, purchased: false })));
      playSound('prestige');
      triggerToast("✨ ASCENSION SUCCESSFUL", `You ascended to the heavens and returned with ${pendingChips} Heavenly Chips!`);
    }
  };

  // ==========================================
  // GAME LOOPS & SIDE EFFECTS
  // ==========================================
  
  // 1. Game Setup & Initial Load
  useEffect(() => {
    loadGame();
  }, []);

  // 2. Real-time Game Tick (Every 100ms for ultra-smooth rendering)
  useEffect(() => {
    const interval = setInterval(() => {
      const cps = getCookiesPerSecond();
      const increment = cps / 10; // since loop runs every 100ms

      if (increment > 0) {
        setCookies(prev => prev + increment);
        setTotalCookiesBaked(prev => prev + increment);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [buildings, upgrades, heavenlyChips, buffActive, buffType]);

  // 3. Stats & Buff Timers & Save Loop (Every 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      // Time played
      setTimePlayed(prev => prev + 1);

      // Buff Active Timer
      if (buffActive) {
        setBuffTimer(prev => {
          if (prev <= 1) {
            setBuffActive(false);
            setBuffType(null);
            triggerToast("Buff Expired", "The production frenzy has ended.");
            return 0;
          }
          return prev - 1;
        });
      }

      // Random Golden Cookie Spawn Chance (1% chance every second)
      if (!goldenCookie && Math.random() < 0.01) {
        const x = Math.floor(Math.random() * 70) + 15; // 15% to 85% width
        const y = Math.floor(Math.random() * 60) + 20; // 20% to 80% height
        const type = Math.random() < 0.5 ? 'frenzy' : 'lucky';
        setGoldenCookie({ x, y, active: true, type });
        playSound('golden');

        // Despawn golden cookie after 10 seconds if not clicked
        setTimeout(() => {
          setGoldenCookie(prev => prev?.active ? null : prev);
        }, 10000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [buffActive, goldenCookie]);

  // 4. Achievement Unlock Listener
  useEffect(() => {
    const stats: GameStats = {
      cookies,
      totalCookiesBaked,
      totalClicks,
      heavenlyChips,
      prestigeCount,
      timePlayed
    };

    setAchievements(prev => prev.map(ach => {
      if (!ach.unlocked && ach.condition(stats)) {
        playSound('achievement');
        triggerToast("🏆 Achievement Unlocked!", ach.name);
        return { ...ach, unlocked: true };
      }
      return ach;
    }));
  }, [cookies, totalCookiesBaked, totalClicks, prestigeCount, heavenlyChips, timePlayed]);

  // 5. Auto Save Loop (Every 15 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame();
    }, 15000);
    return () => clearInterval(interval);
  }, [cookies, totalCookiesBaked, totalClicks, prestigeCount, heavenlyChips, buildings, upgrades, theme, soundEnabled]);

  // ==========================================
  // HELPERS FOR RENDERING
  // ==========================================
  const formatNumber = (num: number) => {
    if (num < 1000) return num.toFixed(1).replace(/\.0$/, '');
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M';
    return (num / 1000000000).toFixed(2) + 'B';
  };

  const currentCps = getCookiesPerSecond();
  const clickPower = getClickPower();

  // Theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'classic':
        return {
          bg: 'bg-amber-950 text-amber-50',
          panel: 'bg-amber-900/30 border-amber-800/40 backdrop-blur-md',
          accent: 'from-amber-600 to-amber-700',
          cookieBg: 'bg-amber-800/20 shadow-amber-900/30',
          tabActive: 'bg-amber-700 border-amber-600 text-amber-50',
          card: 'bg-amber-950/40 border-amber-800/30 hover:border-amber-600/50',
          textMuted: 'text-amber-300/70',
          border: 'border-amber-800/40'
        };
      case 'space':
        return {
          bg: 'bg-slate-950 text-slate-100',
          panel: 'bg-indigo-950/20 border-indigo-900/40 backdrop-blur-md',
          accent: 'from-indigo-600 to-violet-600',
          cookieBg: 'bg-indigo-950/40 shadow-indigo-500/10',
          tabActive: 'bg-indigo-600 border-indigo-500 text-indigo-50',
          card: 'bg-indigo-950/30 border-indigo-900/30 hover:border-indigo-500/50',
          textMuted: 'text-indigo-300/60',
          border: 'border-indigo-900/40'
        };
      case 'cyber':
      default:
        return {
          bg: 'bg-zinc-950 text-zinc-100',
          panel: 'bg-zinc-900/40 border-zinc-800/60 backdrop-blur-md',
          accent: 'from-cyan-500 to-fuchsia-500',
          cookieBg: 'bg-zinc-900/50 shadow-fuchsia-500/10',
          tabActive: 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 border-transparent text-white',
          card: 'bg-zinc-900/20 border-zinc-800/80 hover:border-cyan-500/50',
          textMuted: 'text-zinc-400',
          border: 'border-zinc-800/80'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`flex flex-col md:flex-row h-screen overflow-hidden ${styles.bg} transition-colors duration-500 font-sans relative`}>
      
      {/* GOLDEN COOKIE SPAWNER */}
      {goldenCookie && (
        <button
          onClick={handleGoldenCookieClick}
          style={{ left: `${goldenCookie.x}%`, top: `${goldenCookie.y}%` }}
          className="absolute z-50 animate-bounce cursor-pointer p-4 select-none focus:outline-none focus:ring-0 active:scale-90"
        >
          <div className="relative group">
            {/* Pulsing glow around golden cookie */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 rounded-full border-4 border-yellow-200 flex items-center justify-center shadow-2xl shadow-yellow-500/50 transform rotate-12 group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
        </button>
      )}

      {/* LEFT PANEL: GIANT COOKIE & STATS */}
      <section className={`flex-1 flex flex-col justify-between items-center p-6 border-r ${styles.border} relative overflow-hidden bg-gradient-to-b from-transparent to-black/30`}>
        
        {/* Header Options */}
        <div className="w-full flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${styles.accent} flex items-center justify-center shadow-lg shadow-fuchsia-500/20 animate-pulse`}>
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Sycord Bakery</h1>
              <p className={`text-xs ${styles.textMuted} font-semibold font-mono`}>Version 2.0 (Stable)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border ${styles.border} bg-white/5 hover:bg-white/10 transition-colors`}
              title={soundEnabled ? "Disable Sound" : "Enable Sound"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-red-400" />}
            </button>
            <button 
              onClick={saveGame}
              className={`p-2 rounded-lg border ${styles.border} bg-white/5 hover:bg-white/10 transition-colors`}
              title="Manual Save"
            >
              <Save className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Counters & Dynamic Display */}
        <div className="text-center z-10 my-4">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-5xl font-black tracking-tight font-mono text-white drop-shadow">
              {formatNumber(cookies)}
            </h2>
            <span className="text-2xl">🍪</span>
          </div>
          <p className={`text-sm ${styles.textMuted} font-semibold mt-1 font-mono`}>
            cookies in stock
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono border border-white/10">
              CPS: <span className="text-cyan-400 font-bold">{formatNumber(currentCps)}</span>
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono border border-white/10">
              Click Power: <span className="text-fuchsia-400 font-bold">{formatNumber(clickPower)}</span>
            </span>
          </div>

          {/* Buff Notification Bar */}
          {buffActive && (
            <div className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 rounded-xl flex items-center gap-2 justify-center animate-pulse">
              <Flame className="h-4 w-4 text-yellow-400 animate-bounce" />
              <span className="text-xs font-semibold text-yellow-300 font-mono">FRENZY ACTIVE: {buffTimer}s (7x MULTIPLIER!)</span>
            </div>
          )}
        </div>

        {/* GIANT COOKIE BUTTON */}
        <div className="relative my-8 flex items-center justify-center z-10 select-none">
          {/* Outer glowing ring */}
          <div className={`absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-gradient-to-r ${styles.accent} transition-transform duration-500 animate-pulse`}></div>
          
          <button
            onClick={handleCookieClick}
            className="group relative focus:outline-none active:scale-95 transition-transform duration-75 select-none"
          >
            {/* Rotating retro aura background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-yellow-500/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-300 animate-spin" style={{ animationDuration: '20s' }}></div>
            
            {/* Giant Cookie Shape */}
            <div className="relative w-60 h-60 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 border-8 border-amber-600/80 flex items-center justify-center shadow-2xl shadow-black/60 overflow-hidden transform group-hover:rotate-6 transition-transform duration-300 cursor-pointer">
              {/* Chocolate Chips */}
              <div className="absolute top-12 left-16 w-5 h-5 bg-amber-950 rounded-full transform rotate-12 shadow-inner"></div>
              <div className="absolute top-24 left-32 w-6 h-6 bg-amber-950 rounded-full transform -rotate-45 shadow-inner"></div>
              <div className="absolute top-16 right-16 w-5 h-5 bg-amber-950 rounded-full transform rotate-45 shadow-inner"></div>
              <div className="absolute bottom-16 left-20 w-6 h-6 bg-amber-950 rounded-full transform rotate-12 shadow-inner"></div>
              <div className="absolute bottom-24 right-16 w-5 h-5 bg-amber-950 rounded-full transform -rotate-12 shadow-inner"></div>
              <div className="absolute bottom-12 left-36 w-5 h-5 bg-amber-950 rounded-full transform rotate-45 shadow-inner"></div>
              <div className="absolute top-36 left-10 w-4 h-4 bg-amber-950 rounded-full shadow-inner"></div>
              <div className="absolute top-32 right-12 w-5 h-5 bg-amber-950 rounded-full shadow-inner"></div>
              
              {/* Cookie Texture details */}
              <div className="absolute inset-0 border-4 border-dashed border-amber-500/20 rounded-full"></div>
              <div className="absolute inset-6 border border-dashed border-amber-900/30 rounded-full"></div>
            </div>
          </button>

          {/* FLOATING TEXT PARTICLES */}
          {particles.map(p => (
            <span
              key={p.id}
              style={{ left: p.x, top: p.y }}
              className="absolute text-2xl font-black font-mono text-white drop-shadow-lg pointer-events-none animate-float-fade z-30 select-none"
            >
              {p.text}
            </span>
          ))}
        </div>

        {/* Footer / Quick Stats */}
        <div className="w-full z-10 flex justify-between items-center text-xs text-zinc-500 font-mono pt-4 border-t border-white/5">
          <span>TIME PLAYED: {Math.floor(timePlayed / 60)}m {timePlayed % 60}s</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            BAKERY ACTIVE
          </span>
        </div>
      </section>

      {/* RIGHT PANEL: SHOP, UPGRADES, ACHIEVEMENTS, STATS */}
      <section className="w-full md:w-[480px] flex flex-col h-full bg-black/40 backdrop-blur-lg">
        
        {/* Tabs Navigation */}
        <div className={`flex border-b ${styles.border} bg-white/5`}>
          {(['shop', 'upgrades', 'achievements', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === tab 
                  ? `${styles.tabActive} border-cyan-500` 
                  : 'text-zinc-400 hover:text-white border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ==========================================
              TAB 1: SHOP (BUILDINGS)
              ========================================== */}
          {activeTab === 'shop' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">Buy Production Buildings</h3>
                <span className="text-xs text-zinc-500 font-mono">15% inflation rate per buy</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {buildings.map(b => {
                  const canAfford = cookies >= b.cost;
                  return (
                    <button
                      key={b.id}
                      onClick={() => buyBuilding(b.id)}
                      disabled={!canAfford}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        canAfford 
                          ? 'bg-zinc-900/40 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900/60' 
                          : 'bg-zinc-950/20 border-zinc-900/40 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-zinc-800/80 border ${styles.border} flex items-center justify-center`}>
                          {b.id === 'clicker' && <MousePointerClick className="h-5 w-5 text-cyan-400" />}
                          {b.id === 'grandma' && <User className="h-5 w-5 text-fuchsia-400" />}
                          {b.id === 'mine' && <Compass className="h-5 w-5 text-yellow-400" />}
                          {b.id === 'factory' && <Factory className="h-5 w-5 text-orange-400" />}
                          {b.id === 'quantum' && <Atom className="h-5 w-5 text-purple-400" />}
                          {b.id === 'ai' && <Cpu className="h-5 w-5 text-emerald-400" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-zinc-100">{b.name}</h4>
                          <p className="text-xs text-zinc-500 max-w-[200px] line-clamp-1">{b.description}</p>
                          <span className="text-[10px] text-zinc-400 font-mono mt-1 block">
                            Each yields +{formatNumber(b.cps)} CPS
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-zinc-400 font-mono font-bold">Qty: {b.count}</div>
                        <div className={`text-sm font-bold font-mono mt-1 flex items-center gap-1 justify-end ${
                          canAfford ? 'text-yellow-400' : 'text-zinc-600'
                        }`}>
                          {formatNumber(b.cost)} 🍪
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 2: UPGRADES
              ========================================== */}
          {activeTab === 'upgrades' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider">Scientific Upgrades</h3>
                <span className="text-xs text-zinc-500 font-mono">Permanent boosts</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {upgrades.map(u => {
                  const canAfford = cookies >= u.cost;
                  if (u.purchased) return null;

                  return (
                    <button
                      key={u.id}
                      onClick={() => buyUpgrade(u.id)}
                      disabled={!canAfford}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        canAfford 
                          ? 'bg-zinc-900/40 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900/60' 
                          : 'bg-zinc-950/20 border-zinc-900/40 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-xl">
                          ✨
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-zinc-100">{u.name}</h4>
                          <p className="text-xs text-zinc-500 max-w-[220px]">{u.description}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm font-bold font-mono flex items-center gap-1 justify-end ${
                          canAfford ? 'text-yellow-400' : 'text-zinc-600'
                        }`}>
                          {formatNumber(u.cost)} 🍪
                        </div>
                      </div>
                    </button>
                  );
                })}

                {upgrades.every(u => u.purchased) && (
                  <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
                    <p className="text-sm font-semibold">All upgrades purchased!</p>
                    <p className="text-xs mt-1">You hold the pinnacle of baking technology.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 3: ACHIEVEMENTS
              ========================================== */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Bakery Milestones</h3>

              <div className="grid grid-cols-1 gap-3">
                {achievements.map(a => (
                  <div
                    key={a.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      a.unlocked 
                        ? 'bg-gradient-to-r from-emerald-950/20 to-zinc-900/20 border-emerald-500/30' 
                        : 'bg-zinc-950/40 border-zinc-900/60 opacity-40'
                    }`}
                  >
                    <div className={`p-3 rounded-lg flex items-center justify-center text-xl ${
                      a.unlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-600'
                    }`}>
                      {a.icon === 'Sparkles' && <Sparkles className="h-5 w-5" />}
                      {a.icon === 'Flame' && <Flame className="h-5 w-5" />}
                      {a.icon === 'Award' && <Award className="h-5 w-5" />}
                      {a.icon === 'Zap' && <Zap className="h-5 w-5" />}
                      {a.icon === 'Atom' && <Atom className="h-5 w-5" />}
                      {a.icon === 'MousePointerClick' && <MousePointerClick className="h-5 w-5" />}
                      {a.icon === 'RotateCcw' && <RotateCcw className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${a.unlocked ? 'text-zinc-100' : 'text-zinc-500'}`}>
                        {a.name} {a.unlocked && "🏆"}
                      </h4>
                      <p className="text-xs text-zinc-500">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 4: STATS & PRESTIGE
              ========================================== */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              
              {/* Prestige System Panel */}
              <div className="p-5 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <RotateCcw className="h-5 w-5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <h4 className="font-bold text-sm text-white uppercase tracking-wider">Ascension & Prestige</h4>
                </div>
                
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Reset your current bakery in exchange for **Heavenly Chips**. Each chip grants a permanent **+2% production boost** to all cookies baked in future runs!
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4 font-mono text-xs">
                  <div className="bg-black/40 p-3 rounded-lg border border-indigo-900/40">
                    <span className="text-zinc-500 block">HEAVENLY CHIPS</span>
                    <span className="text-indigo-300 font-bold text-lg">{heavenlyChips}</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg border border-indigo-900/40">
                    <span className="text-zinc-500 block">PENDING CHIPS</span>
                    <span className="text-yellow-400 font-bold text-lg">
                      +{Math.floor(totalCookiesBaked / 1000000)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={claimPrestige}
                  disabled={totalCookiesBaked < 1000000}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    totalCookiesBaked >= 1000000
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  Ascend to the Heavens
                </button>
                {totalCookiesBaked < 1000000 && (
                  <span className="text-[10px] text-zinc-500 text-center block mt-2">
                    Unlocks at 1,000,000 all-time cookies baked.
                  </span>
                )}
              </div>

              {/* General Stats */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-white uppercase tracking-wider">Historical Statistics</h4>
                
                <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl p-4 space-y-3 font-mono text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Total Cookies Baked (All-time):</span>
                    <span className="text-white font-bold">{formatNumber(totalCookiesBaked)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cookie Clicks:</span>
                    <span className="text-white font-bold">{totalClicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Prestige Multiplier:</span>
                    <span className="text-indigo-400 font-bold">+{heavenlyChips * 2}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Spent Baking:</span>
                    <span className="text-white font-bold">
                      {Math.floor(timePlayed / 3600)}h {Math.floor((timePlayed % 3600) / 60)}m {timePlayed % 60}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h4 className="font-bold text-sm text-white uppercase tracking-wider">Bakery Atmosphere</h4>
                
                <div className="grid grid-cols-3 gap-2">
                  {(['classic', 'cyber', 'space'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                        theme === t 
                          ? 'bg-zinc-100 text-zinc-950 border-white' 
                          : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  onClick={resetGame}
                  className="w-full py-2 bg-red-950/20 hover:bg-red-950/50 border border-red-900/30 text-red-400 rounded-lg text-xs font-semibold transition"
                >
                  Wipe Save File
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* FLOATING TOAST MESSAGES */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="p-4 bg-zinc-900/90 border border-zinc-800 backdrop-blur rounded-xl shadow-2xl flex flex-col gap-1 animate-slide-in pointer-events-auto"
          >
            <h5 className="font-bold text-sm text-cyan-400">{t.title}</h5>
            <p className="text-xs text-zinc-300 font-medium">{t.message}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
