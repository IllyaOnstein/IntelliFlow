import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LuxuryNavbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6 lg:px-16 py-3 flex justify-between items-center pointer-events-none">
      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-md pointer-events-auto border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <span className="text-white font-heading-lux italic text-2xl pr-1 pt-1 leading-none">IF</span>
      </div>
      
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1 pointer-events-auto">
        <Link to="/" className="px-4 py-2 text-sm font-medium text-white/90 font-body-lux hover:text-white transition-colors">Home</Link>
        <a href="#services" className="px-4 py-2 text-sm font-medium text-white/90 font-body-lux hover:text-white transition-colors">Services</a>
        <a href="#work" className="px-4 py-2 text-sm font-medium text-white/90 font-body-lux hover:text-white transition-colors">Work</a>
        <a href="#process" className="px-4 py-2 text-sm font-medium text-white/90 font-body-lux hover:text-white transition-colors">Process</a>
        <a href="#pricing" className="px-4 py-2 text-sm font-medium text-white/90 font-body-lux hover:text-white transition-colors">Pricing</a>
      </div>

      <div className="pointer-events-auto">
        <button className="bg-white hover:bg-white/90 text-black flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-body-lux font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg">
          Get Started <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
