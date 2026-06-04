import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatusBar from '../components/mobile-shell/status-bar';
import HomeIndicator from '../components/mobile-shell/home-indicator';
import { ChevronLeft, Info, Video, MoreHorizontal, Plus, Smile, Mic, CalendarPlus, ArrowUp, X, Calendar, Check } from 'lucide-react';
import { MOCK_HOSTS, generateEventTitle } from '../data/mock';
import { AnimatePresence, motion } from 'framer-motion';

export const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetId = searchParams.get('target');
  const host = MOCK_HOSTS.find(h => h.id === targetId) || MOCK_HOSTS[0];

  const msgParam = searchParams.get('msg');
  const eventTitleParam = searchParams.get('eventTitle');
  
  const [message, setMessage] = useState('');

  const action = searchParams.get('action');
  const sendEvent = searchParams.get('sendEvent');
  const eventModal = searchParams.get('eventModal');

  const [modalEventTitle, setModalEventTitle] = useState(() => generateEventTitle(host));

  const defaultAcceptMsg = host.name.includes("Nastia") 
    ? "收到邀约啦！作为天天写PRD的产品狗，太需要和懂行的美女运营一起吐吐槽啦😂 周末我一定带着 VD 准时赴约，咱们直播间见～" 
    : `收到邀约啦！期待和 ${host.name} 一起开播～`;
  const [previewMsg, setPreviewMsg] = useState(defaultAcceptMsg);

  useEffect(() => {
    setPreviewMsg(defaultAcceptMsg);
  }, [host.id]);

  const [localMessages, setLocalMessages] = useState<any[]>([]);

  const messages: any[] = [];

  // If host sent me a prefilled message (e.g. Nastia)
  if (host.hasLikedYou) {
     if (host.prefilledMessage) {
       messages.push({
         id: 'host-msg',
         type: 'text',
         text: host.prefilledMessage,
         isMe: false
       });
     }
     if (host.prefilledEvent) {
       messages.push({
         id: 'host-evt',
         type: 'event',
         event: {
           title: host.prefilledEvent.title,
           time: host.prefilledEvent.time,
           author: host.name,
           avatar: host.avatar
         },
         status: action === 'acceptEvent' ? 'accepted' : 'pending',
         isMe: false
       });
     }
  }

  // My sent messages
  if (action === 'sendText' || action === 'sendBoth' || action === 'acceptEvent') {
     if (msgParam) {
       messages.push({
         id: 'me-txt',
         type: 'text',
         text: msgParam,
         isMe: true
       });
     } else if (action === 'acceptEvent') {
       const autoReplyMsg = host.name.includes("Nastia") 
         ? "收到邀约啦！作为天天写PRD的产品狗，太需要和懂行的美女运营一起吐吐槽啦😂 周末我一定带着 VD 准时赴约，咱们直播间见～" 
         : `收到邀约啦！期待和 ${host.name} 一起开播～`;
       messages.push({
         id: 'me-accept-txt',
         type: 'text',
         text: autoReplyMsg,
         isMe: true
       });
     }
  }

  // If I sent an event
  if (action === 'sendBoth' || sendEvent === 'true') {
     messages.push({
       id: 'me-evt',
       type: 'event',
       event: {
         title: eventTitleParam || modalEventTitle,
         time: '今天 20:00',
         author: 'VD大王的亲妈（打工版）',
         avatar: 'https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/48a3cf67db3cc026d5badad7ede13a69d48734001b03f823add249ca64495dee.png'
       },
       status: 'pending',
       isMe: true
     });
  }

  const allMessages = [...messages, ...localMessages];

  const handleSendText = () => {
    if (!message.trim()) return;
    setLocalMessages(prev => [...prev, {
      id: `local-${Date.now()}`,
      type: 'text',
      text: message,
      isMe: true
    }]);
    setMessage('');
  };

  const handleOpenEventModal = () => {
    setSearchParams(prev => {
      prev.set('eventModal', 'true');
      return prev;
    });
  };

  const handleCloseEventModal = () => {
    setSearchParams(prev => {
      prev.delete('eventModal');
      return prev;
    });
  };

  const handleSendEvent = () => {
    setSearchParams(prev => {
      prev.delete('eventModal');
      prev.set('sendEvent', 'true');
      prev.set('eventTitle', modalEventTitle);
      return prev;
    });
  };

  const handleAcceptInChat = () => {
    setSearchParams(prev => {
      prev.set('action', 'previewAcceptEvent');
      return prev;
    });
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages.length]);

  return (
    <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
      <div className="bg-neutral-50/95 backdrop-blur-md border-b border-black/5 z-20 relative">
        <StatusBar color="black" floating={false} />
        <header className="h-14 flex items-center px-2 relative">
          <button onClick={() => navigate('/match', { replace: true })} className="p-2 -ml-1 text-black active:bg-black/5 rounded-full">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="font-bold text-[17px] text-black">{host.name}</span>
            <span className="text-[10px] font-medium text-neutral-400">刚刚在 Liner 上 Match 成功</span>
          </div>
          
          <div className="flex items-center gap-1 text-black">
            <button className="p-2"><Video size={22} /></button>
            <button className="p-2"><MoreHorizontal size={22} /></button>
          </div>
        </header>
      </div>

      <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 space-y-6 flex flex-col z-10">
        <div className="flex flex-col items-center justify-center pt-6 pb-4 space-y-3">
          <div className="relative">
            <img src={host.avatar} style={{ objectPosition: 'center 30%' }} className="w-24 h-24 rounded-full border border-black/10 shadow-sm object-cover" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
               <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-black">{host.name}</h2>
          <p className="text-sm text-neutral-500 text-center max-w-[250px] leading-relaxed">
            你们通过 Liner Match 成功<br/>现在可以开始聊天啦
          </p>
          <div className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full border border-green-200 font-medium mt-2 flex items-center gap-1.5 shadow-sm">
            <Info size={14} /> 心动特质: {host.commonTrait}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <span className="text-[11px] font-medium text-neutral-400 bg-black/5 px-3 py-1 rounded-full">今天 14:30</span>
        </div>

        {allMessages.map(msg => {
          if (msg.type === 'text') {
            return (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start items-end gap-2'} relative group pb-4 mt-2`}>
                {!msg.isMe && (
                   <img src={host.avatar} className="w-8 h-8 rounded-full border border-black/10 object-cover shrink-0" />
                )}
                <div className={`max-w-[75%] ${msg.isMe ? 'bg-[#0084FF] text-white rounded-2xl rounded-tr-[4px]' : 'bg-white text-black rounded-2xl rounded-tl-[4px] border border-black/5'} px-4 py-3 shadow-sm text-[15px] leading-relaxed`}>
                  {msg.text}
                </div>
              </div>
            );
          } else if (msg.type === 'event') {
            return (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start items-end gap-2'} relative group pb-4 mt-2`}>
                {!msg.isMe && (
                   <img src={host.avatar} className="w-8 h-8 rounded-full border border-black/10 object-cover shrink-0 mb-6" />
                )}
                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} gap-1`}>
                  <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden w-[260px] text-left">
                    <div className="px-3 py-2 border-b border-black/5 bg-neutral-50/50 flex justify-between items-center">
                      <span className="text-[13px] font-bold text-black flex items-center gap-1.5"><Calendar size={14} className="text-rose-500" /> LIVE Event</span>
                      {!msg.isMe && msg.status === 'accepted' && (
                        <span className="text-[12px] text-green-600 font-semibold flex items-center gap-0.5"><Check size={14}/> 已接受</span>
                      )}
                    </div>
                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex-1 flex flex-col gap-1">
                        <h3 className="font-bold text-[15px] text-black leading-tight">{msg.event.title}</h3>
                        <p className="text-[13px] text-black/60">{msg.event.time}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[12px] text-black/80 truncate max-w-[120px]">{msg.event.author}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#20D5EC"/>
                            <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <img src={msg.event.avatar} className="w-12 h-12 rounded-full object-cover shrink-0 border border-black/5" />
                    </div>
                  </div>
                  {msg.isMe && msg.status === 'pending' && (
                    <span className="text-[11px] text-neutral-400 mr-1 mt-0.5">等待对方同意...</span>
                  )}
                  {!msg.isMe && msg.status === 'pending' && (
                    <div className="flex gap-2 mt-1 ml-1">
                      <button onClick={handleAcceptInChat} className="bg-[#FE2C55] text-white text-[13px] px-5 py-2 rounded-full font-bold shadow-sm active:scale-95 transition-transform">
                        接受邀请
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} className="h-1" />
      </main>

      <div className="bg-neutral-50 border-t border-black/5 flex flex-col z-20 relative shrink-0">
        <div className="px-3 py-3 flex items-end gap-2.5">
          <button onClick={handleOpenEventModal} className="p-2 text-neutral-500 hover:text-black shrink-0 -ml-1">
            <CalendarPlus size={26} strokeWidth={2} />
          </button>
          <div className="flex-1 bg-white border border-neutral-200 rounded-[20px] pl-3 pr-1.5 py-1.5 flex items-center gap-2 min-h-[42px] shadow-sm">
            <textarea 
              placeholder="发消息..." 
              className="flex-1 bg-transparent outline-none text-[15px] text-black placeholder:text-neutral-400 resize-none max-h-[100px] py-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={Math.max(1, Math.min(3, message.split('\n').length))}
            />
            {message.trim().length > 0 ? (
               <button onClick={handleSendText} className="text-white bg-[#0084FF] p-1.5 rounded-full shrink-0 hover:bg-blue-600 transition-colors self-end mb-0.5">
                  <ArrowUp size={18} strokeWidth={3} />
               </button>
            ) : (
               <button className="text-neutral-400 p-1 shrink-0 hover:text-neutral-600 transition-colors self-end mb-0.5">
                  <Smile size={22} />
               </button>
            )}
          </div>
          <button className="p-2 text-neutral-500 hover:text-black shrink-0 -mr-1">
            <Plus size={26} strokeWidth={2} />
          </button>
        </div>
        <HomeIndicator floating={false} />
      </div>

      <AnimatePresence>
        {eventModal === 'true' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full bg-white rounded-t-3xl border-t border-black/10 p-6 flex flex-col gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pb-[calc(24px+env(safe-area-inset-bottom))]"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-black">发起 LIVE Event 邀约</h3>
                <button onClick={handleCloseEventModal} className="p-2 bg-black/5 rounded-full text-black/60 hover:text-black">
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[13px] font-semibold text-neutral-500 mb-1.5 block">直播主题 (AI 智能生成)</label>
                  <input 
                    type="text" 
                    value={modalEventTitle} 
                    onChange={(e) => setModalEventTitle(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-[15px] font-medium text-black outline-none focus:border-neutral-300 transition-colors" 
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-neutral-500 mb-1.5 block">时间</label>
                  <input type="text" readOnly value="今天 20:00" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-[15px] font-medium text-black outline-none" />
                </div>
              </div>

              <button 
                onClick={handleSendEvent}
                className="w-full py-3.5 mt-4 bg-[#FE2C55] text-white rounded-full font-bold shadow-lg shadow-rose-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                发送邀约
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {action === 'previewAcceptEvent' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full bg-white rounded-t-3xl border-t border-black/10 p-6 flex flex-col gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pb-[calc(24px+env(safe-area-inset-bottom))]"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-black">回应TA的邀请</h3>
                <button onClick={() => setSearchParams(prev => { prev.delete('action'); return prev; })} className="p-2 bg-black/5 rounded-full text-black/60 hover:text-black">
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 relative focus-within:border-neutral-300 transition-colors">
                  <textarea
                    value={previewMsg}
                    onChange={(e) => setPreviewMsg(e.target.value)}
                    className="w-full bg-transparent text-black text-[15px] outline-none resize-none min-h-[100px] leading-relaxed"
                    placeholder="说点什么..."
                  />
                </div>
              </div>

              <button 
                onClick={() => setSearchParams(prev => { prev.set('action', 'acceptEvent'); prev.set('msg', previewMsg); return prev; })}
                className="w-full py-3.5 mt-2 bg-[#FE2C55] text-white rounded-full font-bold shadow-lg shadow-rose-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                确认发送
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};