/*
const fetchCurrency = async () => {

  const countryName = document.getElementById('country-name').innerText
  console.log(countryName)
  const url = `http://api.exchangeratesapi.io/v1/latest?access_key=d3aff1dc0f722c3f6697fab137474ed1`;

  const responses = await fetch(url);
  const datas = await responses.json();

  console.log(datas)
  setCurrencyData(datas)
}

const setCurrencyData = (datas) => {
  const container = document.getElementById('currency-data')

  const base = document.createElement("p");
  base.innerText = `Euro: ${datas.rates.EUR}`;
  container.appendChild(base);

  const rate = document.createElement("p");
  rate.innerText = `AED: ${datas.rates.AED}`;
  container.appendChild(rate);
}

fetchCurrency()
*/


const select = document.querySelectorAll(".currency");
const knop = document.getElementById("knop");
const nummer = document.getElementById("nummer");
const antwoord = document.getElementById("antwoord");

fetch("https://api.frankfurter.app/currencies")
    .then((data) => data.json())
    .then((data) => {
        console.log(data);
        display(data);
    });

function display(data) {
    // const valuta = Object.entries(data);
    // for (var i = 0; i < valuta.length; i++) {
    //     select[0].innerHTML += `<option value="${valuta[i][0]}">${valuta[i][0]}</option>`;
    //     select[1].innerHTML += `<option value="${valuta[i][0]}">${valuta[i][0]}</option>`;
    // }
}

knop.addEventListener("click", () => {
const countryCode = window.location.pathname.replace("/country/", "");

    const invoerwaarde = countryCode;
    const uitvoerwaarde = "EUR";
    const value = nummer.value;

    if (invoerwaarde != uitvoerwaarde) {
        convert(invoerwaarde, uitvoerwaarde, value);
    } else {
        alert("Kies verschillende valuta");
    }
});

function convert(invoerwaarde, uitvoerwaarde, value) {
    const host = "api.frankfurter.app";
    fetch(
            `https://${host}/latest?amount=${value}&from=${invoerwaarde}&to=${uitvoerwaarde}`
        )
        .then((val) => val.json())
        .then((val) => {
            console.log(Object.values(val.rates)[0]);
            antwoord.value = Object.values(val.rates)[0];
        });
}