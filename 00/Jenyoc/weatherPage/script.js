(function () {
  var changeCityButton = document.querySelector('.changeCityButton'),
    weatherBox = document.querySelector('.weatherBox'),
    currentCitySpan = document.querySelector('.currentCity'),
    cityList = document.querySelector('.cityList'),
    sources, cities, targetCity, currentCity, citySpan;


  function showWeather(event) {
    cityList.innerHTML='';
    weatherBox.innerHTML='';
    targetCity=event.target.innerText;
    var url = 'https:/api.openweathermap.org/data/2.5/forecast?q=' + targetCity + ',by&APPID=05b4798836b87272780eca72486a4dab';
    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open('GET', url);
    weatherRequest.send();
    weatherRequest.onload = function () {
      sources = JSON.parse(weatherRequest.response).list;
      currentCity = JSON.parse(weatherRequest.response).city;
      currentCitySpan.innerText = ':'+currentCity.name;
      console.log(sources);
      renderWeather();
    };
  }

  function renderWeather() {
    var i = 0, blockId = 0;
    sources.forEach(function () {
      if (i < 24) {
        function plusOrMinus() {
          if (sources[i].main.temp < 273) {
            return '-';
          }
          else if (sources[i].main.temp > 273) {
            return '+';
          }
          else {
            return '';
          }
        }

        var weatherBlock = createElement('div', {className: 'weatherBlock' + blockId});
        weatherBlock.innerHTML =
          '<h1>' + sources[i].dt_txt + '</h1>' +
          '<p>' + plusOrMinus() + parseInt(sources[i].main.temp - 273) + '°</p>' +
          '<p>' + 'wind speed: ' + sources[i].wind.speed + '</p>' +
          '<p>' + sources[i].weather[0].description + '</p>';
        weatherBox.appendChild(weatherBlock);
        i = i + 8;
        blockId++;
      }
    });
  }

  function showCityList() {
    cityList.innerHTML='';
    cities = ['Minsk', 'Hrodna', 'Brest', 'Navapolatsk'];
    renderCityList();
  }

  function renderCityList() {
    cities.forEach(function (item) {
        citySpan = createElement('button', {className: 'citySpan', innerText: item});
        cityList.appendChild(citySpan);
      citySpan.addEventListener('click',showWeather);
      }
    );

  }

  function createElement(elemName, options, attributes) {
    attributes = attributes || {};
    var elem = document.createElement(elemName);
    Object.assign(elem, options);
    Object.keys(attributes).forEach(function (key) {
      elem.setAttribute(key, attributes[key]);
    });
    return elem;
  }

  changeCityButton.addEventListener('click', showCityList);
})();