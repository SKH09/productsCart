import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../client/api";
import useStore from "../store";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const { addProducttoCart } = useStore();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      console.log(response.data.product);
      setProduct(response.data.product);
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
      <button
        onClick={() => {
          addProducttoCart(product);
        }}
      >
        Add to Cart
      </button>
      <img src={product?.image} width={400} height={400} /> {productId}
    </div>
  );
};

export default Product;
