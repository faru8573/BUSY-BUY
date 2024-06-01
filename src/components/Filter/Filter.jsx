import React, { useState } from "react";
import { useValue } from "../../context/context";

const Filter = () => {
  const [price, setPrice] = useState(50);
  const {
    filteringItems,
    setFilterPrice,
    setFilterCategory,
    filteringCategory,
  } = useValue();
  const [selectedCategories, setSelectedCategories] = useState([]);

  function handleChange(e) {
    const newPrice = e.target.value;
    setPrice(newPrice);
    filteringItems(price);
    setFilterPrice(Number(newPrice));
  }

  function handleCategoryChange(e) {
    const { value, checked } = e.target;
    console.log("value", value);
    console.log("checked", checked);
    let newCategories;
    if (checked) {
      newCategories = [...selectedCategories, value];
    } else {
      newCategories = selectedCategories.filter(
        (category) => category !== value
      );
    }

    console.log(newCategories);

    setSelectedCategories(newCategories);
    setFilterCategory(newCategories);
    filteringCategory(newCategories);
  }

  return (
    <div className="w-9/12 text-center flex flex-col items-center justify-center p-2">
      <div className="text-2xl text-center text-blue-950">Filter</div>
      <div className="text-cyan-950">Price: {price}</div>
      <input
        className="w-full"
        type="range"
        min={0}
        max={2000}
        value={price}
        onChange={handleChange}
      />

      <div className="text-2xl text-blue-950">Category</div>
      <div className="w-full flex justify-between">
        <input
          type="checkbox"
          className=""
          style={{ height: "30px", width: "20px" }}
          id="beauty"
          value={"beauty"}
          onChange={handleCategoryChange}
        />
        <label htmlFor="beauty">Beauty</label>
      </div>
      <div className="w-full flex justify-between my-1">
        <input
          type="checkbox"
          className=""
          style={{ height: "30px", width: "20px" }}
          id="groceries"
          value={"groceries"}
          onChange={handleCategoryChange}
        />
        <label htmlFor="womens">Groceries</label>
      </div>
      <div className="w-full flex justify-between mb-1">
        <input
          type="checkbox"
          className=""
          style={{ height: "30px", width: "20px" }}
          id="furniture"
          value={"furniture"}
          onChange={handleCategoryChange}
        />
        <label htmlFor="furniture">Furniture</label>
      </div>
      <div className="w-full flex justify-between">
        <input
          type="checkbox"
          className=""
          style={{ height: "30px", width: "20px" }}
          id="fragrances"
          value={"fragrances"}
          onChange={handleCategoryChange}
        />
        <label htmlFor="fragrances">Fragrances</label>
      </div>
    </div>
  );
};

export default Filter;
