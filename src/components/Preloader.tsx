import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#0a0b10] flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1, 0.95] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1),_inset_0_1px_1px_rgba(255,255,255,0.2)]"
        />
      </div>
    </motion.div>
  );
}
