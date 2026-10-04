import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  showCrosshairs?: boolean;
  cornerTag?: string;
  badge?: React.ReactNode;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(200, 241, 53, 0.12)",
  showCrosshairs = true,
  cornerTag,
  badge,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-white/[0.08] bg-[#0b100b]/75 p-6 backdrop-blur-xl transition-all duration-300 group hover:border-[#c8f135]/35 overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-2xl z-0"
        style={{
          opacity,
          background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 rounded-2xl z-0"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(200, 241, 53, 0.35), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Basement Studio Corner Crosshairs (+) */}
      {showCrosshairs && (
        <>
          <span className="absolute top-1.5 left-2 font-mono text-[9px] text-white/20 select-none group-hover:text-[#c8f135]/50 transition-colors">
            +
          </span>
          <span className="absolute top-1.5 right-2 font-mono text-[9px] text-white/20 select-none group-hover:text-[#c8f135]/50 transition-colors">
            +
          </span>
          <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-white/20 select-none group-hover:text-[#c8f135]/50 transition-colors">
            +
          </span>
          <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-white/20 select-none group-hover:text-[#c8f135]/50 transition-colors">
            +
          </span>
        </>
      )}

      {/* Corner Tag / System Spec */}
      {cornerTag && (
        <div className="absolute top-3 right-4 font-mono text-[10px] tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
          {cornerTag}
        </div>
      )}

      {badge && (
        <div className="absolute top-3 right-4 z-10">
          {badge}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
