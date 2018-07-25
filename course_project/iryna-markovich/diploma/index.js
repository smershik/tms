(function () {
    let qs = document.querySelector.bind(document);
    let dce = document.createElement.bind(document);
    let ce = createElement;
    let headerSelect = qs('.header__select');
    let xhr = new XMLHttpRequest;
    let cityData = {};
    let weatherData = [];
    let message = {
        unchecked: 'Select city',
        timeout: 'Slow network is detected',
        error: 'Failed to load resource',
    };
    let cityList = [{
            name: 'Minsk',
            id: 625144
        },
        {
            name: 'Brest',
            id: 629634
        },
        {
            name: 'Byaroza',
            id: 629454
        },
        {
            name: 'Baranavichy',
            id: 630429
        },
    ];

    cityList.forEach(createWeatherOption);
    headerSelect.addEventListener('change', getWeather);
    createDocumentForecast();
    qs('.main__weather-timer').addEventListener('click', createWeatherInSelectedHour);
    headerSelect.addEventListener('change', clearWeather);

    const picker = datepicker(qs('.main__calendar'), {
        onSelect: onSelect,
        dateSelected: new Date(), // Today is selected.
        disabledDates: [new Date('1/1/2050'), new Date('1/3/2050')], // Disabled dates.
        minDate: new Date(),
        maxDate: new Date(getLastDay(5, ',')),
        customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    });

    function createWeatherInSelectedHour(event) {
        clearWeather();
        let target = event.target;

        if (target.tagName != 'BUTTON') return;

        if (qs('.header__select').value == 'Select City') {
            showModalWindow(message.unchecked);
        } else {
            let pickerDateHourSelected = target.value;
            renderWeather(cityData, weatherData);
            if (qs('.main__weather-box') == null) {
                return;
            }
            qs('.main__weather-box').innerHTML = '';
            createWeatherInCurrentHour(weatherData, pickerDateHourSelected);
        }
    }

    let pickerDateTimeNow = new Date();
    let pickerDateHour = parseInt(pickerDateTimeNow.toString().slice(16, 18), 10);

    function createWeatherInCurrentHour(weatherData, pickerDateHour) {
        if (pickerDateHour >= 0 && pickerDateHour < 6) pickerDateHour = 0;
        if (pickerDateHour >= 6 && pickerDateHour < 12) pickerDateHour = 6;
        if (pickerDateHour >= 12 && pickerDateHour < 18) pickerDateHour = 12;
        if (pickerDateHour >= 18 && pickerDateHour < 21) pickerDateHour = 18;
        if (pickerDateHour >= 21) pickerDateHour = 21;

        setSelectionOnTimer(pickerDateHour);

        weatherData.forEach(function (details) {
            let pickerDate = picker.dateSelected;
            let weatherDate = details.dt_txt;
            let forecastPeriodInHours = 5;
            let weatherDateDay = (new Date(weatherDate)).toString().slice(0, 15);
            let pickerDateDay = pickerDate.toString().slice(0, 15);
            let weatherDateHour = weatherDate.toString().slice(11, 13);

            if (pickerDateDay == weatherDateDay) {
                if (pickerDateHour <= weatherDateHour && (pickerDateHour + forecastPeriodInHours) >= weatherDateHour) {
                    createWeatherDetails(details);
                }
            }
        });
    }

    function getWeather(event) {
        let target = event.target;
        if (!target.classList.contains('header__select')) return;

        if (target.value == 'Select City') {
            xhr.abort();
            showModalWindow(message.unchecked);
        } else {
            xhr.timeout = 10000;
            xhr.open('GET', 'https:/api.openweathermap.org/data/2.5/forecast?id=' + target.value + '&APPID=93676aa71526df4edb85c97d0cef80f3');
            xhr.send();
            xhr.onload = function response() {
                cityData = JSON.parse(xhr.response).city;
                weatherData = JSON.parse(xhr.response).list;
                renderWeather(cityData, weatherData);
            }
        }
        xhr.ontimeout = onTimeout;
        xhr.onerror = onError;
    }

    function onError() {
        showModalWindow(message.error);
    }

    function onTimeout() {
        showModalWindow(message.timeout)
    }

    function createWeatherOption(city) {
        let optionElem = ce('OPTION', {
            value: city.id,
            innerText: city.name,
        });
        headerSelect.appendChild(optionElem);
    }

    function createWeatherBox() {
        let weatherBox = ce('DIV', {
            className: 'main__weather-box',
        });
        qs('.main__weather-container').appendChild(weatherBox);
    }

    function createWeatherBoxHeader(cityData) {
        let cityHeader = ce('DIV', {
            className: 'main__weather-header',
        });
        qs('.main__weather-container').appendChild(cityHeader);
        [
            ce('H1', {
                className: 'main__weather-title',
                innerHTML: cityData.name || '',
            }),
            ce('H2', {
                className: 'main__weather-subtitle',
                innerHTML: picker.dateSelected.toDateString(),
            }),
        ].forEach(function (elem) {
            qs('.main__weather-header').appendChild(elem);
        });

    }

    function createDocumentForecast() {
        let main = ce('MAIN');
        document.body.appendChild(main);

        let calendar = ce('INPUT', {
            className: 'main__calendar',
            type: 'text',
        });
        main.appendChild(calendar);

        let weatherTimer = ce('DIV', {
            className: 'main__weather-timer',
        });
        main.appendChild(weatherTimer);

        [0, 6, 12, 18].forEach(function (elem) {
            let button = ce('BUTTON', {
                innerText: elem + 'h',
                value: elem,
            });
            weatherTimer.appendChild(button);
        });

        let weatherContainer = ce('SECTION', {
            className: 'main__weather-container',
        });
        main.appendChild(weatherContainer);

    }

    function createWeatherDetails(details) {
        let windDeg = countWindDeg(details);
        let windSpeed = Math.round(details.wind.speed);
        let weatherDetails = ce('DIV', {
            className: 'main__weather-details details',
        });
        qs('.main__weather-box').appendChild(weatherDetails);

        [
            ce('DIV', {
                className: 'details__time',
                innerHTML: details.dt_txt,
            }),
            ce('DIV', {
                className: 'details__temp',
                innerHTML: Math.round(details.main.temp - 273.15) + '°C',
            }),
            ce('DIV', {
                className: 'details__icon',
                innerHTML: '<img alt="" src="http://openweathermap.org/img/w/' + details.weather[0].icon + '.png">',
            }),
            ce('DIV', {
                className: 'details__desc',
                innerHTML: details.weather[0].description,
            }),
            ce('DIV', {
                className: 'details__clouds',
                innerHTML: 'clouds ' + details.clouds.all,
            }),
            ce('DIV', {
                className: 'details__humidity',
                innerHTML: 'humidity ' + details.main.humidity,
            }),

            ce('DIV', {
                className: 'details__wind',
                innerHTML: 'wind ' + windSpeed + 'km/h' + ' ' + windDeg,
            })

        ].forEach(function (elem) {
            weatherDetails.appendChild(elem);
        });
    }

    function renderWeather(cityData, weatherData) {
        createWeatherBoxHeader(cityData);
        createWeatherBox();
        createWeatherInCurrentHour(weatherData, pickerDateHour);
    }

    function clearWeather() {
        if (qs('.main__weather-container') == null) return;
        qs('.main__weather-container').innerHTML = '';
        setSelectionOnTimer();
    }

    function createElement(elemName, options, attributes) {
        attributes = attributes || {};
        let elem = dce(elemName);

        Object.assign(elem, options);

        Object.keys(attributes).forEach(function (key) {
            elem.setAttribute(key, attributes[key]);
        });
        return elem;
    }

    function onSelect() {
        clearWeather();
        if (qs('.header__select').value == 'Select City') {
            showModalWindow(message.unchecked);
        } else {
            renderWeather(cityData, weatherData);
        }
    }

    function getLastDay(days, separator) {
        let today = new Date();
        let lastDayFull = new Date(today.setDate(today.getDate() + (days - 1)));
        return (lastDayFull.getFullYear() + separator + (lastDayFull.getMonth() + 1) + separator + lastDayFull.getDate());
    }

    function countWindDeg(details) {
        let deg = details.wind.deg;
        if (deg == 0 || deg == 360) return 'north';
        if (deg > 0 && deg <= 45) return 'northeast';
        if (deg > 45 && deg <= 90) return 'east';
        if (deg > 90 && deg <= 135) return 'southeast';
        if (deg > 135 && deg <= 180) return 'south';
        if (deg > 180 && deg <= 225) return 'southwest';
        if (deg > 225 && deg <= 270) return 'west';
        if (deg > 270 && deg <= 315) return 'northwest';
        else return 'north';
    }

    function showModalWindow(message) {
        let modalWindowCover = ce('DIV', {
            className: 'modal-window'
        });
        let modalWindowMesage = ce('DIV', {
            className: 'modal-window__message',
            innerHTML: message,
        });
        let modalWindowSubmit = ce('BUTTON', {
            className: 'modal-window__submit',
            innerHTML: 'OK',
        });
        document.body.appendChild(modalWindowCover);
        modalWindowCover.appendChild(modalWindowMesage);
        modalWindowMesage.appendChild(modalWindowSubmit);
        modalWindowCover.addEventListener('click', removeModalWindow);
    }

    function removeModalWindow(event) {
        let target = event.target;
        if (target.tagName != 'BUTTON') return;
        this.remove();
        setSelectionOnTimer();
    }

    function setSelectionOnTimer(pickerDateHour) {
        (document.querySelectorAll('.main__weather-timer button')).forEach(function (elem) {
            elem.classList.remove('selected');
            if (elem.value == pickerDateHour) {
                elem.classList.add('selected');
            }
        });
    }

})();