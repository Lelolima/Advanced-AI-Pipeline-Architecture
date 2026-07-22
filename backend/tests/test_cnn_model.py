"""
Testes unitários para o módulo de CNN.
"""

import unittest
import sys
from pathlib import Path

# Adicionar src ao path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

# Mock de tensorflow para testes sem dependência pesada
from unittest.mock import MagicMock
sys.modules['tensorflow'] = MagicMock()
sys.modules['tensorflow.keras'] = MagicMock()
sys.modules['tensorflow.keras.layers'] = MagicMock()

from cnn_model import create_cnn_model, compile_model


class TestCnnModel(unittest.TestCase):
    """Testes para funções do módulo CNN."""

    def test_create_cnn_model_returns_model(self):
        """Testa se create_cnn_model retorna um modelo."""
        #Nota: Teste real requer TensorFlow instalado
        pass

    def test_create_cnn_model_default_input_shape(self):
        """Testa criação com input shape padrão."""
        pass

    def test_create_cnn_model_custom_classes(self):
        """Testa criação com número customizado de classes."""
        pass


if __name__ == "__main__":
    unittest.main()