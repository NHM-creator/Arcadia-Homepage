import React, { useState, useEffect, useRef } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { CLASSES } from '../constants';
import { RoleType, ClassData } from '../types';
import { Shield, Swords, Heart, ChevronLeft, ChevronRight, Crown } from 'lucide-react';

interface ClassSystemProps {
  selectedRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

const ClassSystem: React.FC<ClassSystemProps> = ({ selectedRole, onRoleChange }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('phantom-blade');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);

  // Filter classes by active role
  const filteredClasses = CLASSES.filter(c => c.role === selectedRole);
  const selectedClass = CLASSES.find(c => c.id === selectedClassId) || filteredClasses[0];

  // Update selected class when role changes
  useEffect(() => {
    if (selectedRole === 'DEALER') {
      setSelectedClassId('phantom-blade');
    } else {
      const firstInRole = CLASSES.find(c => c.role === selectedRole);
      if (firstInRole) setSelectedClassId(firstInRole.id);
    }
  }, [selectedRole]);

  // Reset image index when selected class changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedClassId]);

  const handleClassClick = (id: string) => {
    setSelectedClassId(id);
    // Mobile only: scroll to detail view
    if (window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedClass.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedClass.imageUrls.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedClass.imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedClass.imageUrls.length) % selectedClass.imageUrls.length);
    }
  };

  const roleNames: Record<RoleType, string> = {
    TANK: '탱커',
    DEALER: '딜러',
    SUPPORT: '서포터'
  };

  const hasMultipleImages = selectedClass.imageUrls.length > 1;

  // Role-based button colors
  const buttonActiveColor = selectedRole === 'TANK' 
    ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white' 
    : selectedRole === 'SUPPORT' 
      ? 'bg-gradient-to-r from-yellow-700 to-yellow-500 text-white'
      : 'bg-gradient-to-r from-sunset-red to-red-900 text-gold';

  // Role Color Configuration
  const getRoleTheme = (role: RoleType) => {
    switch (role) {
      case 'TANK': 
        return {
          border: 'border-blue-500',
          dot: 'bg-blue-500',
          glow: 'bg-blue-600',
          shadow: 'shadow-[inset_0_0_20px_rgba(59,130,246,0.3)]',
          textAccent: 'text-blue-400'
        };
      case 'DEALER': 
        return {
          border: 'border-red-600',
          dot: 'bg-red-600',
          glow: 'bg-red-600',
          shadow: 'shadow-[inset_0_0_20px_rgba(220,38,38,0.3)]',
          textAccent: 'text-red-400'
        };
      case 'SUPPORT': 
        return {
          border: 'border-yellow-500',
          dot: 'bg-yellow-400',
          glow: 'bg-yellow-500',
          shadow: 'shadow-[inset_0_0_20px_rgba(234,179,8,0.3)]',
          textAccent: 'text-yellow-400'
        };
    }
  };

  const theme = getRoleTheme(selectedClass.role);

  const radarData = [
    { subject: '공격력', A: selectedClass.stats.attack, fullMark: 100 },
    { subject: '방어력', A: selectedClass.stats.defense, fullMark: 100 },
    { subject: '지원력', A: selectedClass.stats.support, fullMark: 100 },
    { subject: '기동성', A: selectedClass.stats.mobility, fullMark: 100 },
    { subject: '조작 난이도', A: selectedClass.stats.difficulty, fullMark: 100 },
  ];

  // Background layers configuration
  // Using solid gradients in separate divs allows for smooth opacity transitions (cross-fade)
  // instead of jerking CSS gradient property transitions.
  const bgLayers = {
    TANK: "bg-gradient-to-b from-midnight via-[#0a1533] to-[#1c3d8a]",    // Deep Navy -> Tank Blue
    DEALER: "bg-gradient-to-b from-midnight via-[#260505] to-[#450a0a]",  // Deep Red -> Sunset Red
    SUPPORT: "bg-gradient-to-b from-midnight via-[#1f1a05] to-[#423805]"  // Deep Gold -> Support Holy
  };

  return (
    <section id="class" className="py-24 px-4 md:px-12 relative border-t border-white/5 overflow-hidden">
       {/* Background Layer Container */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Base Background */}
          <div className="absolute inset-0 bg-midnight"></div>
          
          {/* Animated Role Backgrounds */}
          {(['TANK', 'DEALER', 'SUPPORT'] as RoleType[]).map((role) => (
            <div
              key={role}
              className={`
                absolute inset-0 ${bgLayers[role]} 
                transition-opacity duration-[2000ms] ease-in-out will-change-[opacity]
                ${selectedRole === role ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {/* Subtle Breathing/Rhythmic Pulse Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent animate-pulse duration-[4000ms]"></div>
              
              {/* Moving Shine Effect for Rhythm */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-y-full animate-[fadeInUp_8s_infinite_ease-in-out] opacity-30"></div>
            </div>
          ))}
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase mb-2">Class System</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-bold">운명을 선택하라</h3>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/5 backdrop-blur-sm p-1 rounded-full border border-white/10">
            {(['TANK', 'DEALER', 'SUPPORT'] as RoleType[]).map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300
                  ${selectedRole === role 
                    ? `${buttonActiveColor} shadow-lg ring-1 ring-white/30` 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {role === 'TANK' && <Shield size={16} />}
                {role === 'DEALER' && <Swords size={16} />}
                {role === 'SUPPORT' && <Heart size={16} />}
                {roleNames[role]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-panel rounded-xl overflow-hidden min-h-[600px] mb-24">
          
          {/* Middle: Character Image Display (Mobile: Order 1) */}
          <div ref={detailRef} className="lg:col-span-5 lg:order-2 relative flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] group order-1">
             {/* Glow Effect behind character - Re-introduced subtle static glow based on role */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
             
             {/* Role-based subtle background fill */}
             <div className={`absolute w-[400px] h-[400px] rounded-full filter blur-[80px] opacity-20 z-0 transition-colors duration-1000 ${theme.glow}`}></div>
             
             {/* Character Image */}
             <div className="relative z-10 w-full h-full flex items-center justify-center">
               <img 
                 key={selectedClass.imageUrls[currentImageIndex]} // Reset animation on image change
                 src={selectedClass.imageUrls[currentImageIndex]} 
                 alt={selectedClass.name}
                 className="max-h-[500px] w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in-up transition-opacity duration-300"
               />
               
               {/* Navigation Buttons for multiple images */}
               {hasMultipleImages && (
                 <>
                   <button 
                     onClick={prevImage}
                     className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white/70 rounded-full hover:bg-gold hover:text-midnight transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                   >
                     <ChevronLeft size={32} />
                   </button>
                   <button 
                     onClick={nextImage}
                     className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white/70 rounded-full hover:bg-gold hover:text-midnight transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                   >
                     <ChevronRight size={32} />
                   </button>
                   
                   {/* Dots Indicator - Interactive and colored by role */}
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {selectedClass.imageUrls.map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${idx === currentImageIndex ? `${theme.dot} w-6` : 'bg-white/30'}`}
                          aria-label={`Select image ${idx + 1}`}
                        />
                      ))}
                   </div>
                 </>
               )}
             </div>
          </div>

          {/* Right: Info & Stats (Mobile: Order 2) */}
          <div className="lg:col-span-4 lg:order-3 p-8 flex flex-col justify-center bg-gradient-to-bl from-white/5 to-transparent order-2">
             <div className="mb-2">
               <span className={`inline-block px-3 py-1 text-xs font-bold text-midnight rounded-sm mb-4 ${selectedRole === 'TANK' ? 'bg-blue-500 text-white' : selectedRole === 'DEALER' ? 'bg-red-600 text-white' : 'bg-gold'}`}>
                 {roleNames[selectedClass.role]}
               </span>
               <div className="flex items-end gap-3 mb-1">
                 <h2 className="text-4xl font-serif text-white font-bold">{selectedClass.name}</h2>
                 {hasMultipleImages && <span className="text-xs text-gray-500 mb-2">(Gender Selectable)</span>}
               </div>
               <h3 className={`text-lg italic font-serif mb-6 opacity-80 ${theme.textAccent}`}>"{selectedClass.tagline}"</h3>
               <p className="text-gray-300 leading-relaxed mb-8 border-l-2 border-white/20 pl-4">
                 {selectedClass.description}
               </p>
             </div>

             {/* Radar Chart */}
             <div className="w-full h-64 relative">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                   <PolarGrid stroke="#334155" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                   <Radar
                     name={selectedClass.name}
                     dataKey="A"
                     stroke={selectedRole === 'TANK' ? '#3b82f6' : selectedRole === 'DEALER' ? '#dc2626' : '#FFD700'}
                     strokeWidth={2}
                     fill={selectedRole === 'TANK' ? '#3b82f6' : selectedRole === 'DEALER' ? '#dc2626' : '#FFD700'}
                     fillOpacity={0.3}
                   />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
             
             {/* Weapon Info */}
             <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="text-gray-500">주무기</span>
                <span className={`font-serif ${theme.textAccent}`}>{selectedClass.weapon}</span>
             </div>
          </div>

          {/* Left: Class List (Mobile: Order 3) */}
          <div className="lg:col-span-3 lg:order-1 bg-black/20 p-4 lg:border-r border-t lg:border-t-0 border-white/5 overflow-y-auto max-h-[600px] order-3">
             <div className="flex flex-col gap-2">
               {filteredClasses.map((c) => (
                 <button
                  key={c.id}
                  onClick={() => handleClassClick(c.id)}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all border-l-4
                    ${selectedClassId === c.id 
                      ? `bg-white/10 ${theme.border} text-white ${theme.shadow}` 
                      : 'border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}
                  `}
                 >
                   <span className="block font-serif font-bold text-lg">{c.name}</span>
                   <span className="block text-xs font-sans uppercase tracking-wider opacity-60">{c.weapon}</span>
                 </button>
               ))}
             </div>
          </div>

        </div>

        {/* Final CTA Section */}
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up">
           <p className="font-serif text-xl md:text-3xl text-gray-100 mb-8 tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              "우리에게 당신의 구원의 손길을..."
           </p>
           
           {/* Tricolor Gradient Divider with Tapered Ends (Sharp look) */}
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

export default ClassSystem;