
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { List, ShoppingCart, X } from '@phosphor-icons/react';
import "./navbar.css";
import { useSelector } from 'react-redux';
import logonb from '../assets'

export const Navbar = () => {
  const cart = useSelector(state => state.cartItems)
  const isLoggedIn = useSelector(state => state.login.loggedIn);

  const [toggle, setToggle] = useState(false)

  return (
    <nav className="navbar">
      <div className="subNavbar">
        <Link to="/" className="moviegram" onClick={() => { window.scrollTo(0, 0) }}>
          <img src={logonb} alt="logo" className="logoImg" />
        </Link>
        <div className="links">
          <ul>
            <Link to="/">Shop</Link>
            {isLoggedIn ? (<Link to="/profile">Profile</Link>) : (<Link to="/login">Sign in</Link>)}
            <Link to="/cart" onClick={() => { setToggle(!toggle) }}>
              <ShoppingCart size={32} />
              <span className="badge" value={cart.length}>
              </span>
            </Link>
          </ul>
          <div className="small-Device">
            <div className="burgerx">
              {toggle ? (<X size={32} onClick={() => setToggle(!toggle)} />) : (<List size={32} onClick={() => setToggle(!toggle)} />)}
            </div>
            <div className={`${!toggle ? 'hiddenMenu' : 'showMenu'}`}>
              <ul>
                <Link to="/" onClick={() => { setToggle(!toggle) }}>Shop</Link>
                {isLoggedIn ? (<Link to="/profile" onClick={() => { setToggle(!toggle) }}>Profile</Link>) : (<Link to="/login" onClick={() => { setToggle(!toggle) }}>Sign in</Link>)}
                <Link to="/cart" onClick={() => { setToggle(!toggle) }}>
                  <ShoppingCart size={32} />
                  <span className="badge" value={cart.length}>
                  </span>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
