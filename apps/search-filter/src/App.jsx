import { useEffect, useState } from "react";
import "./App.css";
//import Toast from "./components/Toast/Toast";
import SearchFilter from "./components/React-saerch-filter/search-filter";
let timer = null;
function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  const [searchvalue, setSearchValue] = useState("");
  useEffect(() => {
    document.title = "React Toast Component";
    const productsData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        //   console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };
    productsData();
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    console.log(timer);
    if(timer) {
       clearTimeout(timer);
        timer = null;
    }
      timer = setTimeout(() => {
        console.log(searchvalue,'searchvalue 123')
        filterProductList(e.target.value);
      
      },500);
  }

  function filterProductList(searchvalue) {
    setfilteredProducts(() => {
      console.log(searchvalue,'searchvalue')
      return products.filter((item) => {
        return item.title.includes(searchvalue);
      });
    
    });
    console.log(filteredProducts,'filteredProducts');
    console.log(products,'products');
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Search and Filter Component {searchvalue}</h2>
      <input type="text" onChange={handleChange} />
      <SearchFilter products={searchvalue ? filteredProducts : products}/>
    </div>
  );
}
export default App;
