# weatherBoard
Location Based Weather Forecasting with OpenWeather API

## Description

- The App will provide current and future weather information for a given location
- Users can either grant the app access to their current location to display weather or put in a world city or US ZIP code.
- App then displays the current weather conditions and a 5 day forecast
- If the user has not searched for the ZIP or city previously, it is also added to "Recent Searches" so they can search the same location again.
- Recent searches are saved in localStorage so user can see them on subsequent page visits.

## Functionality

### At page load, user is asked if they want to share this location. This will allow the app to display the weather based on the location data in the browser.
![screenshot of getting location privileges](https://github.com/mdbow22/weatherBoard/blob/9a96354394d90affb377e310ed1a9ee0756ea438/assets/images/askForLocation.PNG)

### Search area allows user to type in a world city or US ZIP code or to view previous searches that have been saved in localStorage
![screenshot of search area](https://github.com/mdbow22/weatherBoard/blob/9a96354394d90affb377e310ed1a9ee0756ea438/assets/images/searchArea.PNG)

### View of the results displayed on the screen, including current conditions and a 5 day forecast
![screenshot of weather displayed](https://github.com/mdbow22/weatherBoard/blob/9a96354394d90affb377e310ed1a9ee0756ea438/assets/images/weather.PNG)

## Deployed App

Here is a link to the deployed app: https://mdbow22.github.io/weatherBoard/
