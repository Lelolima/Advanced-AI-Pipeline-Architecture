"""
Testes unitários para os utilitários do pipeline.
"""

import unittest
import os
import sys
from pathlib import Path

# Adicionar src ao path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from utils import sanitize_for_markdown


class TestSanitizeForMarkdown(unittest.TestCase):
    """Testes para função de sanitização Markdown."""

    def test_sanitize_pipe_character(self):
        """Testa sanitização do caractere pipe."""
        self.assertEqual(sanitize_for_markdown("a|b"), "a\\|b")

    def test_sanitize_asterisk(self):
        """Testa sanitização do asterisco."""
        self.assertEqual(sanitize_for_markdown("a*b"), "a\\*b")

    def test_sanitize_underscore(self):
        """Testa sanitização do underscore."""
        self.assertEqual(sanitize_for_markdown("a_b"), "a\\_b")

    def test_sanitize_multiple(self):
        """Testa múltiplos caracteres especiais."""
        self.assertEqual(sanitize_for_markdown("a|b*c_d"), "a\\|b\\*c\\_d")

    def test_sanitize_clean_string(self):
        """Testa string sem caracteres especiais."""
        self.assertEqual(sanitize_for_markdown("hello world"), "hello world")

    def test_sanitize_non_string(self):
        """Testa conversão de não-string."""
        self.assertEqual(sanitize_for_markdown(123), "123")


if __name__ == "__main__":
    unittest.main()