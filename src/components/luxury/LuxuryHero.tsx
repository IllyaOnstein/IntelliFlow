import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { BlurText } from './BlurText';

export default function LuxuryHero() {
  return (
    <section className="relative h-[1000px] w-full flex flex-col items-center overflow-hidden bg-black text-white pt-[180px]">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        poster="/images/hero_bg.jpeg"
        className="absolute left-0 w-full h-auto min-h-[1000px] object-cover md:object-contain z-0 top-[10%] md:top-[20%] opacity-80"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/20 z-0 pointer-events-none" />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px] z-0 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[800px] w-full mx-auto">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full p-1 border border-white/10 pl-1 pr-4 inline-flex items-center gap-3 mb-8 shadow-xl"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body-lux uppercase tracking-wider">New</span>
          <span className="text-sm text-white/90 font-body-lux">Introducing AI-powered web design.</span>
        </motion.div>

        {/* Heading */}
        <BlurText 
          text="The Website Your Brand Deserves" 
          className="text-[4rem] sm:text-6xl md:text-7xl lg:text-[7rem] font-heading-lux italic text-white leading-[0.85] tracking-[-2px] md:tracking-[-4px] justify-center mb-6"
          delay={0.1}
        />

        {/* Subtext */}
        <motion.p 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-base md:text-lg text-white/70 font-body-lux font-light leading-relaxed max-w-lg mx-auto mb-10"
        >
          Stunning design. Blazing performance. Built by AI, refined by experts. This is web design, wildly reimagined.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="liquid-glass-strong text-white flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-body-lux font-medium hover:scale-105 active:scale-95 transition-all">
            Get Started <ArrowUpRight className="w-4 h-4 opacity-70" />
          </button>
          <button className="flex items-center gap-3 text-white/80 hover:text-white px-2 py-3 text-sm font-body-lux group transition-colors">
            <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-105">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </span>
            Watch the Film
          </button>
        </motion.div>
      </div>

      {/* Bottom Partners */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 mt-auto pb-12 pt-16 w-full flex flex-col items-center"
      >
        <div className="liquid-glass rounded-full border border-white/10 shadow-lg px-5 py-2 mb-8">
          <span className="text-[10px] uppercase font-body-lux tracking-widest text-white/60">Trusted by the teams behind</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-4">
          {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((partner, i) => (
            <span key={i} className="text-2xl md:text-3xl font-heading-lux italic text-white/50 hover:text-white/90 transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
