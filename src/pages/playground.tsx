import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Layers, 
  BarChart3, 
  Sliders, 
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
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#19191b] border border-white/[0.08] text-[#85858b] text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cc38a]" />
          <span>Interactive laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium text-[#ededed] tracking-tight font-heading">
          Machine learning playground
        </h1>
        <p className="text-sm text-[#a1a1a6] leading-relaxed">
          Interactive computational environments for exploring core optimization algorithms, confusion matrix metrics, neural activation functions, and subword tokenization.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-[#141415] rounded-lg border border-white/[0.08] gap-1 mt-4">
          <button
            onClick={() => setActiveTab('regression')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'regression'
                ? 'bg-[#232325] text-[#ededed]'
                : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.03]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#4cc38a]" /> Gradient descent
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'metrics'
                ? 'bg-[#232325] text-[#ededed]'
                : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.03]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#4cc38a]" /> Confusion matrix
          </button>
          <button
            onClick={() => setActiveTab('activations')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'activations'
                ? 'bg-[#232325] text-[#ededed]'
                : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.03]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#4cc38a]" /> Neural activations
          </button>
          <button
            onClick={() => setActiveTab('tokenizer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'tokenizer'
                ? 'bg-[#232325] text-[#ededed]'
                : 'text-[#85858b] hover:text-[#ededed] hover:bg-white/[0.03]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#4cc38a]" /> LLM tokenizer
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
  const [weights, setWeights] = useState<number[]>([0, 0]);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [epoch, setEpoch] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lossCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateData = () => {
    setIsRunning(false);
    const newPoints: Point[] = [];
    const n = 35;
    for (let i = 0; i < n; i++) {
      const x = (i / n) * 2 - 1;
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

  const predict = (x: number, w: number[]): number => {
    let y = 0;
    for (let d = 0; d < w.length; d++) {
      y += w[d] * Math.pow(x, d);
    }
    return y;
  };

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

    ctx.fillStyle = '#141415';
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

    const toCanvasX = (x: number) => (x + 1) * 0.5 * (width - 40) + 20;
    const toCanvasY = (y: number) => height - ((y + 1) * 0.5 * (height - 40) + 20);

    // Draw Points
    points.forEach((p) => {
      ctx.fillStyle = '#4cc38a';
      ctx.beginPath();
      ctx.arc(toCanvasX(p.x), toCanvasY(p.y), 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Prediction Curve
    ctx.strokeStyle = '#ededed';
    ctx.lineWidth = 2;
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

    ctx.fillStyle = '#141415';
    ctx.fillRect(0, 0, width, height);

    if (lossHistory.length < 2) {
      ctx.fillStyle = '#85858b';
      ctx.font = '11px monospace';
      ctx.fillText('Awaiting training steps', 16, height / 2 + 4);
      return;
    }

    const maxLoss = Math.max(...lossHistory, 0.5);
    const minLoss = 0;

    ctx.strokeStyle = '#4cc38a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    lossHistory.forEach((loss, idx) => {
      const cx = (idx / (lossHistory.length - 1)) * (width - 24) + 12;
      const cy = height - ((loss - minLoss) / (maxLoss - minLoss)) * (height - 24) - 12;
      if (idx === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
  }, [lossHistory]);

  const currentLoss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <h3 className="text-sm font-medium text-[#ededed] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#4cc38a]" />
                Hypothesis function fitting
              </h3>
              <p className="text-xs text-[#85858b] mt-0.5">
                Emerald points represent sample data; solid white curve represents the hypothesis function.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isRunning
                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20'
                    : 'bg-[#4cc38a] text-[#0f0f10] hover:bg-[#5cd499]'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'Pause' : 'Train'}
              </button>
              <button
                onClick={stepGradientDescent}
                disabled={isRunning}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141415] hover:bg-white/[0.04] text-[#ededed] disabled:opacity-40 transition border border-white/[0.08]"
              >
                Single step
              </button>
              <button
                onClick={generateData}
                className="p-1.5 rounded-lg bg-[#141415] hover:bg-white/[0.04] text-[#85858b] hover:text-[#ededed] transition border border-white/[0.08]"
                title="Reset points and weights"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full max-w-2xl h-auto rounded-lg border border-white/[0.06] bg-[#141415]"
            />
          </div>

          {/* Loss Tracking sub-panel */}
          <div className="mt-5 p-4 rounded-lg bg-[#141415] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <p className="text-xs text-[#85858b] font-mono">Iteration epoch</p>
              <p className="text-xl font-medium text-[#ededed] font-mono mt-0.5">{epoch}</p>
            </div>
            <div>
              <p className="text-xs text-[#85858b] font-mono">Mean squared error</p>
              <p className="text-xl font-medium text-[#4cc38a] font-mono mt-0.5">
                {currentLoss > 0 ? currentLoss.toFixed(5) : '0.00000'}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#85858b] mb-1 font-mono">Loss trajectory</p>
              <canvas
                ref={lossCanvasRef}
                width={200}
                height={40}
                className="w-full h-10 rounded border border-white/[0.06] bg-[#141415]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-5">
          <h3 className="text-sm font-medium text-[#ededed] flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <Sliders className="w-4 h-4 text-[#4cc38a]" />
            Hyperparameters
          </h3>

          {/* Learning Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#a1a1a6]">Learning rate (α)</span>
              <span className="text-[#4cc38a]">{learningRate}</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.25"
              step="0.005"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-[#4cc38a] cursor-pointer"
            />
          </div>

          {/* Polynomial Degree */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#a1a1a6]">Polynomial degree</span>
              <span className="text-[#ededed]">
                {degree === 1 ? 'Degree 1 (linear)' : degree === 2 ? 'Degree 2 (quadratic)' : 'Degree 3 (cubic)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  onClick={() => setDegree(d)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition ${
                    degree === d
                      ? 'bg-[#232325] border-white/[0.16] text-[#ededed]'
                      : 'bg-[#141415] border-white/[0.06] text-[#85858b] hover:text-[#ededed]'
                  }`}
                >
                  {d === 1 ? 'Linear' : d === 2 ? 'Quad' : 'Cubic'}
                </button>
              ))}
            </div>
          </div>

          {/* Noise Level */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#a1a1a6]">Dataset variance</span>
              <span className="text-[#ededed]">{Math.round(noise * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.4"
              step="0.02"
              value={noise}
              onChange={(e) => setNoise(parseFloat(e.target.value))}
              className="w-full accent-[#4cc38a] cursor-pointer"
            />
          </div>

          {/* Learned Parameters */}
          <div className="p-3.5 rounded-lg bg-[#141415] border border-white/[0.06] space-y-2">
            <p className="text-xs text-[#85858b] font-mono">Parameter weights vector</p>
            <div className="space-y-1 font-mono text-xs text-[#ededed]">
              {weights.map((w, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-[#85858b]">w_{idx} ({idx === 0 ? 'bias' : `x^${idx}`}):</span>
                  <span className="tabular-nums">{w.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={generateData}
            className="w-full py-2 rounded-lg bg-[#141415] hover:bg-white/[0.04] text-[#a1a1a6] hover:text-[#ededed] text-xs font-medium border border-white/[0.08] transition"
          >
            Regenerate sample points
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

  const mccDenominator = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  const mcc = mccDenominator > 0 ? (tp * tn - fp * fn) / mccDenominator : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* 2x2 Matrix & Sliders */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <h3 className="text-sm font-medium text-[#ededed] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#4cc38a]" />
              Binary classification matrix
            </h3>
            <p className="text-xs text-[#85858b] mt-0.5">
              Adjust sample distributions to observe real-time trade-offs between precision, recall, and harmonic F1.
            </p>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {/* TP */}
            <div className="p-4 rounded-lg bg-[#141415] border border-[#4cc38a]/30 text-center space-y-1">
              <span className="text-[10px] text-[#4cc38a] font-mono">
                True positive (TP)
              </span>
              <p className="text-2xl font-medium text-[#ededed] font-mono tabular-nums">{tp}</p>
              <p className="text-[11px] text-[#85858b]">Correctly predicted positive</p>
            </div>

            {/* FP */}
            <div className="p-4 rounded-lg bg-[#141415] border border-white/[0.08] text-center space-y-1">
              <span className="text-[10px] text-[#85858b] font-mono">
                False positive (FP)
              </span>
              <p className="text-2xl font-medium text-[#ededed] font-mono tabular-nums">{fp}</p>
              <p className="text-[11px] text-[#85858b]">Type I error (False alarm)</p>
            </div>

            {/* FN */}
            <div className="p-4 rounded-lg bg-[#141415] border border-white/[0.08] text-center space-y-1">
              <span className="text-[10px] text-[#85858b] font-mono">
                False negative (FN)
              </span>
              <p className="text-2xl font-medium text-[#ededed] font-mono tabular-nums">{fn}</p>
              <p className="text-[11px] text-[#85858b]">Type II error (Missed)</p>
            </div>

            {/* TN */}
            <div className="p-4 rounded-lg bg-[#141415] border border-white/[0.08] text-center space-y-1">
              <span className="text-[10px] text-[#85858b] font-mono">
                True negative (TN)
              </span>
              <p className="text-2xl font-medium text-[#ededed] font-mono tabular-nums">{tn}</p>
              <p className="text-[11px] text-[#85858b]">Correctly predicted negative</p>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#a1a1a6]">True positives: {tp}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={tp}
                  onChange={(e) => setTp(parseInt(e.target.value))}
                  className="w-full accent-[#4cc38a] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#a1a1a6]">False positives: {fp}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={fp}
                  onChange={(e) => setFp(parseInt(e.target.value))}
                  className="w-full accent-[#4cc38a] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#a1a1a6]">False negatives: {fn}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={fn}
                  onChange={(e) => setFn(parseInt(e.target.value))}
                  className="w-full accent-[#4cc38a] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#a1a1a6]">True negatives: {tn}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={tn}
                  onChange={(e) => setTn(parseInt(e.target.value))}
                  className="w-full accent-[#4cc38a] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Computed Metrics */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-4">
          <h3 className="text-sm font-medium text-[#ededed] flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <Percent className="w-4 h-4 text-[#4cc38a]" />
            Computed metrics
          </h3>

          <div className="space-y-3">
            {/* Accuracy */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#a1a1a6]">Accuracy</span>
                <span className="text-[#ededed] tabular-nums">{(accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-sm bg-[#232325] overflow-hidden">
                <div className="h-full bg-[#4cc38a] rounded-sm transition-all" style={{ width: `${accuracy * 100}%` }} />
              </div>
              <p className="text-[10px] text-[#85858b] font-mono">(TP + TN) / Total</p>
            </div>

            {/* Precision */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#a1a1a6]">Precision (PPV)</span>
                <span className="text-[#ededed] tabular-nums">{(precision * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-sm bg-[#232325] overflow-hidden">
                <div className="h-full bg-[#4cc38a] rounded-sm transition-all" style={{ width: `${precision * 100}%` }} />
              </div>
              <p className="text-[10px] text-[#85858b] font-mono">TP / (TP + FP)</p>
            </div>

            {/* Recall */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#a1a1a6]">Recall (Sensitivity)</span>
                <span className="text-[#ededed] tabular-nums">{(recall * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-sm bg-[#232325] overflow-hidden">
                <div className="h-full bg-[#4cc38a] rounded-sm transition-all" style={{ width: `${recall * 100}%` }} />
              </div>
              <p className="text-[10px] text-[#85858b] font-mono">TP / (TP + FN)</p>
            </div>

            {/* Specificity */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#a1a1a6]">Specificity (TNR)</span>
                <span className="text-[#ededed] tabular-nums">{(specificity * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-sm bg-[#232325] overflow-hidden">
                <div className="h-full bg-[#85858b] rounded-sm transition-all" style={{ width: `${specificity * 100}%` }} />
              </div>
              <p className="text-[10px] text-[#85858b] font-mono">TN / (TN + FP)</p>
            </div>

            {/* F1 Score */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#a1a1a6]">F1-Score</span>
                <span className="text-[#4cc38a] tabular-nums">{(f1Score * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-sm bg-[#232325] overflow-hidden">
                <div className="h-full bg-[#4cc38a] rounded-sm transition-all" style={{ width: `${f1Score * 100}%` }} />
              </div>
              <p className="text-[10px] text-[#85858b] font-mono">2 × (Prec × Rec) / (Prec + Rec)</p>
            </div>

            {/* MCC */}
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06] space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#a1a1a6]">Matthews correlation (MCC)</span>
                <span className="text-[#ededed] tabular-nums">{mcc.toFixed(3)}</span>
              </div>
              <p className="text-[10px] text-[#85858b] font-mono">
                Bounded in [-1, +1], robust against class imbalance.
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
      name: 'Rectified linear unit (ReLU)',
      formula: 'f(x) = max(0, x)',
      derivative: "f'(x) = 1 if x > 0 else 0",
      eval: (x: number) => Math.max(0, x),
      derivEval: (x: number) => (x > 0 ? 1 : 0),
      description: 'Standard activation for convolutional backbones. Fast computation; subject to dying neurons under negative gradients.',
      usage: 'CNN backbones, feedforward layers'
    },
    sigmoid: {
      name: 'Logistic sigmoid',
      formula: 'σ(x) = 1 / (1 + e^(-x))',
      derivative: "σ'(x) = σ(x)(1 - σ(x))",
      eval: (x: number) => 1 / (1 + Math.exp(-x)),
      derivEval: (x: number) => {
        const s = 1 / (1 + Math.exp(-x));
        return s * (1 - s);
      },
      description: 'Maps real values into (0, 1). Used in binary classification heads and recurrent gating mechanisms.',
      usage: 'Binary classification heads, gating (LSTM/GRU)'
    },
    tanh: {
      name: 'Hyperbolic tangent (Tanh)',
      formula: 'tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
      derivative: "tanh'(x) = 1 - tanh^2(x)",
      eval: (x: number) => Math.tanh(x),
      derivEval: (x: number) => 1 - Math.pow(Math.tanh(x), 2),
      description: 'Zero-centered function mapping inputs to (-1, 1). Improves convergence over standard sigmoid in recurrent cells.',
      usage: 'Recurrent cells (RNN), hidden state modulation'
    },
    gelu: {
      name: 'Gaussian error linear unit (GELU)',
      formula: 'GELU(x) = x · Φ(x) ≈ 0.5x(1 + tanh(√(2/π)(x + 0.044715x^3)))',
      derivative: "Smooth probabilistic gate",
      eval: (x: number) => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))),
      derivEval: (x: number) => {
        const c = Math.sqrt(2 / Math.PI);
        const inner = c * (x + 0.044715 * Math.pow(x, 3));
        const tanhVal = Math.tanh(inner);
        const sech2 = 1 - tanhVal * tanhVal;
        return 0.5 * (1 + tanhVal) + 0.5 * x * sech2 * c * (1 + 3 * 0.044715 * x * x);
      },
      description: 'Smooth, non-monotonic probabilistic activation. Standard choice across transformer architectures (BERT, GPT, Llama).',
      usage: 'Transformers, modern autoregressive LLMs'
    },
    leaky: {
      name: 'Leaky ReLU',
      formula: 'f(x) = max(0.01x, x)',
      derivative: "f'(x) = 1 if x > 0 else 0.01",
      eval: (x: number) => (x > 0 ? x : 0.05 * x),
      derivEval: (x: number) => (x > 0 ? 1 : 0.05),
      description: 'Permits a small non-zero gradient for negative inputs to prevent dead activation pathways.',
      usage: 'Discriminator models, deep feedforward networks'
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

    ctx.fillStyle = '#141415';
    ctx.fillRect(0, 0, width, height);

    // Axes
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
    ctx.strokeStyle = '#4cc38a';
    ctx.lineWidth = 2;
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
    ctx.strokeStyle = '#85858b';
    ctx.lineWidth = 1.5;
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Canvas Area */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08]">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
            <div>
              <h3 className="text-sm font-medium text-[#ededed] font-heading">{current.name}</h3>
              <p className="text-xs text-[#85858b]">Transfer function and derivative trajectory</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#4cc38a]">
                <span className="w-3 h-0.5 bg-[#4cc38a] inline-block"></span>
                f(x) activation
              </span>
              <span className="flex items-center gap-1.5 text-[#85858b]">
                <span className="w-3 h-0.5 border-b border-dashed border-[#85858b] inline-block"></span>
                f'(x) derivative
              </span>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full max-w-2xl h-auto rounded-lg border border-white/[0.06] bg-[#141415]"
            />
          </div>
        </div>
      </div>

      {/* Function Details & Switcher */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-4">
          <h3 className="text-xs text-[#85858b] uppercase tracking-wider font-mono border-b border-white/[0.08] pb-3">
            Activation function
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {(Object.keys(activationFunctions) as Array<keyof typeof activationFunctions>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedFunc(key)}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono text-center border transition ${
                  selectedFunc === key
                    ? 'bg-[#232325] border-white/[0.16] text-[#ededed]'
                    : 'bg-[#141415] border-white/[0.06] text-[#85858b] hover:text-[#ededed]'
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06]">
              <p className="text-[10px] text-[#85858b] font-mono mb-0.5">Mathematical formula</p>
              <p className="font-mono text-xs text-[#4cc38a]">{current.formula}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06]">
              <p className="text-[10px] text-[#85858b] font-mono mb-0.5">Analytical derivative</p>
              <p className="font-mono text-xs text-[#ededed]">{current.derivative}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.06]">
              <p className="text-[10px] text-[#85858b] font-mono mb-0.5">Primary domains</p>
              <p className="text-xs text-[#a1a1a6] font-mono">{current.usage}</p>
            </div>

            <p className="text-xs text-[#85858b] leading-relaxed pt-1">
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
    name: 'LoRA Loss Formulation',
    text: 'Loss_PEFT = ||W_0*x + (alpha / r) * B * A * x - y||^2',
  },
  {
    name: 'Multilingual AI',
    text: 'Nairobi ni kitovu cha teknolojia na mifumo ya kisasa ya akili unde barani Afrika.',
  },
];

const TOKEN_PALETTE = [
  { bg: 'bg-[#19191b] text-[#ededed] border-white/[0.12]', hex: '#ededed' },
  { bg: 'bg-[#141415] text-[#4cc38a] border-[#4cc38a]/30', hex: '#4cc38a' },
  { bg: 'bg-[#19191b] text-[#a1a1a6] border-white/[0.08]', hex: '#a1a1a6' },
  { bg: 'bg-[#232325] text-[#ededed] border-white/[0.16]', hex: '#ffffff' },
  { bg: 'bg-[#141415] text-[#4cc38a]/80 border-[#4cc38a]/20', hex: '#34d399' },
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
      const color = TOKEN_PALETTE[i % TOKEN_PALETTE.length];
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

  const regex = /(\s+|[a-zA-Z]+|[0-9]+|[^\s\w])/g;
  let match;
  let tokenIdx = 0;

  while ((match = regex.exec(input)) !== null) {
    const chunk = match[0];
    const startIndex = match.index;

    if (/^\s+$/.test(chunk)) {
      if (mode === 'bpe') {
        const id = djb2Hash(chunk) % 128000;
        const color = TOKEN_PALETTE[tokenIdx % TOKEN_PALETTE.length];
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
      const color = TOKEN_PALETTE[tokenIdx % TOKEN_PALETTE.length];
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

    ctx.fillStyle = '#141415';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = 0.25; r <= 1.0; r += 0.25) {
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

    ctx.fillStyle = '#85858b';
    ctx.font = '10px monospace';
    ctx.fillText('Embedding dim 1', width - 110, centerY - 6);
    ctx.fillText('Embedding dim 2', centerX + 8, 16);

    tokens.forEach((token, idx) => {
      const px = centerX + token.x * scale;
      const py = centerY + token.y * scale;
      const isHovered = hoveredTokenIndex === idx || selectedTokenIndex === idx;

      ctx.beginPath();
      ctx.arc(px, py, isHovered ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#4cc38a' : token.colorHex;
      ctx.fill();

      if (isHovered) {
        ctx.fillStyle = '#ededed';
        ctx.font = '11px monospace';
        ctx.fillText(`${token.display} [id:${token.id}]`, px + 8, py - 6);
      }
    });
  }, [tokens, hoveredTokenIndex, selectedTokenIndex]);

  const handleCopyTokens = () => {
    const list = tokens.map((t) => t.display);
    navigator.clipboard.writeText(JSON.stringify(list, null, 2));
    setCopiedState('strings');
    showToast('Token strings copied as JSON array', 'success');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleCopyIds = () => {
    const ids = tokens.map((t) => t.id);
    navigator.clipboard.writeText(JSON.stringify(ids));
    setCopiedState('ids');
    showToast('Token IDs copied as array', 'success');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const activeToken = selectedTokenIndex !== null ? tokens[selectedTokenIndex] : hoveredTokenIndex !== null ? tokens[hoveredTokenIndex] : null;

  return (
    <div className="space-y-6">
      {/* Top Controls & Presets */}
      <div className="bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-medium text-[#ededed] flex items-center gap-2 font-heading">
              <Cpu className="w-4 h-4 text-[#4cc38a]" />
              Subword tokenizer and projection
            </h2>
            <p className="text-xs text-[#85858b] mt-0.5">
              Simulate character decomposition into subword vocabulary vectors across tokenization algorithms.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-xs text-[#85858b]">Tokenizer:</span>
            <select
              value={tokenizerMode}
              onChange={(e) => setTokenizerMode(e.target.value as any)}
              className="bg-[#141415] border border-white/[0.08] rounded-lg px-3 py-1 text-xs text-[#ededed] focus:outline-none focus:border-[#4cc38a]"
            >
              <option value="bpe">Byte-pair encoding (BPE)</option>
              <option value="wordpiece">WordPiece</option>
              <option value="char">Character-level</option>
            </select>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.08]">
          <span className="text-xs text-[#85858b] mr-1">Presets:</span>
          {PRESET_TEXTS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setInputText(preset.text)}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#141415] border border-white/[0.08] text-[#85858b] hover:text-[#ededed] hover:border-white/[0.16] transition"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Input Textarea */}
        <div>
          <label className="block text-xs text-[#85858b] font-mono mb-1.5">
            Input prompt buffer
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Type prompt or code to inspect subword tokens..."
            className="w-full bg-[#141415] border border-white/[0.08] rounded-lg p-3 text-xs font-mono text-[#ededed] focus:outline-none focus:border-[#4cc38a] transition leading-relaxed resize-y"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-[#141415] border border-white/[0.06] text-center font-mono">
          <div>
            <p className="text-[10px] text-[#85858b]">Total tokens</p>
            <p className="text-xl font-medium text-[#4cc38a] mt-0.5 tabular-nums">{tokenCount}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#85858b]">Characters</p>
            <p className="text-xl font-medium text-[#ededed] mt-0.5 tabular-nums">{charCount}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#85858b]">Chars / token</p>
            <p className="text-xl font-medium text-[#ededed] mt-0.5 tabular-nums">{ratio}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#85858b]">Window usage (8k)</p>
            <p className="text-xl font-medium text-[#ededed] mt-0.5 tabular-nums">{contextPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Token Stream Visualizer & 2D Vector Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Token Chips Display */}
        <div className="lg:col-span-7 bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-xs text-[#85858b] flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#4cc38a]" />
              Tokenized stream ({tokens.length} subwords)
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTokens}
                className="px-2.5 py-1 rounded-md bg-[#141415] border border-white/[0.08] text-[11px] text-[#85858b] hover:text-[#ededed] flex items-center gap-1.5 transition"
              >
                {copiedState === 'strings' ? <Check className="w-3 h-3 text-[#4cc38a]" /> : <Copy className="w-3 h-3" />}
                Copy tokens
              </button>
              <button
                onClick={handleCopyIds}
                className="px-2.5 py-1 rounded-md bg-[#141415] border border-white/[0.08] text-[11px] text-[#85858b] hover:text-[#ededed] flex items-center gap-1.5 transition"
              >
                {copiedState === 'ids' ? <Check className="w-3 h-3 text-[#4cc38a]" /> : <Copy className="w-3 h-3" />}
                Copy IDs
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#141415] border border-white/[0.06] min-h-[140px] flex flex-wrap gap-1.5 items-start content-start font-mono text-xs leading-relaxed">
            {tokens.length === 0 ? (
              <span className="text-[#85858b]">Enter text above to inspect tokens</span>
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
                    className={`px-2 py-0.5 rounded-md border cursor-pointer transition ${token.colorClass} ${
                      isSelected || isHovered
                        ? 'border-[#4cc38a] text-[#ededed] bg-[#232325]'
                        : 'opacity-90'
                    }`}
                    title={`Token: "${token.display}" | ID: ${token.id}`}
                  >
                    {token.display}
                  </span>
                );
              })
            )}
          </div>

          {/* Active Token Inspector Bar */}
          {activeToken ? (
            <div className="p-3 rounded-lg bg-[#141415] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#85858b] font-mono">Selected:</span>
                <span className="font-mono text-[#4cc38a] bg-[#19191b] px-2 py-0.5 rounded border border-white/[0.08]">
                  {activeToken.display}
                </span>
                <span className="text-[#85858b] text-[11px] font-mono">({activeToken.raw.length} bytes)</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[#a1a1a6]">
                <span>ID: <strong className="text-[#ededed]">{activeToken.id}</strong></span>
                <span>Coordinate: <strong className="text-[#ededed]">{activeToken.x.toFixed(2)}, {activeToken.y.toFixed(2)}</strong></span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-[#85858b] font-mono">
              Hover or select a token to inspect its vocabulary index and embedding coordinate.
            </p>
          )}
        </div>

        {/* Right: 2D Embedding Projection Canvas */}
        <div className="lg:col-span-5 bg-[#19191b] p-5 sm:p-6 rounded-xl border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-xs text-[#85858b]">
              2D semantic vector projection
            </h3>
            <span className="text-[10px] text-[#85858b] bg-[#141415] border border-white/[0.08] px-2 py-0.5 rounded font-mono">
              Vocab: 128k
            </span>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-white/[0.06] bg-[#141415] flex items-center justify-center p-2">
            <canvas
              ref={canvasRef}
              width={420}
              height={300}
              className="w-full h-auto max-h-[300px] rounded"
            />
          </div>

          <div className="text-[11px] text-[#85858b] leading-relaxed space-y-1 font-mono">
            <p>
              In transformer architectures, every vocabulary token ID projects into an embedding space <strong className="text-[#ededed]">e_i ∈ ℝ^d</strong>.
            </p>
            <p>
              Dimensionally reduced representation demonstrates token alignment in local semantic subspaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
