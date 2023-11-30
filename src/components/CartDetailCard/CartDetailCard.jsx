
import React, { useState, useContext } from "react";
import "./CartDetailCard.css";
import { CartContext } from "../../context/CartContext";

const CartDetailCard = ({ product, quantity, removeFromCart }) => {
  const { count, setCount } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(quantity ? quantity.quantity : 0);

  const updateQuantity = (newQuantity) => {
    setCantidad(newQuantity);
    
    const updatedTecnologia = count.tecnologia.map(item => {
      if (item.productId === product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCount(prevState => ({
      ...prevState,
      quantityItems: prevState.quantityItems + (newQuantity - quantity.quantity),
      tecnologia: updatedTecnologia,
    }));
  };

  const handleClickSuma = () => {
    updateQuantity(cantidad + 1);
  };

  const handleClickRes = () => {
    if (cantidad > 1) {
      updateQuantity(cantidad - 1);
    } else {
      removeFromCart(product.id);
    }
  };


  return (
    <div className="Card cart">
      <h3>{product.title}</h3>
      <div className="Images cart">
        <img src={product.images} alt={product.title} />
      </div>
      <h5>c/u $ {product.price}</h5>
      <h6 className="qty">Cantidad : {cantidad}</h6>
      <h6 id="total">Total: $ {product.price * cantidad}</h6>
      <section className="buttons">
        <button 
        className="rounded-0"
        onClick={handleClickRes}> - </button>
      <button 
        className="rounded-0"
        onClick={handleClickSuma}> + </button>
      </section>
    </div>
  );
};

export default CartDetailCard;
