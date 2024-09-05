import { useEffect } from "react";
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./styles/HourlyTemperature.css";

const HourlyTemperature = ({
  setWeatherObject,
  hourlyWeatherObjects,
  hours,
  temps,
  weatherHour,
  setWeatherHour,
}) => {
  Chart.register(ChartDataLabels);

  useEffect(() => {
    const ctx = document.getElementById("chart");

    const max = Math.max(...temps);
    const min = Math.min(...temps);
    let difference = max - min;
    difference === 0 && (difference = 1);

    const maxY = max + 0.4 * difference;
    const minY = min - 0.1 * difference;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: hours,
        datasets: [
          {
            data: temps,
            borderColor: "#ffffff",
            tension: 0.4,
            pointStyle: false,
            datalabels: {
              anchor: "end",
              align: "top",
              color: "#ffffff",
              font: { family: "Quicksand", size: 20 },
              formatter: (value) => {
                return value + "°";
              },
            },
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                family: "Quicksand",
                size: 20,
              },
              color: "#ffffff",
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: { max: maxY, min: minY, display: false },
        },
        animation: false,
      },
    });

    return () => chart.destroy();
  }, [temps]);

  return (
    <div className="container">
      <canvas id="chart"></canvas>
      <div className="overlay">
        <div
          className={
            weatherHour === 0 ? "overlay-button selected" : "overlay-button"
          }
          onClick={() => {
            setWeatherObject(hourlyWeatherObjects[0]);
            setWeatherHour(0);
          }}
        ></div>
        <div
          className={
            weatherHour === 1 ? "overlay-button selected" : "overlay-button"
          }
          onClick={() => {
            setWeatherObject(hourlyWeatherObjects[1]);
            setWeatherHour(1);
          }}
        ></div>
        <div
          className={
            weatherHour === 2 ? "overlay-button selected" : "overlay-button"
          }
          onClick={() => {
            setWeatherObject(hourlyWeatherObjects[2]);
            setWeatherHour(2);
          }}
        ></div>
        <div
          className={
            weatherHour === 3 ? "overlay-button selected" : "overlay-button"
          }
          onClick={() => {
            setWeatherObject(hourlyWeatherObjects[3]);
            setWeatherHour(3);
          }}
        ></div>
        <div
          className={
            weatherHour === 4 ? "overlay-button selected" : "overlay-button"
          }
          onClick={() => {
            setWeatherObject(hourlyWeatherObjects[4]);
            setWeatherHour(4);
          }}
        ></div>
      </div>
    </div>
  );
};

export default HourlyTemperature;
