let display = document.getElementById('display');

function appendValue(value) {
    if (display.innerText === '0') {
      display.innerText = value;
    } else {
      display.innerText += ' ' + value;
    }
  }

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || '0';
  }

function resetDisplay() {
    display.innerText = '0';
  }

function evaluateExpression() {
    const expression = display.innerText.replace(/x/g, '*').replace(/ /g, '');
  
    if (expression.startsWith('+') || expression.startsWith('/') || expression.startsWith('*')) {
      alert('Invalid expression: Cannot start with an operator');
      return;
    }
  
    if (expression.endsWith('+') || expression.endsWith('/') || expression.endsWith('-') || expression.endsWith('*')) {
      alert('Invalid expression: Cannot end with an operator');
      return;
    }
  
    try {
        let result = eval(expression);
    if (Number.isInteger(result)){
        display.innerText = result
    }
    else{
        display.innerText = result.toFixed(3)
    }
    } catch {
      alert('Invalid expression');
    }
  }
  