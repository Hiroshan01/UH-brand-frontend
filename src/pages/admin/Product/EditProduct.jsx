import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../../../../utils/mediaUpload";

function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [productName, setProductName] = useState(location.state.productName);
  const [category, setCategory] = useState(location.state.category);
  const [size, setSize] = useState(location.state.size);
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(
    location.state.labelledPrice
  );
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const [loading, setLoading] = useState(false);

  async function updateProduct(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please Login first");
      setLoading(false);
      return;
    }

    if (
      !productName ||
      !productId ||
      !labelledPrice ||
      !price ||
      !stock ||
      !description
    ) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    let imageUrls = location.state.images;

    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(promisesArray);
      }

      const product = {
        productId: productId,
        productName: productName,
        category: category,
        size: size,
        images: imageUrls,
        description: description,
        labelledPrice: labelledPrice,
        price: price,
        stock: stock,
      };

      await axios.put(
        import.meta.env.VITE_API_URL + "product/" + productId,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Add New Product
        </h1>

        <form
          onSubmit={updateProduct}
          className="space-y-6 bg-slate-50 p-8 rounded-2xl shadow-lg"
        >
          {/* Product ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product ID
            </label>
            <input
              disabled
              type="text"
              placeholder="Enter Product ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          {/* Size */}
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          >
            <option value="" disabled>
              Select size
            </option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter Product Description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>
          {/* Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) => setImages(Array.from(e.target.files))}
              required
            />
            {images.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {images.length} image(s) selected
              </p>
            )}
          </div>
          {/* Pricing Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Labelled Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={labelledPrice}
                onChange={(e) => setLabelledPrice(parseFloat(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Selling Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
                min="0"
                required
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Link
              to="/admin/products"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              onClick={updateProduct}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
