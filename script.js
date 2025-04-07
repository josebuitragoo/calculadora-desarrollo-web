const display = document.getElementById("display");
let current = "";

const isOperator = (char) => ["+", "-", "*", "/"].includes(char);

const addValue = (val) => {
  if (
    val === "." &&
    current
      .split(/[\+\-\*\/]/)
      .pop()
      .includes(".")
  )
    return;

  if (val === "neg") {
    if (current === "" || isOperator(current.slice(-1))) {
      current += "-";
    } else {
      let lastNum = current.match(/-?\d*\.?\d*$/)[0];
      if (lastNum) {
        current = current.slice(0, -lastNum.length) + -parseFloat(lastNum);
      }
    }
  } else {
    current += val;
  }

  display.value = current;
};

const calculate = () => {
  try {
    const result = eval(current);
    display.value = `${result}`;
    current = `${result}`;
  } catch {
    display.value = "Error";
    current = "";
  }
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.4 },
  });
};
const clear = () => {
  current = "";
  display.value = "";
};

const deleteOne = () => {
  current = current.slice(0, -1);
  display.value = current;
};

document.querySelectorAll(".btn").forEach((btn) => {
  const value = btn.dataset.value;
  if (value) {
    btn.addEventListener("click", () => addValue(value));
  }
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("delete").addEventListener("click", deleteOne);
