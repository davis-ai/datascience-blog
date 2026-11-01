import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Trash2 } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  text: string;
}

const INITIAL_LINES: TerminalLine[] = [
  { id: "1", type: "system", text: "Cluster node: a100-sxm4-01 (Linux x86_64, CUDA 12.4, Triton 24.08)" },
  { id: "2", type: "system", text: "Inference server: online • p99 target: <15ms" },
  { id: "3", type: "output", text: "Type 'help' or select a command below to inspect node telemetry." },
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
      text: `davis@node:~$ ${cmdText}`,
    };

    let responseLines: TerminalLine[] = [];

    switch (raw) {
      case "help":
      case "?":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "Available commands:" },
          { id: Math.random().toString(), type: "output", text: "  status      - Display cluster health, latency and hardware specs" },
          { id: Math.random().toString(), type: "output", text: "  benchmark   - Run simulated LLM throughput test on A100" },
          { id: Math.random().toString(), type: "output", text: "  models      - List deployed models and quantization formats" },
          { id: Math.random().toString(), type: "output", text: "  stack       - Print core machine learning and systems stack" },
          { id: Math.random().toString(), type: "output", text: "  clear       - Reset terminal buffer" },
        ];
        break;

      case "status":
        responseLines = [
          { id: Math.random().toString(), type: "system", text: "── Node status report ───────────────────────────────" },
          { id: Math.random().toString(), type: "output", text: "• Uptime: 99.98% (180 days continuous)" },
          { id: Math.random().toString(), type: "output", text: "• p99 latency: 12.8ms across 2.4M requests" },
          { id: Math.random().toString(), type: "output", text: "• GPU allocation: 4x A100-SXM4 (80GB VRAM/node)" },
          { id: Math.random().toString(), type: "output", text: "• Acceleration: TensorRT 10.0 + FlashAttention-2 + FP8" },
          { id: Math.random().toString(), type: "output", text: "• Region: Nairobi [UTC+3]" },
        ];
        break;

      case "benchmark":
        setIsBenchmarking(true);
        responseLines = [
          { id: Math.random().toString(), type: "system", text: "Running throughput benchmark on Llama-3-8B (AWQ 4-bit)..." },
          { id: Math.random().toString(), type: "output", text: "Warmup: 128 tokens in 0.89s (143.8 tok/s)" },
          { id: Math.random().toString(), type: "output", text: "Context: 8,192 tokens | Batch size: 16" },
          { id: Math.random().toString(), type: "output", text: "Throughput: 142.1 tokens/sec | VRAM: 5.2GB / 80GB" },
          { id: Math.random().toString(), type: "output", text: "Time to first token (TTFT): 18.2ms p95" },
        ];
        setTimeout(() => setIsBenchmarking(false), 600);
        break;

      case "models":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "1. Llama-3-8B QLoRA (Rank r=16, Alpha=32, 4-bit NF4)" },
          { id: Math.random().toString(), type: "output", text: "2. 3D Medical U-Net (Volumetric brain MRI segmentation, Dice=0.912)" },
          { id: Math.random().toString(), type: "output", text: "3. Real-time classifier (XGBoost + TreeExplainer, <3ms p99)" },
          { id: Math.random().toString(), type: "output", text: "4. Multimodal CLIP embedder (Vector index in Qdrant)" },
        ];
        break;

      case "stack":
        responseLines = [
          { id: Math.random().toString(), type: "output", text: "Languages: Python 3.12, C++, CUDA, Triton" },
          { id: Math.random().toString(), type: "output", text: "Frameworks: PyTorch 2.5, HuggingFace PEFT, vLLM, TensorRT" },
          { id: Math.random().toString(), type: "output", text: "Infrastructure: FastAPI, Apache Kafka, Redis, Docker, K8s" },
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
            text: `Command not found: "${cmdText}". Type 'help' for options.`,
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
    <div className="w-full bg-[#141415] rounded-lg border border-white/[0.08] overflow-hidden font-mono text-xs flex flex-col">
      {/* Terminal Title Bar */}
      <div className="px-3.5 py-2.5 bg-[#19191b] border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
          <span className="ml-2 text-[#85858b] text-[11px] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#85858b]" />
            node-01: ~ (sh)
          </span>
        </div>

        <button
          onClick={() => setLines([])}
          className="text-[#85858b] hover:text-[#ededed] p-1 rounded transition-colors"
          title="Clear"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="p-3.5 space-y-1.5 h-60 overflow-y-auto scrollbar-thin">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`leading-relaxed ${
              line.type === "input"
                ? "text-[#ededed] font-medium"
                : line.type === "system"
                ? "text-[#4cc38a]"
                : line.type === "error"
                ? "text-[#e5484d]"
                : "text-[#a1a1a6]"
            }`}
          >
            {line.text}
          </div>
        ))}
        {isBenchmarking && (
          <div className="text-[#4cc38a] flex items-center gap-2">
            Executing CUDA benchmark kernel...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-3.5 py-2 bg-[#19191b] border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-[#85858b] mr-1">Run:</span>
        {["status", "benchmark", "models", "stack"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded bg-[#232325] hover:bg-[#2f2f32] text-[#a1a1a6] hover:text-[#ededed] border border-white/[0.08] text-[11px] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Input Field */}
      <div className="px-3.5 py-2.5 bg-[#141415] border-t border-white/[0.08] flex items-center gap-2">
        <span className="text-[#4cc38a]">davis@node:~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'status' or 'benchmark'..."
          className="flex-1 bg-transparent text-[#ededed] focus:outline-none placeholder-[#85858b] text-xs font-mono"
        />
        <button
          onClick={() => executeCommand(inputValue)}
          className="p-1.5 rounded bg-[#232325] hover:bg-[#2f2f32] text-[#ededed] border border-white/[0.08] transition-colors"
          aria-label="Send"
        >
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
