let currencyRate = {
  timestamp: 1519296206, 
  base: "EUR",
  date: "2023-12-12", 
  rates: {},
};


const rates = currencyRate.rates;
console.log(rates);


function addRate(newCurrency) {
  const listofCurr = document.getElementById("curr_output");
   const listItem = document.createElement("option");
  listItem.value = newCurrency;
  listItem.innerHTML = newCurrency;
  listofCurr.appendChild(listItem);
}


function onRateSubmit(event) {
  event.preventDefault();
  const currBase = document.getElementById("base_curr").value;
  const newCurrency = document.getElementById("new_curr").value;
  const newRate = document.getElementById('curr_rate').value;
  if (currBase !== "" && newCurrency !== '') {
    if (!currencyRate.rates[newCurrency]) {
      addRate(newCurrency);
    }
    currencyRate.rates[newCurrency] = newRate;
  } else {
    alert('Please insert name of currency')
  }
  console.log(currencyRate);
  
  document.getElementById("new_curr").value = "";
  document.getElementById("curr_rate").value = "";
}

function onSubmit() {
  const amountIn = document.getElementById("amount_input").valueAsNumber;
  const amountOut = document.getElementById("amount_output");
  let currencyOut = document
    .getElementById("curr_output")
    .value.toUpperCase();
  const rate = currencyRate.rates[currencyOut];
  const converted = amountIn * rate;
  amountOut.value = converted;
}
