import { useState } from "react";
import { Navbar } from "./components/navbar";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import GetMoviePosters from "./components/getPosters";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <GetMoviePosters />
      </Router>
    </div>
  );
}

export default App;
