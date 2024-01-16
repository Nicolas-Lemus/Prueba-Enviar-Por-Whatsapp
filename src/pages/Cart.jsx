
import React, { useContext } from "react";
import { collection, getDoc, doc, getFirestore } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import CartDetailCard from "../components/CartDetailCard/CartDetailCard";
import Headers from "../components/Headers/Headers";
import DotSpinner from "../animations/DotSpinner ";
import Error from "../error/Error";
import TitleCart from "../components/TitleCart/TitleCart";

const fetchProductsByIds = async (ids) => {
  const db = getFirestore();
  const tecnologiaRefs = ids.map((id) => doc(collection(db, "tecnologia"), id));
  const tecnologiaSnapshots = await Promise.all(tecnologiaRefs.map((tecnologiaRef) => getDoc(tecnologiaRef)));

  const Tecnologia = tecnologiaSnapshots.map((tecnologiaSnapshot) => {
    if (tecnologiaSnapshot.exists()) {
      const productData = tecnologiaSnapshot.data();
      return { id: tecnologiaSnapshot.id, title: productData.title, ...productData };
    } else {
      return null;
    }
  });

  return Tecnologia.filter((product) => product !== null);
};

const Cart = () => {
  const [error, setError] = React.useState(false);
  const [productsData, setProductsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { count, removeFromCart, setCount } = useContext(CartContext);

  const captureOrder = () => {
    const orderDetails = count.tecnologia.map((item) => ({
      Producto: item.productId,
      Cantidad: item.quantity,
    }));
    sendWhatsAppMessage(orderDetails);
  };

  const sendWhatsAppMessage = (orderDetails) => {
    const phoneNumber = "+59893320363";
    const message = `Hola Castiglia, estoy interesado en los siguientes productos:${JSON.stringify(orderDetails)}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };


  const reset = () => {
    setLoading(true);
      setTimeout(() => {
        setProductsData([]);
        setCount({ tecnologia: [] });
        setLoading(false);
      }, 1200);
  };
  

  React.useEffect(() => {
    const ids = count.tecnologia.map((product) => product.productId);
    fetchProductsByIds(ids)
      .then((res) => {
        setProductsData(res);
      })
      .catch(() => setError(true))
      .then(() => setLoading(false));
  }, [count]);

  return loading ? (
    <DotSpinner />
  ) : error ? (
    <Error />
  ) : (
    <div>
      <Headers HeadersH1="Carrito🛒" />
      <div className="shoppingCart">
        {count.tecnologia.length === 0 ? (
          <TitleCart />
        ) : (
          productsData.map((product) => (
            <CartDetailCard
              key={product.id}
              product={product}
              quantity={count.tecnologia.find((item) => item.productId === product.id)}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </div>
      <div className="buttonPedirContainer">
        {count.tecnologia.length > 0 && (
          <>
            <button className="buttonPedir" onClick={captureOrder}>
              Consultar por WhatsApp
            </button>
            <button className="buttonPedir" onClick={reset}>
              Borrar todo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
