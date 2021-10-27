import React from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import { FocusGraph } from "./TresDGraphFoc";

const myData = {
  nodes: [
    {
      id: "id1",
      name: "name1",
      color: "green",
      /* val: 1, */
    },
    {
      id: "id2",
      name: "name2",
      color: "blue",
      /* val: 10, */
    },
  ],
  links: [
    {
      source: "id1",
      target: "id2",
    },
  ],
};
const TresDGraph = () => {
  function genRandomTree(N = 300) {
    return {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };
  }
  return (
    <>
      <ForceGraph3D graphData={myData} />
      <ForceGraph3D graphData={genRandomTree()} />
      <FocusGraph />
    </>
  );
};

export default TresDGraph;
