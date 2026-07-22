# 🧠 Advanced AI Pipeline Architecture

Sistema profissional de análise multimodal com arquitetura enterprise-grade.

## 🚀 Tecnologias

- **Frontend:** React 18 • TypeScript • Vite • Tailwind CSS
- **Backend:** FastAPI • TensorFlow • PyTorch
- **Modelos:** CNN (EfficientNet) • LLM (BERT) • RNN (LSTM) • Fusion Model

---

## 📊 Fluxo de Governança de Tarefas

<!-- SVG 1: Task Governance State Flow -->
<svg width="800" height="280" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#2563eb"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#d97706"/>
    </linearGradient>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ec4899"/>
      <stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#4f46e5"/>
    </linearGradient>
    <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#10b981"/>
      <stop offset="100%" style="stop-color:#059669"/>
    </linearGradient>
  </defs>

  <rect width="800" height="280" fill="#f8fafc" rx="12"/>
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">🔄 Task Governance State Flow</text>

  <g transform="translate(40, 70)">
    <rect width="130" height="50" rx="8" fill="url(#g1)" opacity="0.15">
      <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="#2563eb">Active</text>
  </g>

  <g transform="translate(200, 70)">
    <rect width="130" height="50" rx="8" fill="url(#g2)" opacity="0.15">
      <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" begin="0.3s" repeatCount="indefinite"/>
    </rect>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="#d97706">Planned</text>
  </g>

  <g transform="translate(360, 70)">
    <rect width="130" height="50" rx="8" fill="url(#g3)" opacity="0.15"/>
    <circle cx="65" cy="25" r="18" fill="none" stroke="#ec4899" stroke-width="2">
      <animate attributeName="r" values="15;22;15" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="#db2777">Awaiting</text>
  </g>

  <g transform="translate(520, 70)">
    <rect width="130" height="50" rx="8" fill="url(#g4)" opacity="0.15">
      <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1s" repeatCount="indefinite"/>
    </rect>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="#4f46e5">Executing</text>
  </g>

  <g transform="translate(200, 170)">
    <rect width="130" height="50" rx="8" fill="url(#g5)" opacity="0.15"/>
    <text x="65" y="28" text-anchor="middle" font-size="13" font-weight="600" fill="#059669">✅ Validated</text>
    <path d="M95 22 L100 27 L110 17" stroke="#059669" stroke-width="2.5" fill="none"/>
  </g>

  <g transform="translate(520, 170)">
    <rect width="130" height="50" rx="8" fill="#6b7280" opacity="0.2"/>
    <text x="65" y="30" text-anchor="middle" font-size="13" font-weight="600" fill="#475569">🔒 Closed</text>
  </g>

  <g stroke="#94a3b8" stroke-width="2" fill="none">
    <path d="M170 95 L195 95"/><polygon points="195,95 185,90 185,100" fill="#94a3b8"/>
    <path d="M330 95 L355 95"/><polygon points="355,95 345,90 345,100" fill="#94a3b8"/>
    <path d="M490 95 L515 95"/><polygon points="515,95 505,90 505,100" fill="#94a3b8"/>
    <path d="M585 120 L585 160 L540 170" stroke-dasharray="5,5"/><polygon points="540,170 545,160 545,175" fill="#94a3b8"/>
    <path d="M330 195 L195 195"/><polygon points="195,195 205,190 205,200" fill="#94a3b8"/>
    <path d="M440 60 Q440 35 400 35 L380 35" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" fill="none"/><polygon points="380,35 390,30 390,40" fill="#f59e0b"/>
  </g>
  <text x="410" y="30" font-size="10" fill="#d97706" font-weight="500">Revisão</text>
</svg>

*Aplicação segue fluxo controlado de estados com aprovação explícita em cada transição.*

---

## 🔒 Approval Gate

<!-- SVG 2: Approval Gate -->
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="200" fill="#fef2f2" rx="12"/>
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">🔒 Approval Gate</text>

  <rect x="200" y="60" width="400" height="100" rx="10" fill="#fff" stroke="#ef4444" stroke-width="2.5"/>

  <g transform="translate(380, 85)">
    <rect x="5" y="20" width="30" height="25" rx="3" fill="#dc2626"/>
    <path d="M12 20 V10 A8 8 0 0 1 28 10 V20" stroke="#dc2626" stroke-width="3" fill="none"/>
    <animateTransform attributeName="transform" type="translate" values="380,85; 380,88; 380,85" dur="2s" repeatCount="indefinite"/>
  </g>

  <text x="400" y="130" text-anchor="middle" font-size="13" fill="#dc2626" font-weight="600">
    ⚠️ Ação Requer Aprovação Explícita
  </text>

  <rect x="260" y="145" width="280" height="25" rx="6" fill="#1a73e8" opacity="0.1"/>
  <text x="400" y="163" text-anchor="middle" font-size="11" fill="#1a73e8" font-family="monospace">
    "implemente" | "execute o plano" | "aprovo"
  </text>

  <circle cx="400" cy="110" r="70" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.2">
    <animate attributeName="r" values="50;90;50" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
  </circle>
</svg>

*Nenhuma mudança é feita sem autorização explícita do usuário.*

---

## 👥 Safe Delegation

<!-- SVG 3: Safe Delegation Pattern -->
<svg width="800" height="260" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="260" fill="#f0f9ff" rx="12"/>
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">👥 Safe Delegation Pattern</text>

  <rect x="350" y="60" width="100" height="45" rx="8" fill="#1a73e8"/>
  <text x="400" y="88" text-anchor="middle" font-size="12" font-weight="600" fill="white">Coordinator</text>

  <rect x="50" y="150" width="140" height="50" rx="8" fill="#10b981" opacity="0.85"/>
  <text x="120" y="170" text-anchor="middle" font-size="11" font-weight="600" fill="white">Agent 1</text>
  <text x="120" y="187" text-anchor="middle" font-size="10" fill="white">Task A</text>

  <rect x="330" y="150" width="140" height="50" rx="8" fill="#f59e0b" opacity="0.85"/>
  <text x="400" y="170" text-anchor="middle" font-size="11" font-weight="600" fill="white">Agent 2</text>
  <text x="400" y="187" text-anchor="middle" font-size="10" fill="white">Task B</text>

  <rect x="610" y="150" width="140" height="50" rx="8" fill="#8b5cf6" opacity="0.85"/>
  <text x="680" y="170" text-anchor="middle" font-size="11" font-weight="600" fill="white">Agent 3</text>
  <text x="680" y="187" text-anchor="middle" font-size="10" fill="white">Task C</text>

  <rect x="350" y="210" width="100" height="40" rx="8" fill="#059669"/>
  <text x="400" y="235" text-anchor="middle" font-size="11" font-weight="600" fill="white">✅ Verify</text>

  <g stroke="#64748b" stroke-width="2" fill="none" stroke-dasharray="4,3">
    <line x1="400" y1="105" x2="120" y2="150"/>
    <line x1="400" y1="105" x2="400" y2="150"/>
    <line x1="400" y1="105" x2="680" y2="150"/>
    <line x1="120" y1="200" x2="400" y2="210"/>
    <line x1="400" y1="200" x2="400" y2="210"/>
    <line x1="680" y1="200" x2="450" y2="210"/>
  </g>
</svg>

*Agentes independentes executam tarefas não-overlapping com validação centralizada.*

---

## ✅ Validation Pipeline

<!-- SVG 4: Validation Pipeline -->
<svg width="800" height="240" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="240" fill="#f8fafc" rx="12"/>
  <text x="400" y="35" text-anchor="middle" font-size="18" font-weight="bold" fill="#1e293b">✅ Validation Pipeline</text>

  <g transform="translate(35, 70)">
    <rect width="140" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <text x="70" y="30" text-anchor="middle" font-size="12" font-weight="600" fill="#1e40af">Type Check</text>
    <text x="70" y="50" text-anchor="middle" font-size="10" fill="#64748b">TypeScript</text>
    <circle cx="125" cy="18" r="12" fill="#10b981"/>
    <path d="M120 18 L123 21 L129 15" stroke="white" stroke-width="2" fill="none"/>
  </g>

  <g transform="translate(210, 70)">
    <rect width="140" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="70" y="30" text-anchor="middle" font-size="12" font-weight="600" fill="#92400e">Lint Check</text>
    <text x="70" y="50" text-anchor="middle" font-size="10" fill="#64748b">ESLint</text>
    <circle cx="125" cy="18" r="12" fill="#10b981"/>
    <path d="M120 18 L123 21 L129 15" stroke="white" stroke-width="2" fill="none"/>
  </g>

  <g transform="translate(385, 70)">
    <rect width="140" height="70" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
    <text x="70" y="30" text-anchor="middle" font-size="12" font-weight="600" fill="#9f1239">Test Run</text>
    <text x="70" y="50" text-anchor="middle" font-size="10" fill="#64748b">Vitest</text>
    <circle cx="125" cy="18" r="12" fill="#10b981"/>
    <path d="M120 18 L123 21 L129 15" stroke="white" stroke-width="2" fill="none"/>
  </g>

  <g transform="translate(560, 70)">
    <rect width="140" height="70" rx="8" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
    <text x="70" y="30" text-anchor="middle" font-size="12" font-weight="600" fill="#065f46">Build</text>
    <text x="70" y="50" text-anchor="middle" font-size="10" fill="#64748b">Production</text>
    <circle cx="125" cy="18" r="12" fill="#10b981">
      <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <path d="M120 18 L123 21 L129 15" stroke="white" stroke-width="2" fill="none"/>
  </g>

  <g stroke="#94a3b8" stroke-width="2.5" fill="none">
    <path d="M175 105 L205 105">
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite"/>
    </path>
    <polygon points="205,105 195,100 195,110" fill="#94a3b8"/>

    <path d="M350 105 L380 105">
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </path>
    <polygon points="380,105 370,100 370,110" fill="#94a3b8"/>

    <path d="M525 105 L555 105">
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" begin="1s" repeatCount="indefinite"/>
    </path>
    <polygon points="555,105 545,100 545,110" fill="#94a3b8"/>
  </g>

  <rect x="35" y="175" width="730" height="50" rx="8" fill="#fff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="400" y="195" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">📋 Validation Report</text>
  <text x="400" y="213" text-anchor="middle" font-size="10" fill="#059669">✓ All checks passed</text>
  <text x="400" y="213" dx="120" text-anchor="middle" font-size="10" fill="#64748b">• 0 errors • 4 checks • Build OK</text>
</svg>

*Pipeline de validação com verificação em múltiplas camadas antes da entrega.*

---

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes React reutilizáveis
│   ├── AnimatedPipeline.tsx  # Visualização animada do pipeline
│   ├── MetricsCard.tsx       # Cards de métricas com animação
│   ├── ProgressBar.tsx       # Barras de progresso animadas
│   ├── StatCard.tsx          # Cards estatísticos
│   ├── DonutChart.tsx        # Gráfico de rosca
│   ├── BarChart.tsx          # Gráfico de barras
│   ├── Dashboard.tsx         # Dashboard completo
│   ├── SettingsPanel.tsx     # Painel de configurações
│   └── ui.tsx                # Componentes UI básicos
├── services/         # Camada de serviços (API, análise)
├── types/            # Definições TypeScript
├── hooks/            # Custom React hooks
├── utils/            # Funções utilitárias
├── constants/        # Constantes da aplicação
└── App.tsx           # Componente principal
```

## ⚡ Recursos

### Análise de Texto
- Detecção de sentimento (positivo/negativo/neutro)
- Extração de entidades (emails, URLs, datas, nomes)
- Estatísticas de texto (palavras, frases, tempo de leitura)
- Detecção automática de idioma

### Análise de Imagem
- Upload e preview de arquivos
- Extração de metadados
- Detecção de objetos e faces
- Análise de cores

### Análise Multimodal
- Fusão de texto e imagem
- Ponderação dinâmica de modalidades
- Insights integrados
- Recomendações contextuais

### Dashboard
- Métricas em tempo real
- Gráficos e visualizações
- Histórico de análises
- Status dos modelos

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

## 📦 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview da build |
| `npm run lint` | ESLint |
| `npm run test` | Tests com Vitest |

## 🔧 Configuração

A aplicação usa persistência local para configurações:

- **API URL:** Endereço do backend (padrão: `http://localhost:8000`)
- **Timeout:** Tempo limite das requisições (30s padrão)
- **Theme:** Dark / Light / Auto
- **Language:** Português / English / Español

## 📊 Exportação de Dados

Suporta exportação em múltiplos formatos:

- **JSON:** Dados completos estruturados
- **CSV:** Dados tabulares para planilhas
- **Markdown:** Relatórios formatados
- **PDF:** Impressão via navegador

## 🎨 Componentes

### Visualização
- `AnimatedPipeline` - Pipeline interativo com animações de fluxo
- `MetricsCard` - Cards com sparklines e tendências
- `ProgressBar` - Barras com animação de shimmer
- `DonutChart` - Gráfico de rosca SVG responsivo
- `BarChart` - Gráfico de barras vertical/horizontal

### UI Básicos
- `LoadingSpinner` - Spinners de carregamento
- `Alert` - Toasts de notificação
- `Modal` - Diálogos modais
- `Tooltip` - Tooltips posicionais
- `Skeleton` - Placeholders de carregamento
- `Badge` - Etiquetas de status
- `Card` - Containers de conteúdo

## 🔗 Hooks

- `useLocalStorage` - Persistência genérica
- `useAnalysisHistory` - Gerenciamento de histórico
- `useSettings` - Configurações da aplicação
- `useTheme` - Tema com sistema preferência
- `useDebounce` - Debounce de valores
- `useBackendHealth` - Health check do backend

## 📈 Métricas do Dashboard

- Total de análises
- Análises hoje (24h)
- Tempo médio de processamento
- Taxa de sucesso
- Distribuição por tipo (texto/imagem/multimodal)
- Status dos modelos (CPU/GPU/Memória)

## 🚨 Tratamento de Erros

A aplicação inclui fallback local quando o backend está indisponível:

- Análise de texto com NLP local
- Metadados de imagem básicos
- Simulação de fusão multimodal

## 🔌 Integração com Backend

O backend Python/FastAPI fornece:

```python
# Endpoints principais
POST /analyze/text      # Análise de texto com LLM
POST /analyze/image     # Análise de imagem com CNN
POST /analyze/multimodal # Fusão multimodal
GET  /health            # Health check
```

## 📝 License

MIT © 2024

---

**Built with** ❤️ **using React, TypeScript, and Tailwind CSS**