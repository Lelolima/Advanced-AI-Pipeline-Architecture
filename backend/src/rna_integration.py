"""
Integração Multimodal com Redes Neurais Artificiais (RNA).

Este módulo contém:
- Fusão de features visuais (CNN) e textuais (LLM)
- Modelo de integração para predição final
- Geração de insights consolidados
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Concatenate, Dense, Dropout
from tensorflow.keras.metrics import Precision, Recall
from typing import Tuple, Dict, Any, List
import numpy as np


def create_multimodal_model(
    visual_input_shape: Tuple[int, ...],
    text_input_shape: Tuple[int, ...],
    num_classes: int = 10
) -> keras.Model:
    """
    Cria um modelo que integra dados visuais e textuais.

    Args:
        visual_input_shape: Forma do input visual (features da CNN)
        text_input_shape: Forma do input textual (embeddings do LLM)
        num_classes: Número de classes para predição final

    Returns:
        Modelo Keras multimodal
    """
    # Input visual (features extraídas da CNN)
    visual_input = keras.Input(shape=visual_input_shape, name="visual_features")
    visual_processed = Dense(512, activation="relu")(visual_input)
    visual_processed = Dropout(0.3)(visual_processed)

    # Input textual (embeddings do LLM)
    text_input = keras.Input(shape=text_input_shape, name="text_features")
    text_processed = Dense(512, activation="relu")(text_input)
    text_processed = Dropout(0.3)(text_processed)

    # Fusão multimodal
    combined = Concatenate()([visual_processed, text_processed])
    combined = Dense(256, activation="relu")(combined)
    combined = Dropout(0.3)(combined)
    combined = Dense(128, activation="relu")(combined)

    # Output
    output = Dense(num_classes, activation="softmax", name="prediction")(combined)

    model = keras.Model(
        inputs=[visual_input, text_input],
        outputs=output,
        name="multimodal_model"
    )

    return model


def compile_multimodal_model(
    model: keras.Model,
    learning_rate: float = 0.0001
) -> None:
    """
    Compila o modelo multimodal.

    Args:
        model: Modelo Keras
        learning_rate: Taxa de aprendizagem
    """
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=learning_rate),
        loss="categorical_crossentropy",
        metrics=[
            "accuracy",
            Precision(name="precision"),
            Recall(name="recall")
        ]
    )


def fuse_predictions(
    visual_probs: np.ndarray,
    text_probs: np.ndarray,
    weights: Tuple[float, float] = (0.5, 0.5)
) -> np.ndarray:
    """
    Combina predições dos modelos visual e textual.

    Args:
        visual_probs: Probabilidades do modelo visual
        text_probs: Probabilidades do modelo textual
        weights: Pesos para cada modalidade (visual, textual)

    Returns:
        Probabilidades combinadas
    """
    visual_weight, text_weight = weights
    return visual_weight * visual_probs + text_weight * text_probs


def generate_insights(
    predictions: np.ndarray,
    class_names: List[str],
    threshold: float = 0.7
) -> Dict[str, Any]:
    """
    Gera insights a partir das predições.

    Args:
        predictions: Array de predições
        class_names: Nomes das classes
        threshold: Limiar de confiança

    Returns:
        Dicionário com insights e recomendações
    """
    insights = []
    for i, pred in enumerate(predictions):
        top_class_idx = np.argmax(pred)
        confidence = pred[top_class_idx]

        if confidence >= threshold:
            insights.append({
                "sample": i,
                "prediction": class_names[top_class_idx],
                "confidence": float(confidence),
                "status": "high_confidence"
            })
        else:
            insights.append({
                "sample": i,
                "prediction": class_names[top_class_idx],
                "confidence": float(confidence),
                "status": "low_confidence_review_recommended"
            })

    return {"insights": insights, "total": len(insights)}


if __name__ == "__main__":
    # Exemplo de criação do modelo
    model = create_multimodal_model(
        visual_input_shape=(1280,),  # EfficientNetB0 feature size
        text_input_shape=(768,),     # BERT hidden size
        num_classes=10
    )
    compile_multimodal_model(model)
    print(model.summary())