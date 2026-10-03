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
    // Head 2: Semantic Core (Transformer -> Architecture, Attention, Tensors)
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
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(6); // "attention" by default
  const [selectedHead, setSelectedHead] = useState<number>(2); // Head 2 default
  const [tokenCoords, setTokenCoords] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update token coordinates for drawing bezier attention arcs
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
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-semibold text-white tracking-wider">
            MULTI-HEAD ATTENTION LATTICE
          </span>
          <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
            Softmax(QKᵀ / √dₖ)
          </span>
        </div>

        {/* Head Selector */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setSelectedHead(1)}
            className={`font-mono text-[10px] px-2.5 py-1 rounded transition ${
              selectedHead === 1
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Head 1 (Syntax)
          </button>
          <button
            onClick={() => setSelectedHead(2)}
            className={`font-mono text-[10px] px-2.5 py-1 rounded transition ${
              selectedHead === 2
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Head 2 (Semantic)
          </button>
          <button
            onClick={() => setSelectedHead(3)}
            className={`font-mono text-[10px] px-2.5 py-1 rounded transition ${
              selectedHead === 3
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Head 3 (Locality)
          </button>
        </div>
      </div>

      {/* Interactive Token Sequence */}
      <div
        ref={containerRef}
        className="relative py-6 px-3 bg-black/40 rounded-xl border border-white/5 min-h-[160px] flex flex-col justify-between"
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
                  stroke={weight > 0.3 ? "#06b6d4" : "#f59e0b"}
                  strokeWidth={Math.max(1, weight * 5)}
                  strokeOpacity={Math.min(0.9, weight * 1.8)}
                  strokeDasharray={weight > 0.2 ? "none" : "3,3"}
                  className="transition-all duration-300"
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
                className={`relative px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 border ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/30 scale-105"
                    : isAttended
                    ? "bg-cyan-950/80 text-cyan-200 border-cyan-500/60 shadow-md shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                {token}
                {isActive && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-amber-400 uppercase tracking-widest">
                    QUERY
                  </span>
                )}
                {!isActive && weight >= 0.05 && (
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-400">
                    {(weight * 100).toFixed(0)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Hover Hint */}
        <p className="text-center font-mono text-[10px] text-slate-500 pt-3">
          Hover over any token to recalculate attention weights & dependency arcs in real time.
        </p>
      </div>

      {/* Top Attended Tokens Breakdown */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-black/30 rounded-lg border border-white/5 font-mono text-[11px]">
        <span className="text-slate-400">
          Query: <strong className="text-white">"{TOKENS[activeTokenIdx]}"</strong>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-slate-500">Top-3 Keys:</span>
          {activeWeights
            .map((w, i) => ({ token: TOKENS[i], weight: w, idx: i }))
            .filter((item) => item.idx !== activeTokenIdx)
            .sort((a, b) => b.weight - a.weight)
            .slice(0, 3)
            .map((item) => (
              <span
                key={item.token}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-[10px]"
              >
                <span>{item.token}</span>
                <span className="font-bold text-amber-400">{(item.weight * 100).toFixed(0)}%</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
