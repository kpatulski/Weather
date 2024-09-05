import { useEffect, useState } from "react";
import "./styles/Sun.css";

const Sun = ({ elapsedDay, elapsedNight, day, sunColor }) => {
  const [sunPosition, setSunPosition] = useState(270);
  const topPos = 270;
  const bottomPos = 400;

  const calculateSunPosition = () => {
    if (day) {
      if (elapsedDay >= 0 && elapsedDay < 0.5) {
        setSunPosition((topPos - bottomPos) * 2 * elapsedDay + bottomPos);
      } else if (elapsedDay >= 0.5 && elapsedDay < 1) {
        setSunPosition(
          (topPos - bottomPos) * -2 * elapsedDay +
            bottomPos +
            (topPos - bottomPos) * 2
        );
      }
    } else {
      if (elapsedNight >= 0 && elapsedNight < 0.5) {
        setSunPosition((topPos - bottomPos) * 2 * elapsedNight + bottomPos);
      } else if (elapsedNight >= 0.5 && elapsedNight < 1) {
        setSunPosition(
          (topPos - bottomPos) * -2 * elapsedNight +
            bottomPos +
            (topPos - bottomPos) * 2
        );
      }
    }
  };

  useEffect(() => {
    calculateSunPosition();
  }, [elapsedDay, elapsedNight]);

  return day ? (
    <div
      className="sun"
      style={{
        top: `${sunPosition}px`,
        backgroundColor: sunColor,
        boxShadow: `0 0 20px ${sunColor}`,
      }}
    ></div>
  ) : (
    <img
      className="moon"
      src="moon.svg"
      style={{ top: `${sunPosition}px` }}
      draggable="false"
    />
  );
};

export default Sun;
