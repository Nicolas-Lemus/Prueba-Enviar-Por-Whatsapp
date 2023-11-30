import React from "react";
import CartButtons from "../CartButtons/CartButtons";
import "./CardDescription.css"


const CardDescription = ({product}) => {

  return (
    <div className="cardDescription Card">
      <div className="Images">
        <img src={product.images} alt={product.title}/>
      </div>
      <div className="text">
        <h3>{product.title}</h3>
        <h4>{product.description}</h4>
        <h5 className='Previous'>$ {product.previous_price}</h5>
        <h5>{product.stock}</h5>
        <h5>$ {product.price}</h5>
        <CartButtons productId={product.id}/>
      </div>
    </div>
  );
};

export default CardDescription;
