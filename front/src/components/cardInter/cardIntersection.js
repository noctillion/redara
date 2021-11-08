import React from "react";
import styled from "styled-components";

const CardIntersect = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
  font-size: 1rem;
  border-radius: 5px;
  background-color: rgb(229, 206, 156, 0.5);
  padding: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const CardIntersection = ({ list1, list2, intersect, funct }) => {
  return (
    <>
      <CardIntersect>
        <div>List 1: {list1}</div>
        <div>List 2: {list2}</div>
        <div>Intersect: {intersect}</div>
      </CardIntersect>
    </>
  );
};

export default CardIntersection;
