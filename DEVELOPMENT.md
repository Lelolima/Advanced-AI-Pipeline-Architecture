# 📘 Guia do Desenvolvedor

## Visão Geral do Projeto

Este projeto utiliza uma arquitetura moderna e profissional com React 18, TypeScript e Vite.

## Estrutura de Diretórios

```
Advanced-AI-Pipeline-Architecture/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── ui.tsx         # Componentes UI básicos
│   │   ├── Dashboard.tsx  # Dashboard completo
│   │   └── ...
│   ├── services/     # Camada de serviços e API
│   ├── types/        # Definições TypeScript
│   ├── hooks/        # Custom React Hooks
│   ├── utils/        # Funções utilitárias
│   ├── constants/    # Constantes da aplicação
│   └── App.tsx       # Componente principal
├── scripts/        # Scripts de automação
├── .editorconfig   # Configuração de editor
├── .prettierrc     # Configuração Prettier
├── eslint.config.js # Configuração ESLint
├── package.json    # Dependências e scripts
├── tsconfig.json   # Configuração TypeScript
├── vite.config.ts  # Configuração Vite
└── README.md       # Documentação principal
```

## Path Aliases

O projeto utiliza path aliases para imports mais limpos:

```typescript
// Em vez de:
import { MetricsCard } from '../../components/MetricsCard';

// Use:
import { MetricsCard } from '@components/MetricsCard';
```

Aliases disponíveis:
- `@/*` - src/*
- `@components/*` - src/components/*
- @services/*` - src/services/*
- @types/*` - src/types/*
- `@hooks/*` - src/hooks/*
- `@utils/*` - src/utils/*
- `@constants/*` - src/constants/*

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de dev com hot-reload

# Build
npm run build        # Build de produção com TypeScript
npm run build:check  # Validação completa antes do build

# Qualidade de Código
npm run lint         # ESLint com auto-fix
npm run format       # Prettier para formatar código

# Testes
npm run test         # Vitest em watch mode
npm run test:run     # Executar testes uma vez
npm run test:ui      # Interface UI de testes
npm run test:coverage # Testes com coverage report

# Utilitários
npm run preview      # Preview do build
./scripts/validate.ps1  # Validação do projeto (PowerShell)
```

## Validação do Projeto

Execute o script de validação para verificar:

```powershell
./scripts/validate.ps1
```

Este script verifica:
1. Versões do Node.js e npm
2. Dependências instaladas
3. Erros de TypeScript
4. ESLint warnings/errors
5. Estrutura de arquivos necessária
6. Contagem de arquivos do projeto

## Convenções de Código

### TypeScript

- Use tipos explícitos para funções públicas
- Interfaces para dados estruturais, types para uniões
- Evite `any` - use `unknown` quando necessário

### Componentes

- Components em PascalCase: `MetricsCard`, `Dashboard`
- Hooks em camelCase: `useLocalStorage`, `useSettings`
- Utilitários em camelCase: `formatCurrency`, `debounce`

### Imports

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. Bibliotecasexternas
import { SomeLib } from 'some-library';

// 3. Path aliases
import { Component } from '@components/Component';

// 4. Importsrelativos
import { helper } from './helper';
```

### CSS/Tailwind

- Use classes utilitárias do Tailwind
- Evite CSS puro quando possível
- Para estilos complexos, use objetos inline

## Adicionando Novo Componente

1. Crie o arquivo em `src/components/NomeComponente.tsx`
2. Exporte no `src/components/index.ts`
3. Adicione testes se necessário

```typescript
// src/components/NomeComponente.tsx
interface NomeComponenteProps {
  prop1: string;
  prop2?: number;
}

export function NomeComponente({ prop1, prop2 = 0 }: NomeComponenteProps) {
  return <div>{prop1}</div>;
}
```

## Adicionando Novo Hook

1. Crie em `src/hooks/useNomeHook.ts`
2. Exporte no `src/hooks/index.ts`

```typescript
export function useNomeHook<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  return [value, setValue] as const;
}
```

## Debug

### No VS Code

Adicione `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug React App",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### React DevTools

Instale a extensão React Developer Tools para debugging no navegador.

## Variáveis de Ambiente

Crie `.env` na raiz:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_VERSION=1.0.0
```

Acesse via `import.meta.env.VITE_*`.

## Build de Produção

```bash
# Build otimizado
npm run build

# O build gera:
# - dist/ com arquivos minificados
# - Source maps para debugging
# - Code splitting automático
```

## Deploy

O projeto está pronto para deploy em:

- **Vercel**: Deploy automático ao conectar repositório
- **Netlify**: Arraste a pasta `dist` ou use CLI
- **GitHub Pages**: Use `gh-pages` package
- **Servidor próprio**: Upload do conteúdo de `dist/`

## Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
npm run build
```

### Erro de TypeScript

```bash
npx tsc --noEmit
```

### Problemas de Cache

```bash
rm -rf node_modules dist
npm install
```

## Recursos Adicionais

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

Desenvolvido com ❤️ para o Advanced AI Pipeline Architecture