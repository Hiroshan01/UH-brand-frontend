import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

function Product() {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios.get(import.meta.env.VITE_API_URL + "product").then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center ">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
}

export default Product;
