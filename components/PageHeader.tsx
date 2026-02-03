import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ScrollText, Gamepad2, Swords, Crown } from 'lucide-react';

const PageHeader: React.FC = () => {
  const buttonClass = "group relative w-32 md:w-40 py-3 bg-gradient-to-r from-gray-900 to-midnight text-gray-200 font-bold font-serif text-sm md:text-base tracking-widest border border-white/20 transition-all duration-300 hover:scale-105 hover:border-gold hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] flex items-center justify-center overflow-hidden";
  
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-4 mb-12 relative z-50">
      
      {/* Left: Home Button */}
      <Link 
        to="/" 
        className="p-3 bg-midnight border border-white/20 text-gray-400 hover:text-white hover:border-gold hover:scale-110 transition-all rounded-full group"
        aria-label="Home"
      >
        <Home className="w-6 h-6 group-hover:text-gold transition-colors" />
      </Link>

      {/* Center: Navigation Buttons */}
      <div className="flex gap-4">
        {/* Worldview: Yellow */}
        <Link to="/story" className={buttonClass}>
          <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
            <ScrollText className="w-4 h-4 text-white group-hover:text-gold transition-colors" />
            세계관
          </span>
          <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </Link>
        
        {/* Contents: Blue */}
        <Link to="/contents" className={buttonClass}>
          <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
            <Gamepad2 className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
            콘텐츠
          </span>
          <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
        </Link>

        {/* Classes: Red */}
        <Link to="/classes" className={buttonClass}>
          <span className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors">
            <Swords className="w-4 h-4 text-white group-hover:text-red-500 transition-colors" />
            클래스
          </span>
          <div className="absolute inset-0 bg-red-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
        </Link>
      </div>

      {/* Right: Destiny CTA (Compact) */}
      <a 
        href="https://share.crack.wrtn.ai/nr6uqy"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-6 py-3 bg-black text-gold font-bold font-serif text-sm tracking-widest border border-gold/30 hover:border-gold hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 clip-path-polygon flex items-center gap-2"
      >
        <Crown className="w-4 h-4" />
        운명을 선택하라
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </a>
    </div>
  );
};

export default PageHeader;