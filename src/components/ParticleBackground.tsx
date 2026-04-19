import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // 缓慢优雅的移动
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
        // 主题色：粉桔色与白色交织
        this.color = Math.random() > 0.4 ? 'rgba(255, 180, 168, ' : 'rgba(226, 226, 226, '; 
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.vx *= -1;
        if (this.x > width) this.vx *= -1;
        if (this.y < 0) this.vy *= -1;
        if (this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.7)';
        ctx.fill();
      }
    }

    const init = () => {
      // 在浏览器中获取当前容器的实际宽度，高度适配Hero的 1200px
      canvas.width = window.innerWidth;
      canvas.height = 1200;
      particles = [];
      // 根据屏幕宽度自动调整粒子数量
      const particleCount = Math.min(Math.floor(window.innerWidth / 12), 150);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 粒子靠得足够近时，绘制动态连线 (模拟工作流/神经网络)
          if (distance < 140) {
            ctx.beginPath();
            const opacity = 0.25 - (distance / 560);
            ctx.strokeStyle = `rgba(255, 180, 168, ${opacity > 0 ? opacity : 0})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[1200px] z-0 opacity-80 pointer-events-none"
    />
  );
}
