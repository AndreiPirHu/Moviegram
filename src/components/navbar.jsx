import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import "./navbar.css";
import {actions} from '../features/cartitems';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const cart = useSelector(state => state.cartItems)


  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart"><ShoppingCart size={32}  /> ({cart.length})
        </Link>
      </div>
    </div>
  );
};
