import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Activity, Zap, Cpu } from "lucide-react";

type MetricView = "loss" | "throughput" | "latency";
type ModelPreset = "llama-3-8b" | "vision-unet" | "mamba-hybrid";

export default function ModelTelemetryChart() {
  const [activeMetric, setActiveMetric] = useState<MetricView>("loss");
  const [selectedModel, setSelectedModel] = useState<ModelPreset>("llama-3-8b");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Loss convergence series
  const lossData: Record<ModelPreset, { train: number[]; val: number[] }> = {
    "llama-3-8b": {
      train: [3.42, 2.85, 2.21, 1.78, 1.45, 1.18, 0.94, 0.76, 0.61, 0.52, 0.44, 0.38, 0.33, 0.29, 0.26, 0.24],
      val:   [3.51, 2.98, 2.39, 1.95, 1.62, 1.34, 1.09, 0.91, 0.77, 0.68, 0.59, 0.53, 0.48, 0.45, 0.42, 0.41],
    },
    "vision-unet": {
      train: [2.90, 2.15, 1.65, 1.25, 0.95, 0.72, 0.55, 0.42, 0.34, 0.28, 0.23, 0.19, 0.16, 0.14, 0.13, 0.11],
      val:   [3.05, 2.30, 1.82, 1.44, 1.12, 0.88, 0.71, 0.59, 0.49, 0.42, 0.37, 0.33, 0.30, 0.28, 0.27, 0.26],
    },
    "mamba-hybrid": {
      train: [3.60, 2.70, 1.98, 1.52, 1.19, 0.91, 0.70, 0.54, 0.42, 0.33, 0.27, 0.22, 0.19, 0.16, 0.14, 0.12],
      val:   [3.72, 2.89, 2.15, 1.70, 1.35, 1.07, 0.85, 0.69, 0.56, 0.47, 0.41, 0.36, 0.33, 0.30, 0.29, 0.28],
    },
  };

  const steps = [
    "Step 100", "Step 200", "Step 300", "Step 400", 
    "Step 500", "Step 600", "Step 700", "Step 800",
    "Step 900", "Step 1k", "Step 1.2k", "Step 1.4k",
    "Step 1.6k", "Step 1.8k", "Step 2k", "Step 2.4k"
  ];

  const lossOptions: ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        speed: 700,
        dynamicAnimation: { enabled: true },
      },
    },
    colors: ["#c8f135", "#38bdf8"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.02,
        stops: [0, 95, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: [2.5, 2],
      dashArray: [0, 4],
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.06)",
      strokeDashArray: 3,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { top: 10, right: 10, bottom: 0, left: 10 },
    },
    xaxis: {
      categories: steps,
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "10px",
          fontFamily: "monospace",
        },
      },
      axisBorder: { color: "rgba(255, 255, 255, 0.08)" },
      axisTicks: { color: "rgba(255, 255, 255, 0.08)" },
    },
    yaxis: {
      title: {
        text: "Cross-Entropy Loss",
        style: { color: "#94a3b8", fontSize: "11px", fontWeight: 500 },
      },
      labels: {
        formatter: (val) => val.toFixed(2),
        style: { colors: "#64748b", fontSize: "10px", fontFamily: "monospace" },
      },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "11px", fontFamily: "monospace" },
      y: { formatter: (val) => `${val.toFixed(4)} CE` },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#94a3b8" },
      fontFamily: "monospace",
      fontSize: "11px",
      markers: { size: 4 },
    },
  };

  const lossSeries = [
    { name: "Training Loss (LoRA r=16)", data: lossData[selectedModel].train },
    { name: "Validation Loss (Eval-Loss)", data: lossData[selectedModel].val },
  ];

  // 2. Throughput / Quantization series
  const throughputOptions: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
    },
    colors: ["#c8f135", "#10b981"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "48%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.06)",
      strokeDashArray: 3,
    },
    xaxis: {
      categories: ["FP16 Native", "INT8 TensorRT", "AWQ 4-Bit", "QLoRA / NF4"],
      labels: {
        style: { colors: "#94a3b8", fontSize: "11px", fontFamily: "monospace" },
      },
    },
    yaxis: [
      {
        title: {
          text: "Throughput (Tokens / sec)",
          style: { color: "#c8f135", fontSize: "11px" },
        },
        labels: {
          style: { colors: "#c8f135", fontSize: "10px", fontFamily: "monospace" },
        },
      },
      {
        opposite: true,
        title: {
          text: "VRAM Allocation (GB)",
          style: { color: "#10b981", fontSize: "11px" },
        },
        labels: {
          style: { colors: "#10b981", fontSize: "10px", fontFamily: "monospace" },
        },
      },
    ],
    tooltip: {
      theme: "dark",
      style: { fontSize: "11px", fontFamily: "monospace" },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#94a3b8" },
      fontFamily: "monospace",
      fontSize: "11px",
    },
  };

  const throughputSeries = [
    { name: "Tokens / sec (A100 SXM)", data: [42.4, 98.6, 142.1, 126.8] },
    { name: "VRAM Used (GB)", data: [16.8, 8.9, 5.2, 5.8] },
  ];

  // 3. Latency Waterfall series
  const latencyOptions: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
    },
    colors: ["#c8f135"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: "45%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} ms`,
      style: { colors: ["#050705"], fontSize: "11px", fontFamily: "monospace", fontWeight: 700 },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.06)",
      strokeDashArray: 3,
    },
    xaxis: {
      categories: [
        "1. Tokenizer & Embedding",
        "2. FlashAttention-2 Kernel",
        "3. MLP Feed-Forward",
        "4. Top-K Sampling & Detokenize",
      ],
      title: {
        text: "Inference Latency (Milliseconds)",
        style: { color: "#94a3b8", fontSize: "11px" },
      },
      labels: {
        style: { colors: "#64748b", fontSize: "10px", fontFamily: "monospace" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#94a3b8", fontSize: "11px", fontFamily: "monospace" },
      },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "11px", fontFamily: "monospace" },
      y: { formatter: (val) => `${val} ms` },
    },
  };

  const latencySeries = [
    {
      name: "Latency Budget",
      data: [1.8, 5.4, 4.2, 1.4],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c8f135] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-white tracking-wider">
            LIVE TELEMETRY // BENCHMARK CLUSTER
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#c8f135] bg-[#c8f135]/10 border border-[#c8f135]/30 px-2 py-0.5 rounded-full">
            GPU: A100-SXM4-80GB
          </span>
        </div>

        {/* Model preset selector */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setSelectedModel("llama-3-8b")}
            className={`font-mono text-[10px] px-3 py-1 rounded-full transition ${
              selectedModel === "llama-3-8b"
                ? "bg-[#c8f135] text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Llama-3-8B
          </button>
          <button
            onClick={() => setSelectedModel("vision-unet")}
            className={`font-mono text-[10px] px-3 py-1 rounded-full transition ${
              selectedModel === "vision-unet"
                ? "bg-[#c8f135] text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            3D-U-Net
          </button>
          <button
            onClick={() => setSelectedModel("mamba-hybrid")}
            className={`font-mono text-[10px] px-3 py-1 rounded-full transition ${
              selectedModel === "mamba-hybrid"
                ? "bg-[#c8f135] text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Mamba-Hybrid
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Loss, Throughput, Latency */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMetric("loss")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition ${
              activeMetric === "loss"
                ? "bg-[#c8f135]/15 text-[#c8f135] border border-[#c8f135]/40 shadow-[0_0_12px_rgba(200,241,53,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Convergence (Loss)
          </button>
          <button
            onClick={() => setActiveMetric("throughput")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition ${
              activeMetric === "throughput"
                ? "bg-[#c8f135]/15 text-[#c8f135] border border-[#c8f135]/40 shadow-[0_0_12px_rgba(200,241,53,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Throughput (Tokens/s)
          </button>
          <button
            onClick={() => setActiveMetric("latency")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition ${
              activeMetric === "latency"
                ? "bg-[#c8f135]/15 text-[#c8f135] border border-[#c8f135]/40 shadow-[0_0_12px_rgba(200,241,53,0.15)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Kernel Breakdown
          </button>
        </div>

        {/* Live metric badge */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <div>
            P99 Latency: <span className="text-[#c8f135] font-bold">12.8ms</span>
          </div>
          <div>
            Final Val Loss: <span className="text-[#c8f135] font-bold">{lossData[selectedModel].val.slice(-1)[0]}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="w-full h-64 sm:h-72 -ml-2 -mr-2">
        {mounted && (
          <>
            {activeMetric === "loss" && (
              <Chart
                options={lossOptions}
                series={lossSeries}
                type="area"
                height="100%"
                width="100%"
              />
            )}
            {activeMetric === "throughput" && (
              <Chart
                options={throughputOptions}
                series={throughputSeries}
                type="bar"
                height="100%"
                width="100%"
              />
            )}
            {activeMetric === "latency" && (
              <Chart
                options={latencyOptions}
                series={latencySeries}
                type="bar"
                height="100%"
                width="100%"
              />
            )}
          </>
        )}
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06] font-mono text-[11px]">
        <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
          <span className="text-slate-500 block text-[10px]">OPTIMIZER</span>
          <span className="text-white font-semibold">AdamW (β1=0.9, β2=0.95)</span>
        </div>
        <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
          <span className="text-slate-500 block text-[10px]">ATTENTION BACKEND</span>
          <span className="text-cyan-400 font-semibold">FlashAttention-2 + FP8</span>
        </div>
        <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
          <span className="text-slate-500 block text-[10px]">LORA RANK & ALPHA</span>
          <span className="text-[#c8f135] font-semibold">r = 16, α = 32</span>
        </div>
        <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
          <span className="text-slate-500 block text-[10px]">CACHE HIT RATE</span>
          <span className="text-emerald-400 font-semibold">98.4% (Redis KV)</span>
        </div>
      </div>
    </div>
  );
}
