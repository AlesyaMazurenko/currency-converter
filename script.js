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
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}