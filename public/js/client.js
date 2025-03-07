import { credentials } from '../../config.js' 
import { updateDom, toCelcius } from '../components/tools.js'


const searchBtn = document.querySelector('.search-btn')
const userSearch = document.querySelector('.location-search')
const domLocation = document.querySelector('.location')
const domTemp = document.querySelector('.temp');
const domWeather = document.querySelector('.weather')
const domWindSpeed = document.querySelector('.wind')
const domState = document.querySelector('.state')


const API_KEY = credentials.api_key;

async function locationBySearch() {

    const userQuery = document.querySelector('.location-search').value;


    try { 
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userQuery}&limit=1&appid=${API_KEY}`)

        let userData = await response.json()
        console.log('userData --->', userData)
        

        userData = userData[0]
        let locationState = userData.state

        // get longitude and latitude
        const longitude = userData.lon;
        const latitude = userData.lat;

        updateDom(domLocation, `${userData.name},  `)
        updateDom(domState, locationState)

        return [latitude, longitude]

    } catch (err) {
        console.log(err)
    }

}



async function getWeatherDetailsWithCoordinates(userQuery) {
    try {
        // console.log('in here2')
        const [lat, long] = await locationBySearch(userQuery);


        // make request to api for weather details
        const apiResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);

        const response = await apiResponse.json()

        let temperature = response.main.temp;
        let convertedTemp = toCelcius(temperature)
        console.log('apiResponse -->', response)

        updateDom(domTemp, convertedTemp)

        // get description of weather via weather property
        let weatherProp = response.weather;
        let mainWeather = weatherProp[0].description;
        console.log(mainWeather)
        updateDom(domWeather, `weather stats: ${mainWeather}`)

        // windspeed description
        let windSpeed = response.wind.speed;
        updateDom(domWindSpeed, `wind speeds: ${windSpeed}m/s`)

    } catch (err) {
        console.warn(err)

    }
}


// const y = sendQuery()

searchBtn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    await getWeatherDetailsWithCoordinates()
})

