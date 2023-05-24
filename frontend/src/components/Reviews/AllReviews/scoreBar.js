import React from "react";
import "../../Spots/SpotDetails/SpotDetails.css";

const ScoreBar = ({ rating }) => {
  const fill = (rating / 5) * 100;

  return (
    <div className="score-bar">
      <div className="score-bar-fill" style={{ width: `${fill}%` }}>
        <div className="glow"></div>
        <div className="light-ball"></div>
      </div>
    </div>
  );
};

export default ScoreBar;
