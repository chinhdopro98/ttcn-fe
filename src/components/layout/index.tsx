import React from "react";
import NavBar from "../navbar/NavBar";
import styled from "styled-components";
import MainContainer from "../mainview/MainView";
import Box from "@mui/material/Box/Box";
import SideBar from "../sidebar/SideBar";
import Footer from "../../pages/common/footer/Footer";

const MainContent = styled.div``;
const index = () => {
  return (
    <div>
      <NavBar />
      <Box>
        {/* <SideBar /> */}
        <MainContent>
          <MainContainer />
        </MainContent>
      </Box>
      <Footer />
    </div>
  );
};

export default index;
