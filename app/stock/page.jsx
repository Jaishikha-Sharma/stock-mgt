"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const rjson = await response.json();
      setProducts(rjson.products);
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setProductForm({});

        const updated = await fetch("/api/products");
        const updatedJson = await updated.json();
        setProducts(updatedJson.products.reverse());
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to add product.");
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropDownEdit = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (!loading) {
      setLoading(true);
      try {
        const response = await fetch("/api/search?query=" + inputValue);
        const rjson = await response.json();
        setDropdown(rjson.products);
      } catch (error) {
        console.error("Search fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const ButtonAction = async (action, slug, initialQuantity) => {
    let index = products.findIndex((item) => item.slug == slug);
    let newProducts = JSON.parse(JSON.stringify(products));
    if (action == "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);

    let indexdrop = dropdown.findIndex((item) => item.slug == slug);
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if (action == "plus") {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropdown(newDropdown);

    setLoadingAction(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    let r = await response.json();
    console.log(r);
    setLoadingAction(false);
  };

  return (
    <>
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Search a Product</h1>
          <div className="relative">
            <input
              type="text"
              onChange={onDropDownEdit}
              placeholder="Search by product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {dropdown.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-2 max-h-72 overflow-y-auto">
                {dropdown.map((item) => (
                  <div
                    key={item.slug}
                    className="flex justify-between items-center px-4 py-2 hover:bg-indigo-50 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-700">{item.slug}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} in stock · ₹{item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => ButtonAction("plus", item.slug, item.quantity)}
                        disabled={loadingAction}
                        className="px-2 py-1 text-white bg-indigo-500 hover:bg-indigo-600 rounded disabled:bg-gray-300"
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => ButtonAction("minus", item.slug, item.quantity)}
                        disabled={loadingAction}
                        className="px-2 py-1 text-white bg-indigo-500 hover:bg-indigo-600 rounded disabled:bg-gray-300"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-right px-4 py-2 border-t">
                  <button
                    onClick={() => setDropdown([])}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Add a Product</h1>

          <form
            onSubmit={addProduct}
            className="bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                value={productForm?.slug || ""}
                name="slug"
                onChange={handleChange}
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                value={productForm?.quantity || ""}
                name="quantity"
                onChange={handleChange}
                type="number"
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                value={productForm?.price || ""}
                name="price"
                onChange={handleChange}
                type="number"
                placeholder="Enter price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow-sm transition"
              >
                Add Product
              </button>
            </div>
          </form>

          <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Current Stock</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-md border">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-3 border">Product Name</th>
                  <th className="px-6 py-3 border">Quantity</th>
                  <th className="px-6 py-3 border">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={item.id || `${item.slug}-${index}`}
                    className="hover:bg-gray-50 text-gray-800"
                  >
                    <td className="px-6 py-3 border">{item.slug}</td>
                    <td className="px-6 py-3 border">{item.quantity}</td>
                    <td className="px-6 py-3 border">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
