import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] backdrop-blur-3xl"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 rounded-full border-t-2 border-b-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        />
        
        {/* Inner pulsing orb */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.8)] blur-[2px]"
        />
      </div>
    </motion.div>
  );
}
