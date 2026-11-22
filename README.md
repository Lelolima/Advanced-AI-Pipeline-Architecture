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
- **Backend:** FastAPI (API com modelos simulados) • TensorFlow (módulos de treino opcionais)
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

## ⚠️ Estado real da implementação

Auditoria de 2026-11-22 (ver `docs/auditoria/AUDITORIA-2026-11-22.md`):

- **A API (`backend/main.py`) usa modelos simulados.** A classificação de imagem é aleatória
  (`MockCNNModel`), a análise de texto é baseada em listas de palavras (`MockLLMModel`) e a
  "imagem" da análise multimodal é um valor fixo. Toda resposta traz `"(mock)"` no campo `model`.
- Os módulos em `backend/src/` (CNN EfficientNet, LLM, RNA) são esqueletos de treino que **não
  estão ligados à API**; partes do LLM levantam `NotImplementedError`.
- O componente `Dashboard.tsx` (não usado pela `App.tsx` atual) exibe **métricas fictícias**
  (`MOCK_METRICS`, `MOCK_STATUS`) com variação aleatória — não são medições reais.

## 🛠️ Instalação e execução

Requisitos: Node.js 20+, Python 3.11+.

```bash
# Frontend
npm ci
npm run dev            # http://localhost:5173

# Backend (API com modelos simulados)
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python main.py         # http://localhost:8000  (docs em /docs)

# Opcional: dependências pesadas dos módulos de ML em backend/src
pip install -r requirements-ml.txt
```

## 🧪 Testes e qualidade

```bash
npm run lint           # ESLint (sem --fix; use npm run lint:fix para corrigir)
npx tsc --noEmit       # checagem de tipos
npm run test:run       # Vitest
npm run build          # build de produção

cd backend
flake8 src main.py tests --max-line-length=100
python -m pytest -v
```

O CI (`.github/workflows/ci.yml`) executa exatamente esses passos em push/PR para `main`.

## 🔐 Variáveis de ambiente

Nenhuma variável é obrigatória hoje. `.env.example` lista opções futuras (comentadas).
A URL da API no frontend está fixa em `http://localhost:8000` (`src/App.tsx`) e pode ser
alterada no painel de configurações.

## 📦 Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | `tsc` + build de produção |
| `npm run preview` | Preview da build |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run test` / `test:run` | Vitest (watch / execução única) |

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