import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const AdminHome = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="h4"
        mb={1}
        sx={{
          fontSize: "42px",
          textAlign: "left",
          color: "#BE2586",
          position: "absolute",
          fontWeight: "bold",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%);",
        }}
      >
        WELLCOME TO ADMIN
      </Typography>
      <img
        src={require(`../assets/image/car/bg-car.jpg`)}
        alt=""
        className="carimg w-full h-full"
      />
    </Box>
  );
};

export default AdminHome;
