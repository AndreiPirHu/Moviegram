import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import "./navbar.css";
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const cart = useSelector(state => state.cartItems)
  const isLoggedIn = useSelector( state => state.login.loggedIn );


  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>
        {isLoggedIn ? (<Link to="/profile">Profile</Link>) : (<Link to="/login">Login</Link>)}
        <Link to="/cart"><ShoppingCart size={32}  /> ({cart.length})
        </Link>
      </div>
    </div>
  );
};
