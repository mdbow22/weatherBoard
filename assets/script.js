//Selectors

let searchTerm = document.querySelector('.searchField');
let submitBtn = document.querySelector('.submitBtn');
let curWeather = document.querySelector('.hero');

//Global Variables

let requestURL;
let long;
let lat;
let cityName;

//fetch coordinates and city name
let getMetaData = function(request) {
    fetch(request)
    .then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            curWeather.innerHTML = '<h3>City or ZIP code not Found</h3>';
        }
    })
    .then(function(data) {
        long = data.coord.lon;
        lat = data.coord.lat;
        console.log(data);
        cityName = data.name;
        //getWeather(lat,long);
    })
}

//Event Listeners
submitBtn.addEventListener('click',function(event) {
    event.preventDefault();
    if(isNaN(searchTerm.value)) {
        requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm.value + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    } else {
        requestURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + searchTerm.value + '&appid=3e8fd441ffe94cd1d1f73c4d27b77283&units=imperial';
    }
    getMetaData(requestURL);
});