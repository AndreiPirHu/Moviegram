import React, { useState, useEffect } from 'react';
import "./cart.css"
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/cartitems';
import { collection, db } from '../../firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';


export const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  

  const [groupedCart, setGroupedCart] = useState({});

  let deliveryFee = 5

  const cart = useSelector(state => state.cartItems)
  const user = useSelector(state => state.login.user)
  const isLoggedIn = useSelector(state => state.login.loggedIn)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  // Calculate the total price of all items in the cart
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  }, [cart]);


  const removeFromCart = async (item) => {
    //remove from localstorage
    dispatch(actions.removeItem(item.id))

    //Remove item from firestore if user is logged in
    if (!isLoggedIn) {
      console.log('user is not logged in for firestore remove');
      return;
    }
    try {
      //reference to correct collection
      const cartItemsRef = collection(db, 'users', user, 'cartItems');

      //delete thedocument
      await deleteDoc(doc(cartItemsRef, item.id));
      console.log(`Document with ID: ${item.id} successfully deleted`);
    } catch (e) {
      console.error('Error deleting document:', e)
    }
  };


  //adds a new object to cart with a different uuid
  const addToCart = async (key) => {
    //fetches old item with key and index position
    const oldItem = groupedCart[key][0];
    //creates a new item with a unique uuid to add to the cart
    const item = { ...oldItem, id: uuidv4() };

    //adds item to cart
    dispatch(actions.addItem(item));

    //Stops here if user is not signed in
    if (!isLoggedIn) {
      console.log('user is not logged in for firestore save');
      return;
    }

    //if user is signed in it adds items to firestore
    try {
      //reference to correct collection
      const cartItemsRef = collection(db, 'users', user, 'cartItems');

      // Set the itemID as the doc name
      const itemDocRef = doc(cartItemsRef, item.id);

      //Add item to firestore
      await setDoc(itemDocRef, item);
      console.log(`Item added to firestore with ID: ${item.id}`);
    } catch (e) {
      console.error("Error adding item to firestore:", e);
    }
  };



  //Makes a grouped cart from redux cart whenever cart changes or when entering shopping cart page
  //Makes several arrays based on item name, size and price to group the same ones together
  useEffect(() => {
    setGroupedCart(cart.reduce((acc, item) => {
      const key = `${item.name}-${item.size}-${item.price}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {}))
  }, [cart]);


  //remove item with index 0 from one of the arrays of duplicate items
  const reduceAmount = async (key) => {
    const item = groupedCart[key][0];
    //tries to remove item from cart and firebase first
    try {
      await removeFromCart(item)
    } catch (error) {
      console.log(`Error removing item with id ${item.id}: ${error}`);
      return;
    }
    //removes the item with index 0 from grouped cart
    groupedCart[key].shift();
    console.log(`Removing item with id ${item.id}`);
    //sets the new grouped cart without the item
    setGroupedCart({ ...groupedCart });
  }

  const navigateToCheckout = () =>{
    navigate('/checkout')
  }

  const navigateToSignIn = () =>{
    navigate('/login')
  }


  return (
    <div className="cart">

      {/* <h1>Cart Items</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
          </li>
        ))}
        <li>Total Price: ${totalPrice}</li>
      </ul> */}




      <div className='cart-items-container'>
        <h1>Cart Items ({cart.length})</h1>
        {Object.keys(groupedCart)
          .sort((a, b) => a.localeCompare(b)) //sort alphabetically so arrays dont change position on change
          .map((key) => {
            const arrayLength = groupedCart[key].length;
            if (arrayLength >= 1) {
              return (
                <li key={key}>
                  <div className='item-container'>
                    <div className='image-container'>
                      <img className='item-image' src={groupedCart[key][0].img} alt="" />
                    </div>
                    <div className='item-details-container'>
                      <div className='item-name-container'>
                        <p className='item-name'>{groupedCart[key][0].name}</p>
                        <p className='item-size'>{groupedCart[key][0].size}</p>
                      </div>

                      <div className='item-amount-container'>
                        <button onClick={() => reduceAmount(key)}><CaretLeft size={32} /></button>
                        <p className='item-amount'>{groupedCart[key].length}</p>
                        <button onClick={() => addToCart(key)}><CaretRight size={32} /></button>
                        <p className='item-price'>${groupedCart[key][0].price * groupedCart[key].length}</p>
                      </div>


                    </div>
                  </div>
                </li>
              );
            }
            return null;
          })}

        
      </div>
        
      <div className='cart-checkout-container'>
          <li className='total-price'><p className='price-description'>Order value</p> <p className='price-amount'>${totalPrice}</p></li>
          <li className='total-price'><p className='price-description'>Delivery fee</p> <p className='price-amount'>${deliveryFee}</p> </li>
          <li className='total-price total-sum' ><p className='price-description'>Total</p> <p className='price-amount'>${totalPrice + deliveryFee}</p></li>
          {isLoggedIn ? <button className='checkout-button' onClick={navigateToCheckout} disabled={cart.length === 0}>Checkout</button> :
          <>
          <button className='checkout-button signin-button' onClick={navigateToSignIn}>Sign in</button>
          <button className='checkout-button checkout-guest-button' onClick={navigateToCheckout} disabled={cart.length === 0}>Checkout as guest</button>
          </>
          }
          
          
      </div>
    </div>
  )
}
