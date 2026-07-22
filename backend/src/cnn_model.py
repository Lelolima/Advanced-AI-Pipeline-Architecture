"""
Implementação de Rede Neural Convolucional (CNN) para visão computacional.

Este módulo contém:
- Arquitetura CNN personalizada
- Funções de treinamento e validação
- Extração de características visuais
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from typing import Tuple, Optional


def create_cnn_model(
    input_shape: Tuple[int, int, int] = (224, 224, 3),
    num_classes: int = 1000,
    pretrained: str = "imagenet"
) -> keras.Model:
    """
    Cria um modelo CNN para classificação de imagens.

    Args:
        input_shape: Forma da imagem de entrada (altura, largura, canais)
        num_classes: Número de classes para classificação
        pretrained: Nome do weights pretrained para transfer learning

    Returns:
        Modelo Keras configurado
    """
    # Transfer learning com EfficientNet (ou trocar por ResNet, VGG, etc.)
    base_model = keras.applications.EfficientNetB0(
        include_top=False,
        weights=pretrained,
        input_shape=input_shape,
        pooling="avg"
    )
    base_model.trainable = False  # Feature extraction inicial

    # Camadas customizadas
    inputs = keras.Input(shape=input_shape)
    x = base_model(inputs, training=False)
    x = layers.Dropout(0.2)(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)

    model = keras.Model(inputs, outputs)
    return model


def compile_model(
    model: keras.Model,
    learning_rate: float = 0.001,
    optimizer: str = "adam"
) -> None:
    """
    Compila o modelo com otimizador e métricas.

    Args:
        model: Modelo Keras a ser compilado
        learning_rate: Taxa de aprendizagem do otimizador
        optimizer: Nome do otimizador ('adam', 'sgd', 'rmsprop')
    """
    if optimizer == "adam":
        opt = keras.optimizers.Adam(learning_rate=learning_rate)
    elif optimizer == "sgd":
        opt = keras.optimizers.SGD(learning_rate=learning_rate, momentum=0.9)
    else:
        opt = keras.optimizers.RMSprop(learning_rate=learning_rate)

    model.compile(
        optimizer=opt,
        loss="categorical_crossentropy",
        metrics=["accuracy", keras.metrics.Precision(), keras.metrics.Recall()]
    )


def train_model(
    model: keras.Model,
    train_data: tf.data.Dataset,
    val_data: tf.data.Dataset,
    epochs: int = 50,
    callbacks: Optional[list] = None
) -> keras.callbacks.History:
    """
    Treina o modelo CNN.

    Args:
        model: Modelo Keras compilado
        train_data: Dataset de treinamento
        val_data: Dataset de validação
        epochs: Número de épocas de treinamento
        callbacks: Lista de callbacks opcionais

    Returns:
        Histórico de treinamento
    """
    default_callbacks = [
        keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=10,
            restore_best_weights=True
        ),
        keras.callbacks.ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.5,
            patience=5,
            min_lr=1e-7
        )
    ]

    if callbacks:
        default_callbacks.extend(callbacks)

    return model.fit(
        train_data,
        validation_data=val_data,
        epochs=epochs,
        callbacks=default_callbacks
    )


if __name__ == "__main__":
    # Exemplo de criação do modelo
    model = create_cnn_model(input_shape=(224, 224, 3), num_classes=10)
    compile_model(model, learning_rate=0.001)
    print(model.summary())