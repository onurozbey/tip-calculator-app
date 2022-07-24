// Constant definitions
const bill = document.getElementById("input-bill");
const tipButtons = document.querySelectorAll(".tip");
const tipCustom = document.getElementById("input-tip");
const people = document.getElementById("input-people");
const errorMessage = document.querySelector(".error-message");
const results = document.querySelectorAll(".value");
const resetButton = document.querySelector(".reset");

// Variable definitions
let billValue = 0.0; // default
let tipValue = 0.15; // default (15% button is active)
let peopleValue = 1; // default

// ------------------
bill.addEventListener("input", setBillValue);

tipButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

tipCustom.addEventListener("input", setTipCustomValue);

people.addEventListener("input", setPeopleValue);

resetButton.addEventListener("click", reset);

// ------------------

// Function block

function validateFloat(s) {
  let regex = /^[0-9]*\.?[0-9]*$/;
  return s.match(regex);
}

function validateInt(s) {
  let regex = /^[0-9]*$/;
  return s.match(regex);
}

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  // This if-state code below cuts out all the invalid characters
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);

  calculateTip();
}

function handleClick(event) {
  tipButtons.forEach((button) => {
    // Clear active state
    button.classList.remove("button-active");

    // Set active State
    if (event.target.innerHTML == button.innerHTML) {
      button.classList.add("button-active");
      // console.log(button.innerHTML.replace("%", ""));
      tipValue = parseFloat(button.innerHTML.replace("%", "")) / 100;
    }
  });

  // Clear custom tip input
  tipCustom.value = "";

  calculateTip();
}

function setTipCustomValue() {
  // This if-state code below cuts out all the invalid characters (only int allowed)
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }

  tipValue = parseFloat(tipCustom.value / 100);

  // Clear active state from buttons
  tipButtons.forEach((button) => {
    button.classList.remove("button-active");
  });

  if (tipCustom.value !== "") {
    calculateTip();
  }
}

function setPeopleValue() {
  // This if-state code below cuts out all the invalid characters (only int allowed)
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  if (peopleValue <= 0) {
    errorMessage.classList.add("show-error-message");
    setTimeout(function () {
      errorMessage.classList.remove("show-error-message");
    }, 3000);
  }

  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (tipValue + 1)) / peopleValue;

    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  bill.value = "0.0";
  setBillValue();

  tipButtons[2].click();

  people.value = "1";
  setPeopleValue();
}
// Function block
