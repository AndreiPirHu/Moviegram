import { useState } from 'react'
import { Navbar } from './components/navbar'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Shop } from './pages/shop/shop'
import { Cart } from './pages/cart/cart'
import Hero from './components/Joel/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Hero />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App
