import axios from "axios";
import { useEffect, useState } from "react";

function AdminProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "product").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="w-full h-full bg-amber-600 max-h-full overflow-y-scroll">
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category & Size</th>
            <th>Label Price</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {products.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.category + " " + item.size}</td>
                  <td>{item.labelledPrice}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    {
                      <img
                        src={item.images}
                        className="w-[50px] h-[50px] bg-cover"
                      />
                    }
                  </td>
                  <td>Action</td>
                </tr>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductPage;
