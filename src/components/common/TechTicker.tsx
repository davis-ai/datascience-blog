export default function TechTicker() {
  const items = [
    { label: "CUDA 12.4", cat: "Hardware" },
    { label: "PyTorch 2.5", cat: "Deep Learning" },
    { label: "FlashAttention-2", cat: "Kernel" },
    { label: "QLoRA / PEFT", cat: "Fine-Tuning" },
    { label: "TensorRT 10.0", cat: "Quantization" },
    { label: "vLLM High-Throughput", cat: "Inference" },
    { label: "Apache Kafka", cat: "Streaming" },
    { label: "FastAPI Async", cat: "Microservices" },
    { label: "Polars & Arrow", cat: "Data Eng" },
    { label: "SHAP & TreeExplainer", cat: "Interpretability" },
    { label: "Docker & K8s", cat: "Infrastructure" },
    { label: "React 19 & TypeScript", cat: "Interactive UI" },
  ];

  return (
    <div className="w-full overflow-hidden border-y border-white/[0.06] bg-[#050705] py-3 relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050705] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050705] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-ticker gap-6">
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-300 font-mono text-[11px] whitespace-nowrap hover:border-[#c8f135]/40 hover:text-white transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f135]" />
            <span className="font-semibold text-white">{item.label}</span>
            <span className="text-[9px] text-[#c8f135]/80 uppercase tracking-wider">
              //{item.cat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
