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

  const processRaw = (response) => {
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
  };

  const fetchD = async () => {
    try {
      const data = await fetch("http://127.0.0.1:5000/file");
      const response = await data.json();
      var result = processRaw(response);

      setInitial(result);
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