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
    "100", "200", "300", "400", 
    "500", "600", "700", "800",
    "900", "1.0k", "1.2k", "1.4k",
    "1.6k", "1.8k", "2.0k", "2.4k"
  ];

  const lossOptions: ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        speed: 400,
        dynamicAnimation: { enabled: true },
      },
    },
    colors: ["#4cc38a", "#85858b"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.18,
        opacityTo: 0.0,
        stops: [0, 95, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 1.5],
      dashArray: [0, 4],
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(237, 237, 237, 0.06)",
      strokeDashArray: 2,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { top: 8, right: 8, bottom: 0, left: 8 },
    },
    xaxis: {
      categories: steps,
      labels: {
        style: {
          colors: "#85858b",
          fontSize: "10px",
          fontFamily: "monospace",
        },
      },
      axisBorder: { color: "rgba(237, 237, 237, 0.08)" },
      axisTicks: { color: "rgba(237, 237, 237, 0.08)" },
    },
    yaxis: {
      title: {
        text: "Cross-entropy loss",
        style: { color: "#a1a1a6", fontSize: "11px", fontWeight: 400 },
      },
      labels: {
        formatter: (val) => val.toFixed(2),
        style: { colors: "#85858b", fontSize: "10px", fontFamily: "monospace" },
      },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "11px", fontFamily: "monospace" },
      y: { formatter: (val) => `${val.toFixed(4)}` },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#a1a1a6" },
      fontFamily: "monospace",
      fontSize: "11px",
      markers: { size: 4 },
    },
  };

  const lossSeries = [
    { name: "Training loss (LoRA r=16)", data: lossData[selectedModel].train },
    { name: "Validation loss", data: lossData[selectedModel].val },
  ];

  const throughputOptions: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
    },
    colors: ["#4cc38a", "#85858b"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "44%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(237, 237, 237, 0.06)",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: ["FP16 Native", "INT8 TensorRT", "AWQ 4-Bit", "QLoRA / NF4"],
      labels: {
        style: { colors: "#a1a1a6", fontSize: "11px", fontFamily: "monospace" },
      },
    },
    yaxis: [
      {
        title: {
          text: "Throughput (tokens/s)",
          style: { color: "#4cc38a", fontSize: "11px", fontWeight: 400 },
        },
        labels: {
          style: { colors: "#4cc38a", fontSize: "10px", fontFamily: "monospace" },
        },
      },
      {
        opposite: true,
        title: {
          text: "VRAM allocation (GB)",
          style: { color: "#85858b", fontSize: "11px", fontWeight: 400 },
        },
        labels: {
          style: { colors: "#85858b", fontSize: "10px", fontFamily: "monospace" },
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
      labels: { colors: "#a1a1a6" },
      fontFamily: "monospace",
      fontSize: "11px",
    },
  };

  const throughputSeries = [
    { name: "Tokens / sec (A100)", data: [42.4, 98.6, 142.1, 126.8] },
    { name: "VRAM used (GB)", data: [16.8, 8.9, 5.2, 5.8] },
  ];

  const latencyOptions: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
    },
    colors: ["#4cc38a"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: "40%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} ms`,
      style: { colors: ["#0f0f10"], fontSize: "10px", fontFamily: "monospace", fontWeight: 500 },
    },
    grid: {
      borderColor: "rgba(237, 237, 237, 0.06)",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "Tokenizer & embedding",
        "FlashAttention-2 kernel",
        "MLP feed-forward",
        "Top-k sampling & decode",
      ],
      title: {
        text: "Inference latency (ms)",
        style: { color: "#a1a1a6", fontSize: "11px", fontWeight: 400 },
      },
      labels: {
        style: { colors: "#85858b", fontSize: "10px", fontFamily: "monospace" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#a1a1a6", fontSize: "11px", fontFamily: "monospace" },
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
      name: "Latency budget",
      data: [1.8, 5.4, 4.2, 1.4],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#4cc38a]" />
          <span className="text-xs font-medium text-[#ededed]">
            Model benchmark telemetry
          </span>
          <span className="font-mono text-[11px] text-[#85858b]">
            A100-SXM4-80GB
          </span>
        </div>

        {/* Model preset selector */}
        <div className="flex items-center gap-1 bg-[#141415] p-1 rounded-md border border-white/[0.08]">
          <button
            onClick={() => setSelectedModel("llama-3-8b")}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
              selectedModel === "llama-3-8b"
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            Llama-3-8B
          </button>
          <button
            onClick={() => setSelectedModel("vision-unet")}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
              selectedModel === "vision-unet"
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            3D-U-Net
          </button>
          <button
            onClick={() => setSelectedModel("mamba-hybrid")}
            className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors ${
              selectedModel === "mamba-hybrid"
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            Mamba-Hybrid
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Loss, Throughput, Latency */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveMetric("loss")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
              activeMetric === "loss"
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#85858b]" />
            <span>Convergence</span>
          </button>
          <button
            onClick={() => setActiveMetric("throughput")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
              activeMetric === "throughput"
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#85858b]" />
            <span>Throughput</span>
          </button>
          <button
            onClick={() => setActiveMetric("latency")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
              activeMetric === "latency"
                ? "bg-[#232325] text-[#ededed] border border-white/[0.08]"
                : "text-[#85858b] hover:text-[#ededed]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#85858b]" />
            <span>Latency</span>
          </button>
        </div>

        {/* Live metric summary */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-[#85858b]">
          <div>
            p99 latency: <span className="text-[#ededed] font-medium">12.8ms</span>
          </div>
          <div>
            Final loss: <span className="text-[#4cc38a] font-medium">{lossData[selectedModel].val.slice(-1)[0]}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="w-full h-64 sm:h-72">
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/[0.08] font-mono text-xs">
        <div className="bg-[#141415] p-2.5 rounded-lg border border-white/[0.06]">
          <span className="text-[#85858b] block text-[10px]">Optimizer</span>
          <span className="text-[#ededed] font-medium">AdamW (β1=0.9)</span>
        </div>
        <div className="bg-[#141415] p-2.5 rounded-lg border border-white/[0.06]">
          <span className="text-[#85858b] block text-[10px]">Attention backend</span>
          <span className="text-[#ededed] font-medium">FlashAttention-2</span>
        </div>
        <div className="bg-[#141415] p-2.5 rounded-lg border border-white/[0.06]">
          <span className="text-[#85858b] block text-[10px]">LoRA rank</span>
          <span className="text-[#4cc38a] font-medium">r = 16, α = 32</span>
        </div>
        <div className="bg-[#141415] p-2.5 rounded-lg border border-white/[0.06]">
          <span className="text-[#85858b] block text-[10px]">Cache hit rate</span>
          <span className="text-[#ededed] font-medium">98.4% (Redis KV)</span>
        </div>
      </div>
    </div>
  );
}
