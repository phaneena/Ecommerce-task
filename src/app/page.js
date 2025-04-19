"use client";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/features/productSlice";
import { addToCart } from "./redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from "react-icons/fi";

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { items: products, loading, error } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart successfully!");
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar />

      {/* Dark Mode Toggle Button */}
      {/* <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
        aria-label="Toggle Dark Mode"
      >
        {theme === 'dark' ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
      </button> */}

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading &&
          !error &&
          products.map((product) => (
            <div
              key={product.id}
              className="relative group border-2 border-transparent hover:border-blue-500 rounded-xl shadow-md hover:shadow-[0_4px_20px_rgba(0,0,255,0.2)] bg-gradient-to-br from-white to-slate-100 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 object-contain mx-auto mb-3 transform group-hover:scale-105 transition duration-300"
              />
              <div className="px-4 pb-4">
                <h1 className="text-lg font-semibold text-center text-gray-900 mb-1">
                  {product.title}
                </h1>
                <p className="text-center text-gray-700 font-medium">₹ {product.price}</p>

                {/* Wishlist Icon - always visible */}
                <button className="absolute top-3 right-3 text-pink-500 text-2xl hover:scale-125 transition-transform duration-300">
                  ❤️
                </button>

                {/* Add to Cart Button - always visible */}
                <button
                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg shadow-sm transform hover:scale-105 transition duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
            <IoMdClose
              className="absolute top-4 right-4 cursor-pointer text-3xl text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            />
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-40 sm:h-60 object-cover rounded-lg mb-4"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-4">{selectedProduct.title}</h1>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ₹ {selectedProduct.price}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong>{" "}
              {selectedProduct.description || "No description available."}
            </p>

            <div className="flex items-center space-x-2 mt-4">
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  closeModal();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
