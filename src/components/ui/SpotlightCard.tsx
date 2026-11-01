import React from "react";

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
  cornerTag,
  badge,
  // Accepted for interface compatibility but retired in unslop
  spotlightColor: _spotlightColor,
  showCrosshairs: _showCrosshairs,
  ...props
}: SpotlightCardProps) {
  return (
    <div
      className={`relative rounded-xl border border-white/[0.08] bg-[#19191b] p-6 transition-colors duration-150 hover:border-white/[0.14] ${className}`}
      {...props}
    >
      {/* Corner Tag / System Spec (quiet and calm) */}
      {cornerTag && (
        <div className="absolute top-4 right-4 font-mono text-[11px] text-[#85858b]">
          {cornerTag}
        </div>
      )}

      {badge && (
        <div className="absolute top-4 right-4 z-10">
          {badge}
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
