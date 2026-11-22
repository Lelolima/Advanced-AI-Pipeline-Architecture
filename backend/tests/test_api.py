"""Testes da API FastAPI (modelos simulados declarados como mock na resposta)."""

from fastapi.testclient import TestClient

import main

client = TestClient(main.app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_analyze_text_positive():
    r = client.post("/analyze/text", json={"text": "Foi um ótimo dia, excelente sucesso."})
    assert r.status_code == 200
    data = r.json()["data"]
    assert data["sentiment"] == "positivo"
    assert data["word_count"] == 6
    assert "(mock)" in data["model"]


def test_analyze_text_empty_is_400():
    assert client.post("/analyze/text", json={"text": "   "}).status_code == 400


def test_analyze_image_rejects_non_image():
    files = {"image": ("a.txt", b"hello", "text/plain")}
    assert client.post("/analyze/image", files=files).status_code == 400


def test_analyze_image_ok():
    files = {"image": ("a.png", b"\x89PNG fake", "image/png")}
    r = client.post("/analyze/image", files=files)
    assert r.status_code == 200
    preds = r.json()["data"]["predictions"]
    assert len(preds) == 3
    assert abs(sum(p["confidence"] for p in preds)) <= 1.0001


def test_multimodal_combines_visual_and_text_confidence():
    """Regressão: integrate() recebia os argumentos invertidos e sempre devolvia 0.5."""
    text = "ótimo excelente feliz"  # sentimento positivo, confiança 0.95
    r = client.post("/analyze/multimodal", json={"text": text, "image_url": "http://x/img.png"})
    assert r.status_code == 200
    integrated = r.json()["data"]["integrated"]
    # visual simulado = 0.7, texto = 0.95 -> média 0.825
    assert abs(integrated["combined_confidence"] - 0.825) < 1e-9


def test_multimodal_requires_input():
    assert client.post("/analyze/multimodal", json={"text": ""}).status_code == 400
