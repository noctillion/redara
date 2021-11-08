import React, { useState, useEffect, useContext } from "react";
import { NameContext } from "../../App";
import Button from "./button";

const FilterDos = ({ items }) => {
  const { setDataToProviderFilteredR } = useContext(NameContext);
  ///console.log(items, "tttttttttttttttt");
  let [selectedObjects, setSelectedObjects] = useState([]);
  const [proph, setProph] = useState([]);
  const [nitems, setNitems] = useState([]);
  //console.log(nitems, "nitems");
  //console.log(selectedObjects, "selectedObjectsiiiitemssss");
  //filteredArray = filteredArray];
  /*   if (filteredArray.length > 0) {
    //const sumGen = filteredArray.map((n) => n.size).reduce((a, b) => a + b, 0);
    const genesListFil = filteredArray.map((n) => {
      return n.genes.map((nj) => nj.genes);
    });

    var merged = [].concat.apply([], genesListFil);
    console.log(merged, "merged");
  } */

  useEffect(() => {
    const filterValues = [
      ...new Set(["all", ...items.map((n) => n.overlist.toString())]),
    ];
    setNitems(filterValues.map((n, i) => ({ value: n })));
  }, [items]);

  useEffect(() => {
    let filteredArray = [];
    if (selectedObjects.indexOf("all") !== -1) {
      filteredArray = items.map((itm) => {
        return itm;
      });
      //console.log(filteredArray, "filteredArrayfilteredArray");
    } else {
      filteredArray = items.filter(function (itm) {
        return selectedObjects.indexOf(itm.overlist.toString()) > -1;
      });
      ///console.log(filteredArray, "DoosfilteredArrayfilteredArray");
    }

    let bals = [];
    if (filteredArray.length > 0) {
      //const sumGen = filteredArray.map((n) => n.size).reduce((a, b) => a + b, 0);
      const genesListFil = filteredArray.map((n) => {
        return n.genes.map((nj) => nj.genes);
      });

      var merged = [].concat.apply([], genesListFil);
      bals.push(merged);
    }
    setProph(bals);
  }, [selectedObjects, items]);

  ///console.log(proph, "jhjhjhjhjhjhjh");

  useEffect(() => {
    setDataToProviderFilteredR(proph);
  }, [proph, setDataToProviderFilteredR]);

  function toggle(value) {
    if (selectedObjects.includes("all") && selectedObjects.length > 1) {
      return setSelectedObjects((selectedObjects) =>
        selectedObjects.filter((elem) => elem === value)
      );
    }

    let index = selectedObjects.indexOf(value);
    if (index > -1) {
      setSelectedObjects((items) => items.filter((elem) => elem !== value));
    } else {
      setSelectedObjects((items) => [...items, value]);
    }
  }

  let isChecked = (value) => {
    if (selectedObjects.indexOf(value) > -1) {
      //console.log(selectedObjects.length, "ooooooooooooooooooooooo");
      return selectedObjects.indexOf(value) > -1;
    }
    if (selectedObjects.indexOf("all") !== -1) {
      //setSelectedObjects((items) => [...items, value]);
      return true;
    }
    if (selectedObjects.indexOf("all") === -1) {
      ///console.log("menos1");
      return false;
    }
  };

  /* let isChecked = (value) => {
    return selectedObjects.indexOf(value) > -1;
  }; */

  return (
    <div style={{ display: "flex", fontSize: "2rem" }}>
      {nitems.map((object) => {
        /////items
        return (
          <Button
            {...object}
            title={object.value} ////overlist.toString()
            value={object.value}
            checked={isChecked(object.value)}
            toggle={toggle}
          />
        );
      })}
    </div>
  );
};

export default FilterDos;
