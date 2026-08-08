import { motion } from 'motion/react';

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 250, -200, 150, 0],
          y: [0, -180, 220, -120, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/40 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1.2, 0.9, 1],
          x: [0, -220, 180, -200, 0],
          y: [0, 250, -190, 170, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/30 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 0.8, 1.1, 1],
          x: [0, 180, -210, 190, 0],
          y: [0, -220, 160, -180, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-fuchsia-900/20 rounded-full blur-[130px]"
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1.2, 1.05, 1],
          x: [0, -190, 210, -170, 0],
          y: [0, 180, -200, 160, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] left-[-10%] w-[35vw] h-[35vw] bg-blue-950/40 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1.2, 1],
          x: [0, 230, -190, 210, 0],
          y: [0, -170, 220, -190, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-indigo-900/30 rounded-full blur-[110px]"
      />
    </div>
  );
}
