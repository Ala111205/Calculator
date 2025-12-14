const screen = document.getElementById("screen");
const history = document.getElementById("history");
const buttons = document.querySelectorAll("button");
const deleteBtn = document.getElementById("deleteBtn");

const STATE = {
  INPUT: 'input',
  RESULT: 'result',
  ERROR: 'error'
};

let calcState = STATE.INPUT;

let expression = "";
let memory = 0;

function update() {
  screen.value = expression || "0";

  if (deleteBtn) {
    deleteBtn.style.display =
      expression.length > 0 ? "block" : "none";
  }
}

buttons.forEach(btn => {
  btn.onclick = () => handleInput(btn.dataset);
});

document.addEventListener("keydown", e => {
  if (/[0-9]/.test(e.key) || ['+','-','*','/','.','(',')'].includes(e.key)) {
    expression += e.key;
  } else if (e.key === "Enter") {
    evaluate();
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
  }
  update();
});

function getCurrentNumber() {
  const match = expression.match(/(\d+\.?\d*)$/);
  return match ? Number(match[1]) : null;
}

function handleInput({ value, action }) {
  if (calcState === STATE.RESULT && value) {
    expression = value;
    calcState = STATE.INPUT;
  }

  if (value) expression += value;

  if (action === "clear") expression = "";
  if (action === "delete") expression = expression.slice(0, -1);
  if (action === "equals") {
    evaluate();
    calcState = expression === "Error" ? STATE.ERROR : STATE.RESULT;
  }

  if (action === "sqrt") expression = `sqrt(${expression})`;

  if (action === "percent") expression += "/100";

  if (action === "mc") memory = 0;

  if (action === "mr" && !isNaN(memory)) {
    expression += memory.toString();
  }

  if (action === "mplus") {
    const num = getCurrentNumber();
    if (num !== null) memory += num;
  }

  if (action === "mminus") {
    const num = getCurrentNumber();
    if (num !== null) memory -= num;
  }

  update();
}

history.addEventListener("click", () => {
    const text = history.textContent;
    if (!text) return;

    // restore expression
    expression = text;
    update();

    // force browser to paint BEFORE animation
    screen.classList.remove("restore");
    void screen.offsetHeight; // force reflow

    // now animate
    console.log("Before:", screen.className);
    screen.classList.add("restore");
    console.log("After:", screen.className);

    history.classList.add("restore-flash");

    setTimeout(() => {
        screen.classList.remove("restore");
        history.classList.remove("restore-flash");
    }, 300);
});

function isValidExpression(expr) {
  if (/[*+/]{2,}/.test(expr)) return false;
  if (expr.endsWith('+') || expr.endsWith('-') ||
      expr.endsWith('*') || expr.endsWith('/')) return false;
  if ((expr.match(/\(/g) || []).length !== (expr.match(/\)/g) || []).length)
    return false;
  return true;
}

function evaluate() {
  try {
    if (!isValidExpression(expression)) throw Error();
    history.textContent = expression;
    expression = String(calculate(expression));
  } catch {
    expression = "Error";
  }
}