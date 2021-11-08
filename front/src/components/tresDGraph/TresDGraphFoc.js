import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as THREE from "three";
//import domtoimage from "dom-to-image";
import Canvas2Image from "../../utils/canvasSave";
import SpriteText from "three-spritetext";
import { ForceGraph3D } from "react-force-graph";
import { useWindowSize } from "@react-hook/window-size";
import { NameContext } from "../../App";

/* 
const myData = {
  nodes: [
    {
      id: "id1",
      name: "name1",
      color: "green",
      val: 1,
    },
    {
      id: "id2",
      name: "name2",
      color: "blue",
      val: 10,
    },
  ],
  links: [
    {
      source: "id1",
      target: "id2",
    },
  ],
}; */

export const FocusGraph = () => {
  const { forNetworkFiltered } = useContext(NameContext);
  console.log(forNetworkFiltered, "forNetworkFilteredforNetworkFiltered");
  const [graphData, setGraphData] = useState({});
  console.log(graphData, "graphDataLoqueentraAlaGrafica");
  // const [layout, setLayout] = useState([]);
  const [width, height] = useWindowSize();
  useEffect(() => {
    /*     forNetworkFiltered.links = forNetworkFiltered.edges; // on object create new key name. Assign old value to this
    delete forNetworkFiltered.edges; */

    if (forNetworkFiltered.nodes !== undefined) {
      let nodes = forNetworkFiltered.nodes.map((elem) => {
        return {
          id: elem.data.id,
          name: elem.data.label,
          type: elem.data.type,
          color: "green",
        };
      });

      let links = forNetworkFiltered.edges.map((elem) => {
        return elem.data;
      });

      var data4Graph = {
        nodes: [],
        links: [],
      };

      data4Graph.nodes.push(...nodes);
      data4Graph.links.push(...links);
      setGraphData(data4Graph);
      console.log(data4Graph, "data4GraphAqui");
    }

    //setLayout(layout);
  }, [forNetworkFiltered]);

  console.log(graphData, "forNetworkFilteredThree");

  const fgRef = useRef();

  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
      console.log("object cliqueado");
    },
    [fgRef]
  );

  function exportToPng(dom) {
    console.log(dom, "dom");
    //dom.scene().background = new THREE.Color(0xff0000);

    var canvasf = dom.renderer();
    canvasf.getClearColor();

    console.log(canvasf, "canvasf");
    var newA = canvasf.domElement;
    console.log(newA, "newA");
    Canvas2Image.saveAsPNG(newA, newA.width, newA.height);
    //Canvas2Image.saveAsJPEG(canvasObj, width, height)
    //Canvas2Image.saveAsGIF(canvasObj, width, height)
    //Canvas2Image.saveAsBMP(canvasObj, width, height)

    /*     var newC = canvasf.domElement.toDataURL("image/png");
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = newC;
    img.alt = "from canvas";
    document.body.appendChild(img); */
  }

  function clearAlpha(dom) {
    var canvasf = dom.renderer();

    canvasf.setClearAlpha(0);
  }

  return (
    <>
      {Object.keys(graphData).length > 0 ? (
        <>
          <ForceGraph3D
            ref={fgRef}
            width={width}
            graphData={graphData}
            nodeLabel="id"
            nodeAutoColorBy="group"
            onNodeClick={handleClick}
            rendererConfig={{ preserveDrawingBuffer: true, alpha: true }}
            nodeRelSize="8"
            nodeResolution="12"
            linkOpacity="0.5"
            linkResolution="10"
            nodeThreeObject={(node) => {
              const sprite = new SpriteText(node.id);
              sprite.color = node.color;
              sprite.textHeight = 8;
              return sprite;
            }}

            //backgroundColor="grey"
          />

          <button onClick={() => exportToPng(fgRef.current)}>Aqui</button>

          <button onClick={() => clearAlpha(fgRef.current)}>clear</button>
        </>
      ) : null}
    </>
  );
};
