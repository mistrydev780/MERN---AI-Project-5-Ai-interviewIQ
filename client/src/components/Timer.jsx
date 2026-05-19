import React from "react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function Timer({ timeLeft, totalTime }) {

  const percentage =
    (timeLeft / totalTime) * 100;

  return (

    <div className="w-24 h-24">

      <CircularProgressbar
        value={percentage}

        text={`${timeLeft}s`}

        styles={buildStyles({

          textSize: "20px",

          pathColor:
            timeLeft <= 10
              ? "#ef4444"
              : "#10b981",

          textColor:
            timeLeft <= 10
              ? "#ef4444"
              : "#111827",

          trailColor: "#e5e7eb",

          strokeLinecap: "round",

          pathTransitionDuration: 0.5,
        })}
      />

    </div>
  );
}

export default Timer;