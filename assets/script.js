//Selectors

//Form Selectors
let searchTerm = document.querySelector('.searchField');
let submitBtn = document.querySelector('.submitBtn');

//Current Weather Selectors
let curWeather = document.querySelector('.curWeather');
let city = document.getElementById('city');
let latitude = document.getElementById('lat');
let longitude = document.getElementById('lon');
let curIcon = document.getElementById('curIcon');
let curTemp = document.getElementById('curTemp');
let curFeels = document.getElementById('curFeels');
let curWind = document.getElementById('curWind');
let curHum = document.getElementById('curHum');
let curUV = document.getElementById('curUV');

//Global Variables

let metaRequest;
let long;
let lat;

let dispCurrentWeather = function(curData) {
    curIcon.setAttribute('src','http://openweathermap.org/img/wn/' + curData.weather[0].icon + '@2x.png');
    curTemp.textContent = curData.temp;
    curFeels.textContent = curData.feels_like;
    curWind.textContent = curData.wind_speed;
    curHum.textContent = curData.humidity;
    curUV.textContent = curData.uvi;
};

let disForecast = function(forecast) {
    console.log(forecast);
}

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
            //if yes, convert to JSON
            return response.json();
        } else {
            //if no, tell user that their search criteria wasn't found
            curWeather.innerHTML = '<h3>City or ZIP code not Found</h3>';
        }
    })
    .then(function(data) {
        //store GPS coordinates and name of city, then display them
        long = Math.round(data.coord.lon * 100) / 100;
        lat = Math.round(data.coord.lat * 100) / 100;
        city.textContent = data.name;
        latitude.textContent = lat
        longitude.textContent = long

        //send to next fetch request to pull in weather info
        getWeather(lat,long);
    });
};

//Event Listeners
submitBtn.addEventListener('click',function(event) {
    //Prevent page reload when submit is clicked
    event.preventDefault();
    
    //unhide div with curWeather
    curWeather.classList.remove('hidden');

    //Determine if user put in city name or ZIP code
    if(isNaN(searchTerm.value)) {
        metaRequest = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm.value + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    } else {
        metaRequest = 'https://api.openweathermap.org/data/2.5/weather?zip=' + searchTerm.value + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    }
    getMetaData(metaRequest);
});