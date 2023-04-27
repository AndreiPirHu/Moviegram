import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import "./navbar.css";
import { useSelector } from 'react-redux';
import { Nav, Dropdown, Badge } from 'react-bootstrap';


export const Navbar = () => {
  const cart = useSelector(state => state.cartItems)
  const isLoggedIn = useSelector( state => state.login.loggedIn );


  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>
        {isLoggedIn ? (<Link to="/profile">Profile</Link>) : (<Link to="/login">Sign in</Link>)}
        <Link to="/cart"><ShoppingCart size={32}  /> ({cart.length})
        </Link>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
              <Link to="/cart"><ShoppingCart size={32} />
              </Link>
              <Badge>5</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              <span style={{ padding: 5 }}>Cart is Empty!</span>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </div>
  );
};
