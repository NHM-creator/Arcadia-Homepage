import React from 'react';
import { ChevronDown, ScrollText, Gamepad2, Swords, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_VIDEO_PLACEHOLDER } from '../constants';

const Hero: React.FC = () => {
  // Removed specific hover colors from base class to apply them individually
  const buttonBaseClass = "group relative w-52 py-4 bg-gradient-to-r from-gray-900 to-midnight text-gray-200 font-bold font-serif text-lg tracking-widest border border-white/20 transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden";
  
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image / Pseudo-Video */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${HERO_VIDEO_PLACEHOLDER})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 w-full">
        
        {/* Logo Area */}
        <div className="mb-8 animate-fade-in-down">
          <h1 className="font-serif text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            ARCADIA
          </h1>
          <div className="h-px w-32 md:w-64 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4"></div>
        </div>

        {/* Catchphrase */}
        <p className="font-serif text-xl md:text-2xl text-gray-200 mb-12 tracking-wider drop-shadow-md">
          "신들이 떠난 낙원, 구원은 당신의 손에 달려 있습니다."
        </p>

        {/* 3 Main Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-16">
          
          {/* Button 1: Worldview (Yellow/Gold) */}
          <Link to="/story" className={`${buttonBaseClass} hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]`}>
            <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
              <ScrollText className="w-5 h-5 text-white group-hover:text-gold transition-colors" />
              세계관
            </span>
            <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          
          {/* Button 2: Contents (Blue) */}
          <Link to="/contents" className={`${buttonBaseClass} hover:border-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]`}>
            <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
              <Gamepad2 className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
              콘텐츠
            </span>
            <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
          </Link>

          {/* Button 3: Classes (Red) */}
          <Link to="/classes" className={`${buttonBaseClass} hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]`}>
            <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
              <Swords className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
              클래스
            </span>
            <div className="absolute inset-0 bg-red-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
          </Link>

        </div>

        {/* Bottom CTA (Moved from ClassSystem) */}
        <div className="flex flex-col items-center animate-fade-in-up">
           {/* Tricolor Gradient Divider */}
           <div 
             className="h-1 w-32 md:w-64 mx-auto mb-10 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
             style={{ 
               background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, #2563eb 20%, #dc2626 50%, #eab308 80%, rgba(0,0,0,0) 100%)' 
             }}
           ></div>
           
           <a 
             href="https://share.crack.wrtn.ai/nr6uqy"
             target="_blank"
             rel="noopener noreferrer"
             className="group relative px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-gold font-bold font-serif text-xl tracking-[0.2em] border border-gold/50 hover:border-gold hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300 clip-path-polygon inline-block"
           >
             <span className="flex items-center gap-3 relative z-10">
               <Crown className="w-6 h-6" />
               운명을 선택하라
             </span>
             {/* Button Inner Glow */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;