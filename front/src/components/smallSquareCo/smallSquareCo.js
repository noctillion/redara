import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NameContext } from "../../App";

const SmallSquareC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vh;
  color: #696666;
  background-color: ${(props) => props.color};
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: ${(props) => props.border};

  &:hover {
    &:after {
      content: " p-val: ${(props) => props.before}";
      display: flex;
      justify-content: center;
      align-items: center;
      /* height: 20vw; */
      background-color: black;
      color: white;
      position: absolute;
      inset: 0;

      /*  top: 0px;
      right: 0px; */
      /*    top: 0,
      left: 50%, */
      transform: translate(-50%, -50%);
      /*  width: 100px;
      height: 100px; */
      width: fit-content;
      height: fit-content;
      /*    transform: translate(20px, 10px);
      animation-duration: 1s;
      animation-delay: 0.5s; */
      z-index: 400;
      border: 1px solid green;
    }
  }
`;

const SmallSquareCo = ({ col, elem }) => {
  const [selected, setSelected] = useState(false);

  const { interselect, setDataToProviderInterselect } = useContext(NameContext);

  let handleClick = (e) => {
    e.preventDefault();

    if (selected === false) {
      setDataToProviderInterselect((prevItems) => [...prevItems, elem]);
    } else if (selected === true) {
      let rty = interselect.filter((obj) => {
        return elem.id !== obj.id;
      });
      setDataToProviderInterselect(rty);
    }

    setSelected(!selected);
  };

  return (
    <>
      <SmallSquareC
        color={col}
        before={elem.pval}
        onClick={handleClick}
        key={elem.id}
        border={selected ? "4px solid black" : "1px solid green"}
      >
        {elem.overlap}
      </SmallSquareC>
    </>
  );
};

export default SmallSquareCo;
