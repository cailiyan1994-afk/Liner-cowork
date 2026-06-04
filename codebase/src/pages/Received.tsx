import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatusBar from '../components/mobile-shell/status-bar';
import HomeIndicator from '../components/mobile-shell/home-indicator';
import { motion } from 'framer-motion';
import { MOCK_HOSTS } from '../data/mock';
import { X, Calendar, MessageCircle, Check } from 'lucide-react';

export const Received: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetId = searchParams.get('target');
  const host = MOCK_HOSTS.find(h => h.id === targetId) || MOCK_HOSTS[0];
  const isSuper = searchParams.get('super') === 'true';

  const handleAccept = () => {
    navigate(`/chat?target=${host.id}&action=previewAcceptEvent`, { replace: true });
  };

  const handleSkip = () => {
    navigate(`/chat?target=${host.id}`, { replace: true });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/80 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />

      <StatusBar color="white" floating={true} />
      
      <main className="flex-1 h-full flex flex-col items-center relative z-10 w-full pt-[62px]">
        <button onClick={() => navigate('/match', { replace: true })} className="absolute top-[62px] right-6 p-2 bg-white/10 rounded-full text-white/70 hover:text-white backdrop-blur-md z-50">
          <X size={24} />
        </button>

        <div className="shrink-0 flex flex-col items-center pt-2 pb-6 w-full">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center space-y-1"
          >
            <h1 className={`text-4xl font-black italic tracking-tighter text-transparent bg-clip-text ${isSuper ? 'bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]' : 'bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]'}`}>
              {isSuper ? "Super Match！" : "Match！"}
            </h1>
            <p className="text-sm font-medium text-white/90">你和 {host.name} 互相喜欢了对方</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6 relative w-full px-4">
            <motion.div 
              initial={{ x: -60, opacity: 0, rotate: -15 }}
              animate={{ x: 0, opacity: 1, rotate: -5 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
              className="w-24 h-24 rounded-full border-[3px] border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden relative z-10 bg-neutral-800 shrink-0"
            >
               <img src="https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/48a3cf67db3cc026d5badad7ede13a69d48734001b03f823add249ca64495dee.png" alt="me" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.6 }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white ${isSuper ? 'bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[0_0_20px_rgba(96,165,250,0.6)]' : 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-[0_0_20px_rgba(56,189,248,0.6)]'}`}
            >
              <span className="text-lg drop-shadow-md">🌟</span>
            </motion.div>

            <motion.div 
              initial={{ x: 60, opacity: 0, rotate: 15 }}
              animate={{ x: 0, opacity: 1, rotate: 5 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="w-24 h-24 rounded-full border-[3px] border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden relative z-10 bg-neutral-800 shrink-0"
            >
               <img src={host.avatar} alt="host" style={{ objectPosition: 'center 30%' }} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.3 }}
          className="flex-1 w-full bg-neutral-900/80 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-5 flex flex-col gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20 pb-[calc(20px+env(safe-area-inset-bottom))] overflow-y-auto"
        >
          {/* Host's Message */}
          <div className="flex flex-col gap-2 shrink-0 mt-2">
            <label className="text-[13px] font-bold text-white/70 ml-1 flex items-center gap-1.5">
              <MessageCircle size={14} /> TA 的留言
            </label>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 relative">
              <p className="text-[15px] text-white leading-relaxed">
                {host.prefilledMessage}
              </p>
            </div>
          </div>

          {/* Host's Event */}
          {host.prefilledEvent && (
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 flex flex-col shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-blue-400" />
                <span className="text-[13px] font-bold text-white/70">TA 的 LIVE Event 邀请</span>
              </div>
              <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex gap-3 items-center">
                 <div className="flex-1 min-w-0">
                   <h3 className="font-bold text-[15px] text-white truncate">{host.prefilledEvent.title}</h3>
                   <p className="text-[13px] text-white/60 mt-0.5">{host.prefilledEvent.time}</p>
                 </div>
                 <img src={host.avatar} className="w-10 h-10 rounded-full border border-white/20 shrink-0" />
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 flex flex-col gap-3 shrink-0">
            <button 
              onClick={handleAccept}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-black rounded-full font-black text-[16px] shadow-[0_0_30px_rgba(56,189,248,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Check size={20} strokeWidth={3} />
              接受邀请并开聊
            </button>
            <button 
              onClick={handleSkip}
              className="w-full py-3 font-bold text-white/50 hover:text-white active:scale-95 transition-colors text-[14px]"
            >
              稍后再说，先打个招呼
            </button>
          </div>
        </motion.div>
      </main>

      <HomeIndicator floating={true} />
    </div>
  );
};