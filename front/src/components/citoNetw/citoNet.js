import React, { Component, createRef } from "react";
import CytoscapeComponent from "./cytoscape";
import data from "./graph.json";

class GraphCyt extends Component {
  constructor() {
    super();
    this.ref = createRef();
    this.layout = { name: "cose-bilkent" };
    this.state = {};
  }

  render() {
    return (
      <CytoscapeComponent
        elements={data.elements}
        stylesheet={data.style}
        layout={this.layout}
        style={{ width: "100%", height: "600px" }}
        cy={(cy) => (this.ref = cy)}
      />
    );
  }
}
export default GraphCyt;
