import axios from "axios"

const getBaseUrl = (lat, lon) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
}

const getWeather = (lat, lon) => {
    const baseUrl = getBaseUrl(lat, lon)
    const request = axios.get(baseUrl);
    return request.then(response => response.data) 
}

export default {
    getWeather
}