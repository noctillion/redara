import React from "react";

const Button = ({ title, value, checked, toggle }) => {
  return (
    <>
      <div className="button">
        <label className={checked ? "green" : "black"}>
          <input
            type="checkbox"
            value={value}
            checked={checked}
            onChange={() => toggle(value)}
          />
          {title}
        </label>
      </div>
    </>
  );
};

export default Button;
