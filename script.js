const currencyRate = {
  timestamp: 1620386223,
  base: "DKK",
  rates: {
    USD: 0.1444,
    EUR: 0.134,
    GBP: 0.1151,
    CAD: 0.1963,
    JPY: 20.9142,
    DKK: 1,
  },
};

function onSubmit() {
  const amountIn = document.getElementById("amount_input").valueAsNumber;
  const currencyIn = document.getElementById("curr_input").value;
  const amountOut = document.getElementById("amount_output");
  let currencyOut = document
    .getElementById("curr_output")
    .value.toUpperCase();
  const rate = currencyRate.rates[currencyOut];
  const converted = amountIn * rate;
  amountOut.value = converted;
}
