import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => {};
  }, []);

  console.log("product", JSON.stringify(product, null, 2));

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      product
      <p>{product?.name}</p>
      <p>{product?.description}</p>
      <img src={product?.image} width={400} height={400} /> {productId}
    </div>
  );
};

export default Product;
