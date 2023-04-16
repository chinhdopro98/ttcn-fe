import React, { useState } from "react";
import MainContainer from "../mainview/MainViewAdmin";
import styled from "styled-components";
import NavBarAdmin from "../navbar/NavBarAdmin";
import SideBarAdmin from "../sidebar/admin/SideBarAdmin";

import Box from "@mui/material/Box";

const MainContent = styled.div``;
const index2 = () => {
  return (
    <div>
      <MainContent className="dashboard-container">
        <SideBarAdmin />
        <Box className="dashboard-body">
          <MainContainer />
        </Box>
      </MainContent>
    </div>
  );
};

export default index2;
