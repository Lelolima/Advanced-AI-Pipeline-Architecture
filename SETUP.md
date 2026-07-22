# Setup Guide - Advanced AI Pipeline Architecture

## Pré-requisitos

### Obrigatórios
- **Node.js** >= 18.x (LTS recomendado)
- **npm** >= 9.x
- **Python** >= 3.10 (para backend)
- **Git** para versionamento

### Opcionais (Backend)
- CUDA Toolkit 11.8+ (para GPU acceleration)
- NVIDIA GPU com 8GB+ VRAM

---

## Quick Start

### 1. Clone o Repositório

```bash
git clone https://github.com/Lelolima/Advanced-AI-Pipeline-Architecture.git
cd Advanced-AI-Pipeline-Architecture
```

### 2. Frontend (React + Vite)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar http://localhost:5173
```

### 3. Backend (Python)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente (Windows)
venv\Scripts\activate

# Ativar ambiente (Linux/Mac)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar módulo de exemplo
python src/utils.py
```

---

## Configuração de Desenvolvimento

### VS Code Extensions Recomendadas

**Frontend:**
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

**Backend:**
- Python (ms-python.python)
- Pylance (ms-python.vscode-pylance)
- isort (ms-python.isort)

### .env.local (Opcional)

```bash
# Copiar exemplo
cp .env.example .env.local

# Editar com suas configurações
# HUGGINGFACE_API_KEY=sua_key_aqui
```

---

## Comandos Disponíveis

### Frontend

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint checks |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npx tsc --noEmit` | Type check sem gerar arquivos |

### Backend

| Comando | Descrição |
|---------|-----------|
| `python src/utils.py` | Testa módulo utils |
| `python -m pytest tests/` | Roda testes unitários |
| `python -m pytest tests/ -v --cov=src` | Testes com coverage |
| `flake8 src/` | Lint Python |
| `mypy src/` | Type check |

---

## Troubleshooting

### Frontend

**Erro: `Cannot find module 'react'`**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Erro: `Port 5173 already in use`**
```bash
# Vite usará porta automática (5174, 5175, etc.)
npm run dev
```

### Backend

**Erro: `No module named 'tensorflow'`**
```bash
pip install --upgrade tensorflow
```

**Erro: `CUDA out of memory`**
```python
# No código, reduzir batch size ou usar CPU
import os
os.environ["CUDA_VISIBLE_DEVICES"] = ""
```

---

## Estrutura de Diretórios

```
Advanced-AI-Pipeline-Architecture/
├── .github/workflows/      # CI/CD configuration
├── backend/
│   ├── src/                # Código Python
│   │   ├── data_preprocessing.py
│   │   ├── cnn_model.py
│   │   ├── llm_pln_module.py
│   │   ├── rna_integration.py
│   │   └── utils.py
│   ├── tests/              # Testes unitários
│   ├── requirements.txt    # Dependências Python
│   └── README.md
├── components/             # Componentes React
│   └── PipelineCard.tsx
├── constants/              # Constantes e tipos
│   └── pipeline.ts
├── App.tsx                 # Componente principal
├── main.tsx                # Entry point
├── index.css               # Estilos globais
├── package.json            # Dependências Node
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
└── vite.config.ts          # Vite config
```

---

## Próximos Passos

1. **Configurar ESLint com accessibility**
   ```bash
   npm install -D eslint-plugin-jsx-a11y
   ```

2. **Configurar pré-commit hooks**
   ```bash
   npm install -D husky lint-staged
   npx husky install
   ```

3. **Rodar testes pela primeira vez**
   ```bash
   # Frontend
   npm run lint
   npx tsc --noEmit

   # Backend
   cd backend && python -m pytest tests/
   ```

---

## Recursos Adicionais

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TensorFlow Keras](https://www.tensorflow.org/keras)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers)

---

## Suporte

Para dúvidas ou problemas:
- GitHub Issues: https://github.com/Lelolima/Advanced-AI-Pipeline-Architecture/issues
- Email: lelolima806@gmail.com