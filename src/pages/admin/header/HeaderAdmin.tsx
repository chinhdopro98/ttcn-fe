import React from "react";
import "./headeradmin.css";
import Button from "@mui/material/Button";
interface Iprops {
  name: string;
}

const HeaderAdmin: React.FC<Iprops> = (props) => {
  const { name } = props;
  return (
    <div className="dashbord-header-container">
      <h2>{name}</h2>
      <div className="dashbord-header-right">
        <img
          className="dashbord-header-avatar"
          src={require("../../../assets/image/home/avatar.png")}
        />
      </div>
    </div>
  );
};

export default HeaderAdmin;
