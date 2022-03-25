const nummer = document.getElementById("nummer");
let currencyData;

fetch("http://api.exchangeratesapi.io/v1/latest?access_key=d3aff1dc0f722c3f6697fab137474ed1")
    .then((data) => data.json())
    .then((data) => {
        console.log(data);
        currencyData = data;
    });

nummer.addEventListener("input", () => {
    const countryCode = document.getElementById('currencyvalue').innerText;
    const output = document.getElementById('antwoord');

    console.log(nummer.value);
    console.log(currencyData.rates[countryCode]);
    const calculatedValue = nummer.value * currencyData.rates[countryCode]
    output.value = calculatedValue
});