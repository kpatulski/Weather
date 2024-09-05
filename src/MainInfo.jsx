import { useEffect, useState } from "react";
import HourlyTemperature from "./HourlyTemperature";
import "./styles/MainInfo.css";

const MainInfo = ({
  weather,
  weatherForecast,
  day,
  weatherDay,
  setWeatherDay,
  weatherObject,
  setWeatherObject,
  weatherHour,
  setWeatherHour,
}) => {
  const [svg, setSvg] = useState("01d.svg");
  const [sunTime, setSunTime] = useState([]);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("");
  const [precipitation, setPrecipitation] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDeg, setWindDeg] = useState(0);
  const [temp, setTemp] = useState(0);
  const [days, setDays] = useState([]);
  const [forecastTemps, setForecastTemps] = useState([]);
  const [weatherSvg, setWeatherSvg] = useState("01d.svg");
  const [forecastSvgs, setForecastSvgs] = useState([
    "01d.svg",
    "01d.svg",
    "01d.svg",
    "01d.svg",
  ]);
  const [weatherIds, setWeatherIds] = useState([]);
  const [hours, setHours] = useState([0, 0, 0, 0, 0]);
  const [temps, setTemps] = useState([
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
  ]);
  const [hourlyWeatherObjects, setHourlyWeatherObjects] = useState([]);

  useEffect(() => {
    if (weatherObject.main) {
      const timezone = weather.timezone;
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset();
      const utcTime = now.getTime() + timezoneOffset * 60000;
      let currentTime = new Date(utcTime + timezone * 1000);

      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const days = [];
      for (let i = 0; i < 5; i++) {
        const currentDate = new Date(currentTime.getTime() + i * 86400000);
        const dayOfWeek = currentDate.getDay();
        days.push(weekdays[dayOfWeek]);
      }
      setDays(days);

      if (weatherDay !== 0 || (weatherDay === 0 && weatherHour !== 0)) {
        const date = new Date(weatherObject.dt * 1000);
        const currentDateUtc = date.getTime() + timezoneOffset * 60000;
        currentTime = new Date(currentDateUtc + timezone * 1000);
      }

      const currentTimeFormatted = `${currentTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setCurrentTimeFormatted(currentTimeFormatted);

      const sunrise = new Date(
        weather.sys.sunrise * 1000 + timezoneOffset * 60000 + timezone * 1000
      );
      const sunset = new Date(
        weather.sys.sunset * 1000 + timezoneOffset * 60000 + timezone * 1000
      );
      const sunriseFormatted = `${sunrise
        .getHours()
        .toString()
        .padStart(2, "0")}:${sunrise.getMinutes().toString().padStart(2, "0")}`;
      const sunsetFormatted = `${sunset
        .getHours()
        .toString()
        .padStart(2, "0")}:${sunset.getMinutes().toString().padStart(2, "0")}`;
      setSunTime([sunriseFormatted, sunsetFormatted]);

      let num = weatherObject.weather[0].icon.slice(0, 2);
      let timeOfDay = day ? "d" : "n";
      setSvg(num + timeOfDay + ".svg");

      weatherDay === 0 && setWeatherSvg(num + timeOfDay + ".svg");

      const divider = weatherDay === 0 && weatherHour === 0 ? 1 : 3;

      let precipitation = 0;
      if (weatherObject.rain) {
        precipitation = weatherObject.rain[`${divider}h`] / divider;
      }

      if (weatherObject.snow) {
        precipitation += weatherObject.snow[`${divider}h`] / divider;
      }

      if (precipitation >= 10) {
        precipitation = precipitation.toFixed(0);
      } else if (precipitation < 10) {
        precipitation = precipitation.toFixed(1);
      }
      precipitation === "0.0" && (precipitation = 0);
      setPrecipitation(precipitation);

      setHumidity(weatherObject.main.humidity);
      setPressure(weatherObject.main.pressure);

      let windSpeed = weatherObject.wind.speed;
      if (windSpeed >= 10) {
        windSpeed = windSpeed.toFixed(0);
      } else if (windSpeed < 10) {
        windSpeed = windSpeed.toFixed(1);
      }
      windSpeed === "0.0" && (windSpeed = 0);
      setWindSpeed(windSpeed);
      setWindDeg(weatherObject.wind.deg);

      let temp = weather.main.temp.toFixed(0);
      temp = temp === "-0" ? 0 : temp;
      setTemp(temp);
    }
  }, [weatherObject, day]);

  useEffect(() => {
    if (weatherForecast.list) {
      const forecastSvgs = [];
      const forecastTemps = [];
      const weatherIds = [];

      const timezone = weather.timezone;
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset();
      const utcTime = now.getTime() + timezoneOffset * 60000;
      const currentTime = new Date(utcTime + timezone * 1000);

      for (let i = 0; i < 40; i++) {
        const date = new Date(weatherForecast.list[i].dt * 1000);
        const currentDateUtc =
          date.getTime() + date.getTimezoneOffset() * 60000;
        const currentDate = new Date(currentDateUtc + weather.timezone * 1000);
        const currentHours =
          currentDate.getHours() * 60 + currentDate.getMinutes();

        if (currentHours >= 720 && currentHours < 900) {
          if (currentDate > currentTime.getTime() + 86400000) {
            const num = weatherForecast.list[i].weather[0].icon.slice(0, 2);
            const icon = num + "d.svg";
            forecastSvgs.push(icon);

            let currentTemp = weatherForecast.list[i].main.temp.toFixed(0);
            currentTemp = currentTemp === "-0" ? 0 : currentTemp;
            forecastTemps.push(currentTemp);

            weatherIds.push(i);
          }
        }
      }
      setForecastSvgs(forecastSvgs);
      setForecastTemps(forecastTemps);
      setWeatherIds(weatherIds);

      let hours = [];
      let temps = [];
      let hourlyWeatherObjects = [];

      if (weatherDay === 0) {
        const timezone = weather.timezone;
        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset();
        const utcTime = now.getTime() + timezoneOffset * 60000;
        let time = new Date(utcTime + timezone * 1000);

        const date = new Date(weatherForecast.list[0].dt * 1000);
        const currentDateUtc =
          date.getTime() + date.getTimezoneOffset() * 60000;
        const dataTime = new Date(currentDateUtc + weather.timezone * 1000);

        let startValue = 0;
        if (dataTime < time.getTime() + 3600000) {
          startValue = 1;
        }

        time = `${time.getHours().toString().padStart(2, "0")}:${time
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
        hours.push(time);

        let temp = weather.main.temp.toFixed(0);
        temp = temp === "-0" ? 0 : temp;
        temps.push(temp);
        hourlyWeatherObjects.push(weather);

        for (let i = startValue; i < startValue + 4; i++) {
          const date = new Date(weatherForecast.list[i].dt * 1000);
          const currentDateUtc =
            date.getTime() + date.getTimezoneOffset() * 60000;
          time = new Date(currentDateUtc + weather.timezone * 1000);

          time = `${time.getHours().toString().padStart(2, "0")}:${time
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          hours.push(time);
          let temp = weatherForecast.list[i].main.temp.toFixed(0);
          temp = temp === "-0" ? 0 : temp;
          temps.push(temp);
          hourlyWeatherObjects.push(weatherForecast.list[i]);
          setWeatherHour(0);
        }
      } else {
        let startValue = -2;
        if (weatherIds[weatherDay - 1] > 37) {
          startValue = 35 - weatherIds[weatherDay - 1];
        }
        for (let i = startValue; i < startValue + 5; i++) {
          const date = new Date(
            weatherForecast.list[weatherIds[weatherDay - 1] + i].dt * 1000
          );
          const currentDateUtc =
            date.getTime() + date.getTimezoneOffset() * 60000;
          let time = new Date(currentDateUtc + weather.timezone * 1000);

          time = `${time.getHours().toString().padStart(2, "0")}:${time
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          hours.push(time);
          let temp =
            weatherForecast.list[
              weatherIds[weatherDay - 1] + i
            ].main.temp.toFixed(0);
          temp = temp === "-0" ? 0 : temp;
          temps.push(temp);
          hourlyWeatherObjects.push(
            weatherForecast.list[weatherIds[weatherDay - 1] + i]
          );
        }
        setWeatherHour(-startValue);
      }
      setHours(hours);
      setTemps(temps);
      setHourlyWeatherObjects(hourlyWeatherObjects);
    }
  }, [weatherForecast, weatherDay]);

  return (
    <>
      <div className="main-info">
        <div className="weather-container">
          <img className="weather-icon" src={svg} draggable="false" />
          <div className="wind">
            <img
              className="wind-icon"
              src="wind-dir.svg"
              style={{ transform: `rotate(${windDeg}deg)` }}
            />
            {windSpeed} km/h
          </div>
        </div>
        <div className="border1"></div>
        <div className="info">
          <div className="text-container">
            <img className="text-icon" src="time.svg" draggable="false" />
            {currentTimeFormatted}
          </div>
          <div className="text-container">
            <img className="text-icon" src="sunrise.svg" draggable="false" />
            {sunTime[0]}
          </div>
          <div className="text-container">
            <img className="text-icon" src="sunset.svg" draggable="false" />
            {sunTime[1]}
          </div>
          <div className="text-container">
            <img className="text-icon" src="umbrella.svg" draggable="false" />
            {precipitation} mm
          </div>
          <div className="text-container">
            <img className="text-icon" src="water.svg" draggable="false" />
            {humidity}%
          </div>
          <div className="text-container">
            <img className="text-icon" src="pressure.svg" draggable="false" />
            {pressure} hPa
          </div>
        </div>
      </div>
      <div className="border2"></div>
      <HourlyTemperature
        setWeatherObject={setWeatherObject}
        hourlyWeatherObjects={hourlyWeatherObjects}
        hours={hours}
        temps={temps}
        weatherHour={weatherHour}
        setWeatherHour={setWeatherHour}
      />
      <div className="border2"></div>
      <div className="weather-forecast">
        <div
          className={
            weatherDay === 0
              ? "forecast-container selected"
              : "forecast-container"
          }
          onClick={() => {
            setWeatherDay(0);
            setWeatherObject(weather);
          }}
        >
          {days[0]}
          <img className="forecast-icon" src={weatherSvg} draggable="false" />
          {temp}°
        </div>
        <div
          className={
            weatherDay === 1
              ? "forecast-container selected"
              : "forecast-container"
          }
          onClick={() => {
            setWeatherDay(1);
            setWeatherObject(weatherForecast.list[weatherIds[0]]);
          }}
        >
          {days[1]}
          <img
            className="forecast-icon"
            src={forecastSvgs[0]}
            draggable="false"
          />
          {forecastTemps[0]}°
        </div>
        <div
          className={
            weatherDay === 2
              ? "forecast-container selected"
              : "forecast-container"
          }
          onClick={() => {
            setWeatherDay(2);
            setWeatherObject(weatherForecast.list[weatherIds[1]]);
          }}
        >
          {days[2]}
          <img
            className="forecast-icon"
            src={forecastSvgs[1]}
            draggable="false"
          />
          {forecastTemps[1]}°
        </div>
        <div
          className={
            weatherDay === 3
              ? "forecast-container selected"
              : "forecast-container"
          }
          onClick={() => {
            setWeatherDay(3);
            setWeatherObject(weatherForecast.list[weatherIds[2]]);
          }}
        >
          {days[3]}
          <img
            className="forecast-icon"
            src={forecastSvgs[2]}
            draggable="false"
          />
          {forecastTemps[2]}°
        </div>
        <div
          className={
            weatherDay === 4
              ? "forecast-container selected"
              : "forecast-container"
          }
          onClick={() => {
            setWeatherDay(4);
            setWeatherObject(weatherForecast.list[weatherIds[3]]);
          }}
        >
          {days[4]}
          <img
            className="forecast-icon"
            src={forecastSvgs[3]}
            draggable="false"
          />
          {forecastTemps[3]}°
        </div>
      </div>
    </>
  );
};

export default MainInfo;
