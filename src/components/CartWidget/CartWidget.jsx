import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartWidget.css"

const CartWidget = () => {

  const [quantity,setQuantity] = useState(0);
  const {count} = useContext(CartContext);

  useEffect(() => {
    
    setQuantity(count.tecnologia.reduce((total, product) => total + product.quantity, 0));
  }, [count]);
  return (
    <div>
      <Link to="/cart">
        <FontAwesomeIcon className="icon" icon={faCartShopping}/>
        <span className="cartQuantity">{quantity}</span>
      </Link>
    </div>
  );
};

export default CartWidget;
