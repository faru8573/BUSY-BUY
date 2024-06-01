import React from "react";

const PurchaseTable = ({ cartItems }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <h1 className="text-center font-extrabold text-4xl mb-4">Your Orders</h1>
      <h2 className="text-center font-bold mb-2">
        Ordered On: {new Date().toLocaleDateString()}
      </h2>

      <table className="border-collapse border border-gray-400 w-3/4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-400">TITLE</th>
            <th className="p-2 border border-gray-400">PRICE</th>
            <th className="p-2 border border-gray-400">QUANTITY</th>
            <th className="p-2 border border-gray-400">TOTAL PRICE</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border border-gray-400">{item.title}</td>
              <td className="p-2 border border-gray-400">₹ {item.price}</td>
              <td className="p-2 border border-gray-400">{item.quantity}</td>
              <td className="p-2 border border-gray-400">
                ₹ {item.price * item.quantity}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="p-2 border border-gray-400 font-bold">
              Total
            </td>
            <td className="p-2 border border-gray-400 font-bold">
              ₹{" "}
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
