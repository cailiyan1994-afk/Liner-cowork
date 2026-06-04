import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/mobile-shell/status-bar';
import HomeIndicator from '../components/mobile-shell/home-indicator';
import { X, Play, ChevronRight, Clock, Heart, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const HexagonCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" fill="#F97316"/>
    <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HexagonEmpty = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" fill="#E5E5E5"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 9L12 22L22 9L12 2Z" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 9H22" stroke="white" strokeWidth="1" opacity="0.5"/>
    <path d="M12 2V22" stroke="white" strokeWidth="1" opacity="0.5"/>
  </svg>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-[#F4F5F6] flex flex-col font-sans overflow-hidden">
      <div className="bg-[#F4F5F6] relative z-20">
        {/* Top Right Decoration */}
        <div className="absolute top-0 right-0 w-[220px] h-[220px] pointer-events-none z-0 overflow-hidden">
          <svg viewBox="0 0 200 200" className="absolute -top-10 -right-10 w-[260px] h-[260px] opacity-90">
            <path d="M150 0 L250 100 L120 180 Z" fill="#FDE047" />
            <path d="M200 0 L180 150 L80 120 Z" fill="#F97316" />
            <path d="M250 50 L140 160 L50 80 Z" fill="#EF4444" />
            <path d="M200 120 L180 250 L90 160 Z" fill="#FCD34D" />
            <path d="M160 0 L90 100 L250 80 Z" fill="#FB923C" />
          </svg>
        </div>
        
        <StatusBar color="black" floating={false} />
        <header className="flex justify-between items-center px-4 h-12 relative z-10">
          <button className="p-1 -ml-1 active:opacity-70 transition-opacity">
            <X size={26} className="text-black stroke-[2.5]" />
          </button>
          <button className="bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-white/60">
            <Play size={12} className="fill-black" />
            <span className="text-[13px] font-bold text-black">直播中心</span>
          </button>
        </header>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-28 relative z-10 space-y-3.5">
        {/* Header Text */}
        <div className="pt-2 pb-3">
          <p className="text-neutral-400 text-[15px] font-semibold mb-1 tracking-wide">直播时长: 2分钟</p>
          <h1 className="text-[34px] font-black text-black mb-2.5 tracking-tight">恭喜！</h1>
          <p className="text-neutral-600 text-[15px] leading-snug font-medium">
            本次直播时长超过了 <span className="text-teal-600 font-bold">18%</span> 粉丝量相近的创作者。
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-[14px] p-5 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] active:bg-neutral-50 transition-colors">
           <div className="flex-1 flex justify-between pr-8">
             <div className="flex flex-col">
               <span className="text-[26px] font-bold text-black">0</span>
               <span className="text-[13px] text-neutral-400 font-medium mt-1">观看人数</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[26px] font-bold text-black">0</span>
               <span className="text-[13px] text-neutral-400 font-medium mt-1">打赏人数</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[26px] font-bold text-black">0</span>
               <span className="text-[13px] text-neutral-400 font-medium mt-1">新增粉丝</span>
             </div>
           </div>
           <ChevronRight size={20} className="text-neutral-300 stroke-[2.5]" />
        </div>

        {/* Scaled LIVE Rewards */}
        <div className="bg-white rounded-[14px] p-5 space-y-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] relative active:bg-neutral-50 transition-colors">
           <div className="flex justify-between items-center">
             <h2 className="text-[16px] font-bold text-black">直播收益</h2>
             <ChevronRight size={20} className="text-neutral-300 stroke-[2.5] absolute right-5 top-5" />
           </div>
           <div className="flex gap-14 pr-8">
             <div className="flex flex-col">
               <span className="text-[26px] font-bold text-black">$0.00</span>
               <span className="text-[13px] text-neutral-400 font-medium mt-1">本次预估收益</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[26px] font-bold text-black">$0.00</span>
               <span className="text-[13px] text-neutral-400 font-medium mt-1">本周预估收益</span>
