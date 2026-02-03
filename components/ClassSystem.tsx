import React, { useState, useEffect, useRef } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { CLASSES } from '../constants';
import { RoleType } from '../types';
import { Shield, Swords, Heart, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface ClassSystemProps {
  selectedRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

// Descriptions for stats based on Role and Level (1-5)
const STAT_DESCRIPTIONS: Record<RoleType, Record<string, string[]>> = {
  TANK: {
    '공격력': [
      "위협 수준이 낮아 어그로 관리에 주의가 필요합니다.",
      "기본적인 견제가 가능한 수준의 무력입니다.",
      "방어태세 속에서도 준수한 반격이 가능합니다.",
      "적의 진형을 붕괴시키는 강력한 한 방이 있습니다.",
      "딜러에 버금가는 파괴력으로 전장을 휩씁니다."
    ],
    '방어력': [
      "방어보다는 체력으로 버티는 스타일입니다.",
      "가벼운 장비로 흘려내는 회피형 탱킹입니다.",
      "균형 잡힌 방어 기제로 안정적인 생존을 보장합니다.",
      "대부분의 공격을 정면에서 받아낼 수 있습니다.",
      "절대 뚫리지 않는 불굴의 요새 그 자체입니다."
    ],
    '지원력': [
      "오직 본인의 생존과 전투에 집중합니다.",
      "위기 시, 인접한 아군 하나를 보호할 수 있습니다.",
      "파티원에게 간헐적으로 방어 효과를 공유합니다.",
      "전선의 아군들을 보호하는 광역 스킬을 보유합니다.",
      "파티 전체의 생존을 책임지는 리더입니다."
    ],
    '기동성': [
      "자리를 지키며 싸우는 부동의 성벽입니다.",
      "느리지만 묵직하게 전진하며 압박합니다.",
      "표준적인 이동 속도로 전장에 합류합니다.",
      "위협적인 적에게 즉시 도약하여 진입합니다.",
      "전장을 종횡무진 누비며 어그로를 장악합니다."
    ],
    '조작 난이도': [
      "단순하고 직관적인 스킬 구성을 가졌습니다.",
      "기본적인 역할 수행이 쉬운 편입니다.",
      "적절한 상황 판단과 스킬 활용이 필요합니다.",
      "정확한 방어 타이밍과 위치 선정이 중요합니다.",
      "극한의 반응속도와 판단력이 요구되는 상급자용입니다."
    ]
  },
  DEALER: {
    '공격력': [
      "지속적인 누적 딜링에 특화되어 있습니다.",
      "평범하지만 안정적인 피해를 입힙니다.",
      "준수한 화력으로 적을 제압합니다.",
      "폭발적인 순간 화력으로 적을 녹여버립니다.",
      "모든 것을 파괴하는 최상위권의 살상력입니다."
    ],
    '방어력': [
      "스치면 사망. 극한의 회피 컨트롤이 필요합니다.",
      "생존기가 부족하여 위치 선정이 중요합니다.",
      "최소한의 생존을 위한 보호막을 가졌습니다.",
      "딜러치고는 단단하여 근접 교전에 유리합니다.",
      "적의 공격을 버티며 맞딜이 가능한 수준입니다."
    ],
    '지원력': [
      "오로지 적을 죽이는 것에만 집중합니다.",
      "적에게 디버프를 걸어 아군을 돕습니다.",
      "파티의 화력을 높이는 시너지를 보유했습니다.",
      "위급 시 아군을 지원할 유틸리티가 있습니다.",
      "공격과 지원이 동시에 가능한 하이브리드입니다."
    ],
    '기동성': [
      "고정 포대처럼 한 자리에서 화력을 투사합니다.",
      "이동기가 적어 신중한 진입이 필요합니다.",
      "치고 빠지는 히트 앤 런이 가능합니다.",
      "화려한 이동기로 적을 교란합니다.",
      "눈으로 쫓을 수 없는 속도로 전장을 지배합니다."
    ],
    '조작 난이도': [
      "입문자도 쉽게 강력한 딜을 낼 수 있습니다.",
      "딜 사이클이 단순하여 운영이 편합니다.",
      "자원 관리와 스킬 연계에 이해가 필요합니다.",
      "복잡한 메커니즘과 빠른 손놀림을 요구합니다.",
      "실수 하나가 딜로스로 이어지는 초고난도 클래스."
    ]
  },
  SUPPORT: {
    '공격력': [
      "전투 능력은 거의 없습니다.",
      "최소한의 호신용 스킬만 보유했습니다.",
      "솔로 플레이가 가능한 정도의 화력입니다.",
      "서브 딜러로서도 손색없는 피해량입니다.",
      "적을 직접 심판하는 전투형 서포터입니다."
    ],
    '방어력': [
      "아군의 보호가 절실히 필요합니다.",
      "스스로를 지키기 위한 보호막이 있습니다.",
      "적절한 생존기로 끈질기게 살아남습니다.",
      "튼튼한 맷집으로 전방 지원이 가능합니다.",
      "탱커 못지않은 생존력으로 전선을 유지합니다."
    ],
    '지원력': [
      "기초적인 버프와 치유를 제공합니다.",
      "단일 대상 케어에 특화되어 있습니다.",
      "공격과 수비 밸런스가 잡힌 지원가입니다.",
      "강력한 버프와 힐로 파티를 캐리합니다.",
      "파티를 불사신으로 만드는 신의 대리인입니다."
    ],
    '기동성': [
      "시전 시간이 길어 움직임이 제한적입니다.",
      "안전한 위치를 잡기 위한 이동기가 있습니다.",
      "아군을 따라다니기에 부족함이 없습니다.",
      "위기에 처한 아군에게 즉시 날아갑니다.",
      "전장 전체를 커버하는 압도적 기동성입니다."
    ],
    '조작 난이도': [
      "힐과 버프만 주면 되는 쉬운 난이도입니다.",
      "아군의 체력바만 잘 보면 됩니다.",
      "적의 패턴을 끊는 센스가 필요합니다.",
      "자원 관리와 버프 타이밍이 핵심입니다.",
      "전황 전체를 읽고 지휘해야 하는 사령관입니다."
    ]
  }
};

const ClassSystem: React.FC<ClassSystemProps> = ({ selectedRole, onRoleChange }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('phantom-blade');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<{ subject: string; value: number; description: string } | null>(null);
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
    setHoveredStat(null); // Reset hover state
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
          textAccent: 'text-blue-400',
          radarFill: '#3b82f6',
          radarStroke: '#3b82f6'
        };
      case 'DEALER': 
        return {
          border: 'border-red-600',
          dot: 'bg-red-600',
          glow: 'bg-red-600',
          shadow: 'shadow-[inset_0_0_20px_rgba(220,38,38,0.3)]',
          textAccent: 'text-red-400',
          radarFill: '#dc2626',
          radarStroke: '#dc2626'
        };
      case 'SUPPORT': 
        return {
          border: 'border-yellow-500',
          dot: 'bg-yellow-400',
          glow: 'bg-yellow-500',
          shadow: 'shadow-[inset_0_0_20px_rgba(234,179,8,0.3)]',
          textAccent: 'text-yellow-400',
          radarFill: '#FFD700',
          radarStroke: '#FFD700'
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

  // Helper to determine level (0-4 index) from stat value (0-100)
  const getLevelIndex = (value: number) => {
    if (value <= 20) return 0;
    if (value <= 40) return 1;
    if (value <= 60) return 2;
    if (value <= 80) return 3;
    return 4; // 81-100
  };

  const getStatDescription = (role: RoleType, subject: string, value: number) => {
    const levelIdx = getLevelIndex(value);
    const descriptions = STAT_DESCRIPTIONS[role][subject];
    return descriptions ? descriptions[levelIdx] : '';
  };

  // Custom Tick Component for interactivity
  const CustomTick = ({ payload, x, y, textAnchor, stroke, radius, ...props }: any) => {
    const dataEntry = radarData.find(d => d.subject === payload.value);
    const value = dataEntry ? dataEntry.A : 0;
    
    // Always use white as requested
    const fillColor = '#ffffff';

    const isHovered = hoveredStat?.subject === payload.value;
    const isMultiLine = payload.value === '조작 난이도';
    
    return (
      <g 
        className="group cursor-help"
        onMouseEnter={() => {
           const desc = getStatDescription(selectedRole, payload.value, value);
           setHoveredStat({ subject: payload.value, value, description: desc });
        }}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <text
          {...props}
          x={x}
          y={y}
          textAnchor={textAnchor}
          stroke="none"
          fill={fillColor}
          className={`text-xs md:text-sm font-bold transition-colors duration-200 ${isHovered ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`}
        >
          {isMultiLine ? (
            <>
              <tspan x={x} dy="-0.4em">조작</tspan>
              <tspan x={x} dy="1.2em">난이도</tspan>
            </>
          ) : (
            payload.value
          )}
        </text>
        {/* Invisible hit area for easier hovering */}
        <rect x={x - 20} y={y - 10} width="40" height="20" fill="transparent" />
      </g>
    );
  };

  const bgLayers = {
    TANK: "bg-gradient-to-b from-midnight via-[#0a1533] to-[#1c3d8a]",    
    DEALER: "bg-gradient-to-b from-midnight via-[#260505] to-[#450a0a]",  
    SUPPORT: "bg-gradient-to-b from-midnight via-[#1f1a05] to-[#423805]"  
  };

  return (
    <section id="class" className="py-24 px-4 md:px-12 relative border-t border-white/5 overflow-hidden">
       {/* Background Layer Container */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-midnight"></div>
          {(['TANK', 'DEALER', 'SUPPORT'] as RoleType[]).map((role) => (
            <div
              key={role}
              className={`
                absolute inset-0 ${bgLayers[role]} 
                transition-opacity duration-[2000ms] ease-in-out will-change-[opacity]
                ${selectedRole === role ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent animate-pulse duration-[4000ms]"></div>
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
          
          {/* Middle: Character Image */}
          <div ref={detailRef} className="lg:col-span-5 lg:order-2 relative flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] group order-1">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
             <div className={`absolute w-[400px] h-[400px] rounded-full filter blur-[80px] opacity-20 z-0 transition-colors duration-1000 ${theme.glow}`}></div>
             
             <div className="relative z-10 w-full h-full flex items-center justify-center">
               <img 
                 key={selectedClass.imageUrls[currentImageIndex]} 
                 src={selectedClass.imageUrls[currentImageIndex]} 
                 alt={selectedClass.name}
                 className="max-h-[500px] w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in-up transition-opacity duration-300"
               />
               
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

          {/* Right: Info & Stats */}
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

             <div className="w-full h-64 relative">
                {/* Info Text Overlay when Hovering */}
               {hoveredStat && (
                 <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-fade-in-up">
                    <div className="bg-midnight/95 backdrop-blur-md p-6 rounded-full border border-white/20 text-center max-w-[280px] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                      <div className={`text-xs font-bold mb-1 uppercase tracking-widest ${theme.textAccent}`}>
                        {hoveredStat.subject} Lv.{getLevelIndex(hoveredStat.value) + 1}
                      </div>
                      <div className="w-8 h-1 mx-auto mb-3 bg-white/20 rounded-full"></div>
                      <p className="text-white text-sm font-medium leading-relaxed break-keep">
                        "{hoveredStat.description}"
                      </p>
                    </div>
                 </div>
               )}
               
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                   <PolarGrid stroke="#334155" />
                   <PolarAngleAxis 
                      dataKey="subject" 
                      tick={<CustomTick />}
                   />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                   <Radar
                     name={selectedClass.name}
                     dataKey="A"
                     stroke={theme.radarStroke}
                     strokeWidth={2}
                     fill={theme.radarFill}
                     fillOpacity={hoveredStat ? 0.1 : 0.3} // Dim when hovering for better text readability
                   />
                 </RadarChart>
               </ResponsiveContainer>
               
               {/* Helper hint */}
               {!hoveredStat && (
                <div className="absolute bottom-0 right-0 text-xs text-gray-600 flex items-center gap-1 opacity-50">
                   <Info size={12} />
                   <span>항목에 마우스를 올려보세요</span>
                </div>
               )}
             </div>
             
             <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                <span className="text-gray-500">주무기</span>
                <span className={`font-serif ${theme.textAccent}`}>{selectedClass.weapon}</span>
             </div>
          </div>

          {/* Left: Class List */}
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
      </div>
    </section>
  );
};

export default ClassSystem;