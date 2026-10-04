import { useEffect, useRef } from "react";

interface ShaderCanvasProps {
  className?: string;
  interactive?: boolean;
}

export default function ShaderCanvas({
  className = "",
  interactive = true,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width * 0.45,
      y: height * 0.48,
      targetX: width * 0.45,
      targetY: height * 0.48,
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
      mouse.targetX = width * 0.45;
      mouse.targetY = height * 0.48;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseleave", handleMouseLeave);
    }

    // Energy stream filaments
    const numRibbons = 24;
    const ribbons = Array.from({ length: numRibbons }, (_, i) => {
      const progress = i / numRibbons;
      return {
        id: i,
        offsetPhase: progress * Math.PI * 2,
        speedMultiplier: 0.7 + Math.random() * 0.6,
        amplitude: 40 + Math.random() * 70,
        thickness: 0.8 + Math.random() * 1.6,
        alpha: 0.12 + Math.random() * 0.28,
        colorHue: 78 + Math.random() * 18, // 78 = lime yellow, 96 = lime green
        spreadY: (progress - 0.5) * 160,
      };
    });

    // Luminous floating sparks/dust
    const sparkCount = 40;
    const sparks = Array.from({ length: sparkCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.2) * 0.6,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: 0.02 + Math.random() * 0.04,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep ambient dark glow background
      const focalX = mouse.x;
      const focalY = mouse.y;

      // Focal light bloom (electric lime / emerald glow core)
      const coreGlow = ctx.createRadialGradient(
        focalX,
        focalY,
        0,
        focalX,
        focalY,
        width * 0.45
      );
      coreGlow.addColorStop(0, "rgba(200, 241, 53, 0.16)"); // Lime core
      coreGlow.addColorStop(0.25, "rgba(132, 204, 22, 0.07)");
      coreGlow.addColorStop(0.55, "rgba(16, 185, 129, 0.03)");
      coreGlow.addColorStop(1, "rgba(5, 7, 5, 0)");

      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, width, height);

      // Secondary ambient glow top right
      const secondaryGlow = ctx.createRadialGradient(
        width * 0.85,
        height * 0.2,
        0,
        width * 0.85,
        height * 0.2,
        width * 0.35
      );
      secondaryGlow.addColorStop(0, "rgba(163, 230, 53, 0.06)");
      secondaryGlow.addColorStop(0.6, "rgba(6, 78, 59, 0.02)");
      secondaryGlow.addColorStop(1, "rgba(5, 7, 5, 0)");

      ctx.fillStyle = secondaryGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. High-Energy Flowing Light Stream / Aurora Beams
      // Draw bezier ribbons spanning across the screen through the focal point
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < ribbons.length; i++) {
        const r = ribbons[i];
        const t = time * r.speedMultiplier + r.offsetPhase;

        // Path coordinates: start on left, sweep into focal aura, flare out to top/bottom right
        const startX = -50;
        const startY = height * 0.65 + Math.sin(t * 0.8) * 60 + r.spreadY * 0.6;

        // Control point 1: curving towards focal node
        const cp1x = focalX * 0.5 + Math.cos(t * 0.6) * 40;
        const cp1y = startY + (focalY - startY) * 0.4 + Math.sin(t * 1.1) * r.amplitude * 0.4;

        // Anchor near focal point (pinch point)
        const pinchX = focalX + Math.sin(t * 0.9) * 20;
        const pinchY = focalY + r.spreadY * 0.25 + Math.cos(t * 0.7) * 15;

        // Control point 2: accelerating outwards to top-right
        const cp2x = focalX + (width - focalX) * 0.45 + Math.cos(t * 0.5) * 60;
        const cp2y = focalY + (height * 0.15 - focalY) * 0.6 + Math.sin(t * 0.8) * r.amplitude;

        // End point: sweeping out off screen right
        const endX = width + 80;
        const endY = height * 0.15 + r.spreadY * 1.8 + Math.sin(t * 0.7) * 80;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, pinchX - 60, pinchY, pinchX, pinchY);
        ctx.bezierCurveTo(pinchX + 70, pinchY, cp2x, cp2y, endX, endY);

        // Gradient stroke from subtle lime to bright core to fading green
        const streamGrad = ctx.createLinearGradient(startX, startY, endX, endY);
        streamGrad.addColorStop(0, `hsla(${r.colorHue}, 90%, 65%, 0)`);
        streamGrad.addColorStop(0.35, `hsla(${r.colorHue}, 95%, 60%, ${r.alpha * 0.7})`);
        streamGrad.addColorStop(0.48, `hsla(${r.colorHue + 10}, 100%, 75%, ${Math.min(0.9, r.alpha * 1.8)})`); // Intense highlight near core
        streamGrad.addColorStop(0.7, `hsla(${r.colorHue - 10}, 90%, 55%, ${r.alpha * 0.8})`);
        streamGrad.addColorStop(1, `hsla(${r.colorHue}, 85%, 50%, 0)`);

        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = r.thickness;
        ctx.shadowColor = `hsl(${r.colorHue}, 100%, 60%)`;
        ctx.shadowBlur = i % 3 === 0 ? 16 : 6;
        ctx.stroke();
      }

      ctx.restore();

      // 3. Focal Convergence Light Vortex Ring
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const ringPulse = Math.sin(time * 2.5) * 4;
      const ringRadius = 24 + ringPulse;

      const ringGrad = ctx.createRadialGradient(
        focalX,
        focalY,
        ringRadius * 0.3,
        focalX,
        focalY,
        ringRadius * 2
      );
      ringGrad.addColorStop(0, "rgba(225, 255, 100, 0.45)");
      ringGrad.addColorStop(0.4, "rgba(200, 241, 53, 0.2)");
      ringGrad.addColorStop(1, "rgba(200, 241, 53, 0)");

      ctx.fillStyle = ringGrad;
      ctx.beginPath();
      ctx.arc(focalX, focalY, ringRadius * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Subtle ambient sparks floating in the vortex
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.pulsePhase += s.pulseSpeed;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const currentAlpha = s.alpha * (0.6 + Math.sin(s.pulsePhase) * 0.4);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 255, 60, ${currentAlpha})`;
        ctx.shadowColor = "#c8f135";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();

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
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
