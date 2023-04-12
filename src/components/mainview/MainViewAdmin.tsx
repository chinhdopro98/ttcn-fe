import React from "react";
import styled from "styled-components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Booking from "../../pages/Booking";
import ListBookings from "../../pages/ListBookings";
import AdminDashCar from "../../pages/admin/AdminDashCar";
import AdminHome from "../../pages/AdminHome";
import AdminDashUser from "../../pages/admin/AdminDashUser";
import AdminAutomaker from "../../pages/admin/AdminDashAutomaker";
import AdminDashListBooking from "../../pages/admin/AdminDashListBooking";
const MainContent = styled.div``;
const Content = styled.div``;
const MainViewAdmin: React.FC = () => {
  return (
    <MainContent>
      <Content>
        <Routes>
          <Route path="" element={<AdminHome />} />
          <Route path="car" element={<AdminDashCar />} />
          <Route path="user" element={<AdminDashUser />} />
          <Route path="automaker" element={<AdminAutomaker />} />
          <Route path="listbooking" element={<AdminDashListBooking />} />
        </Routes>
      </Content>
    </MainContent>
  );
};

export default MainViewAdmin;
