import React from 'react';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Logo & Rating */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="font-serif text-2xl font-bold text-white tracking-widest">ARCADIA</h2>
          <div className="flex items-center gap-3 border border-gray-700 px-3 py-1 rounded bg-gray-900">
             <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white font-bold text-xs rounded">18+</div>
             <span className="text-xs">폭력성, 혈흔, 유저 간 상호작용</span>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-xs space-y-2">
          <p>&copy; 2024 ARCADIA STUDIO. All Rights Reserved.</p>
          <p>Trademarks are the property of their respective owners.</p>
          <div className="flex gap-4 justify-center text-gray-500 mt-2">
            <a href="#" className="hover:text-gold">개인정보처리방침</a>
            <span>|</span>
            <a href="#" className="hover:text-gold">이용약관</a>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-6">
          <a href="#" className="hover:text-white hover:scale-110 transition-transform"><Facebook size={24} /></a>
          <a href="#" className="hover:text-white hover:scale-110 transition-transform"><Twitter size={24} /></a>
          <a href="#" className="hover:text-white hover:scale-110 transition-transform"><Youtube size={24} /></a>
          <a href="#" className="hover:text-white hover:scale-110 transition-transform"><Instagram size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;