import React from "react";
import "./headeradmin.css";
import Button from "@mui/material/Button";
import { getImageUrl } from "../../../utils/assets";
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
          src={getImageUrl("home/avatar.png")}
        />
      </div>
    </div>
  );
};

export default HeaderAdmin;
