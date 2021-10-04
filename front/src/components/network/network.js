import React, { useContext } from "react";
import { Graph } from "react-d3-graph";
import { NameContext } from "../../App";

const Network = () => {
  const {
    //initial,

    forNetworkFiltered,
  } = useContext(NameContext);

  console.log(forNetworkFiltered, "forNetworkFilteredforNetworkFiltered");
  // graph payload (with minimalist structure)
  /*   const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  }; */

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };
  return (
    <>
      {Object.keys(forNetworkFiltered).length > 0 ? (
        <Graph
          id="graph-id" // id is mandatory
          data={forNetworkFiltered}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      ) : null}
    </>
  );
};

export default Network;
