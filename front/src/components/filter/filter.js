import React, { useState, useEffect, useContext } from "react";
import { NameContext } from "../../App";

const FilterComp = ({ items }) => {
  const { setDataToProviderFilteredR } = useContext(NameContext);
  const [filters, setFilters] = useState([]);
  console.log(filters, "objectFiltersssss");

  const [mergedL, setMergedL] = useState([]);
  console.log(mergedL, "PPPooo");

  //console.log(filters, "object");
  const Item = ({ size }) => (
    <div>
      <h4>
        {size} <div>kkkkk</div>
      </h4>
    </div>
  );

  const Filter = ({ value, active, onChange }) => (
    <label className="filter">
      <input
        type="checkbox"
        checked={active}
        data-value={value}
        onChange={onChange}
      />
      {value}
    </label>
  );

  useEffect(() => {
    const filterValues = [
      ...new Set(["all", ...items.map((n) => n.overlist.toString())]),
    ];
    setFilters(
      filterValues.map((n, i) => ({ active: false, value: n, id: i + 1 }))
    );
  }, [items]);

  const onFilterChange = ({
    target: {
      checked: active,
      dataset: { value },
    },
  }) => {
    const newFilters = filters.map((n) =>
        [n.value, "all"].includes(value) ? { ...n, active } : n
      ),
      isAll = newFilters
        .filter((n) => n.value !== "all")
        .every((n) => n.active);
    newFilters.find((n) => n.value === "all").active = isAll;
    setFilters(newFilters);
  };

  const filteredBrands = filters.filter((n) => n.active).map((n) => n.value);
  const filteredItems = items.filter((n) =>
    filteredBrands.includes(n.overlist.toString())
  );
  console.log(filteredItems);

  useEffect(() => {
    let dataDosD = [];
    if (filteredItems.length > 0) {
      const sumGen = filteredItems
        .map((n) => n.size)
        .reduce((a, b) => a + b, 0);
      const genesListFil = filteredItems.map((n) => {
        return n.genes.map((nj) => nj.genes);
      });
      console.log(sumGen, "ooo");

      let asySSS = async () => {
        try {
          var merged = await [].concat.apply([], genesListFil);
          return merged;
        } catch (error) {
          console.log(error);
        }
      };

      async function run() {
        const data = await asySSS();

        dataDosD.push(data);
      }

      run();
    }
  }, [filteredItems]);

  // will print your data

  return (
    <div>
      {filters.map((n) => (
        <Filter key={n.id} {...n} onChange={onFilterChange} />
      ))}
      {filteredItems.map((n) => (
        <Item key={n.id} {...n} />
      ))}
    </div>
  );
};

export default FilterComp;
