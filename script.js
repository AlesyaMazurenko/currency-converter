let currencyRate = {
  timestamp: 1519296206, 
  base: "EUR",
  date: "2023-12-12", 
  rates: {},
};


const rates = currencyRate.rates;
console.log(rates);


function addRate() {
  const listofCurr = document.getElementById("curr_output");
  console.log(currencyRate.rates)
    // const listElem = currencyRate.rates.forEach(
    Object.keys(currencyRate.rates).forEach(function(key) {
    // (rate) => {
      const listItem =
        (listofCurr.innerHTML += `<option value="${key}">${key}</option>`);
      listElem.appendChild(listItem)
    });
  listofCurr.appendChild(listElem);
}

function onRateSubmit(event) {
  event.preventDefault();
  const currBase = document.getElementById("base_curr").value;
  const newCurrency = document.getElementById("new_curr").value;
  const newRate = document.getElementById('curr_rate').value;
  if (currBase!=="" && newCurrency!=='') {
    currencyRate.base = currBase;
    currencyRate.rates[newCurrency] = newRate;
  } else {
    alert('Please insert name of currency')
  }
  console.log(currencyRate);
  addRate();
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
