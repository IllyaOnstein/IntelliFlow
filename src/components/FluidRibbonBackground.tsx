import React, { useEffect, useRef } from 'react';

export default function FluidRibbonBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 bg-[#0a0a0a]"
      />
      <div 
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-60 mix-blend-screen animate-blob filter blur-[120px] bg-purple-900/40"
      />
      <div 
        className="absolute top-[10%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-60 mix-blend-screen animate-blob animation-delay-2000 filter blur-[120px] bg-blue-900/30"
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full opacity-60 mix-blend-screen animate-blob animation-delay-4000 filter blur-[120px] bg-indigo-900/30"
      />
    </div>
  );
}
