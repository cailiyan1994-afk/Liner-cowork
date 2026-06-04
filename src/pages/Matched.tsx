import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatusBar from '../components/mobile-shell/status-bar';
import HomeIndicator from '../components/mobile-shell/home-indicator';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_HOSTS, generateEventTitle } from '../data/mock';
import { MessageCircle, X, Calendar } from 'lucide-react';

const Switch = ({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shrink-0 ${checked ? 'bg-green-500' : 'bg-white/20'}`}
  >
    <motion.div 
      layout
      className="w-4 h-4 bg-white rounded-full shadow-sm"
      animate={{ x: checked ? 24 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </div>
);

export const Matched: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get('target');
  const host = MOCK_HOSTS.find(h => h.id === targetId) || MOCK_HOSTS[0];
  
  const isSuper = searchParams.get('super') === 'true';
  const defaultIcebreaker = `哈喽！我是个互联网产品经理，也是VD大王的亲妈，平时周末喜欢带狗子户外开播。看到咱们的共同点是『${host.commonTrait}』，而且感觉气场超合（${host.complementary}）！想认识一下，下次说不定可以一起带着VD连麦呀～`;
  const initialMsg = searchParams.get('msg') || defaultIcebreaker;

  const [msg, setMsg] = useState(initialMsg);
  const [withEvent, setWithEvent] = useState(searchParams.get('withEvent') === 'true');
  const [eventTitle, setEventTitle] = useState(() => generateEventTitle(host));

  // Sync state to URL for prototype flow
  useEffect(() => {
    if (withEvent) {
      if (searchParams.get('withEvent') !== 'true') {
        searchParams.set('withEvent', 'true');
        setSearchParams(searchParams, { replace: true });
      }
    } else {
      if (searchParams.has('withEvent')) {
        searchParams.delete('withEvent');
        setSearchParams(searchParams, { replace: true });
      }
    }
  }, [withEvent, searchParams, setSearchParams]);

  const handleSend = () => {
    const action = withEvent ? 'sendBoth' : 'sendText';
    let url = `/chat?target=${host.id}&action=${action}&msg=${encodeURIComponent(msg)}`;
    if (withEvent) {
      url += `&eventTitle=${encodeURIComponent(eventTitle)}`;
    }
    navigate(url, { replace: true });
  };

  const handleSkip = () => {
    navigate(`/chat?target=${host.id}`, { replace: true });
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden text-white flex flex-col">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/80 via-black to-black pointer-events-none" />
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
            <h1 className={`text-4xl font-black italic tracking-tighter text-transparent bg-clip-text ${isSuper ? 'bg-gradient-to-br from-blue-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]' : 'bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]'}`}>
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
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white ${isSuper ? 'bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[0_0_20px_rgba(96,165,250,0.6)]' : 'bg-gradient-to-br from-yellow-300 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.6)]'}`}
            >
              <span className="text-lg drop-shadow-md">{isSuper ? "🌟" : "✨"}</span>
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
          {/* Edit Message */}
          <div className="flex flex-col gap-2 shrink-0">
            <label className="text-[13px] font-bold text-white/70 ml-1 flex items-center gap-1.5">
              <MessageCircle size={14} /> 打个招呼吧
            </label>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-3 relative focus-within:border-white/30 transition-colors">
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full bg-transparent text-white text-[14px] outline-none resize-none min-h-[90px] leading-relaxed"
                placeholder="打个招呼吧..."
              />
            </div>
          </div>

          {/* Event Toggle */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col shrink-0">
             <div className="flex items-center justify-between gap-2">
               <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-orange-500 flex items-center justify-center shadow-lg shrink-0">
                   <Calendar size={18} className="text-white" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[15px] font-bold text-white">附加 LIVE Event 邀约</span>
                   <span className="text-[11px] text-white/50">向 TA 发起连麦直播邀请</span>
                 </div>
               </div>
               <Switch checked={withEvent} onChange={setWithEvent} />
             </div>

             <AnimatePresence>
               {withEvent && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0, marginTop: 0 }}
                   animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                   exit={{ height: 0, opacity: 0, marginTop: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="pt-3 border-t border-white/10 space-y-3">
                     <div>
                       <label className="text-[12px] text-white/60 mb-1.5 block">直播标题 (AI 根据特质生成)</label>
                       <input 
                         type="text" 
                         value={eventTitle}
                         onChange={(e) => setEventTitle(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-[14px] text-white outline-none focus:border-white/30 transition-colors"
                       />
                     </div>
                     <div>
                       <label className="text-[12px] text-white/60 mb-1.5 block">时间</label>
                       <div className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-[14px] text-white/60">
                         今天 20:00
                       </div>
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="mt-auto pt-4 flex flex-col gap-3 shrink-0">
            <button 
              onClick={handleSend}
              className="w-full py-3.5 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-full font-black text-[16px] shadow-[0_0_30px_rgba(52,211,153,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              发送并开聊
            </button>
            <button 
              onClick={handleSkip}
              className="w-full py-3 font-bold text-white/50 hover:text-white active:scale-95 transition-colors text-[14px]"
            >
              跳过，直接进入聊天
            </button>
          </div>
        </motion.div>
      </main>

      <HomeIndicator floating={true} />
    </div>
  );
};