import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SideBarData";

const Nav = styled.div`
  height: 65px;
  width: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 20px;
  position: fixed;
  z-index: 999;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #27ae60;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 70px;
  transition: 350ms;
  z-index: 999;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          {sidebar ? (
            <NavIcon to="#">
              <AiIcons.AiOutlineClose
                className="icon-menu-on"
                onClick={showSidebar}
              />
            </NavIcon>
          ) : (
            <NavIcon to="#">
              <FaIcons.FaBars className="icon-menu-off" onClick={showSidebar} />
            </NavIcon>
          )}
        </Nav>
        <SidebarNav className={`${sidebar ? "sidebar-on" : "sidebar-off"}`}>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
