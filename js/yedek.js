const tipButtons = document.querySelectorAll(".tip");

// Variable declarations
let billValue = 0.0; //default value
let tipValue = 0; // default value is 0.15 because %15 button active default

bill.addEventListener("input", setBillValue);

tipButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!validateFloat(bill.value)) {
    //This code line cuts off all invalid characters
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);
  console.log(bill.value);
}

function handleClick(event) {
  tipButtons.forEach((button) => {
    // clear active state
    button.classList.remove("button-active");

    // set active state
    if (event.target.innetHTML == button.innerHTML) {
      button.classList.add("button-active");
      console.log(button.innerHTML);
      tipValue = parseFloat(button.innerHTML) / 100;
    }
  });
  console.log(tipValue);
}
