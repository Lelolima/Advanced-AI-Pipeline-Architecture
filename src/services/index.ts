// ============================================
// SERVICES LAYER - Advanced AI Pipeline
// ============================================

import type {
  TextAnalysisInput,
  TextAnalysisResult,
  ImageAnalysisInput,
  ImageAnalysisResult,
  MultimodalAnalysisInput,
  MultimodalAnalysisResult,
  AnalysisHistory,
  SystemStatus,
  DashboardMetrics,
  SystemConfig,
  DEFAULT_CONFIG,
} from '../types';

// ============================================
// API Service - HTTP Client
// ============================================

class ApiService {
  private baseUrl: string;
  private timeout: number;
  private headers: HeadersInit;

  constructor(config: Partial<SystemConfig> = {}) {
    this.baseUrl = config.apiUrl || DEFAULT_CONFIG.apiUrl;
    this.timeout = config.timeout || DEFAULT_CONFIG.timeout;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: { ...this.headers, ...options.headers },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, unknown>): Promise<T> {
    const formData = new FormData();
    formData.append('image', file);
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  updateConfig(config: Partial<SystemConfig>) {
    if (config.apiUrl) this.baseUrl = config.apiUrl;
    if (config.timeout) this.timeout = config.timeout;
  }
}

// ============================================
// Text Analysis Service
// ============================================

class TextAnalysisService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  async analyze(input: TextAnalysisInput): Promise<TextAnalysisResult> {
    const startTime = performance.now();

    try {
      const result = await this.api.post<TextAnalysisResult>('/analyze/text', {
        text: input.text,
        options: input.options,
      });

      return {
        ...result,
        processingTime: performance.now() - startTime,
      };
    } catch (error) {
      // Fallback local
      const localResult = this.analyzeLocal(input);
      return {
        ...localResult,
        processingTime: performance.now() - startTime,
        model: 'local-fallback',
      };
    }
  }

  private analyzeLocal(input: TextAnalysisInput): TextAnalysisResult {
    const text = input.text;

    // Análise de sentimento baseada em palavras-chave
    const positiveWords = [
      'bom', 'ótimo', 'excelente', 'feliz', 'amor', 'maravilhoso',
      'positivo', 'sucesso', 'alegria', 'belo', 'incrível', 'fantástico',
      ' perfeito', 'satisfatório', 'agradável', 'bom', 'ótimo', 'maravilha'
    ];
    const negativeWords = [
      'ruim', 'péssimo', 'triste', 'ódio', 'negativo', 'fracasso',
      'dor', 'medo', 'raiva', 'horror', 'terrível', 'ódio', 'péssimo',
      'desagradável', 'decepcionante', 'frustrante'
    ];

    const textLower = text.toLowerCase();
    const posCount = positiveWords.filter(w => textLower.includes(w)).length;
    const negCount = negativeWords.filter(w => textLower.includes(w)).length;

    let label: 'positivo' | 'negativo' | 'neutro' = 'neutro';
    if (posCount > negCount) label = 'positivo';
    if (negCount > posCount) label = 'negativo';

    const total = posCount + negCount || 1;
    const score = Math.abs(posCount - negCount) / total;

    // Estatísticas de texto
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

    const charCount = text.length;
    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const paragraphCount = paragraphs.length;
    const avgWordLength = wordCount > 0 ? text.replace(/\s/g, '').length / wordCount : 0;
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    const readingTime = Math.ceil(wordCount / 200 * 60); // 200 palavras/min
    const speakingTime = Math.ceil(wordCount / 130 * 60); // 130 palavras/min

    // Extração de entidades
    const entities = this.extractEntities(text);

    return {
      status: 'success',
      sentiment: {
        label,
        score: Math.min(score, 1),
        scores: {
          positive: posCount / total,
          negative: negCount / total,
          neutral: 1 - (posCount + negCount) / total,
        },
      },
      entities,
      statistics: {
        charCount,
        wordCount,
        sentenceCount,
        paragraphCount,
        averageWordLength: Math.round(avgWordLength * 10) / 10,
        averageSentenceLength: Math.round(avgSentenceLength * 10) / 10,
        readingTime,
        speakingTime,
        language: this.detectLanguage(text),
      },
      confidence: label === 'neutro' ? 0.5 : 0.5 + score * 0.5,
      processingTime: 0,
      model: 'local-nlp',
    };
  }

  private extractEntities(text: string): Array<{
    text: string;
    type: string;
    confidence: number;
    startOffset: number;
    endOffset: number;
  }> {
    const entities: Array<{
      text: string;
      type: string;
      confidence: number;
      startOffset: number;
      endOffset: number;
    }> = [];

    // Emails
    const emailRegex = /\b[\w.-]+@[\w.-]+\.\w+\b/g;
    let match;
    while ((match = emailRegex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'EMAIL',
        confidence: 0.95,
        startOffset: match.index,
        endOffset: match.index + match[0].length,
      });
    }

    // URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    while ((match = urlRegex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'URL',
        confidence: 0.95,
        startOffset: match.index,
        endOffset: match.index + match[0].length,
      });
    }

    // Datas (DD/MM/AAAA)
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g;
    while ((match = dateRegex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'DATE',
        confidence: 0.85,
        startOffset: match.index,
        endOffset: match.index + match[0].length,
      });
    }

    // Nomes próprios (simplificado)
    const properNounRegex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
    while ((match = properNounRegex.exec(text)) !== null) {
      if (match[0].length > 2) {
        entities.push({
          text: match[0],
          type: 'PERSON',
          confidence: 0.6,
          startOffset: match.index,
          endOffset: match.index + match[0].length,
        });
      }
    }

    return entities.slice(0, 20);
  }

  private detectLanguage(text: string): string {
    // Detecção simples baseada em palavras comuns
    const ptWords = ['de', 'que', 'o', 'a', 'um', 'uma', 'para', 'com', 'não', 'se'];
    const enWords = ['the', 'of', 'and', 'to', 'a', 'in', 'for', 'is', 'on', 'that'];

    const textLower = text.toLowerCase();
    const ptCount = ptWords.filter(w => textLower.includes(` ${w} `)).length;
    const enCount = enWords.filter(w => textLower.includes(` ${w} `)).length;

    return ptCount >= enCount ? 'pt-BR' : 'en';
  }
}

// ============================================
// Image Analysis Service
// ============================================

class ImageAnalysisService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  async analyze(input: ImageAnalysisInput): Promise<ImageAnalysisResult> {
    const startTime = performance.now();

    try {
      if (input.image instanceof File) {
        const result = await this.api.upload<ImageAnalysisResult>(
          '/analyze/image',
          input.image,
          input.options
        );
        return {
          ...result,
          processingTime: performance.now() - startTime,
        };
      }
    } catch (error) {
      // Fallback local
    }

    // Análise local de metadados
    const localResult = await this.analyzeLocal(input);
    return {
      ...localResult,
      processingTime: performance.now() - startTime,
      model: 'local-fallback',
    };
  }

  private async analyzeLocal(input: ImageAnalysisInput): Promise<ImageAnalysisResult> {
    const file = input.image instanceof File ? input.image : null;

    if (!file) {
      throw new Error('No image file provided');
    }

    // Extrair metadados básicos
    const metadata = await this.extractImageMetadata(file);

    return {
      status: 'success',
      predictions: [
        { label: 'análise_local', confidence: 0.5 },
        { label: 'metadados_extruidos', confidence: 0.8 },
        { label: 'backend_necessario', confidence: 1.0 },
      ],
      metadata,
      confidence: 0.5,
      processingTime: 0,
      model: 'local-metadata',
    };
  }

  private async extractImageMetadata(file: File): Promise<{
    width: number;
    height: number;
    format: string;
    size: number;
    aspectRatio: number;
  }> {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: img.width,
          height: img.height,
          format: file.type.split('/')[1] || 'unknown',
          size: file.size,
          aspectRatio: Math.round((img.width / img.height) * 100) / 100,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: 0,
          height: 0,
          format: 'unknown',
          size: file.size,
          aspectRatio: 0,
        });
      };

      img.src = url;
    });
  }
}

// ============================================
// Multimodal Analysis Service
// ============================================

class MultimodalAnalysisService {
  private api: ApiService;
  private textService: TextAnalysisService;
  private imageService: ImageAnalysisService;

  constructor(api: ApiService) {
    this.api = api;
    this.textService = new TextAnalysisService(api);
    this.imageService = new ImageAnalysisService(api);
  }

  async analyze(input: MultimodalAnalysisInput): Promise<MultimodalAnalysisResult> {
    const startTime = performance.now();

    try {
      const result = await this.api.post<MultimodalAnalysisResult>(
        '/analyze/multimodal',
        {
          text: input.text,
          image_data: input.image instanceof File ? await this.fileToBase64(input.image) : input.image,
          options: input.options,
        }
      );

      return {
        ...result,
        processingTime: performance.now() - startTime,
      };
    } catch (error) {
      // Fallback local - análise combinada
    }

    return this.analyzeLocal(input, startTime);
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private async analyzeLocal(
    input: MultimodalAnalysisInput,
    startTime: number
  ): Promise<MultimodalAnalysisResult> {
    const hasText = !!input.text?.trim();
    const hasImage = !!input.image;

    // Pesos baseados nos inputs disponíveis
    const visualWeight = hasImage ? 0.5 : 0;
    const textWeight = hasText ? 0.5 : 0;
    const combinedConfidence = visualWeight + textWeight > 0
      ? (visualWeight + textWeight) / 2 * 0.8 + 0.2
      : 0;

    let recommendation = '';
    if (visualWeight > textWeight) {
      recommendation = 'Ênfase em análise visual recomendada. Considere adicionar mais contexto textual.';
    } else if (textWeight > visualWeight) {
      recommendation = 'Ênfase em análise textual recomendada. Considere adicionar imagens ilustrativas.';
    } else if (visualWeight === textWeight && visualWeight > 0) {
      recommendation = 'Análise equilibrada. Ambos os modalidades estão bem representados.';
    } else {
      recommendation = 'Forneça texto e/ou imagem para análise.';
    }

    return {
      status: 'success',
      fusion: {
        combinedConfidence: Math.round(combinedConfidence * 100) / 100,
        visualWeight,
        textWeight,
        crossModalAlignment: hasText && hasImage ? 0.75 : 0,
      },
      recommendations: [
        {
          type: 'insight',
          title: 'Composição Multimodal',
          description: recommendation,
          confidence: combinedConfidence,
          priority: hasText && hasImage ? 'high' : 'medium',
        },
      ],
      processingTime: performance.now() - startTime,
    };
  }
}

// ============================================
// System Service
// ============================================

class SystemService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  async getStatus(): Promise<SystemStatus> {
    try {
      const health = await this.api.get<{ status: string; version?: string }>('/health');

      return {
        backend: {
          status: 'online',
          latency: await this.measureLatency(),
          version: health.version,
        },
        models: [
          { name: 'CNN (EfficientNet)', status: 'available' },
          { name: 'LLM (BERT)', status: 'available' },
          { name: 'RNN (LSTM)', status: 'available' },
          { name: 'Fusion Model', status: 'available' },
        ],
        lastCheck: new Date().toISOString(),
      };
    } catch (error) {
      return {
        backend: {
          status: 'offline',
          latency: -1,
        },
        models: [
          { name: 'CNN (EfficientNet)', status: 'error' },
          { name: 'LLM (BERT)', status: 'error' },
          { name: 'RNN (LSTM)', status: 'error' },
          { name: 'Fusion Model', status: 'error' },
        ],
        lastCheck: new Date().toISOString(),
      };
    }
  }

  private async measureLatency(): Promise<number> {
    const start = performance.now();
    try {
      await fetch(`${this.api['baseUrl']}/health`, { method: 'GET' });
      return Math.round(performance.now() - start);
    } catch {
      return -1;
    }
  }
}

// ============================================
// Export Services
// ============================================

export function createServices(config?: Partial<SystemConfig>) {
  const api = new ApiService(config);

  return {
    text: new TextAnalysisService(api),
    image: new ImageAnalysisService(api),
    multimodal: new MultimodalAnalysisService(api),
    system: new SystemService(api),
    api,
  };
}

export type Services = ReturnType<typeof createServices>;

// Re-export types for convenience
export type {
  SystemConfig,
  TextAnalysisInput,
  TextAnalysisResult,
  ImageAnalysisInput,
  ImageAnalysisResult,
  MultimodalAnalysisInput,
  MultimodalAnalysisResult,
  AnalysisHistory,
  DashboardMetrics,
} from '../types';