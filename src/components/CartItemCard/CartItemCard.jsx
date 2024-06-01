import React from "react";
import { useValue } from "../../context/context";
import toast from "react-hot-toast";

const CartItemCard = ({ item }) => {
  const { removeFromCart, increaseItemQty, decreaseItemQty } = useValue();

  function handleRemoveCartItem(id) {
    toast.success("successfully removed!");
    removeFromCart(id);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full sm:w-3/12 bg-white rounded-md m-2 p-4 shadow-md">
      <img
        src={item?.images[0]}
        alt="item image"
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <h1 className="text-lg font-semibold mb-2">{item?.title.slice(0, 20)}</h1>
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-xl font-bold text-green-600">₹ {item?.price}</h2>
        <div className="w-6/12 flex justify-between items-center">
          <button
            onClick={() => increaseItemQty(item.id)}
            className="rounded-full bg-green-500 text-white text-2xl w-8 h-8 flex items-center justify-center hover:bg-cyan-400"
          >
            +
          </button>
          <span className="mx-2 text-lg">{item?.quantity}</span>
          <button
            onClick={() => decreaseItemQty(item.id)}
            className="rounded-full bg-green-500 text-white text-2xl w-8 h-8 flex items-center justify-center hover:bg-cyan-400"
          >
            -
          </button>
        </div>
      </div>
      <button
        onClick={() => handleRemoveCartItem(item.id)}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Remove From Cart
      </button>
    </div>
  );
};

export default CartItemCard;
