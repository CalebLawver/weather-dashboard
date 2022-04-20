var apiKey = "&appid=1102146e44da3e97c0e180cac7f33405";

let cityNameInput = document.querySelector("#city");
let searchedCity = document.querySelector("#user-form");
let todaysWeather = document.querySelector("#current-day");
let displayedCity = document.querySelector("#search-city");
let icon = document.querySelector("#weatherIcon");
let tempCity = document.querySelector("#temp1");
let windCity = document.querySelector("#wind1");
let humidCity = document.querySelector("#humid1");
let uvCity = document.querySelector("#uv");
let forecastContainer = document.querySelector("#five-day-forecast");

$("#date").text(moment().format('l'));

var formSubmitHandler = function(event) {
    event.preventDefault();

    // IM STUCK HERE
    var enteredCity = cityNameInput.value.trim();

    if (enteredCity) {
        citiesConditions(enteredCity);
    } else {
        alert("Please enter a City.");
    }
};

var citiesConditions = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1102146e44da3e97c0e180cac7f33405";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    currentConditions(data, city);
                });
            } else {
                alert("Error: City not Found");
            }
        }) 
        .catch(function(error) {
            alert("Unable to connect to weather service");
        });
};

var currentConditions = function(weather, city) {
    let currentWeatherIcon = "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    console.log(weather.name, currentWeatherIcon, weather.main.temp, weather.main.humidity, weather.wind.speed);
    $(displayedCity).text(weather.name);
    $(tempCity).text(weather.main.temp);
    $(windCity).text(weather.wind.speed);
    $(humidCity).text(weather.main.humidity);

    // getting weather icon to appear
    // var currentIcon = document.createElement("img");
    // currentIcon.src = currentWeatherIcon;
    // var src = document.getElementById("#date");
    // src.appendChild(currentIcon);

    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1102146e44da3e97c0e180cac7f33405";

    fetch(uvUrl).then(function(response) {
        response.json().then(function(uvData) {
            $(uvCity).text(uvData.value);
            if (uvData.value >= 0 && uvData.value < 3) {
                $(uvCity).attr("class", "p-2 uv-good");
            } else if (uvData.value >=3 && uvData.value < 8) {
                $(uvCity).attr("class", "p-2 uv-mid");
            } else {
                $(uvCity).attr("class", "p-2 uv-bad");
            }
        });
    });
    dayForecast(city);
}

var dayForecast = function(city) {
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=1102146e44da3e97c0e180cac7f33405";
    fetch(forecastUrl)
    .then(function(response) {
        response.json().then(function(forecast) {
            console.log(forecast);

            for(var i = 0; i < forecast.list.length; i++) {
                let dayList = forecast.list[i];
                let dayTimeUTC = dayList.dt;
                let timeZoneOffset = forecast.city.timezone;
                let timeZoneOffsetHours = timeZoneOffset/60/60;
                let dayMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
                // let iconUrl = "https://openweathermap.org/img/w/" + dayList.weather[0].icon + ".png";

                if (dayMoment.format("HH:mm:ss") >= "10:00:00" && dayMoment.format("HH:mm:ss") <= "14:00:00") {
                    var containerEl = document.createElement("div");
                    containerEl.classList = "card bg-primary col-2";

                    var dateEl = document.createElement("h4");
                    dateEl.classList = "card-header fw-bold text-light";
                    dateEl.textContent = dayMoment.format("MM/DD/YYYY");

                    var tempP = document.createElement("p");
                    tempP.classList = "fs-5 fw-normal text-light"
                    tempP.textContent = "Temp: " + dayList.main.temp + "&#8457" + "F";

                    var windP = document.createElement("p");
                    windP.classList = "fs-5 fw-normal text-light";
                    windP.textContent = "Wind: " + dayList.wind.speed + " MPH";

                    var humidP = document.createElement("p");
                    humidP.classList = "fs-5 fw-normal text-light";
                    humidP.textContent = "Humidity: " + dayList.main.humidity + "%";

                    forecastContainer.appendChild(containerEl);
                    containerEl.appendChild(dateEl);
                    containerEl.appendChild(tempP);
                    containerEl.appendChild(windP);
                    containerEl.appendChild(humidP);
                }
            }
        });
    });
}

searchedCity.addEventListener("submit", formSubmitHandler);