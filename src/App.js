import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Product from "./components/Product";
import "./styles.css";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const URL = "https://dummyjson.com/products?limit=100";
  async function fetchData() {
    setLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    setData(data.products);
    setPageNo(0);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handlePrev() {
    if (pageNo) {
      setPageNo(pageNo - 1);
    }
  }

  function handleNext() {
    if (pageNo !== Math.ceil(data.length / 10) - 1) {
      setPageNo(pageNo + 1);
    }
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="product-container">
        {data.slice(10 * pageNo + 1, 10 * (pageNo + 1) + 1).map((product) => {
          console.log(data);
          return (
            <Product
              key={product.id}
              description={product.description}
              image={product.thumbnail}
            />
          );
        })}
      </div>

      <div className="page-navigator">
        <button onClick={() => handlePrev()}>◀️</button>
        {[...new Array(Math.ceil(data.length / 10))].map((num, i) => (
          <button onClick={() => setPageNo(i)}>{i + 1}</button>
        ))}
        <button onClick={() => handleNext()}>▶️</button>
      </div>
    </div>
  );
}

export default App;
