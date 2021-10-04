import "./App.css";
import Sidebar from "./components/Sidebar";
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/Reports";
import Team from "./pages/Team";

export const NameContext = createContext();

function App() {
  const [initial, setInitial] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [consolidated, setConsolidated] = useState([]);
  const [mds, setMds] = useState([]);
  const [fisher, setFisher] = useState([]);
  const [interselect, setInterselect] = useState([]);
  const [filteredR, setFilteredR] = useState(null);
  const [finlist, setFinlist] = useState([]);
  const [forNetworkFiltered, setForNetworkFiltered] = useState([]);

  console.log(interselect, "iiiiiiinnnterrrrrr");
  console.log(consolidated, "consolidated");
  //console.log(filteredR, "RRRRinterselectRRRRR");
  let setDataToProviderClicked = (forState) => {
    setClicked(forState);
  };
  let setDataToProviderConsolidated = (forState) => {
    setConsolidated(forState);
  };
  let setDataToProviderMds = (forState) => {
    setMds(forState);
  };
  let setDataToProviderFisher = (forState) => {
    setFisher(forState);
  };
  let setDataToProviderInterselect = (forState) => {
    setInterselect(forState);
  };
  let setDataToProviderFilteredR = (forState) => {
    setFilteredR(forState);
  };

  let setDataToProviderFinlist = (forState) => {
    setFinlist(forState);
  };

  let setDataToProviderForNetworkFiltered = (forState) => {
    setForNetworkFiltered(forState);
  };

  /*   const processRaw = (response) => {
    var result = Object.keys(response).map(function (key) {
      return { gene: key, author: response[key] };
    });

    var tuu = result.map((object) => {
      const { Total, ...newAuthor } = object.author;
      return {
        agi: object.gene,
        total: object.author.Total,
        autor: newAuthor,
      };
    });

    return tuu;
  }; */

  /*   const fetchD = async () => {
    try {
      const data = await fetch("http://127.0.0.1:5000/file");
      const response = await data.json();
      var result = processRaw(response);

      setInitial(result);
    } catch (error) {
      console.log(error);
    }
  }; */

  const fetchD = async () => {
    try {
      const data = await fetch("http://127.0.0.1:5000/lists");
      const response = await data.json();
      /* var result = processRaw(response); */

      setInitial(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchD();
  }, []);

  return (
    <NameContext.Provider
      value={{
        initial,
        clicked,
        consolidated,
        mds,
        fisher,
        interselect,
        filteredR,
        finlist,
        forNetworkFiltered,
        setDataToProviderClicked: setDataToProviderClicked,
        setDataToProviderConsolidated: setDataToProviderConsolidated,
        setDataToProviderMds: setDataToProviderMds,
        setDataToProviderFisher: setDataToProviderFisher,
        setDataToProviderInterselect: setDataToProviderInterselect,
        setDataToProviderFilteredR: setDataToProviderFilteredR,
        setDataToProviderFinlist: setDataToProviderFinlist,
        setDataToProviderForNetworkFiltered:
          setDataToProviderForNetworkFiltered,
      }}
    >
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/overview" exact component={Overview} />
          <Route path="/lists" exact component={Reports} />
          <Route path="/lists/lists1" exact component={ReportsOne} />
          <Route path="/lists/lists2" exact component={ReportsTwo} />
          <Route path="/lists/lists3" exact component={ReportsThree} />
          <Route path="/team" exact component={Team} />
        </Switch>
      </Router>
    </NameContext.Provider>
  );
}

export default App;
