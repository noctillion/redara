import React from "react";
import styled from "styled-components";

const CheckButt = styled.div`
  display: flex;
  flex-direction: row;
  //border: 1px solid green;
  width: 5vw;
  align-items: center;
`;

const Button = ({ title, value, checked, toggle }) => {
  return (
    <>
      <CheckButt className="button">
        {/* <label className={checked ? "green" : "black"}> */}
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={() => toggle(value)}
          style={{
            /* transform: "scale(1.5)" */ zoom: "1.5",
            transform: "translate(-25%)",
            cursor: "pointer",
          }}
        />
        {title}
        {/* </label> */}
      </CheckButt>
    </>
  );
};

export default Button;
