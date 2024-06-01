import React from "react";
import { useValue } from "../context/context";
import CartItemCard from "../components/CartItemCard/CartItemCard";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, total } = useValue();
  console.log("cartItems", cartItems);
  return (
    <div className="container">
      {cartItems?.length ? (
        <div className=" flex flex-col flex-1 sm:flex-row mt-2">
          {/* left */}
          <div className="flex w-3/12 mt-2 ">
            <div className="text-center bg-white rounded-md h-6/12 items-center p-2">
              <h1 className="text-4xl">Total Price: ₹{total}/-</h1>
              <Link
                to="/myorders"
                className="bg-purple-500 p-2 rounded-md text-white "
              >
                <button>Purchase</button>
              </Link>
            </div>
          </div>

          {/* right */}
          <div className="w-9/12 flex flex-wrap">
            {cartItems.map((item, idx) => (
              <CartItemCard key={idx} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-4xl font-extrabold">Cart is empty</h1>
      )}
    </div>
  );
};

export default Cart;
