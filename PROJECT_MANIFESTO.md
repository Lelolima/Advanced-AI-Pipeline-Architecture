# 📋 Projeto Advanced AI Pipeline Architecture

## Manifesto do Projeto

### Visão Geral
Sistema profissional de análise multimodal com arquitetura enterprise-grade, desenvolvido com React 18, TypeScript e Vite.

### Informações do Projeto

| Campo | Valor |
|-------|-------|
| **Nome** | Advanced AI Pipeline Architecture |
| **Versão** | 1.0.0 |
| **Tipo** | module (ESM) |
| **Privado** | Sim |
| **Autor** | @Lelolima |

### Stack Tecnológico

**Frontend:**
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1

**Ferramentas de Qualidade:**
- ESLint 9.9.1
- Prettier 3.2.0
- Vitest 1.3.0
- Testing Library 14.2.0

### Estrutura de Componentes

```
Componentes Principais:
├── AnimatedPipeline (Pipeline visual animado)
├── MetricsCard (Cards de métricas com animação)
├── ProgressBar (Barras de progresso)
├── StatCard (Cards estatísticos)
├── DonutChart (Gráfico de rosca SVG)
├── BarChart (Gráfico de barras)
├── Dashboard (Dashboard completo)
├── SettingsPanel (Configurações)
└── UI Components (Spinner, Alert, Modal, etc.)
```

### Serviços

```
Services Layer:
├── ApiService (HTTP client com timeout/retry)
├── TextAnalysisService (NLP com fallback local)
├── ImageAnalysisService (Upload e metadados)
└── MultimodalAnalysisService (Fusão de modalidades)
```

### Tipos TypeScript

```
Type Definitions:
├── AnalysisMode, AnalysisStatus, SentimentType
├── SystemConfig, DEFAULT_CONFIG
├── TextAnalysisInput/Result/Options
├── ImageAnalysisInput/Result/Options
├── MultimodalAnalysisInput/Result/Options
├── FusionResult, Recommendation
├── AnalysisHistory, BatchJob
├── DashboardMetrics, SystemStatus
└── ApiResponse, AnalysisError
```

### Hooks Customizados

```
React Hooks:
├── useLocalStorage (Persistência genérica)
├── useAnalysisHistory (Gerenciamento de histórico)
├── useSettings (Configurações da app)
├── useTheme (Tema com preferência)
├── useDebounce (Debounce de valores)
└── useBackendHealth (Health check)
```

### Utilitários

```
Utils:
├── export.ts (JSON, CSV, Markdown, PDF)
└── format.ts (Currency, Date, Number, etc.)
```

### Scripts Disponíveis

```bash
npm run dev         # Dev server com hot-reload
npm run build       # Build de produção
npm run build:check # Validação completa
npm run lint        # ESLint com auto-fix
npm run format      # Prettier
npm run preview     # Preview do build
npm run test        # Vitest watch mode
npm run test:run    # Tests uma vez
```

### Path Aliases

```typescript
@/*              → src/*
@components/*    → src/components/*
@services/*      → src/services/*
@types/*         → src/types/*
@hooks/*         → src/hooks/*
@utils/*         → src/utils/*
@constants/*     → src/constants/*
```

### Configurações de Build

**Vite:**
- Proxy: /api → http://localhost:8000
- Code splitting manual (vendor, utils)
- Sourcemaps habilitados
- Terser para minificação

**TypeScript:**
- Strict mode: true
- Path aliases configurados
- JSX: react-jsx

### Arquivos de Configuração

- `tsconfig.json` - TypeScript com path aliases
- `tsconfig.node.json` - Configuração Vite
- `vite.config.ts` - Vite com proxy e aliases
- `eslint.config.js` - ESLint TypeScript
- `.prettierrc` - Prettier format
- `.editorconfig` - Padrões de editor
- `.gitignore` - Arquivos ignorados

### Documentação

- `README.md` - Documentação principal
- `DEVELOPMENT.md` - Guia do desenvolvedor
- `DEPLOY.md` - Guia de implantação
- `VALIDATION.md` - Checklist de validação

### Scripts de Validação

- `scripts/validate.ps1` - PowerShell
- `scripts/validate.bat` - Batch Windows

### Recursos Implementados

✅ Análise de Texto (sentimento, entidades, estatísticas)
✅ Análise de Imagem (upload, metadados)
✅ Análise Multimodal (fusão texto + imagem)
✅ Dashboard com métricas em tempo real
✅ Histórico com persistência localStorage
✅ Configurações com tema (dark/light/auto)
✅ Exportação de dados (JSON, CSV, Markdown, PDF)
✅ Componentes UI reutilizáveis
✅ Hooks customizados
✅ Utilitários de formato e validação
✅ Path aliases para imports limpos
✅ Build otimizado com code splitting

### Preview do Build

O build de produção inclui:
- Minificação com Terser
- Code splitting automático
- Tree shaking
- Sourcemaps
- Assets otimizados

### Deploy Ready

Configurações para:
- Vercel (automático via Git)
- Netlify (drag & drop ou CLI)
- GitHub Pages (gh-pages)
- Docker (Dockerfile incluído)
- AWS (S3, Amplify)

### Status

**✅ COMPLETO E PRONTO PARA PRODUÇÃO**

---

*Manifesto gerado em 2026-07-20*
*Versão 1.0.0*