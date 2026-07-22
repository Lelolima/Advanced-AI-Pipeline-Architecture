"""
API Backend para o Advanced AI Pipeline Architecture.

Implementa endpoints para:
- Processamento de imagens (CNN)
- Processamento de texto (LLM/PLN)
- Integração multimodal
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn

app = FastAPI(title="AI Pipeline API", version="1.0.0")

# CORS para permitir frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextAnalysisRequest(BaseModel):
    text: str


class ImageAnalysisRequest(BaseModel):
    image_url: str


class MultimodalRequest(BaseModel):
    text: str
    image_url: str = None


class AnalysisResult(BaseModel):
    status: str
    data: Dict[str, Any]
    message: str = ""


# Simulação de modelos (substituir por modelos reais depois)
class MockCNNModel:
    """Mock de CNN para classificação de imagens."""

    LABELS = [
        "objeto", "pessoa", "animal", "veículo", "natureza",
        "comida", "edificio", "tecnologia", "arte", "esporte"
    ]

    def predict(self, image_data: bytes) -> Dict[str, Any]:
        """Simula predição de imagem."""
        import random
        probabilities = [random.random() for _ in range(10)]
        total = sum(probabilities)
        probabilities = [p / total for p in probabilities]

        top_3 = sorted(
            zip(self.LABELS, probabilities),
            key=lambda x: x[1],
            reverse=True
        )[:3]

        return {
            "predictions": [
                {"label": label, "confidence": float(conf)}
                for label, conf in top_3
            ],
            "features_extracted": 1280,  # EfficientNetB0 output size
            "model": "EfficientNetB0 (mock)"
        }


class MockLLMModel:
    """Mock de LLM para análise de texto."""

    def analyze(self, text: str) -> Dict[str, Any]:
        """Simula análise de texto."""
        # Análise básica real
        words = text.split()
        sentences = text.split('.')

        # Análise de sentimento simples (mock)
        positive_words = ["bom", "ótimo", "excelente", "feliz", "amor", "sucesso"]
        negative_words = ["ruim", "péssimo", "triste", "ódio", "fracasso", "mal"]

        positive_count = sum(1 for w in words if w.lower() in positive_words)
        negative_count = sum(1 for w in words if w.lower() in negative_words)

        if positive_count > negative_count:
            sentiment = "positivo"
            confidence = min(0.5 + (positive_count / len(words)) * 2, 0.95)
        elif negative_count > positive_count:
            sentiment = "negativo"
            confidence = min(0.5 + (negative_count / len(words)) * 2, 0.95)
        else:
            sentiment = "neutro"
            confidence = 0.6

        return {
            "sentiment": sentiment,
            "confidence": float(confidence),
            "word_count": len(words),
            "sentence_count": len([s for s in sentences if s.strip()]),
            "entities": self._extract_entities(text),
            "embedding_size": 768,  # BERT output size
            "model": "BERT-based (mock)"
        }

    def _extract_entities(self, text: str) -> List[str]:
        """Extrai entidades simuladas."""
        # Detecta palavras capitalizadas como entidades
        entities = [
            word.rstrip('.,!?;:')
            for word in text.split()
            if len(word) > 1 and word[0].isupper()
        ]
        return list(set(entities))[:5]  # Top 5


class MockMultimodalModel:
    """Integração multimodal."""

    def integrate(
        self,
        visual_features: Dict[str, Any],
        text_features: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Integra saídas visual e textual."""
        # Combina confiança das duas modalidades
        visual_conf = visual_features.get("predictions", [{}])[0].get("confidence", 0.5)
        text_conf = text_features.get("confidence", 0.5)

        # Peso igual (pode ser ajustado)
        combined_confidence = (visual_conf + text_conf) / 2 if visual_conf else text_conf

        return {
            "combined_confidence": float(combined_confidence),
            "visual_weight": 0.5,
            "text_weight": 0.5,
            "recommendation": self._generate_recommendation(
                visual_features, text_features, combined_confidence
            ),
            "model": "Multimodal Fusion (mock)"
        }

    def _generate_recommendation(
        self,
        visual: Dict[str, Any],
        text: Dict[str, Any],
        confidence: float
    ) -> str:
        """Gera recomendação baseada nas saídas."""
        if confidence > 0.8:
            return "Alta confiança na análise integrada. Resultados consistentes."
        elif confidence > 0.6:
            return "Confiança moderada. Recomenda-se revisão humana."
        else:
            return "Baixa confiança. Múltiplas interpretações possíveis."


# Inicializa modelos
cnn_model = MockCNNModel()
llm_model = MockLLMModel()
multimodal_model = MockMultimodalModel()


@app.get("/")
async def root():
    """Health check."""
    return {
        "status": "online",
        "service": "AI Pipeline API",
        "version": "1.0.0",
        "endpoints": [
            "/analyze/text",
            "/analyze/image",
            "/analyze/multimodal",
            "/health"
        ]
    }


@app.get("/health")
async def health_check():
    """Verifica saúde dos modelos."""
    return {
        "cnn_model": "ok",
        "llm_model": "ok",
        "multimodal_model": "ok",
        "status": "healthy"
    }


@app.post("/analyze/text", response_model=AnalysisResult)
async def analyze_text(request: TextAnalysisRequest):
    """
    Analisa texto usando PLN/LLM.

    - **text**: Texto para análise
    - Retorna: sentimento, entidades, estatísticas
    """
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Texto vazio")

    try:
        result = llm_model.analyze(request.text)
        return AnalysisResult(
            status="success",
            data=result,
            message="Texto analisado com sucesso"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/analyze/image", response_model=AnalysisResult)
async def analyze_image(image: UploadFile = File(...)):
    """
    Analisa imagem usando CNN.

    - **image**: Arquivo de imagem (JPEG, PNG)
    - Retorna: classificações, features extraídas
    """
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Arquivo não é uma imagem")

    try:
        image_data = await image.read()
        result = cnn_model.predict(image_data)
        return AnalysisResult(
            status="success",
            data=result,
            message="Imagem analisada com sucesso"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/analyze/multimodal", response_model=AnalysisResult)
async def analyze_multimodal(request: MultimodalRequest):
    """
    Análise multimodal integrando texto e imagem.

    - **text**: Texto para análise
    - **image_url**: URL da imagem (opcional)
    - Retorna: análise integrada
    """
    if not request.text.strip() and not request.image_url:
        raise HTTPException(status_code=400, detail="Texto ou imagem necessários")

    try:
        # Análise de texto
        text_result = llm_model.analyze(request.text) if request.text else {}

        # Análise de imagem (simulada por enquanto)
        visual_result = {
            "predictions": [{"label": "simulado", "confidence": 0.7}],
            "features_extracted": 1280
        } if request.image_url else {}

        # Integração
        if text_result and visual_result:
            integrated = multimodal_model.integrate(text_result, visual_result)
            return AnalysisResult(
                status="success",
                data={
                    "text_analysis": text_result,
                    "visual_analysis": visual_result,
                    "integrated": integrated
                },
                message="Análise multimodal completada"
            )
        elif text_result:
            return AnalysisResult(
                status="success",
                data={"text_analysis": text_result},
                message="Apenas análise de texto (sem imagem)"
            )
        else:
            return AnalysisResult(
                status="success",
                data={"visual_analysis": visual_result},
                message="Apenas análise visual (sem texto)"
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )