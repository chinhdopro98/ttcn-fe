import React from "react";
import MainContainer from "../mainview/MainViewAdmin";
import styled from "styled-components";
import NavBarAdmin from "../navbar/NavBarAdmin";
const MainContent = styled.div``;
const index2 = () => {
  return (
    <div>
      <NavBarAdmin />
      <MainContent>
        <MainContainer />
      </MainContent>
    </div>
  );
};

export default index2;
