var apiKey = "524901&appid=1102146e44da3e97c0e180cac7f33405";
var searchHistoryAll = [];
$("#day1").append(moment().format("L"));

function currentCondition(city) {
    var searchUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(cityWeather) {
        console.log(cityWeather);

        var iconCode = cityWeather.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
    })
}

