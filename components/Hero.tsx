import React from 'react';
import { Play, Download, ChevronDown } from 'lucide-react';
import { HERO_VIDEO_PLACEHOLDER } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image / Pseudo-Video */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${HERO_VIDEO_PLACEHOLDER})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
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

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6">
          <a 
            href="https://share.crack.wrtn.ai/nr6uqy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-midnight font-bold font-serif text-lg tracking-widest clip-path-polygon hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center justify-center"
          >
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              GAME START
            </span>
            <div className="absolute inset-0 border-2 border-white/30 group-hover:border-white/60 transition-colors"></div>
          </a>
          
          <a 
            href="https://crack.wrtn.ai/profile/8IRJgYQSxEY-KKKOOERNODJP"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-midnight/50 backdrop-blur-md text-gold font-bold font-serif text-lg tracking-widest border border-gold/30 hover:bg-midnight/70 hover:border-gold transition-all flex items-center justify-center"
          >
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              ARCHIVES
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;