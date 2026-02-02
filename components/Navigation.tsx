import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: '아르카디아' },
  { id: 'world', label: '아르카디아의 세계' },
  { id: 'class', label: '운명을 선택하라' },
];

const Navigation: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // 섹션이 30% 보일 때 감지
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 block">
      <div className="flex flex-col gap-4 lg:gap-6 items-end">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`
              group flex items-center gap-2 transition-all duration-300
              ${activeId === section.id ? 'text-gold' : 'text-gray-500 hover:text-white'}
            `}
          >
            <span className={`
              font-serif text-[10px] lg:text-sm tracking-widest uppercase transition-all duration-300
              ${activeId === section.id 
                ? 'border-b border-gold pb-1 opacity-100' 
                : 'border-b border-transparent pb-1 opacity-70 group-hover:opacity-100 hidden md:block'}
            `}>
              {section.label}
            </span>
            <div className={`
              w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300
              ${activeId === section.id ? 'bg-gold scale-125' : 'bg-gray-600 group-hover:bg-white'}
            `} />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;