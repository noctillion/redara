import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as THREE from "three";
//import domtoimage from "dom-to-image";
import Canvas2Image from "../../utils/canvasSave";
import SpriteText from "three-spritetext";
import { ForceGraph3D } from "react-force-graph";
import { useWindowSize } from "@react-hook/window-size";

import { NameContext } from "../../App";
import ColorGroup from "../colorGroup/colorGroup";
import SearchBar from "../searchBar/searchBar";
import Fuse from "fuse.js";

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

export const FocusGraphDos = () => {
  const { forNewNet } = useContext(NameContext);
  /* console.log(forNetworkFiltered, "forNetworkFilteredforNetworkFiltered");
  const [graphData, setGraphData] = useState({});
  console.log(graphData, "graphDataLoqueentraAlaGrafica"); */
  // const [layout, setLayout] = useState([]);
  const [width, height] = useWindowSize();
  console.log(forNewNet, "forNewNet");
  const [forManipulation, setForManipulation] = useState({});
  const fgRef = useRef();
  const [colors, setColors] = useState([]);
  const [labels, setLabels] = useState(false);
  console.log(colors, "colors");
  const [nColor, setNColor] = useState("green");

  const [nodeAmount, setNodeAmount] = useState(0.3);
  const [textColor, setTextColor] = useState("rgb(1, 1, 20)");
  const [searchName, setSearchName] = useState("");
  console.log(searchName, "searchName");
  console.log(nodeAmount, "nodeAmount");
  const [busqueda, setBusqueda] = useState([""]);
  const [search, setSearch] = useState(4);
  const [busqueda2, setBusqueda2] = useState(["TF_ID"]);
  const [busqueda3, setBusqueda3] = useState([]);
  console.log(busqueda3, "busqueda3");

  const [autoresLista, setAutoresLista] = useState([]);
  const [toglMult, setToglMult] = useState(false);
  const [toglMult2, setToglMult2] = useState(false);

  const [query, setQuery] = useState([]);
  console.log(query, "matches");

  const onChangeHandler = (event) => {
    event.preventDefault();
    let value = event.target.value.toLowerCase();

    setSearchName(value);

    /* const { target } = event;
    const val = target.value.toLowerCase();
    console.log(val, "valHH"); */
    //setSearchName(val);
  };

  useEffect(() => {
    ///
    const options = {
      includeScore: true,
      // equivalent to `keys: [['author', 'tags', 'value']]`
      keys: ["nodes.label"],
    };

    const fuse = new Fuse([forManipulation], options);

    const matches = fuse.search(searchName);
    console.log(matches, "matchesIIII");
    setQuery(matches);
  }, [forManipulation, searchName]);

  useEffect(() => {
    setForManipulation(forNewNet);

    /*     if (Object.keys(forNewNet).length > 0) {
      let nodNet = forNewNet.nodes.map((node) => {
        return {
          color: node.color,
          group: node.groupQuery,
        };
      });
      console.log(nodNet, "nodeNet");

      const key = "group";

      const arrayUniqueByKey = [
        ...new Map(nodNet.map((item) => [item[key], item])).values(),
      ];

      setColors(arrayUniqueByKey);
      setLabels(true);
    } */
  }, [forNewNet]);

  /*   useEffect(() => {
    if (labels === true) {
      fgRef.current.refresh();
    }
  }, [labels, fgRef]); */
  useEffect(() => {
    console.log(forManipulation, "forManipulationAqui");
    if (forManipulation.nodes !== undefined) {
      let nodNet = forManipulation.nodes.map((node) => {
        return {
          color: node.color,
          group: node.groupQuery,
        };
      });
      console.log(nodNet, "nodeNet");

      const key = "group";

      const arrayUniqueByKey = [
        ...new Map(nodNet.map((item) => [item[key], item])).values(),
      ];
      console.log(arrayUniqueByKey, "arrayUniqueByKey");

      function count(string) {
        var count = {};
        string.forEach((s) => {
          count[s] ? count[s]++ : (count[s] = 1);
        });
        return count;
      }

      let countsByG = count(
        nodNet.map((item) => {
          return item.group;
        })
      );

      let nuevo = () => {
        let nuevo = [];
        for (let key in countsByG) {
          nuevo.push({
            group: key,
            count: countsByG[key],
            color: undefined,
          });
        }
        return nuevo;
      };

      let aver = nuevo();

      console.log(aver, "aver");

      console.log(countsByG, "countsByG");

      /* const map = new Map();
      arrayUniqueByKey.forEach((item) => map.set(item.group, item));
      countsByG.forEach((item) =>
        map.set(Object.keys(item), { ...map.get(Object.keys(item)), ...item })
      );
      const mergedArr = Array.from(map.values());

      console.log(mergedArr, "mergedArr"); */
      /* 
      const resultr = arrayUniqueByKey.map((item) => {
        const obj = countsByG.find((o) => Object.keys(o) === item.group);
        return { ...item, ...obj };
      });

      console.log(resultr, "resultr"); */

      function rainbow(numOfSteps, step) {
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        // eslint-disable-next-line default-case
        switch (i % 6) {
          case 0:
            r = 1;
            g = f;
            b = 0;
            break;
          case 1:
            r = q;
            g = 1;
            b = 0;
            break;
          case 2:
            r = 0;
            g = 1;
            b = f;
            break;
          case 3:
            r = 0;
            g = q;
            b = 1;
            break;
          case 4:
            r = f;
            g = 0;
            b = 1;
            break;
          case 5:
            r = 1;
            g = 0;
            b = q;
            break;
        }
        var c =
          "#" +
          ("00" + (~~(r * 255)).toString(16)).slice(-2) +
          ("00" + (~~(g * 255)).toString(16)).slice(-2) +
          ("00" + (~~(b * 255)).toString(16)).slice(-2);
        return c;
      }

      let newColors = aver.map((item, index) => {
        return {
          color: rainbow(aver.length, index),
          group: item.group,
          count: item.count,
        };
      });
      console.log(newColors, "newColors");

      setColors(newColors);

      let autoresTmp = Object.keys(forManipulation.nodes[0].orgData.author);
      let autores = autoresTmp.map((item, index) => {
        return {
          color: rainbow(autoresTmp.length, 11 + index),
          id: index,
          label: item,
        };
      });
      setAutoresLista(autores);
    }
  }, [forManipulation]);

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
    },
    [fgRef]
  );

  const handleClickRigth = useCallback(
    (node) => {
      // Aim at node from outside it

      console.log(node, "object cliqueado");
      console.log(fgRef.current, "fgRef.current");
      node.color = "red";
      fgRef.current.refresh();
    },
    [fgRef]
  );

  const handleNodeColor = useCallback(
    (node) => {
      for (let i = 0; i < colors.length; i++) {
        if (colors[i].group === node.groupQuery) {
          return colors[i].color;
        }
      }

      /*   if (node.groupQuery === colors[0].group) {
        return (node.color = colors[0].color);
      } else {
        return (node.color = "green");
      } */
    },
    [colors]
  );

  /*   const handleNodeColor = useCallback(
    (node) => {
      colors.map((color) => {
        if (color.group === node.groupQuery) {
          node.color = color.color;
        }
        return node.color;
      });
      fgRef.current.refresh();
    },
    [colors, fgRef]
  ); */

  /*   useEffect(() => {
    const fg = fgRef.current;

    fg.d3Force("link").distance((link) => link.value);
  }); */

  /*   const handleSearchD = useCallback((node) => {
    const options = {
      includeScore: true,
      // equivalent to `keys: [['author', 'tags', 'value']]`
      keys: ["nodes.label"],
    };

    const fuse = new Fuse(node, options);

    const matches = fuse.search("MYC");

    console.log(matches, "matches2");
  }, []); */

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

  const spriText = useCallback(
    (node) => {
      const sprite = new SpriteText(node.id);
      sprite.color = "rgba(187, 35, 100, 1)"; //{ textColor }; //node.color;
      sprite.textHeight = node.node_size1 / 500;
      fgRef.current.refresh();
      return sprite;
    },
    [fgRef]
  );

  /*   let getNodeEsp = useCallback(
    (node) => {
      for (let i = 0; i < busqueda.length; i++) {
        if (busqueda[i] === node.id) {
          return "black";
        }
      }
    },
    [busqueda]
  ); */

  const getNodeEsp = useCallback(
    (node) => {
      for (let i = 0; i < busqueda.length; i++) {
        if (busqueda[i] === node.id.toLowerCase()) {
          return "orange";
        }
      }
    },
    [busqueda]
  );

  const getNodesByList = useCallback(
    (node) => {
      for (let i = 0; i < busqueda2.length; i++) {
        if (node.orgData.author[busqueda2[i].label] === 1) {
          return busqueda2[i].color;
        }
      }
    },
    [busqueda2]
  );

  const sequencialFilter = useCallback(
    (node) => {
      for (let i = 0; i < busqueda3.length; i++) {
        if (node.orgData.author[busqueda3[i].label] === 1) {
          return busqueda3[i].color;
        }
      }
    },
    [busqueda3]
  );

  /*   const handleClickNode = () => {
    setSearch(!search);
  }; */

  const handleClickNode = () => {
    setSearch(1);
  };

  const handleClickNode2 = () => {
    setSearch(4);
    setToglMult(false);
  };

  const handleClickNode3List = (autor) => {
    setBusqueda2([autor]);
    console.log("object", autor);
  };

  const handleClickNode4List = (autor) => {
    //setMyArray(oldArray => [...oldArray, newElement]);
    setBusqueda3((busqueda3) => [...busqueda3, autor]);
    console.log("object", autor);
  };

  const handleClickNode3 = () => {
    setSearch(3);
    setToglMult(!toglMult);
  };

  // sequencial filter
  const handleClickNode4 = () => {
    setSearch(5);
    setBusqueda3([]);
    setToglMult2(!toglMult2);
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase().replace(/\s/g, "").split(",");
    setBusqueda(value);
  };

  /* 
  const getPrunedTree = useCallback(() => {
    if (forManipulation.nodes !== undefined) {
      const visibleNodes = [];
      const visibleLinks = [];
      const traverseTree = (node) => {
        visibleNodes.push(node);
        if (node.collapsed) return;
        visibleLinks.push(...node.childLinks);
        node.childLinks
          .map((link) =>
            typeof link.target === "object"
              ? link.target
              : nodesById[link.target]
          ) // get child node
          .forEach(traverseTree);
      };
      console.log(hiddenClusters);
      forManipulation.nodes
        .filter(
          (node) => node.isClusterNode && !hiddenClusters.includes(node.id)
        )
        .forEach((node) => traverseTree(node));

      return { nodes: visibleNodes, links: visibleLinks };
    }
  }, [nodesById, hiddenClusters]);

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback(
    (node) => {
      node.collapsed = !node.collapsed; // toggle collapse state
      setPrunedTree(getPrunedTree());
    },
    [getPrunedTree]
  );

  useEffect(() => {
    setPrunedTree(getPrunedTree());
  }, [hiddenClusters, getPrunedTree]);
 */

  let change = () => {
    if (search === 4) {
      return handleNodeColor;
    }
    if (search === 3) {
      return getNodesByList;
    }
    if (search === 1) {
      return getNodeEsp;
    }
    if (search === 5) {
      return sequencialFilter;
    }
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "90vh",
          position: "relative",
        }}
      >
        {Object.keys(forManipulation).length > 0 ? (
          <div>
            <ForceGraph3D
              ref={fgRef}
              width={width}
              height={height}
              graphData={forManipulation}
              nodeLabel="id"
              nodeAutoColorBy="group" //numero
              onNodeClick={handleClick}
              onNodeRightClick={handleClickRigth}
              rendererConfig={{ preserveDrawingBuffer: true, alpha: true }}
              nodeRelSize="8"
              nodeResolution="12"
              linkOpacity="0.5"
              linkResolution="10"
              nodeOpacity={nodeAmount}
              //nodeColor={(node) => (node.id === "HSP101" ? "orange" : "white")}
              //nodeColor={handleNodeColor}
              //nodeColor={search ? getNodeEsp : handleNodeColor}
              nodeColor={change()}
              nodeVal={(node) => node.node_size1 / 800}
              //nodeColor="#ff0000"
              //nodeColor={(node) => console.log(node.node_colorA)}
              nodeThreeObject={spriText}
              nodeThreeObjectExtend={true}
              /*    nodeColor={(node) => {
              return node.color; ///"rgba(17, 235, 100, 0.8)";
            }} */
              backgroundColor={textColor}
              onNodeDragEnd={(node) => {
                //console.log(node.fx);
                node.fx = node.x;
                node.fy = node.y;
                node.fz = node.z;
              }}
            />

            <button onClick={() => exportToPng(fgRef.current)}>Aqui</button>

            <button onClick={() => clearAlpha(fgRef.current)}>clear</button>

            <div
              style={{
                border: "1px solid white",
                position: "absolute",
                top: "0",
                left: "0",
                margin: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={nodeAmount}
                onChange={(e) => setNodeAmount(e.target.value)}
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <input
                type="text"
                value={searchName}
                onChange={onChangeHandler}
              />
              <SearchBar placeholder="Search" onChange={handleSearch} />
              <button onClick={handleClickNode}>Modo search</button>
              <br />
              <button onClick={handleClickNode2}>Default</button>
              <br />
              <button onClick={handleClickNode3}>Algoen3</button>
              {toglMult ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "fit-content",
                    }}
                  >
                    {autoresLista.map((autor) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            marginTop: "5px",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{ marginRight: "10px", width: "100%" }}
                            key={autor.id}
                            onClick={() => handleClickNode3List(autor)}
                          >
                            {autor.label}
                          </button>
                          <div
                            style={{
                              backgroundColor: autor.color,
                              width: "50px",
                              height: "15",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}

              <br />
              <button onClick={handleClickNode4}>ProgresiveFilt</button>
              {toglMult2 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "fit-content",
                    }}
                  >
                    {autoresLista.map((autor) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            marginTop: "5px",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{ marginRight: "10px", width: "100%" }}
                            key={autor.id}
                            onClick={() => handleClickNode4List(autor)}
                          >
                            {autor.label}
                          </button>
                          <div
                            style={{
                              backgroundColor: autor.color,
                              width: "50px",
                              height: "15",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>

            <div
              style={{
                width: "max-content",
                height: "fit-content",
                border: "1px solid white",
                position: "absolute",
                top: "0",
                right: "0",
                display: "flex",
                flexDirection: "column",
                paddingBottom: "5px",
                paddingRight: "10px",
                margin: "5px",
              }}
            >
              {colors.length > 0
                ? colors.map((elem) => {
                    return (
                      <ColorGroup
                        key={elem.group}
                        count={elem.count}
                        color={elem.color}
                        group={elem.group}
                      />
                    );
                  })
                : null}
              {/* <ColorGroup group={"grupo1"} color={"red"} />
              <ColorGroup group={"grupo2"} color={"blue"} /> */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
