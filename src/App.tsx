import "./App.css";
import * as React from "react";
import firebase from "firebase";

function App() {

  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data: any = await db.collection("products").get();
      setProducts(data.docs.map((doc: any) => doc.data()))
    }
    fetchData();
    console.log("products: ", products)
  }, [])

  return (
    <div className="App">
      <h1>Trial</h1>
      <ul>
        {products.map((product: any) => ( 
          <li key={product.product_name}>{product.product_name} </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
