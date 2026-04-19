import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useModals } from '../contexts/ModalContext';
import { ArrowUpRight } from 'lucide-react';
import { BlurText } from './luxury/BlurText';
import ParticleBackground from './ParticleBackground';
import FluidRibbonBackground from './FluidRibbonBackground';
import ColorBends from './ColorBends';

export default function Hero() {
  const { t } = useLanguage();
  const { openLoginModal } = useModals();

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-[180px] pb-32 overflow-hidden bg-black text-white">
      {/* Fluid Ribbon Background */}
      <FluidRibbonBackground />

      {/* Interactive Particle Network Background */}
      <ParticleBackground />

      {/* Color Bends Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ColorBends
          colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent={true}
        />
      </div>

      {/* Bottom Fade Gradient into the next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[350px] z-0 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl px-6 w-full flex flex-col items-center">
        {/* Luxury Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-full p-1 border border-white/10 pl-1 pr-4 inline-flex items-center gap-3 mb-8 shadow-xl"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body-lux tracking-wider uppercase">
            New
          </span>
          <span className="text-[0.75rem] sm:text-sm text-white/90 font-body-lux tracking-wide">
            {t('hero.badge')}
          </span>
        </motion.div>
        
        {/* Luxury Blur Heading */}
        <BlurText 
          text={t('hero.title') || "IntelliFlow"} 
          className="text-[3rem] sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter text-white leading-tight justify-center mb-6"
          delay={0.1}
        />
        
        {/* Subtext */}
        <motion.p 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl text-white/70 font-body-lux font-light mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t('hero.desc')}
        </motion.p>
        
        {/* Luxury CTAs */}
        <motion.div 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
        >
          <button 
            onClick={openLoginModal} 
            className="liquid-glass-strong text-white flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-body-lux font-medium hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            {t('hero.start')} <ArrowUpRight className="w-5 h-5 opacity-70" />
          </button>
          <Link 
            to="/docs" 
            className="bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full text-base font-body-lux font-medium transition-all duration-300 hover:scale-105 active:scale-95 inline-block"
          >
            {t('hero.docs')}
          </Link>
        </motion.div>
      </div>

      {/* Hero 3D Mockup Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative w-full max-w-7xl perspective-grid px-8 z-10"
      >
        <div className="relative w-full rotate-3d mx-auto">
          {/* Floating Nodes */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-12 left-[15%] z-20 liquid-glass border border-white/20 rounded-xl px-5 py-4 flex items-center gap-3 shadow-2xl"
          >
            <span className="material-symbols-outlined text-white">table_chart</span>
            <span className="font-body-lux font-semibold text-xs tracking-widest uppercase text-white/90">{t('hero.node1')}</span>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute top-24 -right-4 z-20 liquid-glass border border-white/20 rounded-xl px-5 py-4 flex items-center gap-3 shadow-2xl"
          >
            <span className="material-symbols-outlined text-white">psychology</span>
            <span className="font-body-lux font-semibold text-xs tracking-widest uppercase text-white/90">{t('hero.node2')}</span>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-12 left-1/4 z-20 liquid-glass border border-white/20 rounded-xl px-5 py-4 flex items-center gap-3 shadow-2xl"
          >
            <span className="material-symbols-outlined text-white">api</span>
            <span className="font-body-lux font-semibold text-xs tracking-widest uppercase text-white/90">{t('hero.node3')}</span>
          </motion.div>
          
          {/* Main Mockup Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <img className="w-full h-auto brightness-90 contrast-125" alt="Dashboard visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8DSsv9IUtHMqE3E4MY4jQK9S5yyQsBJ0jzdvBq0KNYgeYSYDns0fzlzOFByvS1byX4qZU_dmXKEwOPyNo8p9BrNfwOmlZJGzJIuh4T4Yq1D-G106wNpqY9nk049jR-rMkgoqVJUsxhCwNue2TUMRuTiiC9y11xO5hbnyihGZTZvxpdvdR_LQx8j-BfwtL-5cVEwt1uXbZYEq9xDWQQOr2rcdvc5RmxxTviBb5-UrTDHJ_pVn2vyA4na8yV3TfhujowZt5m65e0Uc" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
