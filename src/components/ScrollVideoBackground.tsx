import { useRef } from 'react';
import { useScroll, useSpring, useMotionValueEvent } from 'motion/react';

export default function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 120,
    mass: 0.5
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      requestAnimationFrame(() => {
        if (videoRef.current && isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
          videoRef.current.currentTime = latest * videoRef.current.duration;
        }
      });
    }
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <video
        ref={videoRef}
        src="/hero-3d.mp4"
        muted
        playsInline
        preload="auto"
        className="object-cover w-full h-full opacity-100"
        style={{ willChange: 'opacity, transform' }}
      />
    </div>
  );
}
