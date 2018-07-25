var weatherIcons = {
    'sunShower': '<div class="icon sun-shower"> <div class="cloud"></div> <div class="sun"> <div class="rays"></div> </div> <div class="rain"></div> </div>',
    'thunderStorm': '<div class="icon thunder-storm"> <div class="cloud"></div> <div class="lightning"> <div class="bolt"></div> <div class="bolt"></div> </div> </div>',
    'cloudy': '<div class="icon cloudy"> <div class="cloud"></div> <div class="cloud"></div> </div>',
    'flurries': '<div class="icon flurries"> <div class="cloud"></div> <div class="snow"> <div class="flake"></div> <div class="flake"></div> </div> </div>',
    'sunny': '<div class="icon sunny"> <div class="sun"> <div class="rays"></div> </div> </div>',
    'rainy': '<div class="icon rainy"> <div class="cloud"></div> <div class="rain"></div> </div>'
};
var citiesID = {
    'Minsk':    '625144',
    'Brest':    '629634',
    'Grodno':   '825848',
    'Mogilev':  '828064',
    'Vitebsk':  '833052'
}

function Weather (date, min, max, day, night) {
    this.Date = date;
    this.Temperature = {
        'Min': min,
        'Max': max
    };
    this.Day = day;
    this.Night = night;
};

function getUrl(city) {
    var urlForFiveDays = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${citiesID[city]}?apikey=RmuKxnMf1c9mParhFQXceyvUivm0qNyC&metric=true`;
    return urlForFiveDays;
};

function getWeatherByCity(func, url) {
    var date, min, max, day, night;
    var weatherForecast = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            var parseResponse = JSON.parse(xhr.responseText);
            for(var i = 0; i < 5; i++) {
                if(i == 0) date = 'Сегодня';
                    else date = parseResponse.DailyForecasts[i].Date.substr(8, 2);
                min = parseResponse.DailyForecasts[i].Temperature.Minimum.Value;
                max = parseResponse.DailyForecasts[i].Temperature.Maximum.Value;
                day = parseResponse.DailyForecasts[i].Day.IconPhrase;
                night = parseResponse.DailyForecasts[i].Night.IconPhrase;
                weatherForecast[i] = new Weather(date, min, max, day, night);
            }
            func(weatherForecast);
        }
    }
};

function getCityFromSelect() {
    var select = document.getElementById('cities');
    return select.options[select.selectedIndex].value;
}

function getWeatherByGeolocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        console.log(pos.coords.latitude, pos.coords.longitude)
        var url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=RmuKxnMf1c9mParhFQXceyvUivm0qNyC&q=${pos.coords.latitude}%2C${pos.coords.longitude}`;
        xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4) {
                var response = JSON.parse(xhr.responseText);
                getWeatherByCity(insertWeather, getUrl(response.LocalizedName));
                return response.LocalizedName;
            }
        }
    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

}

function insertWeather(weather) {
    console.log(weather);
    var days = document.getElementsByClassName('data-weather');
    for(var i = 0; i < days.length; i++) {
        days[i].getElementsByTagName('h2')[0].innerText = weather[i].Date;
        days[i].getElementsByClassName('weather-icon')[0].innerHTML = getWeatherIcon(weather[i].Day);
        days[i].getElementsByClassName('min')[0].innerText = weather[i].Temperature.Min + '° - ';
        days[i].getElementsByClassName('max')[0].innerText = weather[i].Temperature.Max + '°C';
    }
}

function getWeatherIcon(data) {
    switch (data) {
        case 'Sunny' :                      return weatherIcons.sunny;
        case 'Mostly sunny' :               return weatherIcons.sunny;
        case 'Partly sunny' :               return weatherIcons.sunny;
        case 'Intermittent clouds' :        return weatherIcons.sunny;
        case 'Hazy sunshine' :              return weatherIcons.sunny;
        case 'Mostly cloudy' :              return weatherIcons.cloudy;
        case 'Cloudy' :                     return weatherIcons.cloudy;
        case 'Dreary' :                     return weatherIcons.cloudy;
        case 'Fog' :                        return ;
        case 'Showers' :                    return weatherIcons.rainy;
        case 'Mostly cloudy w/ showers' :   return weatherIcons.rainy;
        case 'Partly sunny w/ showers' :    return weatherIcons.rainy;
        case 'Thunderstorms' :              return weatherIcons.thunderStorm;
        case 'Mostly cloudy w/ t-storms' :  return weatherIcons.thunderStorm;
        case 'Partly sunny w/ t-storms' :   return weatherIcons.thunderStorm;
        case 'Rain' :                       return weatherIcons.rainy;
        case 'Flurries' :                   return weatherIcons.flurries;
        case 'Mostly cloudy w/ flurries' :  return weatherIcons.flurries;
        case 'Partly sunny w/ flurries' :   return weatherIcons.flurries;
        case 'Snow' :                       return ;
        case 'Mostly cloudy w/ snow' :      return ;
        case 'Ice' :                        return ;
        case 'Sleet' :                      return ;
        case 'Freezing rain' :              return ;
        case 'Rain and snow' :              return ;
        case 'Hot' :                        return ;
        case 'Cold' :                       return ;
        case 'Windy' :                      return ;
    }
}

(function () {
   getWeatherByCity(insertWeather, getUrl(getCityFromSelect()));
   var oldCity = getCityFromSelect();
   document.getElementById('cities').addEventListener('click', function () {
       if(getCityFromSelect() == 'Geolocation') {
           oldCity = getWeatherByGeolocation();
       }
       else if(oldCity != getCityFromSelect()) {
           getWeatherByCity(insertWeather, getUrl(getCityFromSelect()));
           oldCity = getCityFromSelect();
       }
   });
})();

