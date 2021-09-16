import React from "react";
import styled from "styled-components";

const OuterCont = styled.div`
  display: flex;
  width: 60%;
  font-size: 1rem;
  font-family: "Lato", sans-serif;
  @media (max-width: 768px) {
    display: none;
    //flex-basis: 70%;
  }
`;

const ContainerHeat = styled.div`
  width: 60vw;
  height: fit-content;
`;

const BigCont = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  /* grid-template-columns: 2fr, 8fr;
  grid-template-rows: 1fr; */
  /* background-color: yellowgreen; */
`;

const HeatMain = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numc}, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  background-color: rgb(215, 235, 200);
`;

const HeatRowN = styled.div`
  display: grid;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: -5px;
`;

const HeatHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numc}, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  margin-bottom: 5px;
`;

const SmallSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vh;

  background-color: ${(props) => props.color};
`;

const SmallSquareC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vh;
  color: #696666;
  background-color: ${(props) => props.color};
  position: relative;

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

const MainHeat = ({ datam, names }) => {
  console.log(datam, "dataaaWWWWW");

  let data = datam.map((vals) => {
    return vals.map((rt) => {
      return { pval: rt.forD.pval, overlap: rt.forD.overlap, id: rt.forD.id };
    });
  });
  console.log(data, "kkkRRRRR");

  let tg = data.map((arr) => arr.length);

  let dataIn = { columns: Math.max(...tg), rows: tg.length };

  let max = (data) =>
    Math.max.apply(
      Math,
      data.map(function (o) {
        return o.overlap;
      })
    );

  let min = (data) =>
    Math.min.apply(
      Math,
      data.map(function (o) {
        return o.overlap;
      })
    );

  let inr = data.map((arr) => {
    return { max: max(arr), min: min(arr) };
  });

  let vmax = Math.max.apply(
    Math,
    inr.map(function (o) {
      return o.max;
    })
  );

  let vmin = Math.min.apply(
    Math,
    inr.map(function (o) {
      return o.min;
    })
  );

  let maxmin = { max: vmax, min: vmin };

  /* console.log(dataIn, "jk"); */

  /*   let rows = ["unojjjjj", "uno", "uno", "uno", "dos"];
  let columns = ["uno", "uno", "uno", "dos", "tres"]; */

  return (
    <>
      {names.length > 0 ? (
        <OuterCont>
          <BigCont>
            <HeatRowN>
              {names.map((row) => {
                return (
                  <SmallSquare
                    style={{
                      display: "inline-flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {row}
                  </SmallSquare>
                );
              })}
              <SmallSquare />
            </HeatRowN>
            <ContainerHeat>
              <HeatMain numc={dataIn.columns}>
                {data.map((elem) => {
                  return elem.map((elem) => {
                    let col = `rgb(252, 27, 1, ${
                      1 -
                      (maxmin.max - elem.overlap) / (maxmin.max - maxmin.min)
                    })`;
                    return (
                      <SmallSquareC
                        color={col}
                        before={elem.pval}
                        onClick={() => console.log(elem.overlap)}
                        key={elem.id}
                      >
                        {elem.overlap}
                      </SmallSquareC>
                    );
                  });
                })}
              </HeatMain>
              <HeatHeader
                numc={dataIn.columns}
                /*     style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} */
              >
                {names.map((column) => {
                  return (
                    <SmallSquare
                      style={{
                        writingMode: "vertical-lr",
                        display: "inline-flex",
                        transform: "scale(-1)",
                        justifyContent: "flex-end",
                        paddingBottom: "1vh",
                      }}
                    >
                      {column}
                    </SmallSquare>
                  );
                })}
              </HeatHeader>
            </ContainerHeat>
          </BigCont>
        </OuterCont>
      ) : null}
    </>
  );
};

export default MainHeat;
