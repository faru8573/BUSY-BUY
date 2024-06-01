import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import db from "../firebase/firebase.config";

const ItemContext = createContext();

function useValue() {
  return useContext(ItemContext);
}

function ContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [queryText, setQueryText] = useState("");
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");

  //////////============ get all items ================/////////
  async function getItems() {
    try {
      const querySnapshot = await getDocs(collection(db, "items1"));

      const itemsData = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setItems(itemsData);
    } catch (error) {
      console.log("error while getting items", error);
    }
  }

  useEffect(() => {
    getItems();
    const storedCartItems = JSON.parse(localStorage.getItem("items"));
    if (Array.isArray(storedCartItems)) {
      setCartItems(storedCartItems);
    }
  }, []);

  /////////////=============== calculate total price ===============////

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item?.quantity,
      0
    );
    setTotal(Math.round((totalPrice * 100) / 100).toFixed(2));
  }, [cartItems]);

  //////////////=============== search items ===================///////

  function searchItems(text) {
    const searchResult = items.filter((item) =>
      item.title.trim().toLowerCase().includes(text.trim().toLowerCase())
    );
    setItems(searchResult);
  }

  useEffect(() => {
    if (queryText === "") {
      getItems();
    } else {
      searchItems(queryText);
    }
  }, [queryText]);

  /////////////================== Filter items ==================/////
  function filteringItems(price) {
    const filterItems = items.filter((item) => item.price >= price);
    setItems(filterItems);
  }

  useEffect(() => {
    if (filterPrice == 0) {
      getItems();
    } else {
      filteringItems(filterPrice);
    }
  }, [filterPrice]);

  ///////////=============== Filter Categories ===================//////

  function filteringCategory(categories) {
    const catFiltered = items.filter((item) =>
      categories.includes(item.category)
    );
    setItems(catFiltered);
  }

  useEffect(() => {
    if (filterCategory.length === 0 || filterCategory.length > 2) {
      getItems();
    } else {
      filteringCategory(filterCategory);
    }
  }, [filterCategory]);

  ///////////============== add to cart ================///////
  function addToCart(item) {
    let existingItems;
    try {
      existingItems = JSON.parse(localStorage.getItem("items"));
      if (!Array.isArray(existingItems)) {
        existingItems = [];
      }
    } catch (error) {
      console.log("Error parsing items from local storage:", error);
      existingItems = [];
    }

    const existingCartItemIndex = existingItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingCartItemIndex !== -1) {
      cartItems[existingCartItemIndex].quantity += 1;
    } else {
      item.quantity = 1;
      existingItems.push(item);
    }
    setCartItems([...existingItems]);

    localStorage.setItem("items", JSON.stringify(existingItems));

    console.log("cartItems", cartItems);
  }

  ///////////=============== remove from cart =================//////

  function removeFromCart(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    const existingItems = JSON.parse(localStorage.getItem("items"));
    if (Array.isArray(existingItems)) {
      const filteredLocalStorageItems = existingItems.filter(
        (item) => item.id === id
      );
      localStorage.setItem("items", JSON.stringify(filteredLocalStorageItems));
    }
  }

  /////////////================= increase item Qty ==================/////
  function increaseItemQty(id) {
    console.log(id);
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  ////////////================== decrease item Qty ====================//////

  function decreaseItemQty(id) {
    console.log(id);
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  }

  //////////////------------context provider ------------------///////
  return (
    <ItemContext.Provider
      value={{
        items,
        useValue,
        addToCart,
        cartItems,
        removeFromCart,
        searchItems,
        setQueryText,
        total,
        increaseItemQty,
        decreaseItemQty,
        filteringItems,
        setFilterPrice,
        setFilterCategory,
        filteringCategory,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export { useValue, ContextProvider };
