const fetchWeather = async () => {

  const countryName = document.getElementById('country-name').innerText
  console.log(countryName)
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryName}?unitGroup=metric&key=T34UCHC8WQQH83SAKKUC7CLRC&contentType=json`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data)
  setWeatherData(data)
}

const setWeatherData = (data) => {
  const container = document.getElementById('weather-data')

  const img = document.createElement("img");
  img.src = `/images/weather-icons/${data.currentConditions.icon}.png`;
  container.appendChild(img);

  const temp = document.createElement("p");
  temp.innerText = `Tempratuur: ${data.currentConditions.temp}`;
  container.appendChild(temp);

  const wind = document.createElement("p");
  wind.innerText = `Windsnelheid: ${data.currentConditions.windspeed} km/uur`;
  container.appendChild(wind);
}

fetchWeather()