// ========================
// Manually Change Country Name
// ========================

var taker = document.querySelector("#taker");

//requestTake is instances for XMLHttpRequest
const requestTake = new XMLHttpRequest();
requestTake.open("GET", "https://restcountries.com/v3.1/name/usa");
requestTake.responseType = "json";
requestTake.send();
requestTake.addEventListener("load", function () {
  const data = this.response;

  const htmlData = `
  <div class="container card">
  <div class="image">
  <img src=" ${data[0].flags.png}" alt="ahasjhashdhad" /></div>
  <div class= name> <b>${data[0].name.common}</b></div>

  <hr>
  <div class="below">
  <div class="population cen"><div><b>Population</b></div>
  ${data[0].population}</div>
  <div class= "capital cen"><div><b>Capital</b></div> ${data[0].capital}</div>
  <div class= "area cen"><div><b>Area</b></div> ${data[0].area}</div>
  </div>
  </div>
    `;
  // Send data in html document.
  document.getElementById("taker").insertAdjacentHTML("afterbegin", htmlData);
});
