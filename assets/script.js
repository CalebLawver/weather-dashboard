var apiKey = "&appid=1102146e44da3e97c0e180cac7f33405";

let cityNameInput = document.querySelector("#city");
let searchedCity = document.querySelector("#user-form");
let todaysWeather = document.querySelector("#current-day");
let todaysWeatherH2 = document.querySelector("#current-day h2");
let todaysWeatherP = document.querySelector("#current-day p");

var formSubmitHandler = function(event) {
    event.preventDefault();

    // IM STUCK HERE
    var enteredCity = searchedCity.value.trim();

    if (enteredCity) {
        citiesConditions(enteredCity);
    } else {
        alert("Please enter a City.");
    }
};

var citiesConditions = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=logan&units=imperial&appid=1102146e44da3e97c0e180cac7f33405";

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

var currentConditions = function() {

}

searchedCity.addEventListener("submit", formSubmitHandler);