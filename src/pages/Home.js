import React, { useState } from "react";
import { useValue } from "../context/context";
import ItemCard from "../components/Card/ItemCard";
import Filter from "../components/Filter/Filter";
const Home = ({ isAuthorized }) => {
  const { items, setQueryText } = useValue();
  const [searchText, setSearchText] = useState("");
  function handleSearch(e) {
    const text = e.target.value;
    setQueryText(text);
    setSearchText(text);
  }

  return (
    <div className="container">
      <div className="flex flex-1 items-center justify-center mt-2">
        <input
          onChange={handleSearch}
          value={searchText}
          className="rounded-md w-full p-1 sm:w-4/12 px-2 outline-none"
          type="text"
          placeholder="search..."
          autoFocus
        />
      </div>

      <div className="flex flex-col flex-1 sm:flex-row">
        {/* left */}
        <div className="w-full sm:w-3/12 -md mt-2 ">
          <div className="w-full flex  items-center justify-center rounded  bg-white">
            <Filter />
          </div>
        </div>

        {/* right */}

        <div className="w-full sm:w-9/12 flex flex-col sm:flex-row sm:flex-wrap gap-3 p-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} isAuthorized={isAuthorized} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
