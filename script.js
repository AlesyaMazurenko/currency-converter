const specials = {
  EUR: {
    USD: 2,
    DKK: 3,
  },
  USD: {
    EUR: 2,
    DKK: 3,
  },
	DKK: {
		EUR: 2,
		USD: 3,
	},
}

let currencyRate = [];

function getAndShowData() {
  fetchCurrencyRate()
    .then((response) => {
      currencyRate.push(...response);
      displayTable(response);
      displayConverter(response);
    })
    .catch((error) => console.error(error));
}

getAndShowData();

function fetchCurrencyRate() {
  return fetch(
    "https://raw.githubusercontent.com/AlesyaMazurenko/alesyamazurenko.github.io/main/data/currencyrates.json"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

 
function displayTable(currencyRate){
  const rateTable = document.getElementById("rateTable");
  rateTable.innerHTML = '';
  const tableHeader ='<tr class="header"> <th style="width:35%;">From</th> <th style="width:35%;">To</th><th style="width:30%;">Rate</th> </tr>';
  rateTable.insertAdjacentHTML('afterbegin', tableHeader);
 
    currencyRate.map((item) => {
      const currBaseitem = item.base;
      const rates = item.rates;

      for (const item in rates) {
         const tableRow = document.createElement("tr");
         const tableCol1 = document.createElement("td");
         const tableCol2 = document.createElement("td");
         const tableCol3 = document.createElement("td");
         tableCol1.textContent = currBaseitem;
         tableCol2.textContent = item;
         tableCol3.textContent = rates[item];
   
         tableRow.appendChild(tableCol1);
         tableRow.appendChild(tableCol2);
         tableRow.appendChild(tableCol3);
         rateTable.appendChild(tableRow);
      }
    })
 }

function displayConverter(currencyRate) {
  const listOfCurrIn = document.getElementById("curr_input");

  for (let item of currencyRate) { 
     const listItem = document.createElement('option');
     listItem.value = item.base;
     listItem.innerHTML = item.base;
     listOfCurrIn.appendChild(listItem);
  }

   const currencyIn = document.getElementById("curr_input").value;
   const listofCurr = document.getElementById("curr_output");
   listofCurr.innerHTML = "";
   const currentCurrency = currencyRate.find(
     (currObj) => currObj.base === currencyIn
   );
    
   for (const item in currentCurrency.rates) {
     const listItem = document.createElement("option");
     listItem.value = item;
     listItem.innerHTML = item;
     listofCurr.appendChild(listItem);
   }
}
 

function addRate(newCurrency) {
  const listofCurr = document.getElementById("curr_output");
  const listItem = document.createElement("option");
  listItem.value = newCurrency;
  listItem.innerHTML = newCurrency;
  listofCurr.appendChild(listItem);
}

//add rates in user form Insert rates
function onRateSubmit(event) {
  event.preventDefault();
  const currBase = document.getElementById("base_curr").value;
  const newCurrency = document.getElementById("new_curr").value;
  const newRate = document.getElementById("curr_rate").value;

  if (currBase !== "" && newCurrency !== '') {
    if (newRate !== '') {
      // currencyRate.rates[newCurrency] = newRate;
      const current = currencyRate.find((currObj) => currObj.base === currBase);
  
      current.rates[newCurrency]=newRate;
      current.timestamp = new Date().toLocaleString();

      if (!current.rates[newCurrency]) {
        addRate(newCurrency);
      }
    } else {
      alert("Please insert currency rate");
    }
  } else {
    alert('Please insert name of currency and rate')
  }

  displayTable(currencyRate);
  handleCurrencyChange();
  document.getElementById("new_curr").value = "";
  document.getElementById("curr_rate").value = "1";
}

function handleCurrencyChange() {
  const currencyIn = document.getElementById("curr_input").value;
  const listofCurr = document.getElementById("curr_output");
  const amount_input = document.getElementById("amount_input");
  const amount_output = document.getElementById("amount_output");
  amount_input.value = 1;
  amount_output.value = '';

  listofCurr.innerHTML = "";
  const currentCurrency = currencyRate.find(
    (currObj) => currObj.base === currencyIn
  );

  for (const item in currentCurrency.rates) {
    const listItem = document.createElement("option");
    listItem.value = item;
    listItem.innerHTML = item;
    listofCurr.appendChild(listItem);
  }
}

function onSubmit() {
  const amountIn = document.getElementById("amount_input").valueAsNumber;
  const amountOut = document.getElementById("amount_output");
  const currencyIn = document.getElementById("curr_input").value.toUpperCase();
  const currencyOut = document
    .getElementById("curr_output")
    .value.toUpperCase();

  const ratebase = currencyRate.find(item => item.base === currencyIn);
  const rate = ratebase.rates[currencyOut];
  const converted = amountIn * rate;
  amountOut.value = converted;
}


function searchByNameFunction() {
  const input = document.getElementById("searchInp");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("rateTable");
  const tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    const td1 = tr[i].getElementsByTagName("td")[1];

    if (td || td1) {
      const txtValue = td.textContent || td.innerText;
      const txtValue1 = td1.textContent || td1.innerText;

      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else if (txtValue1.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchByRateFunction() {
  const input = document.getElementById("searchInp");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("rateTable");
  const tr = table.getElementsByTagName("tr");

  const inputRateFrom = +document.getElementById("searchRateFrom").value;
  const inputRateTo = +(document.getElementById("searchRateTo").value === ""
    ? 100000000
    : document.getElementById("searchRateTo").value);

  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    const td1 = tr[i].getElementsByTagName("td")[1];
    const td2 = tr[i].getElementsByTagName("td")[2];

    if (td2) {
      const rateValue = +td2.textContent;

      if (inputRateFrom >= 0 || inputRateTo !== 0) {
        if (rateValue >= inputRateFrom && rateValue <= inputRateTo) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

const timerFunc = setInterval(function () {
  const openingHour = 9;
  const closeHour = 17;
  let now = new Date().getTime();

  const hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((now % (1000 * 60)) / 1000);

  const timefield = document.getElementById("timefield");
  let circle = document.getElementById("circle").style;

  const remaiMin = minutes === 0 ? 0 : 59 - minutes;
  const remaiSec = seconds === 0 ? 0 : 59 - seconds;
  
  if (hours >= openingHour && hours < closeHour) {
    const remaiHour = closeHour - hours - 1;
   
    timefield.innerHTML = `Now market is Open remained ${remaiHour}hours ${remaiMin}min ${remaiSec}sec`;
    circle.backgroundColor = "hsl(120, 100%, 50%)";
  } else {
    const remaiHour = hours > openingHour ? 24 - hours + 9 - 1 : openingHour - hours - 1;
    
    timefield.innerHTML = `Now market is Closed remained ${remaiHour}hours ${remaiMin}min ${remaiSec}sec`;
    circle.backgroundColor = "hsl(340, 100%, 50%)";
  }
}, 1000)
