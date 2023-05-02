import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface Iprops {
  option: string;
  setOption: (value) => void;
  page: number;
  setPage: (value) => void;
}
const SelectSort: React.FC<Iprops> = (props) => {
  const { option, setOption, setPage } = props;
  const handleChange = (event: SelectChangeEvent) => {
    setPage(1);
    setOption(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Sắp xếp"
          onChange={handleChange}
        >
          <MenuItem value={1}>{`Thap -> Cao`}</MenuItem>
          <MenuItem value={2}>{`Cao -> Thap`}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectSort;
