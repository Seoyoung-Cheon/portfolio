import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 불꽃놀이 구현
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff6633", "#66ccff", "#66ffcc", "#eeeeee"];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
      decay: number;
      size: number;
    }> = [];

    function createFirework(x: number, y: number) {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 3 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          decay: Math.random() * 0.02 + 0.02,
          size: Math.random() * 3 + 2,
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      // 배경을 투명하게 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 파티클 업데이트
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // 중력
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(animate);
    }

    animate();

    // 주기적으로 불꽃놀이 생성
    const interval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.5) + canvas.height * 0.2;
      createFirework(x, y);
    }, 500);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        margin: 0, 
        padding: 0, 
        width: "100vw", 
        backgroundImage: "url('/main_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, width: "100%", height: "100%" }}
      />
      <div className="note" style={{ zIndex: 10, position: "relative", width: "100%" }}>
        <div>안녕하세요</div>
        <div>신입 <span className="wavy-underline">프론트엔드 개발자</span> <span style={{ color: '#ff6633' }}>천서영</span>입니다</div>
      </div>
    </section>
  );
}
