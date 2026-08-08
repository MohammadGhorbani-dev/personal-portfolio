import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <main id="home" className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-6 pt-24 pb-12">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center max-w-3xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <span>{t('hero.badge')}</span>
            <span className="text-base">👋</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Sub-headline */}
        <motion.h2 
          variants={itemVariants}
          className="text-xl sm:text-2xl font-medium text-white/60 mb-6 tracking-wide"
        >
          {t('hero.subtitle')}
        </motion.h2>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {t('hero.desc')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full flex-wrap">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium text-center transition-colors hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            {t('hero.cta.explore')}
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-center font-medium transition-colors hover:bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          >
            {t('hero.cta.touch')}
          </motion.a>

          <motion.a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-medium transition-colors hover:bg-white/5 hover:border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          >
            <Download size={18} />
            {t('hero.cta.cv')}
          </motion.a>
        </motion.div>
      </motion.section>
    </main>
  );
}
