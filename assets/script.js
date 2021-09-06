//Selectors

//Form Selectors
let searchTerm = document.querySelector('.searchField');
let submitBtn = document.querySelector('.submitBtn');
let searchHistory = document.querySelector('.searchHistory');

//Current Weather Selectors
let curWeather = document.querySelector('.curWeather');
let city = document.getElementById('city');
let latLong = document.getElementById('coord');
let curIcon = document.getElementById('curIcon');
let curTemp = document.getElementById('curTemp');
let curWind = document.getElementById('curWind');
let curHum = document.getElementById('curHum');
let curUV = document.getElementById('curUV');
let cards = document.querySelectorAll('.dayCard');

//Forecast Selectors
let forecast = document.querySelector('.forecast');
let fDate = document.querySelectorAll('.fDate');
let fImg = document.querySelectorAll('.fImg');
let fLow = document.querySelectorAll('.fLow');
let fHigh = document.querySelectorAll('.fHigh');
let fWind = document.querySelectorAll('.fWind');
let fHum = document.querySelectorAll('.fHum');

//Global Variables

let metaRequest;
let long;
let lat;
let recents = [];
let recentChosen;



let dispCurrentWeather = function(curData) {
    //unhide div with curWeather
    curWeather.classList.remove('hidden');

    curIcon.setAttribute('src','http://openweathermap.org/img/wn/' + curData.weather[0].icon + '@2x.png');
    curIcon.setAttribute('alt', curData.weather[0].description);
    curTemp.innerHTML = 'Temp: ' +  curData.temp + '&#176;F (Feels like ' + curData.feels_like + '&#176;F)';
    curWind.textContent = 'Wind: ' + curData.wind_speed + 'mph';
    curHum.textContent = 'Humidity: ' + curData.humidity + '%';
    curUV.innerHTML = 'UV Index: <span id="uvIndex">' + curData.uvi + '</span>';
};

let disForecast = function(forecast) {
    for (i = 0; i < cards.length; i++) {
        //unhide boxes
        cards[i].classList.remove('hidden');

        //Display the date
        let date = new Date(forecast[i + 1].dt * 1000);
        fDate[i].textContent = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

        //Display icon of weather
        fImg[i].setAttribute('src','http://openweathermap.org/img/wn/' + forecast[i+1].weather[0].icon + '@2x.png');
        fImg[i].setAttribute('alt', forecast[i+1].weather[0].description);

        //Display daily low
        fLow[i].textContent = forecast[i+1].temp.min;
        
        //Display daily high
        fHigh[i].textContent = forecast[i+1].temp.max;

        //Display daily wind speed
        fWind[i].textContent = forecast[i+1].wind_speed;

        //Display daily humidity
        fHum[i].textContent = forecast[i+1].humidity;
    }
};

let getWeather = function(lat,long) {
    let dataRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    fetch(dataRequest)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            dispCurrentWeather(data.current);
            disForecast(data.daily);
        });
};

//fetch coordinates and city name
let getMetaData = function(request) {
    fetch(request)
    .then(function(response) {
        //determine if request worked
        if (response.status === 200) {
            //if yes, convert to object
            return response.json();
        } else {
            //if no, tell user that their search criteria wasn't found
            alert('City or ZIP Code not found');
            return;
        }
    })
    .then(function(data) {
        //store GPS coordinates and name of city, then display them
        long = Math.round(data.coord.lon * 100) / 100;
        lat = Math.round(data.coord.lat * 100) / 100;
        city.textContent = data.name;
        latLong.textContent = 'Lat: ' + lat + ', Lon: ' + long;

        //send to next fetch request to pull in weather info
        getWeather(lat,long);
    });
};

//Display weather for user's current location if they allow it
let disLocalWeather = function() {
    let options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    let success = function(pos) {
        let coords = pos.coords;
        getWeather(coords.latitude, coords.longitude);
    }

    let error = function(err) {
        console.log(err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
};

let displayRecents = function(term) {
    window.onload = function() {
        for (let i = 0; i < recents.length; i++) {
            let pastSearch = document.createElement('li');
            pastSearch.textContent = recents[i];
            searchHistory.appendChild(pastSearch);
        }
    };

    if(term != null) {
        let lastSearch = document.createElement('li');
        lastSearch.textContent = term;
        searchHistory.appendChild(lastSearch);
    }
};

let retrieveRecents = function go() {
    let storedRecents = localStorage.getItem('searches');
    
    if(storedRecents == null) {
        return;
    } else {
        recents = JSON.parse(storedRecents);
        displayRecents();
    }
};

let init = function() {
    disLocalWeather();
    retrieveRecents();
};

init();

//Event Listeners
submitBtn.addEventListener('click',function(event) {
    //Prevent page reload when submit is clicked
    event.preventDefault();

    //Determine if user put in city name or ZIP code
    if(isNaN(searchTerm.value)) {
        metaRequest = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm.value + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    } else {
        metaRequest = 'https://api.openweathermap.org/data/2.5/weather?zip=' + searchTerm.value + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    }

    //Save search into localStorage
    if(!recents.includes(searchTerm.value)) {
        recents.push(searchTerm.value);
        localStorage.setItem('searches',JSON.stringify(recents));
        displayRecents(searchTerm.value);
    }

    getMetaData(metaRequest);
});

searchHistory.addEventListener('click',function(event) {
    recentChosen = event.target.textContent
    if(isNaN(recentChosen)) {
        metaRequest = 'https://api.openweathermap.org/data/2.5/weather?q=' + recentChosen + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    } else {
        metaRequest = 'https://api.openweathermap.org/data/2.5/weather?zip=' + recentChosen + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    }

    getMetaData(metaRequest);
})