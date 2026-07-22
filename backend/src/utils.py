"""
Utilitários para o pipeline de IA.

Funções auxiliares para:
- Visualização de dados
- Logging e debugging
- Save/load de modelos
- Métricas e relatórios
"""

import os
import json
import logging
from pathlib import Path
from datetime import datetime
from typing import Any, Dict, List, Optional

import numpy as np
import matplotlib.pyplot as plt


def setup_logging(
    log_dir: str = "logs",
    level: int = logging.INFO
) -> logging.Logger:
    """
    Configura logging para o projeto.

    Args:
        log_dir: Diretório para archivos de log
        level: Nível de logging

    Returns:
        Logger configurado
    """
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, f"pipeline_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")

    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )

    return logging.getLogger("ai_pipeline")


def save_model(model: Any, path: str, metadata: Optional[Dict] = None) -> None:
    """
    Salva um modelo treinado.

    Args:
        model: Modelo a ser salvo (Keras, PyTorch, etc.)
        path: Caminho para salvar o modelo
        metadata: Metadados opcionais para salvar junto
    """
    model_path = Path(path).resolve()
    # Prevenir path traversal
    if not str(model_path).startswith(str(Path.cwd())):
        raise ValueError("Path fora do diretório permitido")

    model_path.parent.mkdir(parents=True, exist_ok=True)
    model.save(str(model_path))

    if metadata:
        metadata_path = str(model_path).replace(".keras", "_metadata.json")
        with open(metadata_path, "w") as f:
            json.dump(metadata, f, indent=2)


def load_model(path: str, load_metadata: bool = False) -> Any:
    """
    Carrega um modelo salvo.

    Args:
        path: Caminho do modelo
        load_metadata: Se True, carrega metadados também

    Returns:
        Modelo carregado, ou tupla (modelo, metadados)

    Raises:
        ValueError: Se o path estiver fora do diretório permitido
    """
    import tensorflow as tf

    model_path = Path(path).resolve()
    # Prevenir path traversal
    if not str(model_path).startswith(str(Path.cwd())):
        raise ValueError("Path fora do diretório permitido")

    model = tf.keras.models.load_model(str(model_path))

    if load_metadata:
        metadata_path = str(model_path).replace(".keras", "_metadata.json")
        if os.path.exists(metadata_path):
            with open(metadata_path, "r") as f:
                metadata = json.load(f)
            return model, metadata

    return model


def plot_training_history(
    history: Dict[str, List[float]],
    save_path: Optional[str] = None,
    metrics: List[str] = None
) -> None:
    """
    Plota o histórico de treinamento.

    Args:
        history: Dicionário com métricas de treinamento
        save_path: Caminho para salvar o plot (opcional)
        metrics: Lista de métricas para plotar
    """
    if metrics is None:
        metrics = ["loss", "accuracy"]

    plt.figure(figsize=(15, 5))

    for i, metric in enumerate(metrics):
        plt.subplot(1, len(metrics), i + 1)

        if f"train_{metric}" in history:
            plt.plot(history[f"train_{metric}"], label=f"Train {metric}")
        if f"val_{metric}" in history:
            plt.plot(history[f"val_{metric}"], label=f"Val {metric}")

        plt.xlabel("Epoch")
        plt.ylabel(metric.capitalize())
        plt.legend()
        plt.grid(True, alpha=0.3)

    plt.tight_layout()

    if save_path:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        plt.savefig(save_path, dpi=150, bbox_inches="tight")
        print(f"Gráfico salvo em: {save_path}")
    else:
        plt.show()


def sanitize_for_markdown(text: str) -> str:
    """Sanitiza texto para evitar injeção no Markdown."""
    return str(text).replace("|", "\\|").replace("*", "\\*").replace("_", "\\_")


def generate_report(
    results: Dict[str, Any],
    output_dir: str = "reports"
) -> str:
    """
    Gera um relatório em Markdown com os resultados.

    Args:
        results: Dicionário com resultados e métricas
        output_dir: Diretório para salvar o relatório

    Returns:
        Caminho do arquivo gerado
    """
    os.makedirs(output_dir, exist_ok=True)
    report_path = os.path.join(output_dir, f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md")

    with open(report_path, "w") as f:
        f.write("# Relatório de Treinamento - AI Pipeline Multimodal\n\n")
        f.write(f"Gerado em: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n\n")

        f.write("## Resumo\n\n")
        for key, value in results.items():
            safe_key = sanitize_for_markdown(str(key))
            safe_value = sanitize_for_markdown(str(value) if not isinstance(value, (int, float)) else str(value))
            f.write(f"- **{safe_key}**: {safe_value}\n")

        f.write("\n## Detalhes\n\n")
        f.write("```json\n")
        f.write(json.dumps(results, indent=2))
        f.write("\n```\n")

    return report_path


if __name__ == "__main__":
    # Teste rápido
    logger = setup_logging()
    logger.info("Módulo de utilitários testado com sucesso")