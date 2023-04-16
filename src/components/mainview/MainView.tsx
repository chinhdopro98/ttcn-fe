import React from "react";
import styled from "styled-components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Booking from "../../pages/Booking";
import ListBookings from "../../pages/ListBookings";
import Contact from "../../pages/Contact";
import About from "../../pages/about/About";
import New from "../../pages/New";
import NotFound from "../../pages/notfound/NotFound";
import CarOwner from "../../pages/carowner/CarOwner";
import ListCar from "../../pages/listcar/ListCar";
const MainContent = styled.div``;
const Content = styled.div``;
const MainView: React.FC = () => {
  return (
    <MainContent>
      <Content>
        <Routes>
          <Route exact path="*" element={<NotFound />} />
          <Route path="" element={<Home />} />
          <Route path="booking/:carid" element={<Booking />} />
          <Route path="listbookings" element={<ListBookings />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="new" element={<New />} />
          <Route path="listcar" element={<ListCar />} />
          <Route path="register" element={<CarOwner />} />
        </Routes>
      </Content>
    </MainContent>
  );
};

export default MainView;
