import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  const [cartProducts, setCartProducts] = useState(storedCartProducts || []);

  const updateLocalStorage = (cartItems) => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  };

  const addToCart = (product) => {
    const updatedCart = [...cartProducts, product];
    setCartProducts(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(updatedCart);
    updateLocalStorage(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
