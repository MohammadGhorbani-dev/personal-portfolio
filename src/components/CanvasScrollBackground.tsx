import { useEffect, useRef } from "react";
import { useScroll } from "motion/react";

const FRAME_COUNT = 150;
const MAX_PENDING_FRAMES = 2;
const MAX_CACHED_FRAMES = 12;

function framePath(index: number) {
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

function ScrollFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const element = canvasRef.current;
    const drawingContext = element?.getContext("2d");
    if (!element || !drawingContext) return;
    const canvas = element;
    const context = drawingContext;

    const frames = new Map<number, HTMLImageElement>();
    const pending = new Map<number, HTMLImageElement>();
    const unavailable = new Set<number>();
    let displayed: HTMLImageElement | undefined;
    let animationFrame: number | null = null;

    function schedule() {
      if (animationFrame === null) animationFrame = requestAnimationFrame(update);
    }

    function load(index: number) {
      if (
        pending.size >= MAX_PENDING_FRAMES ||
        pending.has(index) ||
        frames.has(index) ||
        unavailable.has(index)
      ) return;

      const image = new Image();
      pending.set(index, image);
      image.onload = () => {
        pending.delete(index);
        frames.set(index, image);
        if (frames.size > MAX_CACHED_FRAMES) {
          const oldest = frames.keys().next();
          if (!oldest.done) frames.delete(oldest.value);
        }
        schedule();
      };
      image.onerror = () => {
        pending.delete(index);
        unavailable.add(index);
        schedule();
      };
      image.src = framePath(index);
    }

    function update() {
      animationFrame = null;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const resized = canvas.width !== width || canvas.height !== height;
      if (resized) {
        canvas.width = width;
        canvas.height = height;
      }

      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(scrollYProgress.get() * FRAME_COUNT)),
      );
      if (index === 0) {
        if (displayed) context.clearRect(0, 0, width, height);
        displayed = undefined;
        return;
      }

      load(index);
      if (index + 1 < FRAME_COUNT) load(index + 1);

      const image = frames.get(index) ?? displayed;
      if (!image || (!resized && image === displayed)) return;

      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      displayed = image;
    }

    const unsubscribe = scrollYProgress.on("change", schedule);
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      unsubscribe();
      window.removeEventListener("resize", schedule);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      for (const image of pending.values()) {
        image.onload = null;
        image.onerror = null;
      }
    };
  }, [scrollYProgress]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export default function CanvasScrollBackground({ animate }: { animate: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[#0a0a0a]">
      <div className="absolute inset-0 opacity-80">
        <img src={framePath(0)} alt="" className="h-full w-full object-cover" />
        {animate && <ScrollFrames />}
      </div>
    </div>
  );
}
