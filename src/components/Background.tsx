import { motion } from 'motion/react';

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 80, -80, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -60, 60, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, -50, 0],
          y: [0, -35, 35, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-indigo-900/15 rounded-full blur-[100px]"
      />
    </div>
  );
}
