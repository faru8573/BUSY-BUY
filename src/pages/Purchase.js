import React from "react";
import { useValue } from "../context/context";
import PurchaseTable from "../components/PurchaseTable/PurchaseTable";

const Purchase = () => {
  const { cartItems } = useValue();
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <PurchaseTable cartItems={cartItems} />
    </div>
  );
};

export default Purchase;
