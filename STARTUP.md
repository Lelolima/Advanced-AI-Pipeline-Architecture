# 🚀 Guia de Inicialização Rápida

## Visão Geral

Este projeto agora possui um **pipeline de IA funcional** com:
- **Frontend React**: Interface interativa para análise de texto e imagens
- **Backend Python (FastAPI)**: API para processamento multimodal

---

## 📋 Pré-requisitos

- Node.js >= 18.x
- Python >= 3.10
- venv (ambiente virtual Python)

---

## 🔧 Configuração

### 1. Backend (Python)

```powershell
# Navegue até a pasta do backend
cd backend

# Ative o ambiente virtual (já criado)
venv\Scripts\activate

# Instale as dependências (incluindo FastAPI)
pip install -r requirements.txt

# Inicie o servidor API
python main.py
```

**Acesse:** http://localhost:8000  
**Swagger UI:** http://localhost:8000/docs

---

### 2. Frontend (React)

Abra **outro terminal** PowerShell:

```powershell
# Navegue até a raiz do projeto
cd "C:\Users\Thinkin pad 8g\Desktop\Advanced-AI-Pipeline-Architecture-main\Advanced-AI-Pipeline-Architecture-main"

# Instale dependências (se ainda não instalou)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

**Acesse:** http://localhost:5173

---

## 🎯 Funcionalidades Disponíveis

### 1. Análise de Texto
- Sentimento (positivo/negativo/neutro)
- Contagem de palavras e frases
- Extração de entidades
- Embeddings (simulado)

### 2. Análise de Imagem
- Classificação em 10 categorias
- Extração de features visuais
- Confiança por categoria

### 3. Análise Multimodal
- Combina texto e imagem
- Ponderação de confiança
- Recomendação integrada

---

## 🧪 Testando

### Teste 1: Análise de Texto
1. No frontend, digite: "Adoro programação e tecnologia!"
2. Clique em **"Analisar Texto"**
3. Veja o resultado com sentimento e entidades

### Teste 2: Análise de Imagem
1. Selecione uma imagem (JPEG/PNG)
2. Clique em **"Analisar"**
3. Veja as categorias classificadas

### Teste 3: Análise Multimodal
1. Digite texto E selecione imagem
2. Clique em **"Análise Multimodal"**
3. Veja a integração dos resultados

---

## 🔍 Diagnóstico

### Backend não inicia?
```powershell
# Verifique se a porta 8000 está livre
netstat -ano | findstr :8000

# Se estiver em uso, mate o processo ou mude a porta no main.py
```

### Frontend não conecta ao backend?
- Verifique se o backend está rodando em http://localhost:8000
- Confira o console do navegador (F12) para erros de CORS
- O backend deve retornar `{"status": "online"}` em http://localhost:8000/

### Erro 404 no upload de imagem?
- Instale `python-multipart`: `pip install python-multipart`

---

## 📊 Estrutura de Arquivos

```
project/
├── src/
│   ├── App.tsx              # Componente principal com AnalysisPanel
│   ├── main.tsx             # Entry point
│   ├── components/
│   │   ├── AnalysisPanel.tsx   # Painel funcional de análise
│   │   └── PipelineCard.tsx    # Cards visuais do pipeline
│   └── constants/
│       └── pipeline.ts      # Definições dos nós do pipeline
├── backend/
│   ├── main.py              # API FastAPI funcional
│   ├── src/                 # Módulos de IA (esqueleto)
│   ├── tests/               # Testes unitários
│   └── requirements.txt     # Dependências Python
└── index.html               # HTML template
```

---

## 🌐 Endpoints da API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/` | GET | Health check |
| `/health` | GET | Status dos modelos |
| `/analyze/text` | POST | Análise de texto (PLN/LLM) |
| `/analyze/image` | POST | Análise de imagem (CNN) |
| `/analyze/multimodal` | POST | Análise integrada |

---

## 🚀 Próximos Passos

### Implementação Real dos Modelos

Substitua os mocks no `backend/main.py`:

```python
# CNN Real
from tensorflow.keras.applications import EfficientNetB0
cnn_model = EfficientNetB0(weights='imagenet')

# LLM Real
from transformers import pipeline
sentiment_analyzer = pipeline('sentiment-analysis')

# Integração Real
# Implementar fusão multimodal com atenção cruzada
```

### Features Adicionais
- [ ] Upload real de imagens (armazenamento)
- [ ] Histórico de análises
- [ ] Dashboard com métricas
- [ ] Exportação de resultados (JSON, CSV)
- [ ] Autenticação de usuários

---

**Dúvidas?** Consulte a documentação completa em `SETUP.md` e `README.md`.