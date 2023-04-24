import React, { useState, useEffect } from 'react';
import "./cart.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../features/cartitems';
import { collection, db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';


export const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
  
    const isLoggedIn = useSelector( state => state.login.loggedIn );
    const cart = useSelector(state => state.cartItems)
    const user = useSelector( state => state.login.user)
  
    const dispatch = useDispatch()

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
        if (!user){
          console.log('user is not logged in for firestore remove');
          return;
        }
        try{
          //reference to correct collection
          const cartItemsRef = collection(db, 'users', user, 'cartItems');
      
          //delete thedocument
          await deleteDoc(doc(cartItemsRef, item.id));
          console.log(`Document with ID: ${item.id} successfully deleted`);
         } catch (e) {
          console.error('Error deleting document:', e)
         }
        
      };



    return (
        <div className="cart">
            <div>
                <h1>Cart Items</h1>
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
                        </li>
                    ))}
                    <li>Total Price: ${totalPrice}</li>
                </ul>

            </div>
            <div className="cartitem">

            </div>
        </div>
    )
}
