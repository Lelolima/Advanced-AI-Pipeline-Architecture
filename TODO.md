# TODO Ledger - Pendências do Projeto

**Última atualização:** 2026-07-16  
**Status:** ✅ Configuração concluída, pronto para desenvolvimento

---

## ✅ Concluído (2026-07-16)

- [x] Corrigir imports do TensorFlow/Keras em `rna_integration.py`
- [x] Corrigir métricas do compile (Precision, Recall)
- [x] Type safety - remover `any` do pipeline.ts
- [x] Runtime safety - ícone null no PipelineCard
- [x] Sanitização Markdown no utils.py
- [x] Validação de path (path traversal)
- [x] Configurar CI/CD GitHub Actions
- [x] Configurar ESLint com jsx-a11y
- [x] Criar testes unitários (test_utils.py)
- [x] Corrigir tsconfig.json (composite, noEmit)
- [x] Adicionar pytest ao requirements.txt
- [x] Criar documentação completa (README, SETUP, CONTRIBUTING)

---

## 📊 Resumo

| Categoria | Pendentes | Concluídos |
|-----------|-----------|------------|
| Backend Python | 10 | 5 |
| Frontend React | 6 | 2 |
| DevOps/Infra | 3 | 3 |
| Documentação | 4 | 3 |
| Segurança | 3 | 2 |

**Total:** 26 itens pendentes, 15 concluídos

---

## Backend Python

---

## Backend Python

### `backend/src/data_preprocessing.py`
- [ ] Implementar `load_images_from_directory()` com OpenCV/PIL
- [ ] Implementar `preprocess_text()` com NLTK/SpaCy
- [ ] Implementar `create_data_pipeline()`

### `backend/src/cnn_model.py`
- [x] Estrutura básica criada
- [ ] Adicionar fine-tuning do base_model (descongelar camadas)
- [ ] Adicionar suporte a augmentations (ImageDataGenerator)

### `backend/src/llm_pln_module.py`
- [ ] Implementar `analyze_sentiment()` com pipeline transformers
- [ ] Implementar `extract_entities()` com SpaCy
- [ ] Implementar `summarize_text()` com modelo seq2seq
- [ ] Implementar `get_embeddings()`

### `backend/src/rna_integration.py`
- [x] Corrigir imports do TensorFlow/Keras
- [x] Corrigir métricas do compile
- [ ] Implementar classe `F1Score` customizada
- [ ] Adicionar função de treinamento do modelo multimodal

### `backend/src/utils.py`
- [x] Adicionar sanitização no `generate_report`
- [x] Adicionar validação de path no `save_model`/`load_model`
- [ ] Adicionar validação de tipo de modelo

---

## Frontend React

### Componentes
- [ ] Adicionar loading states
- [ ] Adicionar error boundary
- [ ] Criar componente `PipelineFlow` com conexões visuais entre nodes
- [ ] Adicionar tooltip com detalhes técnicos de cada etapa

### Acessibilidade
- [x] Instalar e configurar `eslint-plugin-jsx-a11y`
- [ ] Adicionar aria-labels nos cards
- [ ] Garantir keyboard navigation
- [ ] Testar com screen reader

### Tipos
- [x] Remover `any` dos tipos
- [ ] Adicionar tipos para eventos de mouse

---

## DevOps / Infrastructure

### CI/CD
- [x] Criar `.github/workflows/ci.yml`
- [x] Adicionar lint check no PR
- [x] Adicionar type check (tsc)
- [ ] Adicionar testes automatizados
- [ ] Build de preview para PRs

### Docker
- [ ] Criar `Dockerfile` para frontend
- [ ] Criar `Dockerfile` para backend
- [ ] Criar `docker-compose.yml` para desenvolvimento

### Monitoramento
- [ ] Configurar logging estruturado
- [ ] Adicionar health check endpoint
- [ ] Configurar métricas de performance

---

## Documentação

- [ ] Adicionar diagrama de arquitetura (Mermaid/Draw.io)
- [ ] Criar guia de deploy
- [ ] Adicionar exemplos de uso da API (quando criada)
- [ ] Traduzir README para inglês (opcional)

---

## Segurança

- [x] Adicionar sanitização de inputs
- [x] Adicionar validação de path
- [ ] Adicionar rate limiting (se houver API)
- [ ] Configurar CORS
- [ ] Adicionar validação de schema para inputs

---

## Performance

### Frontend
- [ ] Code splitting por rota/componente
- [ ] Lazy loading de ícones
- [ ] Otimizar bundle size
- [ ] Adicionar React.memo onde aplicável

### Backend
- [ ] caching de embeddings
- [ ] Batch processing para imagens
- [ ] GPU acceleration para CNN
- [ ] Parallel processing para pré-processamento

---

## Notas do Code Review (2026-07-16)

### Finding #7: TODOs não implementados
O módulo `llm_pln_module.py` possui vários métodos com `NotImplementedError`.
**Ação:** Marcar como STUB ou implementar cada método.

### Finding #10: F1Score não implementado
A métrica F1Score foi removida do compile pois requer implementação customizada.
**Ação:**implementar classe `F1Score(Metric)` ou remover definitivamente.

---

## Prioridades para Próxima Sprint

1. **Alta:** Implementar funções do `llm_pln_module.py`
2. **Alta:** Criar CI/CD básico
3. **Média:** Adicionar testes de integração
4. **Média:** Implementar frontend do pipeline visual
5. **Baixa:** Traduzir documentação