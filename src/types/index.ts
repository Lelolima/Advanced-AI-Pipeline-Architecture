// ============================================
// TYPES & INTERFACES - Advanced AI Pipeline
// ============================================

// Tipos de análise
export type AnalysisMode = 'text' | 'image' | 'multimodal' | 'batch';
export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'error';
export type SentimentType = 'positivo' | 'negativo' | 'neutro';

// Configuração do sistema
export interface SystemConfig {
  apiUrl: string;
  timeout: number;
  maxRetries: number;
  autoSave: boolean;
  theme: 'dark' | 'light' | 'auto';
  language: 'pt' | 'en' | 'es';
}

// Pipeline Node
export interface PipelineNode {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  status: 'active' | 'inactive' | 'processing' | 'error';
  metrics?: NodeMetrics;
}

export interface NodeMetrics {
  processingTime: number;
  accuracy: number;
  throughput: number;
  lastUpdated: string;
}

// Análise de Texto
export interface TextAnalysisInput {
  text: string;
  options?: TextAnalysisOptions;
}

export interface TextAnalysisOptions {
  detectSentiment: boolean;
  detectEntities: boolean;
  detectLanguage: boolean;
  calculateStats: boolean;
}

export interface TextAnalysisResult {
  status: AnalysisStatus;
  sentiment: SentimentAnalysis;
  entities: Entity[];
  statistics: TextStatistics;
  embeddings?: number[];
  processingTime: number;
  model: string;
  confidence: number;
}

export interface SentimentAnalysis {
  label: SentimentType;
  score: number;
  scores: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface Entity {
  text: string;
  type: EntityType;
  confidence: number;
  startOffset: number;
  endOffset: number;
}

export type EntityType =
  | 'PERSON'
  | 'ORGANIZATION'
  | 'LOCATION'
  | 'DATE'
  | 'TIME'
  | 'MONEY'
  | 'PERCENT'
  | 'EMAIL'
  | 'URL'
  | 'PHONE';

export interface TextStatistics {
  charCount: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordLength: number;
  averageSentenceLength: number;
  readingTime: number;
  speakingTime: number;
  language?: string;
}

// Análise de Imagem
export interface ImageAnalysisInput {
  image: File | string;
  options?: ImageAnalysisOptions;
}

export interface ImageAnalysisOptions {
  detectObjects: boolean;
  detectFaces: boolean;
  detectText: boolean;
  extractColors: boolean;
}

export interface ImageAnalysisResult {
  status: AnalysisStatus;
  predictions: Prediction[];
  objects?: DetectedObject[];
  faces?: FaceDetection[];
  ocr?: OCRResult;
  colors?: ColorPalette;
  metadata: ImageMetadata;
  processingTime: number;
  model: string;
  confidence: number;
}

export interface Prediction {
  label: string;
  confidence: number;
  categoryId?: string;
  boundingBox?: BoundingBox;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectedObject {
  label: string;
  confidence: number;
  boundingBox: BoundingBox;
}

export interface FaceDetection {
  confidence: number;
  boundingBox: BoundingBox;
  emotions?: EmotionScores;
  landmarks?: FaceLandmarks;
}

export interface EmotionScores {
  happy: number;
  sad: number;
  angry: number;
  surprised: number;
  neutral: number;
}

export interface FaceLandmarks {
  leftEye: Point;
  rightEye: Point;
  nose: Point;
  mouthLeft: Point;
  mouthRight: Point;
}

export interface Point {
  x: number;
  y: number;
}

export interface OCRResult {
  text: string;
  words: OCRWord[];
  lines: OCRLine[];
}

export interface OCRWord {
  text: string;
  confidence: number;
  boundingBox: BoundingBox;
}

export interface OCRLine {
  text: string;
  words: OCRWord[];
}

export interface ColorPalette {
  dominant: Color[];
  accent: Color[];
  average: Color;
}

export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  percentage: number;
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  aspectRatio: number;
}

// Análise Multimodal
export interface MultimodalAnalysisInput {
  text?: string;
  image?: File | string;
  options?: MultimodalOptions;
}

export interface MultimodalOptions {
  fusionStrategy: 'early' | 'late' | 'hybrid';
  attentionWeights?: {
    text: number;
    visual: number;
  };
}

export interface MultimodalAnalysisResult {
  status: AnalysisStatus;
  textAnalysis?: TextAnalysisResult;
  imageAnalysis?: ImageAnalysisResult;
  fusion: FusionResult;
  recommendations: Recommendation[];
  processingTime: number;
}

export interface FusionResult {
  combinedConfidence: number;
  visualWeight: number;
  textWeight: number;
  attentionMap?: AttentionPoint[];
  crossModalAlignment: number;
}

export interface AttentionPoint {
  textRegion: string;
  imageRegion: BoundingBox;
  attentionScore: number;
}

export interface Recommendation {
  type: 'insight' | 'action' | 'warning';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

// Histórico de Análises
export type AnalysisResult =
  | TextAnalysisResult
  | ImageAnalysisResult
  | MultimodalAnalysisResult;

// Batch Processing
export interface BatchJob {
  id: string;
  name: string;
  items: BatchItem[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  results?: BatchResult[];
}

export interface BatchItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface BatchResult {
  itemId: string;
  status: 'success' | 'error';
  result?: AnalysisResult;
  error?: string;
  processingTime: number;
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalAnalyses: number;
  analysesToday: number;
  averageProcessingTime: number;
  successRate: number;
  textAnalyses: number;
  imageAnalyses: number;
  multimodalAnalyses: number;
  historicalData: HistoricalDataPoint[];
}

export interface HistoricalDataPoint {
  date: string;
  count: number;
  averageConfidence: number;
}

// System Status
export interface SystemStatus {
  backend: {
    status: 'online' | 'offline' | 'degraded';
    latency: number;
    version?: string;
  };
  models: ModelStatus[];
  lastCheck: string;
}

export interface ModelStatus {
  name: string;
  status: 'available' | 'loading' | 'error';
  memory?: number;
  gpu?: number;
}

// Export Options
export interface ExportOptions {
  format: 'json' | 'csv' | 'pdf' | 'markdown';
  includeInput: boolean;
  includeMetadata: boolean;
  prettyPrint: boolean;
}

// Event Types
export interface AnalysisEvent {
  type: 'analysis_started' | 'analysis_completed' | 'analysis_failed' | 'export_completed';
  payload: unknown;
  timestamp: string;
}

// Error Types
export interface AnalysisError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  recoverable: boolean;
  suggestion?: string;
}

// API Response Types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: AnalysisError;
  metadata: {
    requestId: string;
    timestamp: string;
    processingTime: number;
  };
}

// Default Config
export const DEFAULT_CONFIG: SystemConfig = {
  apiUrl: 'http://localhost:8000',
  timeout: 30000,
  maxRetries: 3,
  autoSave: true,
  theme: 'dark',
  language: 'pt'
};

// Export AnalysisHistory type explicitly
export interface AnalysisHistory {
  id: string;
  mode: AnalysisMode;
  timestamp: string;
  input: {
    text?: string;
    image?: string;
  };
  result: AnalysisResult;
  duration: number;
  exported?: boolean;
}