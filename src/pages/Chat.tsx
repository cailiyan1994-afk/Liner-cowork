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
