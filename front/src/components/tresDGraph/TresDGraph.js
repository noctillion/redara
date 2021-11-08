import React from "react";
import { FocusGraphDos } from "./FourDGraphFoc";
/* import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph"; */
import { FocusGraph } from "./TresDGraphFoc";
/*  */
const TresDGraph = () => {
  /*   function genRandomTree(N = 300) {
    return {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };
  } */
  return (
    <>
      {/* <ForceGraph3D graphData={myData} /> */}
      {/* <ForceGraph3D graphData={genRandomTree()} /> */}
      {/* <FocusGraph /> */}

      <FocusGraphDos />
    </>
  );
};

export default TresDGraph;
