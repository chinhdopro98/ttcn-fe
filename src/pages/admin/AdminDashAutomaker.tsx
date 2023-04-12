import React from "react";
import Box from "@mui/material/Box";
import AdminAutomaker from "./automaker/AdminAutomaker";
import CreateAutomaker from "./automaker/CreateAutomaker";
import Typography from "@mui/material/Typography";
const AdminDashAutomaker = () => {
  return (
    <>
      <Typography
        variant="h2"
        mb={1}
        p={2}
        sx={{ fontSize: "25px", textAlign: "center" }}
      >
        Manager AutoMaker
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AdminAutomaker />
        <CreateAutomaker />
      </Box>
    </>
  );
};

export default AdminDashAutomaker;
