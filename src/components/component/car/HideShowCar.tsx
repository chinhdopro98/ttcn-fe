import { Button } from "antd";
import React, { useState } from "react";

const HideShowCar = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };
  return (
    <div>
      <span className="icon-on-off" onClick={handleClick}>
        {isOn ? (
          <i className="fa-solid fa-toggle-on"></i>
        ) : (
          <i className="fa-solid fa-toggle-off"></i>
        )}
      </span>
    </div>
  );
};

export default HideShowCar;
