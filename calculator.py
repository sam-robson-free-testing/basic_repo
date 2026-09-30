"""A simple calculator module for basic arithmetic operations."""


def add(a, b):
    """Return the sum of two numbers."""
    return a + b


def divide(a, b):
    """Return the result of dividing a by b.

    Raises:
        ZeroDivisionError: If b is zero.
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b
