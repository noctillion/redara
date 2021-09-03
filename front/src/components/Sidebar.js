import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Logo from "../assets/Group 2 (3).png";

const Nav = styled.div`
  /* background: #15171c; */
  /*   background: #15171c;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center; */
  z-index: 1;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 0.8))
  );
  background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;

const NavOne = styled.div`
  /* background: #15171c; */
  //background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavTwo = styled.div`
  /* background: #15171c; */
  //background: #15171c;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin-right: 50px;
  }
`;

const NavThree = styled.div`
  /* background: #15171c; */
  //background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 50px;
  @media (max-width: 768px) {
    display: none;
  }
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
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const LogoIm = styled.img`
  height: 80px;
  justify-items: center;
  margin-left: 20px;

  /* transform: translate(-50%, -50%); */
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavOne>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          </NavOne>
          <NavTwo>
            <LogoIm src={Logo} alt="logo" />
          </NavTwo>
          <NavThree>
            <NavIcon to="#">
              <FaIcons.FaInfoCircle />
            </NavIcon>
          </NavThree>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
