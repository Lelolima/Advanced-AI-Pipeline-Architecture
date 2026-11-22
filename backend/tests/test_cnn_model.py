"""Testes do módulo CNN.

O TensorFlow é substituído por um MagicMock (instalação pesada, opcional no CI);
os testes verificam a montagem/compilação do modelo, não o treino real.
"""

import importlib
import sys
from unittest.mock import MagicMock, patch

import pytest


@pytest.fixture
def cnn():
    tf = MagicMock(name="tensorflow")
    mods = {
        "tensorflow": tf,
        "tensorflow.keras": tf.keras,
        "tensorflow.keras.layers": tf.keras.layers,
    }
    with patch.dict(sys.modules, mods):
        sys.modules.pop("cnn_model", None)
        module = importlib.import_module("cnn_model")
        yield module, tf.keras
    sys.modules.pop("cnn_model", None)


def test_create_cnn_model_uses_efficientnet_with_params(cnn):
    module, keras = cnn
    module.create_cnn_model(input_shape=(128, 128, 3), num_classes=7, pretrained=None)
    keras.applications.EfficientNetB0.assert_called_once_with(
        include_top=False, weights=None, input_shape=(128, 128, 3), pooling="avg"
    )
    module.layers.Dense.assert_called_once_with(7, activation="softmax")
    assert keras.applications.EfficientNetB0.return_value.trainable is False


@pytest.mark.parametrize("name,attr", [("adam", "Adam"), ("sgd", "SGD"), ("rmsprop", "RMSprop")])
def test_compile_model_selects_optimizer(cnn, name, attr):
    module, keras = cnn
    model = MagicMock()
    module.compile_model(model, learning_rate=0.01, optimizer=name)
    getattr(keras.optimizers, attr).assert_called_once()
    kwargs = model.compile.call_args.kwargs
    assert kwargs["loss"] == "categorical_crossentropy"
    assert kwargs["optimizer"] is getattr(keras.optimizers, attr).return_value
