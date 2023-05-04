import { Button } from "antd";
import React, { useState } from "react";
import { Icar } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { hideShowCar } from "../../../redux/action/carAction";
interface Iprops {
  car: Icar;
}
const HideShowCar: React.FC<Iprops> = (props) => {
  const { car } = props;
  const dispatch = useAppDispatch();
  const [isOn, setIsOn] = useState(car?.hide);
  const handleClick = () => {
    dispatch(
      hideShowCar({
        _id: car._id,
        hide: isOn,
      })
    );
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
