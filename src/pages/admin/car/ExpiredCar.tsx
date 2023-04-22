import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Icar } from "../../../interfaces/interface";
import { useAppDispatch } from "../../../redux/hook/hook";
import { approveCar } from "../../../redux/action/carAction";
interface Iprops {
  car: Icar;
}

const ExpiredCar: React.FC<Iprops> = (props) => {
  const { car } = props;
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(car.active === "false" ? 1 : 0);
  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(
      approveCar({
        id: car._id,
        active: value,
      })
    );
  };
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Active"
        onChange={handleChange}
        style={{
          width: "120px",
          textAlign: "left",
          padding: "5px 5px",
          height: "40px",
        }}
        value={value}
      >
        <MenuItem value={0}>Success</MenuItem>
        <MenuItem value={1}>Pending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ExpiredCar;
