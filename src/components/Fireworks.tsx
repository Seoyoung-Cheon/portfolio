import { useEffect, useRef } from "react";
import { FireworksEngine } from "@/lib/fireworks/fireworks";
import { Stage } from "@/lib/fireworks/utils";

export default function Fireworks() {
  const trailsCanvasRef = useRef<HTMLCanvasElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FireworksEngine | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!trailsCanvasRef.current || !mainCanvasRef.current) return;

    const trailsStage = new Stage(trailsCanvasRef.current);
    const mainStage = new Stage(mainCanvasRef.current);
    const engine = new FireworksEngine();
    engineRef.current = engine;

    // Resize handler - use full window size
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const containerW = Math.min(w, 7680);
      const containerH = Math.min(h, 4320);
      trailsStage.resize(containerW, containerH);
      mainStage.resize(containerW, containerH);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Launch initial fireworks
    const launchFirework = () => {
      const x = Math.random() * 0.6 + 0.2; // 20% to 80% of screen width
      const y = window.innerHeight;
      const burstY = window.innerHeight * (0.3 + Math.random() * 0.3);
      // Shell sizes: 0=3", 1=4", 2=6", 3=8", 4=12", 5=16"
      const shellSize = Math.random() < 0.3 ? 3 : Math.random() < 0.5 ? 2 : Math.random() < 0.7 ? 1 : 0;
      
      engine.launchShell(x * mainStage.width, y, burstY, shellSize);
    };

    // Auto-launch fireworks - more frequent
    const launchInterval = setInterval(() => {
      if (Math.random() < 0.85) {
        launchFirework();
      }
    }, 1500);

    // Initial fireworks - more of them
    setTimeout(() => {
      launchFirework();
      setTimeout(launchFirework, 300);
      setTimeout(launchFirework, 600);
      setTimeout(launchFirework, 900);
      setTimeout(launchFirework, 1200);
    }, 500);

    // Animation loop
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const timeStep = Math.min(deltaTime, 50); // Cap at 50ms
      const speed = 1;

      engine.update(timeStep, speed);
      engine.render(
        mainStage.ctx,
        trailsStage.ctx,
        mainStage.width,
        mainStage.height,
        speed
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(launchInterval);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ 
        zIndex: 0,
        mixBlendMode: 'lighten'
      }}
    >
      <canvas
        id="trails-canvas"
        ref={trailsCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'lighten' }}
      />
      <canvas
        id="main-canvas"
        ref={mainCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'lighten' }}
      />
    </div>
  );
}
