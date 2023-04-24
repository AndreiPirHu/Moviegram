import { useState } from 'react'
import { Navbar } from './components/navbar'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Shop } from './pages/shop/shop'
import { Cart } from './pages/cart/cart'
import {Login} from './pages/login/login'
import {Profile} from './pages/profile/profile'
function App() {


  

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App
