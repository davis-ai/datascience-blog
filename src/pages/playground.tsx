import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Layers, 
  BarChart3, 
  Zap, 
  Percent,
  Cpu,
  Copy,
  Check,
  Hash
} from 'lucide-react';
import { useToast } from '../components/ui/toast';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'regression' | 'metrics' | 'activations' | 'tokenizer'>('regression');

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#c8f135] text-xs font-mono tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f135] animate-pulse shadow-[0_0_8px_#c8f135]" />
          <Sparkles className="w-3.5 h-3.5 text-[#c8f135]" />
          <span>[LAB_BENCH // INTERACTIVE_SIMULATORS]</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-heading">
          Machine Learning <span className="font-serif-italic text-[#c8f135] font-normal">Playground</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-base font-mono">
          Experiment directly with core algorithms in real time. Tweak hyperparameters, inspect live gradient descent trajectories, compute classification metrics, and explore neural activations.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-black/40 rounded-full border border-white/10 shadow-lg max-w-2xl mx-auto mt-6 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('regression')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'regression'
                ? 'bg-[#c8f135] text-black font-bold shadow-md shadow-[#c8f135]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" /> Gradient Descent
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'metrics'
                ? 'bg-[#c8f135] text-black font-bold shadow-md shadow-[#c8f135]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Confusion Matrix
          </button>
          <button
            onClick={() => setActiveTab('activations')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'activations'
                ? 'bg-[#c8f135] text-black font-bold shadow-md shadow-[#c8f135]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" /> Neural Activations
          </button>
          <button
            onClick={() => setActiveTab('tokenizer')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'tokenizer'
                ? 'bg-[#c8f135] text-black font-bold shadow-md shadow-[#c8f135]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-4 h-4" /> LLM Tokenizer
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      {activeTab === 'regression' && <RegressionLab />}
      {activeTab === 'metrics' && <MetricsLab />}
      {activeTab === 'activations' && <ActivationsLab />}
      {activeTab === 'tokenizer' && <TokenizerLab />}
    </div>
  );
}

// -------------------------------------------------------------
// TAB 1: GRADIENT DESCENT & REGRESSION LAB
// -------------------------------------------------------------
interface Point {
  x: number;
  y: number;
}

function RegressionLab() {
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [noise, setNoise] = useState<number>(0.15);
  const [degree, setDegree] = useState<number>(1);
  const [points, setPoints] = useState<Point[]>([]);
  const [weights, setWeights] = useState<number[]>([0, 0]); // [bias, w1, w2, ...]
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [epoch, setEpoch] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lossCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate dataset
  const generateData = () => {
    setIsRunning(false);
    const newPoints: Point[] = [];
    const n = 35;
    for (let i = 0; i < n; i++) {
      const x = (i / n) * 2 - 1; // -1 to 1
      let y = 0;
      if (degree === 1) {
        y = 0.7 * x + 0.1;
      } else if (degree === 2) {
        y = 0.8 * x * x - 0.3;
      } else {
        y = 0.9 * x * x * x - 0.4 * x + 0.1;
      }
      y += (Math.random() - 0.5) * noise * 2;
      newPoints.push({ x, y });
    }
    setPoints(newPoints);
    setWeights(new Array(degree + 1).fill(0));
    setLossHistory([]);
    setEpoch(0);
  };

  useEffect(() => {
    generateData();
  }, [degree, noise]);

  // Compute prediction
  const predict = (x: number, w: number[]): number => {
    let y = 0;
    for (let d = 0; d < w.length; d++) {
      y += w[d] * Math.pow(x, d);
    }
    return y;
  };

  // One step of Gradient Descent
  const stepGradientDescent = () => {
    if (points.length === 0) return;
    const n = points.length;
    const gradients = new Array(weights.length).fill(0);
    let currentLoss = 0;

    for (let i = 0; i < n; i++) {
      const p = points[i];
      const yPred = predict(p.x, weights);
      const err = yPred - p.y;
      currentLoss += err * err;

      for (let d = 0; d < weights.length; d++) {
        gradients[d] += (2 / n) * err * Math.pow(p.x, d);
      }
    }
    currentLoss = currentLoss / n;

    const newWeights = weights.map((w, idx) => w - learningRate * gradients[idx]);
    setWeights(newWeights);
    setEpoch((prev) => prev + 1);
    setLossHistory((prev) => [...prev.slice(-49), currentLoss]);
  };

  // Continuous run loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        stepGradientDescent();
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, weights, points, learningRate]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#050705';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Map math coords (-1 to 1) to canvas coords
    const toCanvasX = (x: number) => (x + 1) * 0.5 * (width - 40) + 20;
    const toCanvasY = (y: number) => height - ((y + 1) * 0.5 * (height - 40) + 20);

    // Draw Points
    points.forEach((p) => {
      ctx.fillStyle = '#c8f135';
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200, 241, 53, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw Prediction Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = -1; px <= 1.05; px += 0.02) {
      const py = predict(px, weights);
      const cx = toCanvasX(px);
      const cy = toCanvasY(py);
      if (px === -1) {
        ctx.moveTo(cx, cy);
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();
  }, [points, weights]);

  // Render Loss Canvas
  useEffect(() => {
    const canvas = lossCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#050705';
    ctx.fillRect(0, 0, width, height);

    if (lossHistory.length < 2) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px system-ui';
      ctx.fillText('Run training to see MSE Loss curve', 20, height / 2);
      return;
    }

    const maxLoss = Math.max(...lossHistory, 0.5);
    const minLoss = 0;

    ctx.strokeStyle = '#c8f135';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    lossHistory.forEach((loss, idx) => {
      const cx = (idx / (lossHistory.length - 1)) * (width - 30) + 15;
      const cy = height - ((loss - minLoss) / (maxLoss - minLoss)) * (height - 30) - 15;
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
  }, [lossHistory]);

  const currentLoss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#c8f135]" />
                Live Model Fitting Canvas
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Lime points represent training samples; Blue curve represents the learned hypothesis function.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition ${
                  isRunning
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-[#c8f135] hover:bg-[#d9ff43] text-black shadow-lg shadow-[#c8f135]/20'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'Pause' : 'Train Model'}
              </button>
              <button
                onClick={stepGradientDescent}
                disabled={isRunning}
                className="px-3 py-2 rounded-full text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 disabled:opacity-50 transition border border-white/5"
              >
                Single Step
              </button>
              <button
                onClick={generateData}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition border border-white/5"
                title="Reset data & weights"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full max-w-2xl h-auto rounded-2xl border border-white/10 shadow-inner bg-[#050705]"
            />
          </div>

          {/* Loss Tracking sub-panel */}
          <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <p className="text-xs text-slate-400 font-mono">Current Epoch</p>
              <p className="text-2xl font-black text-[#c8f135] font-mono">{epoch}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-mono">Mean Squared Error (MSE)</p>
              <p className="text-2xl font-black text-emerald-400 font-mono">
                {currentLoss > 0 ? currentLoss.toFixed(5) : '0.00000'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1 font-mono">Convergence Loss Curve</p>
              <canvas
                ref={lossCanvasRef}
                width={200}
                height={50}
                className="w-full h-12 rounded-lg border border-white/10 bg-[#050705]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <Zap className="w-4 h-4 text-[#c8f135]" />
            Hyperparameters & Config
          </h3>

          {/* Learning Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold font-mono">
              <span className="text-slate-300">Learning Rate (α)</span>
              <span className="text-[#c8f135]">{learningRate}</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.25"
              step="0.005"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-[#c8f135] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 font-mono">
              Higher rates converge faster but risk overshooting local minima.
            </p>
          </div>

          {/* Polynomial Degree */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold font-mono">
              <span className="text-slate-300">Polynomial Degree</span>
              <span className="text-[#c8f135]">
                {degree === 1 ? 'Degree 1 (Linear)' : degree === 2 ? 'Degree 2 (Quadratic)' : 'Degree 3 (Cubic)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => setDegree(d)}
                  className={`py-2 rounded-full text-xs font-bold border transition ${
                    degree === d
                      ? 'bg-[#c8f135]/20 border-[#c8f135] text-[#c8f135]'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {d === 1 ? 'Linear' : d === 2 ? 'Quad' : 'Cubic'}
                </button>
              ))}
            </div>
          </div>

          {/* Noise Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold font-mono">
              <span className="text-slate-300">Dataset Noise</span>
              <span className="text-emerald-400">{Math.round(noise * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.4"
              step="0.02"
              value={noise}
              onChange={(e) => setNoise(parseFloat(e.target.value))}
              className="w-full accent-[#c8f135] cursor-pointer"
            />
          </div>

          {/* Learned Parameters */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <p className="text-xs font-semibold text-slate-300 font-mono">Learned Weights Vector:</p>
            <div className="space-y-1 font-mono text-xs text-[#c8f135]">
              {weights.map((w, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-slate-500">w_{idx} ({idx === 0 ? 'bias' : `x^${idx}`}):</span>
                  <span>{w.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={generateData}
            className="w-full py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/10 transition"
          >
            Regenerate Sample Points
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 2: CONFUSION MATRIX & METRICS STUDIO
// -------------------------------------------------------------
function MetricsLab() {
  const [tp, setTp] = useState(85);
  const [fp, setFp] = useState(15);
  const [fn, setFn] = useState(10);
  const [tn, setTn] = useState(90);

  const total = tp + fp + fn + tn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;
  const f1Score = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  // Matthews Correlation Coefficient
  const mccDenominator = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  const mcc = mccDenominator > 0 ? (tp * tn - fp * fn) / mccDenominator : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 2x2 Matrix & Sliders */}
      <div className="lg:col-span-7 space-y-6">
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#c8f135]" />
              Interactive 2×2 Confusion Matrix
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Adjust positive and negative sample counts to observe real-time impacts on trade-offs between precision and recall.
            </p>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {/* TP */}
            <div className="p-5 rounded-2xl bg-[#c8f135]/10 border-2 border-[#c8f135]/40 text-center space-y-1 relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#c8f135] font-mono">
                True Positive (TP)
              </span>
              <p className="text-3xl font-black text-[#c8f135] font-mono">{tp}</p>
              <p className="text-[11px] text-[#c8f135]/80 font-mono">Correctly detected positives</p>
            </div>

            {/* FP */}
            <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/40 text-center space-y-1 relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 font-mono">
                False Positive (FP)
              </span>
              <p className="text-3xl font-black text-rose-300 font-mono">{fp}</p>
              <p className="text-[11px] text-rose-400/80 font-mono">Type I Error (False alarm)</p>
            </div>

            {/* FN */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/40 text-center space-y-1 relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 font-mono">
                False Negative (FN)
              </span>
              <p className="text-3xl font-black text-amber-300 font-mono">{fn}</p>
              <p className="text-[11px] text-amber-400/80 font-mono">Type II Error (Missed case)</p>
            </div>

            {/* TN */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/40 text-center space-y-1 relative overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 font-mono">
                True Negative (TN)
              </span>
              <p className="text-3xl font-black text-emerald-300 font-mono">{tn}</p>
              <p className="text-[11px] text-emerald-400/80 font-mono">Correctly rejected negatives</p>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#c8f135] font-medium">True Positives: {tp}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={tp}
                  onChange={(e) => setTp(parseInt(e.target.value))}
                  className="w-full accent-[#c8f135] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-rose-400 font-medium">False Positives: {fp}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={fp}
                  onChange={(e) => setFp(parseInt(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400 font-medium">False Negatives: {fn}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={fn}
                  onChange={(e) => setFn(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-medium">True Negatives: {tn}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={tn}
                  onChange={(e) => setTn(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Computed Metrics */}
      <div className="lg:col-span-5 space-y-4">
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <Percent className="w-4 h-4 text-[#c8f135]" />
            Computed Performance Metrics
          </h3>

          <div className="space-y-3">
            {/* Accuracy */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">Accuracy</span>
                <span className="text-[#c8f135] font-mono font-bold">{(accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-[#c8f135] rounded-full transition-all" style={{ width: `${accuracy * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">(TP + TN) / Total = ({tp} + {tn}) / {total}</p>
            </div>

            {/* Precision */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">Precision (Positive Predictive Value)</span>
                <span className="text-[#c8f135] font-mono font-bold">{(precision * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-[#c8f135] rounded-full transition-all" style={{ width: `${precision * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">TP / (TP + FP) = {tp} / ({tp} + {fp})</p>
            </div>

            {/* Recall */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">Recall (Sensitivity / TPR)</span>
                <span className="text-emerald-400 font-mono font-bold">{(recall * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${recall * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">TP / (TP + FN) = {tp} / ({tp} + {fn})</p>
            </div>

            {/* Specificity */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">Specificity (True Negative Rate)</span>
                <span className="text-teal-400 font-mono font-bold">{(specificity * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full transition-all" style={{ width: `${specificity * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">TN / (TN + FP) = {tn} / ({tn} + {fp})</p>
            </div>

            {/* F1 Score */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">F1-Score (Harmonic Mean)</span>
                <span className="text-[#c8f135] font-mono font-bold">{(f1Score * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-[#c8f135] rounded-full transition-all" style={{ width: `${f1Score * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">2 × (Prec × Rec) / (Prec + Rec)</p>
            </div>

            {/* MCC */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-semibold">Matthews Corr. Coeff. (MCC)</span>
                <span className="text-rose-400 font-mono font-bold">{mcc.toFixed(3)}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                Balanced quality metric bounded in [-1, +1], robust to extreme class imbalance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 3: NEURAL ACTIVATIONS LAB
// -------------------------------------------------------------
function ActivationsLab() {
  const [selectedFunc, setSelectedFunc] = useState<'relu' | 'sigmoid' | 'tanh' | 'gelu' | 'leaky'>('gelu');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activationFunctions = {
    relu: {
      name: 'ReLU (Rectified Linear Unit)',
      formula: 'f(x) = max(0, x)',
      derivative: "f'(x) = 1 if x > 0 else 0",
      eval: (x: number) => Math.max(0, x),
      derivEval: (x: number) => (x > 0 ? 1 : 0),
      description: 'The standard activation for deep convolutional networks. Extremely fast to compute, but suffers from dying neurons when inputs stay strictly negative.',
      usage: 'CNNs, standard feedforward layers'
    },
    sigmoid: {
      name: 'Sigmoid (Logistic)',
      formula: 'σ(x) = 1 / (1 + e^(-x))',
      derivative: "σ'(x) = σ(x)(1 - σ(x))",
      eval: (x: number) => 1 / (1 + Math.exp(-x)),
      derivEval: (x: number) => {
        const s = 1 / (1 + Math.exp(-x));
        return s * (1 - s);
      },
      description: 'Compresses real inputs into [0, 1]. Primary usage is binary classification output layers. Causes vanishing gradients in deep hidden layers.',
      usage: 'Binary classification heads, gating mechanisms (LSTM/GRU)'
    },
    tanh: {
      name: 'Hyperbolic Tangent (Tanh)',
      formula: 'tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
      derivative: "tanh'(x) = 1 - tanh^2(x)",
      eval: (x: number) => Math.tanh(x),
      derivEval: (x: number) => 1 - Math.pow(Math.tanh(x), 2),
      description: 'Zero-centered function mapping inputs to [-1, 1], improving gradient descent convergence over Sigmoid.',
      usage: 'Recurrent Neural Networks (RNNs), hidden states'
    },
    gelu: {
      name: 'GELU (Gaussian Error Linear Unit)',
      formula: 'GELU(x) = x · Φ(x) ≈ 0.5x(1 + tanh(√(2/π)(x + 0.044715x^3)))',
      derivative: "Non-linear smooth probabilistic gate",
      eval: (x: number) => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))),
      derivEval: (x: number) => {
        const c = Math.sqrt(2 / Math.PI);
        const inner = c * (x + 0.044715 * Math.pow(x, 3));
        const tanhVal = Math.tanh(inner);
        const sech2 = 1 - tanhVal * tanhVal;
        return 0.5 * (1 + tanhVal) + 0.5 * x * sech2 * c * (1 + 3 * 0.044715 * x * x);
      },
      description: 'Smooth, non-monotonic probabilistic activation. Standard in modern Transformers including BERT, GPT-3/4, and Llama.',
      usage: 'Transformers, Modern LLMs (GPT, LLaMA, BERT)'
    },
    leaky: {
      name: 'Leaky ReLU',
      formula: 'f(x) = max(0.01x, x)',
      derivative: "f'(x) = 1 if x > 0 else 0.01",
      eval: (x: number) => (x > 0 ? x : 0.05 * x),
      derivEval: (x: number) => (x > 0 ? 1 : 0.05),
      description: 'Prevents dying neurons by allowing a small positive gradient (e.g. 0.05) when the unit is inactive.',
      usage: 'Deep networks, GAN discriminators'
    }
  };

  const current = activationFunctions[selectedFunc];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#050705';
    ctx.fillRect(0, 0, width, height);

    // Grid and axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    const minX = -4.5;
    const maxX = 4.5;
    const minY = -2.0;
    const maxY = 3.0;

    const toX = (x: number) => ((x - minX) / (maxX - minX)) * (width - 40) + 20;
    const toY = (y: number) => height - (((y - minY) / (maxY - minY)) * (height - 40) + 20);

    // Draw Function f(x)
    ctx.strokeStyle = '#c8f135';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.05) {
      const y = current.eval(x);
      const cx = toX(x);
      const cy = toY(y);
      if (x === minX) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Draw Derivative f'(x)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.05) {
      const y = current.derivEval(x);
      const cx = toX(x);
      const cy = toY(y);
      if (x === minX) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }, [selectedFunc]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Canvas Area */}
      <div className="lg:col-span-7 space-y-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">{current.name}</h3>
              <p className="text-xs text-slate-400 font-mono">Comparing function curve and derivative profile</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#c8f135] font-semibold">
                <span className="w-3 h-1 bg-[#c8f135] rounded-full inline-block"></span>
                f(x) Activation
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <span className="w-3 h-1 bg-cyan-400 rounded-full inline-block border-dashed"></span>
                f'(x) Derivative
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full max-w-2xl h-auto rounded-2xl border border-white/10 shadow-inner bg-[#050705]"
            />
          </div>
        </div>
      </div>

      {/* Function Details & Switcher */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-5">
          <h3 className="text-base font-bold text-white border-b border-white/[0.08] pb-3 font-mono">
            Select Activation Function
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(activationFunctions) as Array<keyof typeof activationFunctions>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedFunc(key)}
                className={`p-3 rounded-full text-xs font-bold text-center border transition font-mono ${
                  selectedFunc === key
                    ? 'bg-[#c8f135] border-[#c8f135] text-black shadow-md shadow-[#c8f135]/20'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">Formula</p>
              <p className="font-mono text-sm text-[#c8f135] font-semibold">{current.formula}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">Derivative</p>
              <p className="font-mono text-xs text-cyan-300">{current.derivative}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">Primary Applications</p>
              <p className="text-xs text-emerald-300 font-medium font-mono">{current.usage}</p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TAB 4: LLM TOKENIZER & EMBEDDINGS LAB
// -------------------------------------------------------------
interface TokenItem {
  id: number;
  raw: string;
  display: string;
  start: number;
  end: number;
  colorClass: string;
  colorHex: string;
  x: number;
  y: number;
}

const PRESET_TEXTS = [
  {
    name: 'Attention Mechanism',
    text: 'Large Language Models decompose text into discrete subword tokens via Byte-Pair Encoding (BPE), enabling flexible vocabulary representations.',
  },
  {
    name: 'PyTorch Matrix Ops',
    text: 'def forward(self, q, k, v):\n    scores = torch.matmul(q, k.transpose(-2, -1)) * self.scale\n    return torch.softmax(scores, dim=-1) @ v',
  },
  {
    name: 'LoRA Mathematical Loss',
    text: 'Loss_PEFT = ||W_0*x + (alpha / r) * B * A * x - y||^2',
  },
  {
    name: 'Multilingual AI',
    text: 'Nairobi ni jiji lenye maono makubwa ya teknolojia. L\'intelligence artificielle transforme le monde.',
  },
];

const TOKEN_COLORS = [
  { bg: 'bg-[#c8f135]/20 text-[#c8f135] border-[#c8f135]/40 hover:bg-[#c8f135]/30', hex: '#c8f135' },
  { bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30', hex: '#10b981' },
  { bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30', hex: '#06b6d4' },
  { bg: 'bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30', hex: '#14b8a6' },
  { bg: 'bg-lime-500/20 text-lime-300 border-lime-500/40 hover:bg-lime-500/30', hex: '#84cc16' },
  { bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30', hex: '#0ea5e9' },
];

function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash >>> 0);
}

function simulateTokenize(input: string, mode: 'bpe' | 'wordpiece' | 'char'): TokenItem[] {
  if (!input) return [];
  const items: TokenItem[] = [];

  if (mode === 'char') {
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const id = (char.charCodeAt(0) * 137) % 128000;
      const color = TOKEN_COLORS[i % TOKEN_COLORS.length];
      const angle = (char.charCodeAt(0) * 17) % 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 0.3 + ((char.charCodeAt(0) * 31) % 60) / 100;
      items.push({
        id,
        raw: char,
        display: char === ' ' ? '␣' : char === '\n' ? '↵' : char,
        start: i,
        end: i + 1,
        colorClass: color.bg,
        colorHex: color.hex,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
      });
    }
    return items;
  }

  // Regex pattern separating whitespace, words, punctuation, numbers, newlines
  const regex = /(\s+|[a-zA-Z]+|[0-9]+|[^\s\w])/g;
  let match;
  let tokenIdx = 0;

  while ((match = regex.exec(input)) !== null) {
    const chunk = match[0];
    const startIndex = match.index;

    if (/^\s+$/.test(chunk)) {
      if (mode === 'bpe') {
        const id = djb2Hash(chunk) % 128000;
        const color = TOKEN_COLORS[tokenIdx % TOKEN_COLORS.length];
        const angle = (id * 13) % 360;
        const rad = (angle * Math.PI) / 180;
        items.push({
          id,
          raw: chunk,
          display: chunk.replace(/ /g, 'Ġ').replace(/\n/g, '↵\n'),
          start: startIndex,
          end: startIndex + chunk.length,
          colorClass: color.bg,
          colorHex: color.hex,
          x: Math.cos(rad) * 0.45,
          y: Math.sin(rad) * 0.45,
        });
        tokenIdx++;
      }
      continue;
    }

    // Split longer words into subwords for realistic BPE/WordPiece simulation
    const subwords: string[] = [];
    if (chunk.length > 5 && /^[a-zA-Z]+$/.test(chunk)) {
      const mid = Math.floor(chunk.length / 2);
      subwords.push(chunk.slice(0, mid));
      subwords.push(chunk.slice(mid));
    } else {
      subwords.push(chunk);
    }

    subwords.forEach((sub, subIdx) => {
      const id = djb2Hash(sub.toLowerCase()) % 128000;
      const color = TOKEN_COLORS[tokenIdx % TOKEN_COLORS.length];
      const display =
        mode === 'wordpiece' && subIdx > 0
          ? `##${sub}`
          : mode === 'bpe' && subIdx === 0 && startIndex > 0 && input[startIndex - 1] === ' '
          ? `Ġ${sub}`
          : sub;

      const angle = (id * 19) % 360;
      const rad = (angle * Math.PI) / 180;
      const dist = 0.25 + ((id % 70) / 100);

      items.push({
        id,
        raw: sub,
        display,
        start: startIndex,
        end: startIndex + sub.length,
        colorClass: color.bg,
        colorHex: color.hex,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
      });
      tokenIdx++;
    });
  }

  return items;
}

function TokenizerLab() {
  const [inputText, setInputText] = useState<string>(PRESET_TEXTS[0].text);
  const [tokenizerMode, setTokenizerMode] = useState<'bpe' | 'wordpiece' | 'char'>('bpe');
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);
  const [copiedState, setCopiedState] = useState<'strings' | 'ids' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { showToast } = useToast();

  const tokens = simulateTokenize(inputText, tokenizerMode);
  const charCount = inputText.length;
  const tokenCount = tokens.length;
  const ratio = tokenCount > 0 ? (charCount / tokenCount).toFixed(2) : '0';
  const contextPercentage = ((tokenCount / 8192) * 100).toFixed(2);

  // Render 2D Embedding Scatter Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.42;

    ctx.clearRect(0, 0, width, height);

    // Background grid & concentric rings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = 0.2; r <= 1.0; r += 0.25) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r * scale, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Axes labels
    ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.font = '10px monospace';
    ctx.fillText('Embedding Dim 1 (t-SNE/PCA)', width - 150, centerY - 6);
    ctx.fillText('Embedding Dim 2', centerX + 8, 16);

    // Render token points
    tokens.forEach((token, idx) => {
      const px = centerX + token.x * scale;
      const py = centerY + token.y * scale;
      const isHovered = hoveredTokenIndex === idx || selectedTokenIndex === idx;

      // Glow halo on hover
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = `${token.colorHex}33`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = `${token.colorHex}88`;
        ctx.fill();
      }

      // Main point
      ctx.beginPath();
      ctx.arc(px, py, isHovered ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = token.colorHex;
      ctx.fill();

      // Text label if hovered or selected
      if (isHovered) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`${token.display} [ID:${token.id}]`, px + 8, py - 6);
      }
    });
  }, [tokens, hoveredTokenIndex, selectedTokenIndex]);

  const handleCopyTokens = () => {
    const list = tokens.map((t) => t.display);
    navigator.clipboard.writeText(JSON.stringify(list, null, 2));
    setCopiedState('strings');
    showToast('Token strings copied as JSON array!', 'success');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleCopyIds = () => {
    const ids = tokens.map((t) => t.id);
    navigator.clipboard.writeText(JSON.stringify(ids));
    setCopiedState('ids');
    showToast('Token IDs copied as array!', 'success');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const activeToken = selectedTokenIndex !== null ? tokens[selectedTokenIndex] : hoveredTokenIndex !== null ? tokens[hoveredTokenIndex] : null;

  return (
    <div className="space-y-8">
      {/* Top Controls & Presets */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
              <Cpu className="w-5 h-5 text-[#c8f135]" />
              Subword Tokenizer & Semantic Vector Projection
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Visualize how modern LLMs (e.g. Llama 3, GPT-4, Mistral) tokenize raw characters into high-dimensional vector spaces.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-xs text-slate-400 font-medium">Tokenizer Engine:</span>
            <select
              value={tokenizerMode}
              onChange={(e) => setTokenizerMode(e.target.value as any)}
              className="bg-black/50 border border-white/10 rounded-full px-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#c8f135] font-semibold"
            >
              <option value="bpe">Byte-Pair Encoding (Llama-3 / GPT-4)</option>
              <option value="wordpiece">WordPiece (BERT / DistilBERT)</option>
              <option value="char">Character-Level (Raw Byte)</option>
            </select>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.08]">
          <span className="text-[11px] text-slate-400 font-medium mr-1 font-mono">Load Presets:</span>
          {PRESET_TEXTS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setInputText(preset.text)}
              className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.03] border border-white/10 text-slate-300 hover:text-[#c8f135] hover:border-[#c8f135]/40 transition"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Input Textarea */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
            Input Prompt / Text Buffer
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Type any prompt or code to inspect live token breakdown..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-mono text-slate-200 focus:outline-none focus:border-[#c8f135] transition leading-relaxed resize-y"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 text-center font-mono">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Tokens</p>
            <p className="text-2xl font-black text-[#c8f135] font-mono mt-0.5">{tokenCount}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Characters</p>
            <p className="text-2xl font-black text-white font-mono mt-0.5">{charCount}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Chars / Token Ratio</p>
            <p className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{ratio}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Context Window (8k)</p>
            <p className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{contextPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Token Stream Visualizer & 2D Vector Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Token Chips Display */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#c8f135]" />
              Tokenized Stream ({tokens.length} Subwords)
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTokens}
                className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition hover:border-[#c8f135]/40"
              >
                {copiedState === 'strings' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Tokens
              </button>
              <button
                onClick={handleCopyIds}
                className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition hover:border-[#c8f135]/40"
              >
                {copiedState === 'ids' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy IDs
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 min-h-[160px] flex flex-wrap gap-1.5 items-start content-start font-mono text-xs leading-relaxed">
            {tokens.length === 0 ? (
              <span className="text-slate-500 italic">Enter text above to see tokens...</span>
            ) : (
              tokens.map((token, idx) => {
                const isSelected = selectedTokenIndex === idx;
                const isHovered = hoveredTokenIndex === idx;

                return (
                  <span
                    key={idx}
                    onMouseEnter={() => setHoveredTokenIndex(idx)}
                    onMouseLeave={() => setHoveredTokenIndex(null)}
                    onClick={() => setSelectedTokenIndex(isSelected ? null : idx)}
                    className={`px-2.5 py-1 rounded-full border cursor-pointer transition-all duration-150 ${token.colorClass} ${
                      isSelected || isHovered
                        ? 'ring-2 ring-white scale-105 shadow-md z-10'
                        : 'opacity-90'
                    }`}
                    title={`Token: "${token.display}" | ID: ${token.id} | Chars: ${token.raw.length}`}
                  >
                    {token.display}
                  </span>
                );
              })
            )}
          </div>

          {/* Active Token Inspector Bar */}
          {activeToken ? (
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-[#c8f135]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Selected:</span>
                <span className="font-mono font-bold text-[#c8f135] bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                  {activeToken.display}
                </span>
                <span className="text-slate-500 text-[11px] font-mono">({activeToken.raw.length} bytes)</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-slate-300">
                <span>ID: <strong className="text-cyan-300">{activeToken.id}</strong></span>
                <span>Dim (X, Y): <strong className="text-emerald-300">{activeToken.x.toFixed(2)}, {activeToken.y.toFixed(2)}</strong></span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 italic font-mono">
              Tip: Hover or click on any token chip to inspect its vocabulary ID and 2D vector coordinate.
            </p>
          )}
        </div>

        {/* Right: 2D Embedding Projection Canvas */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              2D Semantic Vector Embedding Space
            </h3>
            <span className="text-[10px] text-[#c8f135] bg-[#c8f135]/10 border border-[#c8f135]/30 px-2.5 py-0.5 rounded-full font-mono">
              Vocab: 128k
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050705] flex items-center justify-center p-2">
            <canvas
              ref={canvasRef}
              width={420}
              height={320}
              className="w-full h-auto max-h-[320px] rounded-xl cursor-crosshair"
            />
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed space-y-1 font-mono">
            <p>
              In neural transformers, every token ID maps to a learned continuous vector <strong className="text-[#c8f135]">e_i ∈ ℝ^d</strong> (e.g. d = 4,096).
            </p>
            <p className="text-slate-500">
              The canvas illustrates a 2D dimensionality reduction (PCA/t-SNE) where semantically or syntactically aligned tokens cluster near common projection centers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

