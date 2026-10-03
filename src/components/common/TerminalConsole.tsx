import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Trash2, Sparkles } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string;
}

const INITIAL_LINES: TerminalLine[] = [
  { id: "1", type: "system", text: "DAVIS_OS v2.6.4 (x86_64-linux-gnu / CUDA 12.4)" },
  { id: "2", type: "system", text: "Cluster status: 4x NVIDIA A100-SXM4 (HEALTHY) • Triton Server: ACTIVE" },
  { id: "3", type: "output", text: "Type 'help' or tap any command below to explore system architecture." },
];

export default function TerminalConsole() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputValue, setInputValue] = useState("");
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim().toLowerCase();
    if (!raw) return;

    const inputLine: TerminalLine = {
      id: Math.random().toString(),
      type: "input",
      text: `davis@cluster:~$ ${cmdText}`,
    };

    let responseLines: TerminalLine[] = [];

    switch (raw) {
      case "help":
      case "?":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "Available commands:" },
          { id: Math.random().toString(), type: "output", text: "  status      - Display real-time cluster health, latency & uptime" },
          { id: Math.random().toString(), type: "output", text: "  benchmark   - Execute live simulated LLM throughput test" },
          { id: Math.random().toString(), type: "output", text: "  models      - List production-grade deployed architectures" },
          { id: Math.random().toString(), type: "output", text: "  stack       - Print core machine learning & infrastructure stack" },
          { id: Math.random().toString(), type: "output", text: "  bio         - Print Davis Ochieng engineering profile" },
          { id: Math.random().toString(), type: "output", text: "  clear       - Reset terminal buffer" },
        ];
        break;

      case "status":
        responseLines = [
          { id: Math.random().toString(), type: "system", text: "── SYSTEM TELEMETRY REPORT ──────────────────────────" },
          { id: Math.random().toString(), type: "output", text: "• UPTIME: 99.98% over last 180 days" },
          { id: Math.random().toString(), type: "output", text: "• P99 INFERENCE LATENCY: 12.8ms (Sub-15ms Target: PASS)" },
          { id: Math.random().toString(), type: "output", text: "• GPU CLUSTER: 4x A100-SXM4 (80GB VRAM / Node)" },
          { id: Math.random().toString(), type: "output", text: "• ACCELERATION: TensorRT 10.0 + FlashAttention-2 + AWQ" },
          { id: Math.random().toString(), type: "output", text: "• LOCATION: Nairobi, Kenya [EAT / UTC+3]" },
          { id: Math.random().toString(), type: "output", text: "• CONTRACT / ADVISORY: AVAILABLE FOR SELECT ENGAGEMENTS" },
        ];
        break;

      case "benchmark":
        setIsBenchmarking(true);
        responseLines = [
          { id: Math.random().toString(), type: "system", text: "[BENCHMARK INITIATED] Model: Llama-3-8B-Instruct (4-Bit AWQ)..." },
          { id: Math.random().toString(), type: "output", text: "Warmup phase: 128 tokens processed in 0.89s (143.8 tok/s)" },
          { id: Math.random().toString(), type: "output", text: "Context Window: 8,192 tokens | Batch Size: 16" },
          { id: Math.random().toString(), type: "output", text: "Throughput: 142.1 tokens/sec | VRAM: 5.2GB / 80GB (6.5%)" },
          { id: Math.random().toString(), type: "output", text: "P95 TTFT (Time to First Token): 18.2ms" },
          { id: Math.random().toString(), type: "output", text: "✔ Status: High-throughput benchmark completed with 0 dropped frames." },
        ];
        setTimeout(() => setIsBenchmarking(false), 800);
        break;

      case "models":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "1. Llama-3-8B QLoRA Adapter (Legal/Financial fine-tune, r=16, α=32)" },
          { id: Math.random().toString(), type: "output", text: "2. 3D Medical U-Net (Volumetric brain MRI segmentation, Dice=0.912)" },
          { id: Math.random().toString(), type: "output", text: "3. Real-Time Fraud Classifier (XGBoost + SHAP, <3ms p99 latency)" },
          { id: Math.random().toString(), type: "output", text: "4. Multimodal CLIP Vision Embedder (10M vector search via Qdrant)" },
        ];
        break;

      case "stack":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "CORE: Python 3.12, PyTorch 2.5, C++, CUDA, Triton" },
          { id: Math.random().toString(), type: "output", text: "ML / DEEP LEARNING: HuggingFace, PEFT, LoRA/QLoRA, vLLM, TensorRT" },
          { id: Math.random().toString(), type: "output", text: "DATA & SERVING: FastAPI, Apache Kafka, Redis, Polars, Docker, K8s" },
          { id: Math.random().toString(), type: "output", text: "FRONTEND / UI: React 19, TypeScript, Tailwind CSS, WebGL" },
        ];
        break;

      case "bio":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "Davis Ochieng is a Data Scientist and Machine Learning Systems Engineer." },
          { id: Math.random().toString(), type: "output", text: "Passionate about making deep learning reliable, explainable, and lightning-fast in production." },
          { id: Math.random().toString(), type: "output", text: "First Class Honours in Computer Science; AWS Certified ML Specialist." },
        ];
        break;

      case "clear":
        setLines([]);
        setInputValue("");
        return;

      default:
        responseLines = [
          {
            id: Math.random().toString(),
            type: "error",
            text: `command not found: "${cmdText}". Type 'help' for available commands.`,
          },
        ];
        break;
    }

    setLines((prev) => [...prev, inputLine, ...responseLines]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  return (
    <div className="w-full bg-[#080d16] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-mono text-xs flex flex-col">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-[#0c121e] border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600" />
          <span className="ml-2 text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            davis@cluster-node-01: ~ (bash)
          </span>
        </div>

        <button
          onClick={() => setLines([])}
          className="text-slate-500 hover:text-slate-300 p-1 rounded transition"
          title="Clear Terminal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 space-y-2 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`leading-relaxed ${
              line.type === "input"
                ? "text-amber-400 font-semibold"
                : line.type === "system"
                ? "text-cyan-400"
                : line.type === "error"
                ? "text-red-400"
                : "text-slate-300"
            }`}
          >
            {line.text}
          </div>
        ))}
        {isBenchmarking && (
          <div className="text-amber-400 animate-pulse flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Executing TensorRT CUDA benchmarking kernel...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="px-4 py-2 bg-[#090e18] border-t border-white/[0.04] flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-slate-500 mr-1">RUN:</span>
        {["status", "benchmark", "models", "stack", "bio"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-white/5 hover:border-amber-500/30 text-[10px] transition"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Command Input Field */}
      <div className="px-4 py-3 bg-[#0a0f1b] border-t border-white/[0.08] flex items-center gap-2">
        <span className="text-amber-400 font-bold">davis@cluster:~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'status', 'benchmark' or 'help'..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 text-xs font-mono"
        />
        <button
          onClick={() => executeCommand(inputValue)}
          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
          aria-label="Send Command"
        >
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
