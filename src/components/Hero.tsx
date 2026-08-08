import { motion } from 'motion/react';

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
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-6 pt-24 pb-12">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center max-w-3xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <span>Hello, World!</span>
            <span className="text-base">👋</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          I'm Mohamad Ghorbani
        </motion.h1>

        {/* Sub-headline */}
        <motion.h2 
          variants={itemVariants}
          className="text-xl sm:text-2xl font-medium text-white/60 mb-6 tracking-wide"
        >
          Computer Engineering Student & Web Developer
        </motion.h2>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Passionate about crafting clean, modern, and high-performance digital experiences. 
          Always exploring new technologies to build the future of the web.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium transition-colors hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Explore My Work
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium transition-colors hover:bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.section>
    </main>
  );
}
