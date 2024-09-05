import { useEffect, useState } from "react";
import Header from "./Header";
import Sky from "./Sky";
import MainInfo from "./MainInfo";

function App() {
  const [weather, setWeather] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});
  const [device, setDevice] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [day, setDay] = useState(true);
  const [weatherDay, setWeatherDay] = useState(0);
  const [weatherObject, setWeatherObject] = useState({});
  const [weatherHour, setWeatherHour] = useState(0);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setDevice("mobile");
    } else {
      setDevice("pc");
    }
  }, []);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  return (
    <div className={`content ${device}`}>
      <div
        className={`content-overlay ${device}`}
        style={{
          filter: `hue-rotate(240deg) brightness(60%) contrast(400%) grayscale(88%)`,
          opacity: 1,
        }}
      ></div>
      <div
        className={`content-overlay ${device}`}
        style={{
          opacity: opacity,
        }}
      ></div>
      <Header
        weather={weather}
        setWeather={setWeather}
        setWeatherForecast={setWeatherForecast}
        weatherObject={weatherObject}
        setWeatherObject={setWeatherObject}
        setWeatherDay={setWeatherDay}
      />
      <Sky
        weather={weather}
        weatherObject={weatherObject}
        setOpacity={setOpacity}
        opacity={opacity}
        device={device}
        day={day}
        setDay={setDay}
        weatherDay={weatherDay}
        weatherHour={weatherHour}
      />
      <MainInfo
        weather={weather}
        weatherForecast={weatherForecast}
        day={day}
        weatherDay={weatherDay}
        setWeatherDay={setWeatherDay}
        weatherObject={weatherObject}
        setWeatherObject={setWeatherObject}
        weatherHour={weatherHour}
        setWeatherHour={setWeatherHour}
      />
    </div>
  );
}

export default App;
