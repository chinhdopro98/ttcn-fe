import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
interface Iprops {
  page: number;
  setPage: (value) => void;
  total: number;
}
const Navigation: React.FC<Iprops> = (props) => {
  const { page, setPage, total } = props;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}
        count={Math.ceil(total / 10)}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Navigation;
