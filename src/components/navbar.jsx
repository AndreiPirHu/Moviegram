import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import "./navbar.css";
import { Nav, Dropdown, Badge } from 'react-bootstrap';


export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Shop</Link>
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
