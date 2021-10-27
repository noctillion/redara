import React, { useState, useContext, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { NameContext } from "../../App";
import fcose from "cytoscape-fcose";
//import COSEBilkent from "cytoscape-cose-bilkent";
import Cytoscape from "cytoscape";
//Cytoscape.use(COSEBilkent);
Cytoscape.use(fcose);
export default function NApp() {
  const {
    //initial,

    forNetworkFiltered,
  } = useContext(NameContext);

  console.log(forNetworkFiltered, "forNetworkFilteredforNetworkFiltered");
  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("100vh");

  /*  const [graphData, setGraphData] = useState({
    nodes: [
      { data: { id: "1", label: "IP 1", type: "ip" } },
      { data: { id: "2", label: "Device 1", type: "device" } },
      { data: { id: "3", label: "IP 2", type: "ip" } },
      { data: { id: "4", label: "Device 2", type: "device" } },
      { data: { id: "5", label: "Device 3", type: "device" } },
      { data: { id: "6", label: "IP 3", type: "ip" } },
      { data: { id: "7", label: "Device 5", type: "device" } },
      { data: { id: "8", label: "Device 6", type: "device" } },
      { data: { id: "9", label: "Device 7", type: "device" } },
      { data: { id: "10", label: "Device 8", type: "device" } },
      { data: { id: "11", label: "Device 9", type: "device" } },
      { data: { id: "12", label: "IP 3", type: "ip" } },
      { data: { id: "13", label: "Device 10", type: "device" } },
    ],
    edges: [
      {
        data: { source: "1", target: "2", label: "Node2" },
      },
      {
        data: { source: "3", target: "4", label: "Node4" },
      },
      {
        data: { source: "3", target: "5", label: "Node5" },
      },
      {
        data: { source: "6", target: "5", label: " 6 -> 5" },
      },
      {
        data: { source: "6", target: "7", label: " 6 -> 7" },
      },
      {
        data: { source: "6", target: "8", label: " 6 -> 8" },
      },
      {
        data: { source: "6", target: "9", label: " 6 -> 9" },
      },
      {
        data: { source: "3", target: "13", label: " 3 -> 13" },
      },
    ],
  }); */

  const [graphData, setGraphData] = useState({});
  // const [layout, setLayout] = useState([]);

  useEffect(() => {
    setGraphData(forNetworkFiltered);

    //setLayout(layout);
  }, [forNetworkFiltered]);

  const layout = {
    name: "cose-bilkent",
    directed: false,
    avoidOverlap: true,
    spacingFactor: 2.5,
  };

  const layoutD = {
    animate: false,
    animationDuration: undefined,
    animationEasing: undefined,
    boundingBox: undefined,
    componentSpacing: 40,
    coolingFactor: 0.99,
    fit: true,
    gravity: 1,
    initialTemp: 1000,
    minTemp: 1.0,
    name: "fcose",
    nestingFactor: 1.2,
    nodeDimensionsIncludeLabels: false,
    nodeOverlap: 4,
    numIter: 1000,
    padding: 30,

    /*  nodeRepulsion: (node) => 4500,
    // Ideal edge (non nested) length
    idealEdgeLength: (edge) => 50,
    // Divisor to compute edge forces
    edgeElasticity: (edge) => 0.45, */

    position(node) {
      return { row: node.data("row"), col: node.data("col") };
    },
    randomize: true,
    refresh: 20,
  };

  /*   const layout = {
    name: "breadthfirst",
    fit: true,
    // circle: true,
    directed: false,
    padding: 50,
    // spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  }; */

  const styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#4a56a6",
        width: 30,
        height: 30,
        label: "data(label)",

        // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "text-valign": "center",
        // "text-halign": "center",
        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "white",
        fontSize: 20,
      },
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        width: 50,
        height: 50,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 8,
      },
    },
    {
      selector: "node[type='device']",
      style: {
        shape: "rectangle",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        // "line-color": "#6774cb",
        "line-color": "#AAD8FF",
        //"target-arrow-color": "#6774cb",
        /* "target-arrow-shape": "triangle",
        "curve-style": "bezier", */
      },
    },
  ];

  let myCyRef;

  return (
    <>
      {Object.keys(forNetworkFiltered).length > 0 ? (
        <div>
          <h1>Cytoscape exampleAqui</h1>
          <div
            style={{
              border: "1px solid",
              backgroundColor: "#f5f6fe",
            }}
          >
            <CytoscapeComponent
              elements={CytoscapeComponent.normalizeElements(graphData)}
              // pan={{ x: 200, y: 200 }}
              style={{ width: width, height: height }}
              zoomingEnabled={true}
              maxZoom={3}
              minZoom={0.1}
              autounselectify={false}
              boxSelectionEnabled={true}
              layout={layoutD}
              stylesheet={styleSheet}
              cy={(cy) => {
                myCyRef = cy;

                console.log("EVT", cy);

                cy.on("add", "tap", "node", (evt) => {
                  var node = evt.target;

                  console.log("EVT", evt);
                  console.log("TARGET", node.data());
                  console.log("TARGET TYPE", typeof node[0]);
                });
              }}
              abc={console.log("myCyRef", myCyRef)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
