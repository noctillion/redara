import React, { useState, useEffect } from "react";

const FilterComp = ({ items }) => {
  const [filters, setFilters] = useState([]);
  console.log(filters, "filters");
  console.log(items, "itemskjkjkjkj");
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
    console.log(isAll, "isaslll");
    newFilters.find((n) => n.value === "all").active = isAll;
    console.log(newFilters, "clicked_mlnkbjghft");
    setFilters(newFilters);
  };

  const filteredBrands = filters.filter((n) => n.active).map((n) => n.value),
    filteredItems = items.filter((n) =>
      filteredBrands.includes(n.overlist.toString())
    );
  console.log(filteredItems, "filteredItems");

  if (filteredItems.length > 0) {
    const sumGen = filteredItems.map((n) => n.size).reduce((a, b) => a + b, 0);
    console.log(sumGen, "ooo");
  }

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
