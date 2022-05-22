// Retrieve textfields from HTML
const numTextfield = document.querySelector('.num-textfield');

// Array initializations
const containerLower = document.querySelector('.container-lower');
const buttonContents = [7, 8, 9, '/', 4, 5, 6, 'x', 1, 2, 3, '-', 0, '.', '=', '+'];

// Result variable
let history = [];

// Clicked boolean variables
let clickedDecimal = false;

// Create buttons
for (let i = 0; i < 16; i++) {
  let div = document.createElement('div');
  div.classList.add('keypad');
  div.innerHTML = `<button class = "keypad-button">${buttonContents[i]}</button>`;

  containerLower.append(div);
}

// Get buttons from HTML
const clearBtn = document.querySelector('.clear');
const keypadBtn = document.querySelectorAll('.keypad-button');

// Add event listener to all number buttons
for (let i = 0; i < 16; i++) {
  if (i % 4 == 3 || i > 12){
    continue;
  }
  keypadBtn[i].addEventListener('click', (e) => {
    numTextfield.value = numTextfield.value + e.target.innerHTML; 
    // console.log(e.target.innerHTML);
  });
}

// Clear function
function clearTextfield() {
  numTextfield.value = '';
}

// Clear button
clearBtn.addEventListener('click', () => {
  clearTextfield();
  history = [];
  clickedDecimal = false;
});

// Check history function
function checkHistory(arr) {
  return arr.length > 1 && isNaN(arr[arr.length - 1]);
}

// Divide button
keypadBtn[3].addEventListener('click', () => {
  if (checkHistory(history)) {
    return;
  }
  history.push(numTextfield.value);
  history.push('/');
  clearTextfield();
  clickedDecimal = false;
  negative = false;
});

// Multiply button
keypadBtn[7].addEventListener('click', () => {
  if (checkHistory(history)) {
    return;
  }
  history.push(numTextfield.value);
  history.push('x');
  clearTextfield();
  clickedDecimal = false;
  negative = false;
});

// Subtract button
let negative = false;
keypadBtn[11].addEventListener('click', () => {
  if (numTextfield.value == '-') {
    return;
  }
  if ((checkHistory(history) || history.length == 0) && (numTextfield.value == '')) {
    if (!negative) {
      numTextfield.value = '-' + numTextfield.value;
      negative = true;
    }
    return;
  }
  history.push(numTextfield.value);
  history.push('-');
  negative = false;
  clearTextfield();
  clickedDecimal = false;
});

// Decimal button
keypadBtn[13].addEventListener('click', () => {
  if (!clickedDecimal) {
    numTextfield.value = numTextfield.value + '.';
    clickedDecimal = true;
  }
});

// Equal button
keypadBtn[14].addEventListener('click', () => {
  history.push(numTextfield.value);
  clearTextfield();
  let finalResult = 0;
  let prevOp = '';
  for (let i = 0; i < history.length; i++) {
    if (isNaN(history[i])) {
      prevOp = history[i];
      // console.log(history[i]);
      continue;
    }
    if (i == 0) {
      finalResult = parseFloat(history[i]);
    } else {
      if (prevOp == '+') {
        finalResult = finalResult + parseFloat(history[i]);
      } else if (prevOp == '-') {
        finalResult = finalResult - parseFloat(history[i]);
      } else if (prevOp == 'x') {
        finalResult = finalResult * parseFloat(history[i]);
      } else if (prevOp == '/') {
        if (parseFloat(history[i]) == 0) {
          finalResult = 'Cannot divide by 0';
          clearTextfield();
          history = [];
          clickedDecimal = false;
          break;
        }
        finalResult = finalResult / parseFloat(history[i]);
      }
    }
  }
  numTextfield.value = finalResult;
  clickedDecimal = false;
  negative = false;
  history = [finalResult];
});

// Add button
keypadBtn[15].addEventListener('click', () => {
  if (checkHistory(history)) {
    return;
  }
  history.push(numTextfield.value);
  history.push('+');
  clearTextfield();
  clickedDecimal = false;
  negative = false;
});
