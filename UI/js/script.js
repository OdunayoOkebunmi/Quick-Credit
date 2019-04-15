const amountRange = document.getElementById("amount-range");
const amountValue = document.querySelector('.loan-amount__value');

const daysRange = document.getElementById("days-range");
const daysValue = document.querySelector('.loan-duration__value');

const interestOutput = document.querySelector('.loan-interest__value');

const interest = 0.05;
// Display the default amountRange value
amountValue.innerHTML = amountRange.value;
daysValue.innerHTML = daysRange.value;

interestOutput.innerHTML = (interest * amountRange.value);
// Update the current amountRange value (each time you drag the amountRange handle)
amountRange.oninput = function () {
  amountValue.innerHTML = this.value;

  interestOutput.innerHTML = (interest * amountRange.value);
}

daysRange.oninput = function () {
  daysValue.innerHTML = this.value;
  interestOutput.innerHTML = (interest * amountRange.value) + (85 * (daysRange.value - 1))
}
