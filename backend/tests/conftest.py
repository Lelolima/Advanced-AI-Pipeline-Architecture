"""Configuração comum dos testes: torna `src/` e `main.py` importáveis."""

import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
for p in (BACKEND_DIR, BACKEND_DIR / "src"):
    if str(p) not in sys.path:
        sys.path.insert(0, str(p))
