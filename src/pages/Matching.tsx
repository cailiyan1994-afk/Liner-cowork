import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/mobile-shell/status-bar';
import HomeIndicator from '../components/mobile-shell/home-indicator';
import { X, Heart, Star, Sparkles, MessageCircle, Info, Play } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { MOCK_HOSTS, Host, SWIPED_HOSTS } from '../data/mock';

type SwipeCardProps = {
  host: Host;
  active: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: (id: string) => void;
  onDoubleTap: (id: string) => void;
  zIndex: number;
};

const SwipeCard = ({ host, active, onSwipeLeft, onSwipeRight, onDoubleTap, zIndex }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      onSwipeRight(host.id);
    } else if (offset < -100 || velocity < -500) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="absolute top-0 w-full h-full rounded-3xl bg-neutral-900 shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden will-change-transform touch-none origin-bottom border border-white/10"
      style={{
        x,
        rotate,
        zIndex,
      }}
      initial={{ scale: 0.95, y: 20, opacity: 0 }}
      animate={{ 
        scale: active ? 1 : Math.max(0.85, 0.95 - (zIndex * 0.03)), 
        y: active ? 0 : Math.min(60, 20 + (zIndex * 12)), 
        opacity: active ? 1 : 1 - (zIndex * 0.1)
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={active ? handleDragEnd : undefined}
      onDoubleClick={active ? () => onDoubleTap(host.id) : undefined}
      whileTap={active ? { scale: 0.98 } : {}}
      dragSnapToOrigin
    >
      <div className="absolute inset-0 bg-neutral-800">
        <img src={host.coverImage} alt="cover" className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
            <Play size={32} className="ml-1 fill-white/80 text-white/80" />
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/95 pointer-events-none" />

      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
        <div className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
          <Sparkles size={14} className="text-yellow-400" />
          <span className="font-medium">{host.relationship}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-4 pb-3 text-white pointer-events-none flex flex-col gap-2 z-10">
        <div className="flex items-center gap-2">
          <img src={host.avatar} style={{ objectPosition: 'center 30%' }} className="w-10 h-10 rounded-full border-[1.5px] border-white shadow-lg object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-white drop-shadow-md truncate flex items-center gap-2">
              {host.name}
            </h2>
            <div className="flex flex-wrap gap-1 mt-1 mb-0.5">
              {host.hasLikedYou && (
                <span className="text-[10px] font-bold bg-[#0084FF]/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-blue-400/50 shadow-sm flex items-center gap-0.5 text-white">
                  💙 TA 喜欢了你
                </span>
              )}
              {host.tags.map((tag: string) => (
                <span key={tag} className="text-[9px] font-medium bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/10 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10 shadow-lg flex flex-col gap-1.5 mt-0.5">
          <p className="text-[10px] font-semibold text-rose-300 flex items-center gap-1 uppercase tracking-wider">
            <Heart size={10} className="fill-rose-300" /> 心动匹配理由
          </p>
          <p className="text-xs font-medium text-white leading-snug">{host.aiReason}</p>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            <span className="text-[9px] font-medium bg-white/10 px-1.5 py-0.5 rounded text-white/90 border border-white/5">
              {host.commonTrait}
            </span>
            <span className="text-[9px] font-medium bg-white/10 px-1.5 py-0.5 rounded text-white/90 border border-white/5">
              {host.complementary}
            </span>
          </div>
        </div>
      </div>

      {active && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-16 left-8 border-[6px] border-green-500 text-green-500 rounded-xl px-6 py-2 text-5xl font-black italic transform -rotate-12 pointer-events-none z-20 shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-green-500/10 backdrop-blur-sm"
          >
            喜欢
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-16 right-8 border-[6px] border-red-500 text-red-500 rounded-xl px-6 py-2 text-5xl font-black italic transform rotate-12 pointer-events-none z-20 shadow-[0_0_30px_rgba(239,68,68,0.3)] bg-red-500/10 backdrop-blur-sm"
          >
            无感
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const SuperHeartsAnimation = () => {
  const hearts = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    scale: Math.random() * 1 + 0.5,
    delay: Math.random() * 0.2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, heart.scale, heart.scale * 1.5], 
            x: heart.x * 3, 
            y: heart.y * 3 - 50 
          }}
          transition={{ duration: 1.2, delay: heart.delay, ease: "easeOut" }}
          className="absolute"
        >
          <Heart size={40} className="fill-blue-500 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 1.1], y: [20, -10, -10, -20] }}
        transition={{ duration: 1.4, times: [0, 0.2, 0.8, 1] }}
        className="text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
      >
        SUPER!
      </motion.div>
    </div>
  );
};

export const Matching: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(() => {
    let nextIdx = 0;
    while(nextIdx < MOCK_HOSTS.length && SWIPED_HOSTS.has(MOCK_HOSTS[nextIdx].id)) {
      nextIdx++;
    }
    return nextIdx;
  });
  const [showSuperAnim, setShowSuperAnim] = useState(false);

  const handleSwipeLeft = () => {
    SWIPED_HOSTS.add(MOCK_HOSTS[currentIndex].id);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeRight = (id: string) => {
    SWIPED_HOSTS.add(id);
    const host = MOCK_HOSTS.find(h => h.id === id);
    if (host?.hasLikedYou) {
      navigate(`/received?target=${id}`);
    } else {
      navigate(`/matched?target=${id}`);
    }
  };

  const handleDoubleTap = (id: string) => {
    setShowSuperAnim(true);
    setTimeout(() => {
      setShowSuperAnim(false);
      SWIPED_HOSTS.add(id);
      const host = MOCK_HOSTS.find(h => h.id === id);
      if (host?.hasLikedYou) {
        navigate(`/received?target=${id}&super=true`, { replace: true });
      } else {
        navigate(`/matched?target=${id}&super=true`, { replace: true });
      }
    }, 1200); // Wait for animation to finish before navigating
  };

  const isFinished = currentIndex >= MOCK_HOSTS.length;

  return (
    <div className="relative w-full h-screen bg-neutral-950 overflow-hidden text-white flex flex-col">
      <StatusBar color="white" floating={true} />
      
      <main className="pt-[62px] pb-[34px] flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-5 py-3 flex items-center justify-between shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Liner</h1>
            <p className="text-[11px] font-medium text-neutral-400 mt-0.5 tracking-wide">遇见与你直播同频的 TA</p>
          </div>
          <div className="flex items-center gap-4">
            {!isFinished && (
              <span className="text-xs font-bold text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800 shadow-inner">
                {Math.min(currentIndex + 1, MOCK_HOSTS.length)} / {MOCK_HOSTS.length}
              </span>
            )}
            <button onClick={() => navigate('/home')} className="p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-white border border-neutral-800 active:scale-95 transition-transform">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* Cards Area */}
        <div className="flex-1 relative w-full px-5 py-2 mt-2 mb-6 flex flex-col">
           {isFinished ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
             >
               <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/5">
                 <Sparkles size={32} className="text-neutral-500" />
               </div>
               <h2 className="text-xl font-bold text-white">没有更多推荐了</h2>
               <p className="text-sm text-neutral-400 max-w-[200px] leading-relaxed">继续直播，让 Liner 为你寻找更多合拍的创作者</p>
               <button onClick={() => navigate('/home')} className="mt-8 px-8 py-3.5 bg-white text-black font-bold rounded-full active:scale-95 transition-transform shadow-lg shadow-white/20">
                 返回首页
               </button>
             </motion.div>
           ) : (
             <>
               <div className="relative w-full flex-1 mb-6 perspective-[1000px]">
                 <AnimatePresence>
                   {MOCK_HOSTS.map((host, index) => {
                     if (index < currentIndex) return null;
                     const isTop = index === currentIndex;
                     return (
                       <SwipeCard
                         key={host.id}
                         host={host}
                         active={isTop}
                         zIndex={MOCK_HOSTS.length - index}
                         onSwipeLeft={handleSwipeLeft}
                         onSwipeRight={() => handleSwipeRight(host.id)}
                         onDoubleTap={() => handleDoubleTap(host.id)}
                       />
                     );
                   })}
                 </AnimatePresence>
               </div>

               {/* Controls */}
               <div className="shrink-0 flex justify-center items-center gap-8 w-full px-4 pb-2 z-10">
                  <button onClick={handleSwipeLeft} className="w-16 h-16 bg-neutral-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-xl border border-white/5 active:scale-90 transition-transform">
                    <X size={32} strokeWidth={3} />
                  </button>
                  <button onClick={() => handleDoubleTap(MOCK_HOSTS[currentIndex].id)} className="w-14 h-14 bg-neutral-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-blue-400 shadow-xl border border-white/5 active:scale-90 transition-transform flex-col gap-0.5">
                    <Star size={24} className="fill-blue-400" />
                    <span className="text-[8px] font-bold tracking-widest">Super</span>
                  </button>
                  <button onClick={() => handleSwipeRight(MOCK_HOSTS[currentIndex].id)} className="w-16 h-16 bg-neutral-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-green-500 shadow-xl border border-white/5 active:scale-90 transition-transform">
                    <Heart size={32} strokeWidth={2.5} className="fill-green-500/20" />
                  </button>
               </div>
             </>
           )}
        </div>
      </main>

      {showSuperAnim && <SuperHeartsAnimation />}

      <HomeIndicator floating={true} />
    </div>
  );
};
