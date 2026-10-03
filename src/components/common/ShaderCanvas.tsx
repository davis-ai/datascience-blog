import { useEffect, useRef } from "react";

interface ShaderCanvasProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

export default function ShaderCanvas({
  className = "",
  particleCount = 50,
  interactive = true,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseleave", handleMouseLeave);
    }

    // Particles representing neural weights & gradient vectors
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? "rgba(245, 158, 11, " : Math.random() > 0.3 ? "rgba(6, 182, 212, " : "rgba(16, 185, 129, ",
      alpha: Math.random() * 0.5 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
    }));

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Organic Mesh Gradients (inspired by shadergradient.co)
      const gradient1 = ctx.createRadialGradient(
        mouse.x * 0.4 + width * 0.2,
        Math.sin(time) * 80 + height * 0.3,
        10,
        mouse.x * 0.4 + width * 0.2,
        Math.sin(time) * 80 + height * 0.3,
        width * 0.55
      );
      gradient1.addColorStop(0, "rgba(245, 158, 11, 0.06)"); // Amber core
      gradient1.addColorStop(0.5, "rgba(217, 119, 6, 0.02)");
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0)");

      const gradient2 = ctx.createRadialGradient(
        width * 0.8 - Math.cos(time * 0.8) * 100,
        height * 0.6 + Math.sin(time * 0.6) * 120,
        20,
        width * 0.8,
        height * 0.6,
        width * 0.6
      );
      gradient2.addColorStop(0, "rgba(6, 182, 212, 0.05)"); // Cyan glow
      gradient2.addColorStop(0.6, "rgba(14, 165, 233, 0.015)");
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)");

      const gradient3 = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.5) * 150,
        height * 0.85,
        10,
        width * 0.5,
        height * 0.85,
        width * 0.5
      );
      gradient3.addColorStop(0, "rgba(16, 185, 129, 0.035)"); // Emerald accent
      gradient3.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      // 2. Connective Neural Mesh / Lattice
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around bounds
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Mouse gravity pull (subtle)
        if (mouse.isHovered) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220 && dist > 10) {
            p1.x += (dx / dist) * 0.3;
            p1.y += (dy / dist) * 0.3;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [particleCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
