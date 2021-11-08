import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import Background from "../assets/Untitled SD.mp4";
import Background from "../assets/Cvi-0.jpg";

const OverWrap = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: block;
  flex-direction: column;
  /* background-color: rgb(227, 232, 222); */
  background-color: black;
  height: 100vh;
  position: relative;
  font-family: "Maven Pro", sans-serif;
  color: white;
  font-size: 2em;
  font-weight: regular;
`;

const OverCenter = styled.div`
  /*   width: 60vw;
  height: 50vh;
  border: solid 1px #3a7359;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  /* background-color: rgb(215, 235, 200, 0.1); */
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  //height: 99.9vh;
  min-height: 100%;
  justify-items: center;
  margin: 0;
  background-image: url(${Background});
  /*  background-position: right 15% bottom 45%; */
  ///https://lewislab.berkeley.edu/media-gallery/detail/1886/4906
  background-repeat: no-repeat;
  background-size: cover;

  margin-left: -1px;
  background-position: center center;
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: 0.9;

  /* transform: translate(-50%, -50%); */
`;

const Logovideo = styled.video`
  width: 100%;
  //height: 99.9vh;
  min-height: 100%;
  justify-items: center;
  margin: 0;
  /*  background-position: right 15% bottom 45%; */
  ///https://lewislab.berkeley.edu/media-gallery/detail/1886/4906
  position: fixed;
  margin-left: -1px;
  background-position: center center;
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: 0.9;
`;

const MainButton = styled(Link)`
  margin-top: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #ff0d1d;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  min-height: 3rem;
  text-decoration-line: none;
  width: 10em;
  text-align: center;
  ${LogoImage}:hover & {
    transform: scale(1.1);
    transform-origin: 50% 50%;
  }
  &:hover {
    background-color: #bd0d19;
  }
`;

const NewDiv = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Overview = () => {
  return (
    <>
      <OverWrap>
        <Logovideo autoPlay loop muted>
          <source src={Background} type="video/mp4" />
        </Logovideo>
        <LogoImage />
        <OverCenter>
          <NewDiv>Comparison of redox-related overlapped networks</NewDiv>
          <MainButton to="/lists">Start analysis</MainButton>
        </OverCenter>
      </OverWrap>
    </>
  );
};

export default Overview;
