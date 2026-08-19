import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 400, damping: 30 });
  
  const glareX = useSpring(useTransform(x, [0, 1], [100, 0]), { stiffness: 400, damping: 30 });
  const glareY = useSpring(useTransform(y, [0, 1], [100, 0]), { stiffness: 400, damping: 30 });
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });

  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl ${className}`}
    >
      <motion.div
        className="absolute inset-0 z-[100] pointer-events-none rounded-[inherit]"
        style={{
          background,
          opacity: glareOpacity,
        }}
      />
      {children}
    </motion.div>
  );
}
