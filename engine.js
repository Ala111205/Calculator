const operators = {
  '+': { p: 1, fn: (a, b) => a + b },
  '-': { p: 1, fn: (a, b) => a - b },
  '*': { p: 2, fn: (a, b) => a * b },
  '/': {
    p: 2,
    fn: (a, b) => {
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    }
  }
};

function tokenize(expr) {
  return expr.match(/(sqrt|\d+\.?\d*|\.\d+|[+\-*/()])/g);
}

function toRPN(tokens) {
  const output = [];
  const stack = [];

  tokens.forEach((t, i) => {
    if (!isNaN(t)) {
      output.push(t);
    }

    else if (t === 'sqrt') {
      stack.push(t);
    }

    else if (operators[t]) {
      const prev = tokens[i - 1];
      if (t === '-' && (i === 0 || operators[prev] || prev === '(')) {
        stack.push('u-'); // unary minus
        return;
      }

      while (
        stack.length &&
        operators[stack.at(-1)] &&
        operators[stack.at(-1)].p >= operators[t].p
      ) {
        output.push(stack.pop());
      }
      stack.push(t);
    }

    else if (t === '(') stack.push(t);

    else if (t === ')') {
      while (stack.at(-1) !== '(') output.push(stack.pop());
      stack.pop();
      if (stack.at(-1) === 'sqrt') output.push(stack.pop());
    }
  });

  return output.concat(stack.reverse());
}

function evaluateRPN(rpn) {
  const stack = [];

  rpn.forEach(t => {
    if (!isNaN(t)) stack.push(+t);

    else if (t === 'u-') stack.push(-stack.pop());

    else if (t === 'sqrt') {
      const v = stack.pop();
      if (v < 0) throw Error("Invalid sqrt");
      stack.push(Math.sqrt(v));
    }

    else {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[t].fn(a, b));
    }
  });

  return stack[0];
}

function calculate(expression) {
  const tokens = tokenize(expression);
  const rpn = toRPN(tokens);
  const result = evaluateRPN(rpn);
  return Math.round((result + Number.EPSILON) * 1e10) / 1e10;
}