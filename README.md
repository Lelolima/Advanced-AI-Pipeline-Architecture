# 🧠 Advanced AI Pipeline Architecture

Sistema profissional de análise multimodal com arquitetura enterprise-grade.

[![Status](https://img.shields.io/badge/status-production-green)](https://github.com/Lelolima/Advanced-AI-Pipeline-Architecture)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6)](https://www.typescriptlang.org)

---

## 🎬 Demonstrações Animadas

> **Nota:** As animações completas estão disponíveis em [docs/governance-animations.html](docs/governance-animations.html)

### 📊 Fluxo de Governança de Tarefas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔄 TASK GOVERNANCE STATE FLOW                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  Active  │ ──► │ Planned  │ ──► │ Awaiting │ ──► │Executing │            │
│   │   🔵     │    │   🟡     │    │   🟣     │    │   🟣     │            │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘            │
│                                          │                    │            │
│                                          ▼                    ▼            │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  Closed  │ ◄── │Validated │ ◄── │          │ ◄── │          │            │
│   │   ⚫     │    │   🟢     │    │          │    │          │            │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘            │
│                                                                             │
│              ↺ Feedback Loop: Revisão quando necessário                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Estados:**
- `Active` 🔵 - Inspecionar contexto
- `Planned` 🟡 - Plano escopado apresentado
- `Awaiting approval` 🟣 - Aguardando autorização explícita
- `Executing` 🟣 - Executando plano aprovado
- `Validated` 🟢 - Validação concluída com sucesso
- `Closed` ⚫ - Entrega finalizada

---

### 🔒 Approval Gate

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                        🔒 APPROVAL GATE                                      ║
╠═════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║    ┌─────────────────────────────────────────────────────────────────┐     ║
║    │                                                                 │     ║
║    │     ⚠️  AÇÃO REQUER APROVAÇÃO EXPLÍCITA                        │     ║
║    │                                                                 │     ║
║    │    ActionButton: [ 🔒 ]  (bloqueado até aprovação)              │     ║
║    │                                                                 │     ║
║    │     Frases de Autorização:                                      │     ║
║    │     ┌─────────────────────────────────────────────────────┐    │     ║
║    │     │  "implemente"  |  "execute o plano"  |  "aprovo"    │    │     ║
║    │     └─────────────────────────────────────────────────────┘    │     ║
║    │                                                                 │     ║
║    └─────────────────────────────────────────────────────────────────┘     ║
║                                                                             ║
╚═════════════════════════════════════════════════════════════════════════════╝

  Nenhuma mudança é feita sem autorização explícita do usuário.
```

---

### 👥 Safe Delegation Pattern

```
                         ┌─────────────────┐
                         │   COORDINATOR   │
                         │     (Você)      │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
     ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
     │    Agent 1    │   │    Agent 2    │   │    Agent 3    │
     │   🟢 Task A   │   │   🟡 Task B   │   │   🟣 Task C   │
     │  [escopo]     │   │  [escopo]     │   │  [escopo]     │
     └───────┬───────┘   └───────┬───────┘   └───────┬───────┘
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 ▼
                        ┌─────────────────┐
                        │   ✅ VERIFY     │
                        │  (Coordinator)  │
                        └─────────────────┘

  ✓ Agentes independentes
  ✓ Tarefas não-overlapping
  ✓ Validação centralizada
```

---

### ✅ Validation Pipeline

```
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │ Type Check   │────│ Lint Check   │────│  Test Run    │────│    Build     │
  │  TypeScript  │ ✓  │   ESLint     │ ✓  │   Vitest     │ ✓  │  Production  │
  └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
         ✅                  ✅                  ✅                  ✅
  
  ════════════════════════════════════════════════════════════════════════════
  
  📋 VALIDATION REPORT
  ✓ All checks passed   •   0 errors   •   4 checks completed   •   Build OK
```

---

## 🚀 Tecnologias

- **Frontend:** React 18 • TypeScript • Vite • Tailwind CSS
- **Backend:** FastAPI • TensorFlow • PyTorch
- **Modelos:** CNN (EfficientNet) • LLM (BERT) • RNN (LSTM) • Fusion Model

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