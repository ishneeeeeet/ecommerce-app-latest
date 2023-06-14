import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCart from "../components/ProductCart";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [search, products]);

  return (
    <>
      <div className="w-full items-center px-20 mx-60 md:w-1/3">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {search === ""
          ? products.map((item) => <ProductCart key={item.id} item={item} />)
          : filteredProducts.map((item) => (
              <ProductCart key={item.id} item={item} />
            ))}
      </div>
    </>
  );
};

export default Home;
