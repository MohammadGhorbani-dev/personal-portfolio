import { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

const FRAME_COUNT = 100;

export default function CanvasScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const src = `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
      img.src = src;
      
      img.onload = () => {
        // Initial draw if it's the first frame
        if (i === 0 && canvasRef.current) {
          renderFrame(0);
        }
      };
      
      loadedImages.push(img);
    }
    
    imagesRef.current = loadedImages;
    
    // Handle resize to keep the canvas resolution sharp and covered
    const handleResize = () => {
      renderFrame(Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(scrollYProgress.get() * FRAME_COUNT))
      ));
    };
    
    window.addEventListener('resize', handleResize);
    // Trigger initial resize to set canvas dimensions
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Match canvas internal resolution to display size for crispness
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Object-cover calculation
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0a]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-80 transform-gpu will-change-transform backface-visibility-hidden"
      />
    </div>
  );
}
