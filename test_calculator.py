"""Unit tests for the calculator module."""

import pytest
from calculator import add, divide


class TestAdd:
    """Tests for the add function."""

    def test_add_positive_numbers(self):
        """Test adding two positive numbers."""
        assert add(2, 3) == 5

    def test_add_negative_numbers(self):
        """Test adding two negative numbers."""
        assert add(-2, -3) == -5

    def test_add_mixed_numbers(self):
        """Test adding positive and negative numbers."""
        assert add(5, -3) == 2

    def test_add_zeros(self):
        """Test adding zeros."""
        assert add(0, 0) == 0

    def test_add_floats(self):
        """Test adding floating point numbers."""
        assert add(1.5, 2.5) == 4.0


class TestDivide:
    """Tests for the divide function."""

    def test_divide_positive_numbers(self):
        """Test dividing two positive numbers."""
        assert divide(10, 2) == 5

    def test_divide_negative_numbers(self):
        """Test dividing two negative numbers."""
        assert divide(-10, -2) == 5

    def test_divide_mixed_numbers(self):
        """Test dividing positive by negative."""
        assert divide(10, -2) == -5

    def test_divide_floats(self):
        """Test dividing floating point numbers."""
        assert divide(7.5, 2.5) == 3.0

    def test_divide_by_zero_raises_error(self):
        """Test that dividing by zero raises ZeroDivisionError."""
        with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
            divide(10, 0)

    def test_divide_zero_by_number(self):
        """Test dividing zero by a number."""
        assert divide(0, 5) == 0.0
