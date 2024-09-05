import { useEffect, useState } from "react";
import "./styles/Header.css";

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const Header = ({
  weather,
  setWeather,
  setWeatherForecast,
  weatherObject,
  setWeatherObject,
  setWeatherDay,
}) => {
  const [search, setSearch] = useState("Warsaw");
  const [buttonIcon, setButtonIcon] = useState("refresh");

  const fetchData = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        setWeatherObject(result);
        setWeatherDay(0);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    fetch(`${api.base}forecast?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setWeatherForecast(result);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  };

  useEffect(() => {
    if (weather.name) {
      setSearch(weather.name);
      setButtonIcon("refresh");
    }
  }, [weather]);

  useEffect(() => {
    if (weatherObject.city) {
      setSearch(weatherObject.city.name);
      setButtonIcon("refresh");
    }
  }, [weatherObject]);

  useEffect(() => {
    fetchData();
  }, []);

  const searchPressed = () => {
    fetchData();
  };

  const enterPressed = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div className="header">
      <input
        className="input"
        type="text"
        placeholder="City"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setButtonIcon("search");
        }}
        onKeyDown={(e) => enterPressed(e)}
      />
      <button className="search-button" onClick={searchPressed}>
        <img
          className={buttonIcon + "-icon"}
          src={buttonIcon + ".svg"}
          draggable="false"
        />
      </button>
    </div>
  );
};

export default Header;
