import { useEffect, useState } from "react";
import Sun from "./Sun";
import "./styles/Sky.css";

const Sky = ({
  weather,
  weatherObject,
  opacity,
  setOpacity,
  device,
  day,
  setDay,
  weatherDay,
  weatherHour,
}) => {
  const [elapsedDay, setElapsedDay] = useState(0);
  const [elapsedNight, setElapsedNight] = useState(0);
  const [temp, setTemp] = useState(0);
  const [weatherDescription, setWeatherDescription] = useState("");
  const [skyColorTop, setSkyColorTop] = useState("rgb(137, 198, 201)");
  const [skyColorBottom, setSkyColorBottom] = useState("rgb(226, 227, 194)");
  const [sunColor, setSunColor] = useState("rgb(255, 252, 235)");
  const dayTopColor = [137, 198, 201];
  const dayBottomColor = [226, 227, 194];
  const nightTopColor = [32, 15, 60];
  const nightBottomColor = [49, 46, 99];
  const sunriseTopColor = [85, 107, 131];
  const sunriseBottomColor = [239, 169, 157];
  const daySunColor = [255, 252, 235];
  const sunriseSunColor = [255, 170, 121];
  const change = 0.1;
  const opacityChange = 0.4;

  const calculateColors = () => {
    if (day) {
      if (elapsedDay >= 0 && elapsedDay < change) {
        let red =
          ((dayTopColor[0] - sunriseTopColor[0]) / change) * elapsedDay +
          sunriseTopColor[0];
        let green =
          ((dayTopColor[1] - sunriseTopColor[1]) / change) * elapsedDay +
          sunriseTopColor[1];
        let blue =
          ((dayTopColor[2] - sunriseTopColor[2]) / change) * elapsedDay +
          sunriseTopColor[2];
        setSkyColorTop(`rgb(${red}, ${green}, ${blue})`);
        red =
          ((dayBottomColor[0] - sunriseBottomColor[0]) / change) * elapsedDay +
          sunriseBottomColor[0];
        green =
          ((dayBottomColor[1] - sunriseBottomColor[1]) / change) * elapsedDay +
          sunriseBottomColor[1];
        blue =
          ((dayBottomColor[2] - sunriseBottomColor[2]) / change) * elapsedDay +
          sunriseBottomColor[2];
        setSkyColorBottom(`rgb(${red}, ${green}, ${blue})`);
        red =
          ((daySunColor[0] - sunriseSunColor[0]) / change) * elapsedDay +
          sunriseSunColor[0];
        green =
          ((daySunColor[1] - sunriseSunColor[1]) / change) * elapsedDay +
          sunriseSunColor[1];
        blue =
          ((daySunColor[2] - sunriseSunColor[2]) / change) * elapsedDay +
          sunriseSunColor[2];
        setSunColor(`rgb(${red}, ${green}, ${blue})`);
        setOpacity(((1 - opacityChange) / change) * elapsedDay + opacityChange);
      } else if (elapsedDay >= change && elapsedDay < 1 - change) {
        setSkyColorTop(
          `rgb(${dayTopColor[0]}, ${dayTopColor[1]}, ${dayTopColor[2]})`
        );
        setSkyColorBottom(
          `rgb(${dayBottomColor[0]}, ${dayBottomColor[1]}, ${dayBottomColor[2]})`
        );
        setSunColor(
          `rgb(${daySunColor[0]}, ${daySunColor[1]}, ${daySunColor[2]})`
        );
        setOpacity(1);
      } else if (elapsedDay >= 1 - change && elapsedDay < 1) {
        let red =
          ((sunriseTopColor[0] - dayTopColor[0]) / change) * elapsedDay +
          dayTopColor[0] +
          ((dayTopColor[0] - sunriseTopColor[0]) / change) * (1 - change);
        let green =
          ((sunriseTopColor[1] - dayTopColor[1]) / change) * elapsedDay +
          dayTopColor[1] +
          ((dayTopColor[1] - sunriseTopColor[1]) / change) * (1 - change);
        let blue =
          ((sunriseTopColor[2] - dayTopColor[2]) / change) * elapsedDay +
          dayTopColor[2] +
          ((dayTopColor[2] - sunriseTopColor[2]) / change) * (1 - change);
        setSkyColorTop(`rgb(${red}, ${green}, ${blue})`);
        red =
          ((sunriseBottomColor[0] - dayBottomColor[0]) / change) * elapsedDay +
          dayBottomColor[0] +
          ((dayBottomColor[0] - sunriseBottomColor[0]) / change) * (1 - change);
        green =
          ((sunriseBottomColor[1] - dayBottomColor[1]) / change) * elapsedDay +
          dayBottomColor[1] +
          ((dayBottomColor[1] - sunriseBottomColor[1]) / change) * (1 - change);
        blue =
          ((sunriseBottomColor[2] - dayBottomColor[2]) / change) * elapsedDay +
          dayBottomColor[2] +
          ((dayBottomColor[2] - sunriseBottomColor[2]) / change) * (1 - change);
        setSkyColorBottom(`rgb(${red}, ${green}, ${blue})`);
        red =
          ((sunriseSunColor[0] - daySunColor[0]) / change) * elapsedDay +
          daySunColor[0] +
          ((daySunColor[0] - sunriseSunColor[0]) / change) * (1 - change);
        green =
          ((sunriseSunColor[1] - daySunColor[1]) / change) * elapsedDay +
          daySunColor[1] +
          ((daySunColor[1] - sunriseSunColor[1]) / change) * (1 - change);
        blue =
          ((sunriseSunColor[2] - daySunColor[2]) / change) * elapsedDay +
          daySunColor[2] +
          ((daySunColor[2] - sunriseSunColor[2]) / change) * (1 - change);
        setSunColor(`rgb(${red}, ${green}, ${blue})`);
        setOpacity(
          ((opacityChange - 1) / change) * elapsedDay +
            1 +
            ((1 - opacityChange) / change) * (1 - change)
        );
      }
    } else {
      if (elapsedNight >= 0 && elapsedNight < change) {
        let red =
          ((nightTopColor[0] - sunriseTopColor[0]) / change) * elapsedNight +
          sunriseTopColor[0];
        let green =
          ((nightTopColor[1] - sunriseTopColor[1]) / change) * elapsedNight +
          sunriseTopColor[1];
        let blue =
          ((nightTopColor[2] - sunriseTopColor[2]) / change) * elapsedNight +
          sunriseTopColor[2];
        setSkyColorTop(`rgb(${red}, ${green}, ${blue})`);
        red =
          ((nightBottomColor[0] - sunriseBottomColor[0]) / change) *
            elapsedNight +
          sunriseBottomColor[0];
        green =
          ((nightBottomColor[1] - sunriseBottomColor[1]) / change) *
            elapsedNight +
          sunriseBottomColor[1];
        blue =
          ((nightBottomColor[2] - sunriseBottomColor[2]) / change) *
            elapsedNight +
          sunriseBottomColor[2];
        setSkyColorBottom(`rgb(${red}, ${green}, ${blue})`);
        setOpacity((-opacityChange / change) * elapsedNight + opacityChange);
      } else if (elapsedNight >= change && elapsedNight < 1 - change) {
        setSkyColorTop(
          `rgb(${nightTopColor[0]}, ${nightTopColor[1]}, ${nightTopColor[2]})`
        );
        setSkyColorBottom(
          `rgb(${nightBottomColor[0]}, ${nightBottomColor[1]}, ${nightBottomColor[2]})`
        );
        setOpacity(0);
      } else if (elapsedNight >= 1 - change && elapsedNight < 1) {
        let red =
          ((sunriseTopColor[0] - nightTopColor[0]) / change) * elapsedNight +
          nightTopColor[0] +
          ((nightTopColor[0] - sunriseTopColor[0]) / change) * (1 - change);
        let green =
          ((sunriseTopColor[1] - nightTopColor[1]) / change) * elapsedNight +
          nightTopColor[1] +
          ((nightTopColor[1] - sunriseTopColor[1]) / change) * (1 - change);
        let blue =
          ((sunriseTopColor[2] - nightTopColor[2]) / change) * elapsedNight +
          nightTopColor[2] +
          ((nightTopColor[2] - sunriseTopColor[2]) / change) * (1 - change);
        setSkyColorTop(`rgb(${red}, ${green}, ${blue})`);
        red =
          ((sunriseBottomColor[0] - nightBottomColor[0]) / change) *
            elapsedNight +
          nightBottomColor[0] +
          ((nightBottomColor[0] - sunriseBottomColor[0]) / change) *
            (1 - change);
        green =
          ((sunriseBottomColor[1] - nightBottomColor[1]) / change) *
            elapsedNight +
          nightBottomColor[1] +
          ((nightBottomColor[1] - sunriseBottomColor[1]) / change) *
            (1 - change);
        blue =
          ((sunriseBottomColor[2] - nightBottomColor[2]) / change) *
            elapsedNight +
          nightBottomColor[2] +
          ((nightBottomColor[2] - sunriseBottomColor[2]) / change) *
            (1 - change);
        setSkyColorBottom(`rgb(${red}, ${green}, ${blue})`);
        setOpacity(
          (opacityChange / change) * elapsedNight -
            (opacityChange / change) * (1 - change)
        );
      }
    }
  };

  useEffect(() => {
    if (weatherObject.main) {
      const timezone = weather.timezone;
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset();
      const utcTime = now.getTime() + timezoneOffset * 60000;
      let currentTime = new Date(utcTime + timezone * 1000);

      if (weatherDay !== 0 || (weatherDay === 0 && weatherHour !== 0)) {
        const date = new Date(weatherObject.dt * 1000);
        const currentDateUtc = date.getTime() + timezoneOffset * 60000;
        currentTime = new Date(currentDateUtc + timezone * 1000);
      }

      const sunrise =
        weather.sys.sunrise * 1000 +
        timezoneOffset * 60000 +
        timezone * 1000 +
        weatherDay * 86400000;
      const sunset =
        weather.sys.sunset * 1000 +
        timezoneOffset * 60000 +
        timezone * 1000 +
        weatherDay * 86400000;

      if (currentTime < sunrise) {
        currentTime = currentTime.getTime() + 86400000;
      }

      if (currentTime > sunrise + 86400000) {
        currentTime = currentTime.getTime() - 86400000;
      }

      const elapsedDay = (currentTime - sunrise) / (sunset - sunrise);
      const elapsedNight =
        (currentTime - sunset) / (sunrise + 86400000 - sunset);

      if (elapsedDay >= 0 && elapsedDay < 1) {
        setDay(true);
      } else if (elapsedNight >= 0 && elapsedNight < 1) {
        setDay(false);
      }

      setElapsedDay(elapsedDay);
      setElapsedNight(elapsedNight);

      let temp = weatherObject.main.temp.toFixed(0);
      temp = temp === "-0" ? 0 : temp;
      setTemp(temp);
      setWeatherDescription(weatherObject.weather[0].main);
    }
  }, [weatherObject, weatherDay]);

  useEffect(() => {
    calculateColors();
  }, [elapsedDay, elapsedNight]);

  return (
    <>
      <div
        className={`sky ${device}`}
        style={{
          background: `linear-gradient(${skyColorTop} 20%, ${skyColorBottom})`,
        }}
      >
        <img
          className="mountain"
          src="mountain.png"
          style={{
            filter: `hue-rotate(240deg) brightness(60%) contrast(400%) grayscale(88%)`,
            opacity: 1,
          }}
          draggable="false"
        />
        <img
          className="mountain"
          src="mountain.png"
          style={{
            opacity: opacity,
          }}
          draggable="false"
        />
        <div className="temp">{temp}°</div>
        <div className="weather-description">{weatherDescription}</div>
      </div>
      <Sun
        elapsedDay={elapsedDay}
        elapsedNight={elapsedNight}
        day={day}
        sunColor={sunColor}
      />
    </>
  );
};

export default Sky;
