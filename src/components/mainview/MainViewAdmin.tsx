import React from "react";
import styled from "styled-components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Booking from "../../pages/Booking";
import ListBookings from "../../pages/ListBookings";
import AdminHome from "../../pages/AdminHome";
import AdminDashUser from "../../pages/admin/AdminDashUser";
import AdminAutomaker from "../../pages/admin/AdminDashAutomaker";
import AdminBlog from "../../pages/admin/blog/AdminBlog";
import NewAdmin from "../../pages/admin/new/NewAdmin";
import AdminCar from "../../pages/admin/car/AdminCar";
import BookingAdmin from "../../pages/admin/booking/BookingAdmin";
const MainContent = styled.div``;
const Content = styled.div``;
const MainViewAdmin: React.FC = () => {
  return (
    <MainContent>
      <Content>
        <Routes>
          <Route path="" element={<AdminHome />} />
          <Route path="car" element={<AdminCar />} />
          <Route path="user" element={<AdminDashUser />} />
          <Route path="automaker" element={<AdminAutomaker />} />
          <Route path="listbooking" element={<BookingAdmin />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="new" element={<NewAdmin />} />
        </Routes>
      </Content>
    </MainContent>
  );
};

export default MainViewAdmin;
