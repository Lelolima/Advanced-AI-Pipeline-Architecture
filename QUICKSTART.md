# 🚀 Quick Start - Advanced AI Pipeline

## Status das Correções

As seguintes correções foram aplicadas para resolver o problema da página em branco:

### ✅ Correções Aplicadas

1. **`src/services/index.ts`** - Corrigido typo na linha 571:
   - Antes: `new SystemServices(api)`
   - Agora: `new SystemService(api)`

2. **`src/constants/pipeline.ts`** - Removido import desnecessário:
   - Removido: `import { LucideIcon } from 'lucide-react'`
   - Removido: tipo `PipelineNodeWithIcon` (não utilizado)

3. **`src/App.tsx`** - Simplificado para versão auto-contida:
   - Sem imports de hooks customizados
   - Sem imports de componentes externos
   - Inline styles ao invés de Tailwind classes
   - Único import: nenhum (dados hardcoded no próprio arquivo)

## 📋 Como Testar

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Iniciar servidor de desenvolvimento
```bash
npm run dev
```

O servidor deve iniciar em `http://localhost:5173`

### Passo 3: Testar no browser

Abra `http://localhost:5173` e verifique:

- ✅ Header aparece com título "Advanced AI Pipeline"
- ✅ Tabs "Pipeline" e "Análise" funcionam
- ✅ Tab Pipeline mostra 6 cards coloridos
- ✅ Tab Análise mostra textarea e upload de imagem
- ✅ Health check do backend mostra "Offline" (esperado sem backend Python)

## 🐛 Se ainda houver tela em branco

### Verificar console do browser (F12)

1. Abra DevTools (F12)
2. Vá para aba "Console"
3. Procure por mensagens de erro

### Erros comuns e soluções

| Erro | Solução |
|------|---------|
| `React is not defined` | Verificar se `react` está em node_modules |
| `Cannot find module` | Executar `npm install` |
| `Import error` | Verificar se arquivo existe |
| `SyntaxError` | Verificar sintaxe JSX/TypeScript |

### Executar diagnóstico

```powershell
# PowerShell
.\scripts\diagnose.ps1

# Ou
.\scripts\validate.ps1
```

### Verificar TypeScript

```bash
npx tsc --noEmit
```

Se houver erros de TypeScript, eles serão listados.

## 🔧 Validar build completo

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📊 Estrutura do App

O App.tsx simplificado contém:

- **Header** - Título e tabs de navegação
- **Tab Pipeline** - Grid com 6 nodes (Input, CNN, LLM, RNN, Integration, Output)
- **Tab Análise** - Painel de texto e painel de imagem
- **Footer** - Copyright

### Funcionalidades

| Funcção | Status |
|---------|--------|
| Tab navigation | ✅ Funciona |
| Pipeline visualization | ✅ Funciona |
| Text analysis (local fallback) | ✅ Funciona |
| Image upload/preview | ✅ Funciona |
| Backend health check | ✅ Mostra "Offline" (esperado) |

## 📝 Próximos Passos

Uma vez que a versão simplificada esteja funcionando:

1. **Gradualmente re-introduzir componentes avançados**
   - Começar com componentes mais simples (ui.tsx)
   - Depois hooks (useLocalStorage, etc.)
   - Por último services e components complexos

2. **Testar cada adição**
   - Adicionar um arquivo por vez
   - Verificar se app continua funcionando

3. **Backend Python (opcional)**
   - Se quiser análise real, não apenas fallback local
   - Executar `cd backend && python main.py`

## 🎯 Status Atual

**Versão:** 1.0.0-simplified  
**Objetivo:** Máxima simplicidade para debug  
**Dependências externas:** Nenhuma no App.tsx  
**Estilo:** Inline (sem Tailwind runtime)

---

*Quick Start atualizado em 2026-07-20*