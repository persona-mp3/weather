// file imports
import {adviceHandler} from './advice.js'
import { credentials } from '../../config.js' 

console.log(credentials)
// DOM Importi
const currentLocation = document.querySelector('.location')
const region = document.querySelector('.region');
const weather = document.querySelector('.weather')
const celcius = document.querySelector('.celcius')
const feelsLike = document.querySelector('.feels-like')
const visibility = document.querySelector('.visibility');
const humidity = document.querySelector('.humidity');
const currentWeather = document.querySelector('.current-weather')
const fDegrees = document.querySelector('.f-degrees')
const userAdvice = document.querySelector('.advice')

adviceHandler(16)
adviceHandler(12)
adviceHandler(0)
adviceHandler(-12)
adviceHandler(100)

// api returns kelvin by default 
const toFarenheit = (k) => {
    return (((k - 273.15) * 9/5) + 32 ).toFixed(2)
}

const toCelcius = (k) => { return  (k - 273.15).toFixed(2)}


function getUserCoordinates() {
    // check for user browser supports geolcation
    if ('geolocation' in navigator) {
        console.log('supported ----> navigator')
    } else {
        currentLocation.innerText = 'Your browser does not support Geolocation'
        return;
    }




    // get coordinates, lat and long
    navigator.geolocation.getCurrentPosition( async (position) => {
        let latitiude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const [userLocation, userState] = await getUserLocation(latitiude, longitude)
        const getWeather = await getWeatherData(latitiude, longitude)


        // celcius and farenheit conversion
        let celciusTemperature = toCelcius(getWeather[1])
        let farenheitTemperature = toFarenheit(getWeather[1])

        let currentAdvice = adviceHandler(celciusTemperature)


        // DOM Manipulation
        region.innerText = `${userState}`
        currentLocation.innerText = `${userLocation}`

        visibility.innerText = getWeather[0] || 'not foundooo'
        celcius.innerText = `${celciusTemperature}˚C`
        feelsLike.innerText = getWeather[2]
        humidity.innerText = getWeather[3]
        currentWeather.innerText = getWeather[4]
        fDegrees.innerText = `${farenheitTemperature}˚F`

        userAdvice.innerText = `${currentAdvice}`

        
        
    })

    

}


const logger = function(...rest){
    console.log(rest)
}


const API_KEY = credentials.api_key

const getUserLocation = async function(latitude, longitude) {

    try { 
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`, {
            method: 'get'
        })
    
    
        if (!response.ok) {
            console.log('response failed in user location')
            return;
        }

        let data = await response.json()
        if (!Array.isArray(data)) {
            console.log('Invalid response from API')
            return;
        }   




        let arrayState = []


        let responseData = data[0]
        let userState =  responseData.state;
        let userLocationName =  responseData.name


        arrayState.push(userLocationName);
        arrayState.push(userState)

        return arrayState
    
    } catch (err) {

        console.warn('error in trying to parse ---> userLocation??', err)

    }
}



const getWeatherData = async function(latitude, longitude) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`, {
        method: 'get'
    })


    // collect all responses from API
    const WEATHER_ARR = []
    
    if (response.status !== 200) {
        console.log('an error occured')
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        console.log('invalid response from api ---> getWeather')
        return;
    }


    // visbility stayus
    let visbilityStatus = data.visibility;
    console.log(visbilityStatus, '<---- visibility stats')
    WEATHER_ARR.push(visbilityStatus)


    // temperature readings
    let currentTemperature = data.main.temp 
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;
    console.log('currentTemp&feelsLike&humidity ---->', currentTemperature, feelsLike, humidity)
    WEATHER_ARR.push( currentTemperature)
    WEATHER_ARR.push( feelsLike)
    WEATHER_ARR.push(  humidity )


    // weather analysis
    const weather = data.weather
    if (!Array.isArray(weather)) {
        console.log('invalid data in weather property ----> getWeather')
        // return;
    }

    let mainWeather = weather[0].main;
    let weatherDescription = weather[0].description; 

    console.log('mainweather&description ---->', mainWeather, weatherDescription)
    WEATHER_ARR.push(mainWeather)
    WEATHER_ARR.push(weatherDescription)



    return WEATHER_ARR
}

getUserCoordinates()