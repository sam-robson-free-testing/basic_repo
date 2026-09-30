const display = document.getElementById('display');
let expression = '';
let shouldReset = false;

function updateDisplay() {
  display.value = expression || '0';
}

function appendValue(value) {
  if (shouldReset) {
    expression = '';
    shouldReset = false;
  }

  const lastChar = expression.slice(-1);
  const lastNumber = expression.split(/[+\-*/]/).pop();

  if (value === '.') {
    if (lastNumber.includes('.')) return;
    if (expression === '' || ['+', '-', '*', '/'].includes(lastChar)) {
      expression += '0.';
    } else {
      expression += '.';
    }
  } else {
    expression += value;
  }

  updateDisplay();
}

function appendOperator(operator) {
  if (expression === '' && operator === '-') {
    expression = '-';
    updateDisplay();
    return;
  }

  if (expression === '') return;

  const lastChar = expression.slice(-1);

  if (['+', '-', '*', '/'].includes(lastChar)) {
    expression = expression.slice(0, -1) + operator;
  } else {
    expression += operator;
  }

  shouldReset = false;
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  shouldReset = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldReset) {
    clearDisplay();
    return;
  }

  expression = expression.slice(0, -1);
  updateDisplay();
}

function evaluateExpression() {
  if (!expression) return;

  try {
    const result = Function(`"use strict"; return (${expression});`)();

    if (!Number.isFinite(result)) {
      throw new Error('Invalid result');
    }

    expression = String(result);
    shouldReset = true;
    updateDisplay();
  } catch {
    expression = '';
    display.value = 'Error';
    shouldReset = true;
  }
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === 'clear') {
      clearDisplay();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      return;
    }

    if (action === 'equals') {
      evaluateExpression();
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      appendOperator(value);
    } else {
      appendValue(value);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (/^[0-9]$/.test(event.key)) {
    appendValue(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    appendOperator(event.key);
  } else if (event.key === '.') {
    appendValue('.');
  } else if (event.key === 'Enter' || event.key === '=') {
    evaluateExpression();
  } else if (event.key === 'Backspace') {
    deleteLast();
  } else if (event.key === 'Escape') {
    clearDisplay();
  }
});

updateDisplay();
