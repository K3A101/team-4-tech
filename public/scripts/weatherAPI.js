const weatherContainer = document.getElementById('bereken_section');
weatherContainer && getWeather();

function getWeather() {
	const fetchWeather = async () => {
		const countryName = document.getElementById('country-name').innerText;
		const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryName}?unitGroup=metric&key=T34UCHC8WQQH83SAKKUC7CLRC&contentType=json`;

		const response = await fetch(url);
		const data = await response.json();

		setWeatherData(data);
	};

	const setWeatherData = (data) => {
		const container = document.getElementById('weather-data');

		data.days.forEach((day) => {
			const dayContainer = document.createElement('article');

			const date = document.createElement('h4');
			date.innerText = day.datetime;
			dayContainer.appendChild(date);

			const img = document.createElement('img');
			img.src = `/images/weather-icons/${day.icon}.png`;
			dayContainer.appendChild(img);

			const temp = document.createElement('p');
			temp.innerText = `Tempratuur: ${day.temp}`;
			dayContainer.appendChild(temp);

			const wind = document.createElement('p');
			wind.innerText = `Windsnelheid: ${day.windspeed} km/uur`;
			dayContainer.appendChild(wind);

			container.appendChild(dayContainer);
		});
	};

	fetchWeather();
}
