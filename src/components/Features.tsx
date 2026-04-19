import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { BlurText } from './luxury/BlurText';
import { HLSVideo } from './luxury/HLSVideo';
import TiltedCard from './TiltedCard';
import DarkVeil from './DarkVeil';

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="py-32 max-w-7xl mx-auto px-8 relative overflow-hidden" id="features">
      {/* Background ambient glow & HLS Cinematic Background & DarkVeil for features */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden rounded-3xl">
        <HLSVideo 
          src="https://d8j0ntlcm91z4.cloudfront.net/master.m3u8"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover grayscale mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 z-0 mix-blend-screen">
          <DarkVeil hueShift={253} speed={1} scanlineIntensity={0.1} scanlineFrequency={2} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-8 group"
        >
          <TiltedCard
            imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBisVqfp63QVuTddtgEFa39dUv4XiG8Bx88gpXjFTLakDWokiDywLJPsQFwBrV_jgxEp8n8_4KDDFJ12XuZtWBgfLrJq-52yJS-3uNsgxaIXIQVMGDvafbfQrpvR9uHAgi0giTOx-wcLjggk0mw1j9vLac8sgd0Q8HJ0h1hQuMB_d7VHLQG7yCjhbv_-GK5MM-IMyQYOvTI_MhkGv5w_n1MIbGxD5C0kOqb8hBhRW32xZL2kIbHtGTJO7WlW1leE5qcnTJSOZyMC4s"
            altText="DAG Editor"
            containerHeight="450px"
            containerWidth="100%"
            imageHeight="450px"
            imageWidth="100%"
            rotateAmplitude={5}
            scaleOnHover={1.02}
            displayOverlayContent={true}
            showTooltip={false}
            overlayContent={
               <div className="liquid-glass-strong rounded-[2rem] p-10 flex flex-col justify-between h-full relative border border-white/10">
                  <div className="relative z-10">
                    <BlurText 
                      text={t('features.dag.title')} 
                      className="text-4xl font-heading-lux italic text-white mb-4 tracking-[-1px]"
                      delay={0.2}
                    />
                    <p className="text-white/70 font-body-lux max-w-md text-lg font-light leading-relaxed">
                      {t('features.dag.desc')}
                    </p>
                  </div>
               </div>
            }
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 bg-white text-black rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group cursor-target"
        >
          {/* Subtle gradient overlay to make black text pop perfectly */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-white/90" />
          
          <div className="relative z-10">
            <BlurText 
              text={t('features.latency.title')} 
              className="text-3xl font-heading-lux italic mb-4 tracking-[-0.5px]"
              delay={0.3}
            />
            <p className="opacity-80 font-body-lux font-medium text-lg leading-relaxed">{t('features.latency.desc')}</p>
          </div>
          <div className="mt-8 flex justify-end relative z-10 transform group-hover:scale-110 transition-transform duration-500 origin-bottom-right">
            <span className="material-symbols-outlined text-6xl opacity-40 text-black" style={{ fontVariationSettings: '"FILL" 1' }}>speed</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-4 liquid-glass rounded-[2rem] p-10 border border-white/10 group hover:bg-white/5 transition-colors cursor-target"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md transform group-hover:-translate-y-2 transition-transform duration-300">
            <span className="material-symbols-outlined text-white">lock</span>
          </div>
          <BlurText 
            text={t('features.encryption.title')} 
            className="text-2xl font-heading-lux italic text-white mb-3"
            delay={0.2}
          />
          <p className="text-white/60 font-body-lux font-light leading-relaxed">{t('features.encryption.desc')}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 liquid-glass rounded-[2rem] p-10 border border-white/10 group hover:bg-white/5 transition-colors cursor-target"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md transform group-hover:-translate-y-2 transition-transform duration-300">
            <span className="material-symbols-outlined text-white">hub</span>
          </div>
          <BlurText 
            text={t('features.integration.title')} 
            className="text-2xl font-heading-lux italic text-white mb-3"
            delay={0.3}
          />
          <p className="text-white/60 font-body-lux font-light leading-relaxed">{t('features.integration.desc')}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-4 liquid-glass rounded-[2rem] p-10 border border-white/10 group hover:bg-white/5 transition-colors cursor-target"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md transform group-hover:-translate-y-2 transition-transform duration-300">
            <span className="material-symbols-outlined text-white">monitoring</span>
          </div>
          <BlurText 
            text={t('features.telemetry.title')} 
            className="text-2xl font-heading-lux italic text-white mb-3"
            delay={0.4}
          />
          <p className="text-white/60 font-body-lux font-light leading-relaxed">{t('features.telemetry.desc')}</p>
        </motion.div>
      </div>
    </section>
  );
}
