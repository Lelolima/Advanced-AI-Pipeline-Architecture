"""Testes unitários para os utilitários do pipeline."""

import unittest

from utils import generate_report, sanitize_for_markdown


class TestSanitizeForMarkdown(unittest.TestCase):
    """Testes para função de sanitização Markdown."""

    def test_sanitize_pipe_character(self):
        self.assertEqual(sanitize_for_markdown("a|b"), "a\\|b")

    def test_sanitize_asterisk(self):
        self.assertEqual(sanitize_for_markdown("a*b"), "a\\*b")

    def test_sanitize_underscore(self):
        self.assertEqual(sanitize_for_markdown("a_b"), "a\\_b")

    def test_sanitize_multiple(self):
        self.assertEqual(sanitize_for_markdown("a|b*c_d"), "a\\|b\\*c\\_d")

    def test_sanitize_clean_string(self):
        self.assertEqual(sanitize_for_markdown("hello world"), "hello world")

    def test_sanitize_non_string(self):
        self.assertEqual(sanitize_for_markdown(123), "123")


def test_generate_report_escapes_values(tmp_path):
    path = generate_report({"acc_top|1": 0.9, "modelo": "cnn_v1"}, str(tmp_path))
    with open(path, encoding="utf-8") as f:
        content = f.read()
    assert "Relatório" in content
    assert "acc\\_top\\|1" in content
    assert "cnn\\_v1" in content
