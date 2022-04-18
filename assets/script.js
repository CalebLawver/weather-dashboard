var apiKey = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1102146e44da3e97c0e180cac7f33405"

// using imperial units requires &units=imperial

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&appid=1102146e44da3e97c0e180cac7f33405"

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });

