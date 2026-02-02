import React, { useState } from 'react';
import Hero from './components/Hero';
import WorldInfo from './components/WorldInfo';
import ClassSystem from './components/ClassSystem';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import StarryBackground from './components/StarryBackground';
import { RoleType } from './types';

function App() {
  const [currentRole, setCurrentRole] = useState<RoleType>('DEALER');

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-gold selection:text-midnight relative">
      <StarryBackground role={currentRole} />
      <Hero />
      <WorldInfo />
      <ClassSystem selectedRole={currentRole} onRoleChange={setCurrentRole} />
      <Footer />
      <Navigation />
    </div>
  );
}

export default App;