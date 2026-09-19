export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Computer Vision' | 'NLP & LLMs' | 'Predictive Analytics' | 'MLOps & Systems';
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  architectureHighlights: string[];
  gradient: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'neurovision-medical-segmentation',
    title: 'NeuroVision: 3D MRI Brain Tumor Segmentation',
    subtitle: 'Deep volumetric image segmentation using 3D U-Net and PyTorch on BraTS benchmark.',
    description: 'An end-to-end deep learning framework for multi-modal brain lesion segmentation from 3D MRI scans (T1, T2, FLAIR). Features deep supervision, Dice + Focal loss hybrid objective, and sub-second volumetric inference.',
    category: 'Computer Vision',
    techStack: ['PyTorch', '3D U-Net', 'MONAI', 'CUDA', 'FastAPI', 'Docker'],
    metrics: [
      { label: 'Dice Score', value: '91.8%' },
      { label: 'Inference Time', value: '380ms' },
      { label: 'Dataset Size', value: '1,250 Vol.' },
      { label: 'Model Params', value: '18.4M' }
    ],
    githubUrl: 'https://github.com/davis-ai/neurovision-segmentation',
    liveUrl: 'https://demo.davis-ai.dev/neurovision',
    featured: true,
    architectureHighlights: [
      'Residual 3D convolutions with squeeze-and-excitation attention blocks.',
      'Mixed precision (AMP) training with gradient accumulation.',
      'Exported to ONNX and compiled via TensorRT for edge clinical workstations.'
    ],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'pulseai-market-sentiment',
    title: 'PulseAI: Real-Time Financial Sentiment Engine',
    subtitle: 'Streaming sentiment & entity recognition analyzing 50,000+ daily market news articles.',
    description: 'High-throughput streaming NLP pipeline that ingests financial headlines, SEC filings, and earnings call transcripts in real-time, extracting ticker sentiment signals with custom FinBERT embeddings.',
    category: 'NLP & LLMs',
    techStack: ['Python', 'FinBERT', 'Apache Kafka', 'Redis', 'FastAPI', 'Grafana'],
    metrics: [
      { label: 'Throughput', value: '2.5k msg/s' },
      { label: 'F1 Sentiment', value: '94.2%' },
      { label: 'Latency P99', value: '14ms' },
      { label: 'Tickers Tracked', value: '3,200+' }
    ],
    githubUrl: 'https://github.com/davis-ai/pulseai-market-sentiment',
    liveUrl: 'https://demo.davis-ai.dev/pulseai',
    featured: true,
    architectureHighlights: [
      'Distributed Kafka ingestion with sliding time-window aggregations.',
      'Quantized INT8 FinBERT serving via Triton Inference Server.',
      'Prometheus and Grafana dashboards for real-time model drift monitoring.'
    ],
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'optiroute-rl-logistics',
    title: 'OptiRoute: Reinforcement Learning Fleet Optimizer',
    subtitle: 'Dynamic vehicle routing and delivery optimization using Deep Q-Networks (DQN).',
    description: 'Autonomous dispatching and multi-agent routing algorithm that dynamically balances delivery windows, driver rest periods, and live traffic congestion to cut delivery fuel costs by 18.5%.',
    category: 'Predictive Analytics',
    techStack: ['Python', 'Stable-Baselines3', 'Gymnasium', 'PostGIS', 'React', 'Mapbox'],
    metrics: [
      { label: 'Fuel Reduction', value: '-18.5%' },
      { label: 'Fleet Size', value: '450 Vans' },
      { label: 'Daily Stops', value: '12,000+' },
      { label: 'Re-route Time', value: '< 2.0s' }
    ],
    githubUrl: 'https://github.com/davis-ai/optiroute-fleet-optimizer',
    liveUrl: 'https://demo.davis-ai.dev/optiroute',
    featured: true,
    architectureHighlights: [
      'Custom Gymnasium simulation environment modelling traffic stochasticity.',
      'Proximal Policy Optimization (PPO) with spatial graph embeddings.',
      'Interactive Mapbox web dashboard with real-time route animations.'
    ],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'datacanvas-eda-profiler',
    title: 'DataCanvas: Automated Exploratory Data Engine',
    subtitle: 'Zero-config tabular data profiler, anomaly detector, and automated baseline model benchmark.',
    description: 'An open-source desktop & web app that automatically parses multi-gigabyte CSV/Parquet files, detects data distribution shifts, generates statistical summaries, and trains 6 baseline ML models with 1 click.',
    category: 'MLOps & Systems',
    techStack: ['Python', 'Polars', 'Scikit-learn', 'FastAPI', 'React', 'WebAssembly'],
    metrics: [
      { label: 'Parse Speed', value: '1.2 GB/s' },
      { label: 'GitHub Stars', value: '850+' },
      { label: 'Zero Config', value: '1-Click' },
      { label: 'Formats', value: 'CSV/Parquet' }
    ],
    githubUrl: 'https://github.com/davis-ai/datacanvas-profiler',
    liveUrl: 'https://datacanvas.davis-ai.dev',
    featured: false,
    architectureHighlights: [
      'Ultra-fast columnar analytics powered by Rust-backed Polars.',
      'Automated feature correlation matrix and collinearity detection.',
      'Generates exportable PDF & HTML executive reports.'
    ],
    gradient: 'from-purple-500/20 via-pink-500/10 to-transparent'
  },
  {
    id: 'churnguard-saas-retention',
    title: 'ChurnGuard: Enterprise Retention Intelligence',
    subtitle: 'Survival analysis and interpretable customer risk scoring platform.',
    description: 'SaaS product intelligence pipeline identifying at-risk B2B accounts up to 60 days before contract renewal using Cox Proportional Hazards and XGBoost with automated Slack notification triggers.',
    category: 'Predictive Analytics',
    techStack: ['Python', 'Lifelines', 'XGBoost', 'SHAP', 'PostgreSQL', 'TailwindCSS'],
    metrics: [
      { label: 'Lead Time', value: '60 Days' },
      { label: 'AUC-ROC', value: '0.892' },
      { label: 'ARR Saved', value: '$420k/yr' },
      { label: 'Accuracy', value: '93.4%' }
    ],
    githubUrl: 'https://github.com/davis-ai/churnguard-enterprise',
    featured: false,
    architectureHighlights: [
      'Time-varying covariate survival regression for subscription life cycles.',
      'Automated weekly email digests summarizing highest-risk enterprise accounts.',
      'Local SHAP waterfall breakdown for customer success agents.'
    ],
    gradient: 'from-amber-500/20 via-rose-500/10 to-transparent'
  }
];
