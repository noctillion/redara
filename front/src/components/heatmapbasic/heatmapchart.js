import React, { useState, useEffect } from "react";
import HeatMap from "react-heatmap-grid";

const Heatmapchart = ({ datam }) => {
  console.log(datam.length, "dsa");

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  console.log(labels, "labe");
  console.log(data, "datarrrrrr");

  useEffect(() => {
    /*   const resuno = datam.map((obj) => {
      let cosa = Object.keys(obj);
      return cosa;
    }); */
    const resdos = datam.map((obj) => {
      let cosa = Object.values(obj);
      /*     return {
        pv: cosa.map((obj) => obj.pval),
        overl: cosa.map((obj) => obj.overlap),
      }; */
      return cosa.map((obj) => obj.overlap);
    });
    //setLabels(resuno[0]);
    setData(resdos);
  }, [datam]);

  useEffect(() => {
    const resuno = datam.map((obj) => {
      let cosa = Object.keys(obj);
      return cosa;
    });

    setLabels(resuno[0]);
    //setData(resdos);
  }, [datam]);

  /* const xLabels = new Array(24).fill(0).map((_, i) => `${i}`); */

  //const xLabels = labels;

  // Display only even labels
  /*   const xLabelsVisibility = new Array(24)
    .fill(0)
    .map((_, i) => (i % 2 === 0 ? true : false)); */

  /* const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; */
  //const yLabels = labels;
  /*   const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );
  console.log(data, "objegggct"); */

  return (
    <>
      {labels ? (
        <div style={{ fontSize: "13px" }}>
          <HeatMap
            xLabels={labels}
            yLabels={labels}
            xLabelsLocation={"top"}
            /* xLabelsVisibility={xLabelsVisibility} */
            xLabelWidth={60}
            data={data}
            squares="false"
            height={65}
            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
            cellStyle={(background, value, min, max, data, x, y) => ({
              background: `rgb(252, 27, 1, ${1 - (max - value) / (max - min)})`,
              fontSize: "11.5px",
              color: "#444",
              transform: "translateX(100px)",
            })}
            cellRender={(value) => value && <div>{value}</div>}
          />
        </div>
      ) : null}
    </>
  );
};

export default Heatmapchart;
