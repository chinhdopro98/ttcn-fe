import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Button from "@mui/material/Button";
// import { DashboardIcon } from "../../../assets/icon/dashboard.svg";
// import ShippingIcon from "../assets/icons/shipping.svg";
// import ProductIcon from "../assets/icons/product.svg";
// import UserIcon from "../assets/icons/user.svg";
const SideBarAdmin = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openMenu = () => {
    setOpen(true);
  };
  const openClose = () => {
    setOpen(false);
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="menu-admin">
      {!open ? (
        <Button className="icon-openmenu" onClick={() => openMenu()}>
          <i className="fa-solid fa-bars"></i>
        </Button>
      ) : (
        <Button className="icon-openmenu" onClick={() => openClose()}>
          <i className="fa-solid fa-xmark"></i>
        </Button>
      )}
      {open ? (
        <nav className="sidebar">
          <div className="sidebar-container">
            <div className="sidebar-logo-container">
              <img
                src={require("../../../assets/image/car/auto-car.jpg")}
                alt="logo"
              />
            </div>

            <div className="sidebar-container">
              <div className="sidebar-items">
                <ul>
                  <li className="item-link">
                    <Link to="/admin" className="sidebar-item">
                      <i className="fa-solid fa-house"></i>
                      <span className="sidebar-item-label">Dashboard</span>
                    </Link>
                  </li>
                  <li className="item-link">
                    <Link to="/admin/car" className="sidebar-item">
                      {" "}
                      <i className="fa-solid fa-car"></i>
                      <span className="sidebar-item-label">Car</span>
                    </Link>
                  </li>
                  <li className="item-link">
                    <Link to="/admin/automaker" className="sidebar-item">
                      {" "}
                      <i className="fa-solid fa-layer-group"></i>
                      <span className="sidebar-item-label">Automaker</span>
                    </Link>
                  </li>
                  <li className="item-link">
                    <Link to="/admin/user" className="sidebar-item">
                      {" "}
                      <i className="fa-solid fa-user"></i>
                      <span className="sidebar-item-label">User</span>
                    </Link>
                  </li>
                  <li className="item-link">
                    <Link to="/admin/listbooking" className="sidebar-item">
                      {" "}
                      <i className="fa-solid fa-user"></i>
                      <span className="sidebar-item-label">Bookings</span>
                    </Link>
                  </li>
                  <li className="item-link">
                    <Link to="/admin/blog" className="sidebar-item">
                      {" "}
                      <i className="fa-solid fa-blog"></i>
                      <span className="sidebar-item-label"> Categpry Blog</span>
                    </Link>
                  </li>
                  <li className="item-link">
                    <Link to="/admin/new" className="sidebar-item">
                      {" "}
                      <i className="fa-solid fa-blog"></i>
                      <span className="sidebar-item-label">New</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-footer">
                <Button onClick={logout}>
                  <span className="sidebar-item-label">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  );
};

export default SideBarAdmin;
