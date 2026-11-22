# Auditoria técnica — 2026-11-22

Repositório: `Lelolima/Advanced-AI-Pipeline-Architecture` · Branch: `fix/ci-e-auditoria-2026-11-22`

## Diagnóstico (estado anterior)

- **Finalidade:** front-end React/Vite/TypeScript que ilustra um pipeline multimodal (CNN + LLM + RNN)
  e uma API FastAPI (`backend/main.py`).
- **CI:** as três últimas execuções em `main` falharam (jobs *Frontend Checks* e *Backend Checks*).
- **Instala:** `npm ci` OK. `backend/requirements.txt` exigia TensorFlow, spaCy, Jupyter etc., mesmo a API não usando nada disso.
- **Compila:** `vite build` passava, mas `tsc --noEmit` (e portanto `npm run build`) tinha 26 erros.

## Problemas encontrados

| # | Sev. | Problema | Evidência |
|---|------|----------|-----------|
| 1 | P1 | `tsc` falhava com 26 erros (import `type` de valor `DEFAULT_CONFIG`, `PipelineNodeWithIcon` inexistente, `unknown` renderizado em JSX, `jest` usado no setup do Vitest, tipos de entidade) | `npx tsc --noEmit` |
| 2 | P1 | ESLint com 19 erros de acessibilidade (div clicável sem teclado, label sem controle) | `npx eslint .` |
| 3 | P1 | Vitest: `src/test/setup.ts` usava `jest.fn` → todas as suítes quebravam; `src/App.test.tsx` era uma cópia de componente sem testes | `npx vitest run` → "2 failed, no tests" |
| 4 | P1 | Bug na API: `/analyze/multimodal` chamava `integrate(text, visual)` com argumentos invertidos → `combined_confidence` era sempre 0.5 | teste `test_multimodal_combines_visual_and_text_confidence` falhava antes da correção (1 failed, 6 passed) |
| 5 | P1 | `backend/tests/test_utils.py` apontava para `tests/src` e `utils.py` importava numpy/matplotlib sem uso no topo → coleta falhava sem dependências pesadas | `pytest` → ModuleNotFoundError |
| 6 | P2 | `test_cnn_model.py` só tinha testes vazios (`pass`) — aprovação falsa | leitura do código |
| 7 | P2 | 13 avisos flake8 (imports não usados, linha longa, sem newline final) | `flake8 src main.py` |
| 8 | P2 | `npm audit`: 24 vulnerabilidades (3 críticas, 13 altas) | `npm audit` |
| 9 | P2 | Arquivos `__pycache__/*.pyc` versionados | `git ls-files` |
| 10 | P2 | CI mascarava falhas (`\|\| echo`), actions sem versão fixa, sem `permissions` | `.github/workflows/ci.yml` |
| 11 | P2 | **Dados simulados apresentados como reais:** API com modelos aleatórios/heurísticos; `Dashboard.tsx` com métricas fictícias (`MOCK_METRICS`) e variação aleatória; README anunciava "detecção de objetos e faces", "TensorFlow • PyTorch" | código-fonte |
| 12 | P3 | `MultimodalRequest.image_url: str = None`; `generate_report` sem encoding UTF-8; `content_type` podia ser `None` | código-fonte |

Segredos: nenhum encontrado (busca por padrões de chaves/tokens em todo o histórico — 5 commits — e por arquivos `.env`/`.pem`). `gitleaks` não está instalado na máquina de auditoria; a busca foi manual com `git log -p --all | grep`.

## Mudanças

- Correções de tipos em `services/index.ts`, `AnalysisPanel.tsx`, `Dashboard.tsx`, `constants/pipeline.ts` (novo tipo `PipelineNodeWithIcon`).
- Acessibilidade: `role="button"`, `tabIndex` e tratamento de Enter/Espaço nos cards; `htmlFor`/`id` nos campos; rótulos de grupos viraram `<span>`; diálogos com `role="presentation"` e Esc.
- `src/test/setup.ts` migrado para `vi.fn`; removido `src/App.test.tsx` (não era teste).
- `npm audit fix` (sem `--force`): 24 → 5 vulnerabilidades.
- API: argumentos de `integrate` corrigidos; `Optional[str]`; `content_type` nulo tratado.
- Backend: imports pesados removidos/tardios; `requirements.txt` só com o necessário para API + testes; dependências de ML movidas para `requirements-ml.txt` (nada removido).
- Testes novos: `tests/test_api.py` (7 testes), `test_cnn_model.py` reescrito com testes reais da montagem do modelo (TensorFlow mockado, declarado no docstring), `test_generate_report_escapes_values`.
- CI reescrito: `permissions: contents: read`, actions fixadas por SHA, lint + tsc + vitest + build + `npm audit --omit=dev`, flake8 + pytest; sem `|| echo`; sem deploy.
- README: seção "Estado real da implementação", instalação/execução/testes/variáveis fiéis ao código.

## Testes executados (resultados reais, Windows, Node 20 / Python 3.13 local)

| Comando | Resultado |
|---------|-----------|
| `npx tsc --noEmit` | OK (0 erros; antes 26) |
| `npx eslint .` | 0 erros, 21 avisos (antes 19 erros) |
| `npx vitest run` | 6/6 passaram (antes: 2 suítes quebradas) |
| `npm run build` | OK |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilidades |
| `flake8 src main.py tests --max-line-length=100` | OK |
| `python -m pytest` (backend) | 18 passaram |
| `pip-audit -r backend/requirements.txt` | sem vulnerabilidades conhecidas |

O CI do PR é a validação em Linux/Python 3.11.

## Riscos residuais / decisões do dono

- `npm audit` ainda aponta 5 vulnerabilidades **apenas de desenvolvimento** (esbuild via vite 5 — servidor de dev; tinypool via vitest 1). A correção exige vite 8 / vitest 5 (majors) — não feito para não trocar ferramentas sem validação; recomenda-se atualização planejada.
- A API continua simulada. Ligar modelos reais (TensorFlow/transformers) é decisão de produto e exige GPU/infra; não foi executado.
- `Dashboard.tsx` permanece com dados fictícios (não está montado pela `App.tsx`); o README agora deixa isso explícito.
- Os módulos de treino (`backend/src/cnn_model.py`, `rna_integration.py`, `llm_pln_module.py`) não foram executados de verdade (exigem TensorFlow/transformers e download de pesos).
- Há muitos documentos de status redundantes na raiz (`STATUS_FINAL.md`, `SUMARIO_FINAL.md`, …) com afirmações não verificadas; não foram removidos.
