import React from "react";

const ColorGroup = ({ group, color, count }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "5px",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        &nbsp; {count} &nbsp; &nbsp; {group} &nbsp;
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "50px",
            height: "15",
            backgroundColor: color,
          }}
        ></div>
      </div>
    </>
  );
};

export default ColorGroup;
