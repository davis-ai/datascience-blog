import { useState, useRef, useEffect } from "react";
import { Layers } from "lucide-react";

const TOKENS = [
  "The",
  "transformer",
  "architecture",
  "computes",
  "scaled",
  "dot-product",
  "attention",
  "across",
  "latent",
  "tensors"
];

// Precomputed multi-head attention weight distributions
const ATTENTION_HEADS: Record<number, Record<number, number[]>> = {
  1: {
    // Head 1: Syntactic
    0: [0.1, 0.4, 0.2, 0.1, 0.05, 0.05, 0.05, 0.02, 0.02, 0.01],
    1: [0.05, 0.2, 0.35, 0.15, 0.05, 0.05, 0.08, 0.02, 0.03, 0.02],
    2: [0.02, 0.3, 0.15, 0.25, 0.04, 0.04, 0.1, 0.03, 0.04, 0.03],
    3: [0.03, 0.15, 0.12, 0.1, 0.05, 0.1, 0.3, 0.05, 0.05, 0.05],
    4: [0.01, 0.02, 0.02, 0.05, 0.1, 0.6, 0.15, 0.02, 0.02, 0.01],
    5: [0.01, 0.02, 0.02, 0.05, 0.15, 0.2, 0.45, 0.04, 0.03, 0.03],
    6: [0.02, 0.12, 0.08, 0.18, 0.08, 0.12, 0.25, 0.05, 0.04, 0.06],
    7: [0.01, 0.01, 0.02, 0.04, 0.02, 0.03, 0.15, 0.1, 0.4, 0.22],
    8: [0.01, 0.02, 0.03, 0.03, 0.02, 0.02, 0.12, 0.05, 0.2, 0.5],
    9: [0.02, 0.08, 0.05, 0.05, 0.02, 0.04, 0.18, 0.06, 0.3, 0.2],
  },
  2: {
    // Head 2: Semantic Core
    0: [0.05, 0.3, 0.2, 0.1, 0.05, 0.05, 0.15, 0.03, 0.04, 0.03],
    1: [0.02, 0.15, 0.28, 0.08, 0.04, 0.08, 0.25, 0.02, 0.03, 0.05],
    2: [0.01, 0.25, 0.1, 0.1, 0.04, 0.06, 0.32, 0.02, 0.04, 0.06],
    3: [0.02, 0.1, 0.08, 0.08, 0.06, 0.12, 0.38, 0.04, 0.05, 0.07],
    4: [0.01, 0.03, 0.02, 0.04, 0.1, 0.45, 0.3, 0.02, 0.02, 0.01],
    5: [0.01, 0.04, 0.03, 0.05, 0.15, 0.15, 0.48, 0.03, 0.03, 0.03],
    6: [0.02, 0.22, 0.15, 0.05, 0.05, 0.18, 0.2, 0.03, 0.04, 0.06],
    7: [0.01, 0.02, 0.02, 0.02, 0.01, 0.02, 0.18, 0.12, 0.35, 0.25],
    8: [0.01, 0.05, 0.04, 0.03, 0.02, 0.03, 0.22, 0.05, 0.2, 0.35],
    9: [0.02, 0.18, 0.12, 0.05, 0.03, 0.05, 0.28, 0.04, 0.15, 0.08],
  },
  3: {
    // Head 3: Positional Locality
    0: [0.55, 0.3, 0.1, 0.02, 0.01, 0.01, 0.0, 0.0, 0.0, 0.0],
    1: [0.25, 0.45, 0.22, 0.05, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0],
    2: [0.08, 0.25, 0.42, 0.2, 0.03, 0.01, 0.01, 0.0, 0.0, 0.0],
    3: [0.02, 0.06, 0.25, 0.4, 0.2, 0.05, 0.01, 0.01, 0.0, 0.0],
    4: [0.01, 0.02, 0.05, 0.22, 0.45, 0.22, 0.02, 0.01, 0.0, 0.0],
    5: [0.0, 0.01, 0.02, 0.06, 0.24, 0.42, 0.2, 0.04, 0.01, 0.0],
    6: [0.0, 0.0, 0.01, 0.03, 0.08, 0.25, 0.4, 0.18, 0.04, 0.01],
    7: [0.0, 0.0, 0.0, 0.01, 0.03, 0.06, 0.22, 0.42, 0.22, 0.04],
    8: [0.0, 0.0, 0.0, 0.0, 0.01, 0.03, 0.08, 0.28, 0.42, 0.18],
    9: [0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.04, 0.12, 0.35, 0.48],
  },
};

export default function AttentionVisualizer() {
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(6); // "attention"
  const [selectedHead, setSelectedHead] = useState<number>(2);
  const [tokenCoords, setTokenCoords] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const updateCoords = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const coords = tokenRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });
      setTokenCoords(coords);
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  const activeWeights = ATTENTION_HEADS[selectedHead][activeTokenIdx] || [];

  return (
    <div className="w-full space-y-4">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-[#85858b]" />
          <span className="text-xs font-medium text-[#ededed]">
            Multi-head attention weights
          </span>
          <span className="font-mono text-[10px] text-[#85858b] bg-[#141415] border border-white/[0.08] px-2 py-0.5 rounded">
            Softmax(QKᵀ / √dₖ)
          </span>
        </div>

        {/* Head Selector */}
        <div className="flex items-center gap-1 bg-[#141415] p-1 rounded-md border border-white/[0.08]">
          <button
            onClick={() => setSelectedHead(1)}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
              selectedHead === 1
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            Head 1 (Syntax)
          </button>
          <button
            onClick={() => setSelectedHead(2)}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
              selectedHead === 2
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            Head 2 (Semantic)
          </button>
          <button
            onClick={() => setSelectedHead(3)}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
              selectedHead === 3
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            Head 3 (Locality)
          </button>
        </div>
      </div>

      {/* Interactive Token Sequence */}
      <div
        ref={containerRef}
        className="relative py-6 px-3 bg-[#141415] rounded-lg border border-white/[0.08] min-h-[160px] flex flex-col justify-between"
      >
        {/* SVG Bezier Curves for Attention Arcs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {tokenCoords.length === TOKENS.length &&
            activeWeights.map((weight, targetIdx) => {
              if (weight < 0.05 || targetIdx === activeTokenIdx) return null;
              const source = tokenCoords[activeTokenIdx];
              const target = tokenCoords[targetIdx];
              if (!source || !target) return null;

              const midX = (source.x + target.x) / 2;
              const distance = Math.abs(source.x - target.x);
              const arcHeight = Math.min(50, distance * 0.35);
              const controlY = Math.min(source.y, target.y) - arcHeight;

              return (
                <path
                  key={`arc-${targetIdx}`}
                  d={`M ${source.x} ${source.y - 12} Q ${midX} ${controlY} ${target.x} ${target.y - 12}`}
                  fill="none"
                  stroke="#4cc38a"
                  strokeWidth={Math.max(1, weight * 4)}
                  strokeOpacity={Math.min(0.85, Math.max(0.2, weight * 1.8))}
                  strokeDasharray={weight > 0.2 ? "none" : "3,3"}
                  className="transition-all duration-200"
                />
              );
            })}
        </svg>

        {/* Tokens list */}
        <div className="flex flex-wrap gap-2 justify-center relative z-10 pt-8 pb-2">
          {TOKENS.map((token, idx) => {
            const isActive = idx === activeTokenIdx;
            const weight = activeWeights[idx] ?? 0;
            const isAttended = !isActive && weight >= 0.15;

            return (
              <button
                key={token}
                ref={(el) => {
                  tokenRefs.current[idx] = el;
                }}
                onMouseEnter={() => setActiveTokenIdx(idx)}
                className={`relative px-2.5 py-1 rounded-md font-mono text-xs transition-colors border ${
                  isActive
                    ? "bg-[#232325] text-[#ededed] font-medium border-[#4cc38a]"
                    : isAttended
                    ? "bg-[#19191b] text-[#4cc38a] border-white/[0.12]"
                    : "bg-[#19191b] text-[#a1a1a6] border-white/[0.06] hover:border-white/[0.14] hover:text-[#ededed]"
                }`}
              >
                {token}
                {isActive && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#4cc38a]">
                    query
                  </span>
                )}
                {!isActive && weight >= 0.05 && (
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#85858b]">
                    {(weight * 100).toFixed(0)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-center font-mono text-[11px] text-[#85858b] pt-3">
          Hover over a token to inspect projected attention weights
        </p>
      </div>

      {/* Top Attended Tokens Breakdown */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#141415] rounded-lg border border-white/[0.08] font-mono text-xs">
        <span className="text-[#85858b]">
          Selected query: <strong className="text-[#ededed] font-medium">"{TOKENS[activeTokenIdx]}"</strong>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[#85858b]">Highest attention:</span>
          {activeWeights
            .map((w, i) => ({ token: TOKENS[i], weight: w, idx: i }))
            .filter((item) => item.idx !== activeTokenIdx)
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 3)
            .map((item) => (
              <span
                key={item.token}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#19191b] text-[#ededed] border border-white/[0.08] text-[11px]"
              >
                <span>{item.token}</span>
                <span className="text-[#4cc38a] font-medium">{(item.weight * 100).toFixed(0)}%</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
