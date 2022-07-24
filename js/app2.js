const bill = document.getElementById("inp-bill");
const tipButtons = document.querySelectorAll(".tip");
const tipCustom = document.getElementById("inp-tip");
const people = document.getElementById("inp-people");
const errorMessage = document.querySelector(".error-msg");
const results = document.querySelectorAll(".value");
const resetButton = document.querySelector(".reset");

bill.addEventListener("input", setBillValue);
tipButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", setTipCustomValue);
people.addEventListener("input", setPeopleValue);
resetButton.addEventListener("click", reset);

let billValue = 0.0; //default value
let tipValue = 0.15; //default value -> 15% button is active
let peopleValue = 1;

function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function validateInt(s) {
  var rgx = /^[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);

  calculateTip();
  //console.log(billValue);
}

function handleClick(event) {
  tipButtons.forEach((button) => {
    //clear active state
    button.classList.remove("button-active");

    //set active state
    if (event.target.innerHTML == button.innerHTML) {
      button.classList.add("button-active");
      tipValue = parseFloat(button.innerHTML) / 100;
    }
  });

  //clear custom tip
  tipCustom.value = "";

  calculateTip();

  //console.log(tipValue);
}

function setTipCustomValue() {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }

  tipValue = parseFloat(tipCustom.value / 100);

  //remove active state from buttons
  tipButtons.forEach((button) => {
    button.classList.remove("button-active");
  });

  if (tipCustom.value !== "") {
    calculateTip();
  }

  //console.log(tipValue);
}

function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  if (peopleValue <= 0) {
    errorMessage.classList.add("show-error-msg");
    setTimeout(function () {
      errorMessage.classList.remove("show-error-msg");
    }, 3000);
  }

  calculateTip();
  //console.log(peopleValue);
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
