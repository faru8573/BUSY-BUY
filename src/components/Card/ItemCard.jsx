import React from "react";

import { useValue } from "../../context/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, isAuthorized }) => {
  const { addToCart } = useValue();
  const navigate = useNavigate();

  function handleClick(selectedItem) {
    if (isAuthorized) {
      toast.success("successfully added to cart");
      addToCart(selectedItem);
    } else {
      navigate("/signin");
    }
  }
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full sm:w-3/12 flex flex-col items-center">
      <img
        src={item?.images[0]}
        alt={item?.title.slice(0, 12)}
        style={{ width: "18em", margin: "auto" }}
      />
      <h2 className="text-3xl mt-1  ">{item?.title}</h2>
      <h3 className="text-2xl font-bold">₹ {item?.price}</h3>
      <button
        onClick={() => handleClick(item)}
        className="w-full bg-blue-500 rounded-md p-1 text-cyan-50 font-bold hover:bg-red-500"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCard;
