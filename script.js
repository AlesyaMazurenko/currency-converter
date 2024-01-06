let currencyRate = {
  timestamp: 1519296206, 
  base: "EUR",
  date: "2023-12-12", 
  rates: {},
};

function displayTable(currBase, rates) {
  const rateTable = document.getElementById("rateTable");
  rateTable.innerHTML = '';
  const tableHeader ='<tr class="header"> <th style="width:35%;">From</th> <th style="width:35%;">To</th><th style="width:30%;">Rate</th> </tr>';
  rateTable.insertAdjacentHTML('afterbegin', tableHeader);

   for (const item in rates) {
      const tableRow = document.createElement("tr");
      const tableCol1 = document.createElement("td");
      const tableCol2 = document.createElement("td");
      const tableCol3 = document.createElement("td");
      tableCol1.textContent = currBase;
      tableCol2.textContent = item;
      tableCol3.textContent = rates[item];

      tableRow.appendChild(tableCol1);
      tableRow.appendChild(tableCol2);
      tableRow.appendChild(tableCol3);
      rateTable.appendChild(tableRow);
   }
 }

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
  displayTable(currBase, currencyRate.rates);
  
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


function searchFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue, txtValue1;
  input = document.getElementById("searchInp");
  filter = input.value.toUpperCase();
  table = document.getElementById("rateTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];

    if (td || td1) {
     txtValue = td.textContent || td.innerText;
     txtValue1 = td1.textContent || td1.innerText;

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

// const countDownDate = new Date("Jan 4, 2024 10:46:52").getTime();

const timerFunc = setInterval(function () {
  const openingHour = 9;
  const closeHour = 17;
  let now = new Date().getTime();
// const now = new Date("Jan 5, 2024 18:46:52").getTime();

  const days = Math.floor(now / (1000 * 60 * 60 * 24));
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


function timer() {
  const dateNow = new Date();
  const currentDate = dateNow.toLocaleTimeString();
  const timefield = document.getElementById("timefield");
  timefield.innerText= (currentDate);
  
}
// timer();