import { useEffect, useState } from "react"
import Wheather from "../services/wheather"

const WheatherReport = ({ lat, lon, capital }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        Wheather
            .getWeather(lat, lon)
            .then(response => {
                setWeather({
                    temp: response.current_weather.temperature,
                    wind: response.current_weather.windspeed
                })

            })
    }, [])

    return (
        <>
            <h2>Wheather in {capital}</h2>
            <p>temperature {weather.temp} Celsius</p>
            <p>wind {weather.wind} km/h</p>
        </>
    )
}

export default WheatherReport