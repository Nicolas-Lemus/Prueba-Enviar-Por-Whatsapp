import React, { useEffect, useState } from "react";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { useParams } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import DotSpinner from "../animations/DotSpinner ";
import Headers from "../components/Headers/Headers";
import Error from "../error/Error";

const Category = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {categoryId} = useParams();

  useEffect(() => {
    const db = getFirestore();
    const tecnologiaCollection = collection(db, "tecnologia");
    getDocs(tecnologiaCollection)
      .then((snapshot) => {
        const tecnologiaFilter = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductsData(
          tecnologiaFilter.filter((products) => products.category === categoryId)
        );
      })
      .catch(() => setError(true))
      .then(() => setLoading(false));
  }, [categoryId]);

  return loading ? (
      <DotSpinner/> 
    ) : error ? (
      <Error/>
    ) : (
    <div>
      <Headers HeadersH1 ={categoryId}/>
      <ItemListContainer productsData={productsData} />;
    </div>
  )
};

export default Category;
