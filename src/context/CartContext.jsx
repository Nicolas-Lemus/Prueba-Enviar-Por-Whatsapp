
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState({ quantityItems: 0, tecnologia: [] });

  const removeFromCart = (productId) => {
    
    const updatedTecnologia = count.tecnologia.filter(item => item.productId !== productId);
    const updatedCount = {
      ...count,
      quantityItems: count.quantityItems - 1,
      tecnologia: updatedTecnologia,
    };
    setCount(updatedCount);
  };

  return (
    <CartContext.Provider value={{ count, setCount, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
