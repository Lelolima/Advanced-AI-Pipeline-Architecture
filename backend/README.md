# Backend Python - Advanced AI Pipeline

Este diretório conterá a implementação do backend em Python para o pipeline de IA.

## Estrutura Proposta

```
backend/
├── src/
│   ├── data_preprocessing.py    # Pré-processamento de dados
│   ├── cnn_model.py             # CNN para visão computacional
│   ├── llm_pln_module.py        # LLM e módulos de PLN
│   ├── rna_integration.py       # Integração e predição com RNA
│   └── utils.py                 # Utilitários
├── notebooks/                   # Experimentos e análises
├── data/                        # Dados de exemplo
├── models/                      # Modelos treinados
├── tests/                       # Testes unitários
├── requirements.txt             # Dependências Python
└── README.md                    # Documentação do backend
```

## Instalação

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Windows)
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `data_preprocessing.py` | Coleta e pré-processamento de dados |
| `cnn_model.py` | Treinamento e inferência da CNN |
| `llm_pln_module.py` | Processamento de linguagem natural |
| `rna_integration.py` | Integração multimodal e predição |

## Integração com Frontend

O backend exporá uma API REST que o frontend React consumirá para:
- Enviar dados para processamento
- Receber predições e insights
- Visualizar métricas de treinamento