import { useEffect, useState } from "react"
import "./checkout.css"
import { Link } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";


import { actions as cartActions } from '../../features/cartitems';

import { v4 as uuidv4 } from 'uuid';
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseComplete, setPurchaseComplete] = useState(false)
  const [completedOrderID, setCompletedOrderID] = useState('')

  const [userInfo, setUserInfo] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(false);

  const isLoggedIn = useSelector(state => state.login.loggedIn);
  const user = useSelector(state => state.login.userInfo)
  const userID = useSelector(state => state.login.user)
  const cart = useSelector(state => state.cartItems)

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleUserInfo = (e) => {
    e.preventDefault();

    setUserInfo((userInfo) => !userInfo);
    setDeliveryInfo(false)

  }

  const handleDeliveryInfo = (e) => {
    e.preventDefault();
    setDeliveryInfo(true)
  }



  const handlePurchase = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let order = { id: uuidv4(), date: formattedDate, items: cart, price: totalPrice }


    if (isLoggedIn) {
      //if user is signed in it adds the order to firestore
      try { //reference to correct collection
        const cartItemsRef = collection(db, 'users', userID, 'orderHistory');
        // Set the itemID as the doc name
        const itemDocRef = doc(cartItemsRef, order.id);
        //Add item to firestore
        setDoc(itemDocRef, order);
        console.log(`Order added to firestore with ID: ${order}`);
        await removeCartFromFirestore()

        //add used address to profile
        addUserAddress()

      } catch (e) {
        console.error("Error adding order to firestore:", e);
      }
    } else {
      console.log('user is not logged in for firestore save');
    }

    setCompletedOrderID(order.id)
    setPurchaseComplete(true)
    dispatch(cartActions.clearItems())
    console.log("Purchase complete")
  }

  //remove from firestore after purchase complete
  const removeCartFromFirestore = async () => {
    //retrieves all documents
    const querySnapshot = await getDocs(collection(db, 'users', userID, 'cartItems'));
    //deletes all documents
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }


  const addUserAddress = async () => {
      //reference to correct collection
      const userDocRef = doc(db, 'users', userID);
      const userData = {
        address: address
      };

      try {
        //Add info to firestore
        await setDoc(userDocRef, userData, { merge: true });
        console.log(`User address successfully added to firestore`);

      } catch (e) {
        console.error('Error adding user address to document:', e)
      }
  }

  const gotoShop = () => {
    navigate('/');
  }



  // Calculate the total price of all items in the cart and delivery
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total + selectedDelivery);
  }, [selectedDelivery]);


  //Set user info if user is logged in
  //timeout to let userInfo load in from firestore
  useEffect(() => {
    if (isLoggedIn) {
      const timeoutId = setTimeout(() => {
        setEmail(user.email)
        setName(user.name)
        setAddress(user.address)
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [user]);

  //redirect to cart if no items in cart
  useEffect(() => {
    if (cart.length === 0){
      navigate('/cart');
      console.log("Redirecting to login")
    }
    
  }, [])

  return (
    <div className="checkout-container">
      {purchaseComplete ? (

        <div className="purchase-complete">
          <h2>Purchase Complete</h2>
          <p>Order number: <strong>{completedOrderID}</strong> </p>
          <p>Thank you for your purchase!</p>
            <button onClick={gotoShop}>Continue shopping</button>
        </div>

      ) : (
        <>
          <form className="userInfo-form" onSubmit={handleUserInfo}>
            <h2>User information</h2>
            <div className='input-container'>
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={userInfo}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="address">Address</label>
              <input
                type="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                disabled={userInfo}
              />
            </div>

            <div className='input-container'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={userInfo}
              />
            </div>
            <button className='save-info-button'>{userInfo ? 'Change' : 'Save information'}</button>
          </form>

          {userInfo ? (<form className="delivery-form" onSubmit={handleDeliveryInfo}>
            <h2>Delivery options</h2>
            <div className="delivery-option">
              <label htmlFor="option1">DHL utlämning</label>
              <div>
                <span className="delivery-price">$5</span>
                <input
                  type="radio"
                  id="option1"
                  name="option"
                  required
                  onChange={() => setSelectedDelivery(5)} />
              </div>
            </div>

            <div className="delivery-option">
              <label htmlFor="option2">Postnord utlämning</label>
              <div>
                <span className="delivery-price">$7</span>
                <input
                  type="radio"
                  id="option2"
                  name="option"
                  required
                  onChange={() => setSelectedDelivery(7)} />
              </div>
            </div>


            <div className="delivery-option">
              <label htmlFor="option3">Budbee box</label>
              <div>
                <span className="delivery-price">$3</span>
                <input
                  type="radio"
                  id="option3"
                  name="option"
                  required
                  onChange={() => setSelectedDelivery(3)} />
              </div>
            </div>
            <button type="submit" disabled={deliveryInfo === 0}>Next</button>
          </form>) : (<div className="delivery-form">
            <h2 >Delivery options</h2>
          </div>
          )}


          {deliveryInfo ? (<form className="payment-form" onSubmit={handlePurchase}>
            <h2>Payment</h2>
            <div className='input-container'>
              <label htmlFor="name">Name on card</label>
              <input
                type="name"
                id="name"
                required
              />
            </div>

            <div className='input-container'>
              <label htmlFor="cardNumber">Card number</label>
              <input
                type="number"
                id="card number"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="card-details">
              <div className='input-container-half'>
                <label htmlFor="expirationDate">Expiration date</label>
                <input
                  type="text"
                  id="ExpirationDate"
                  placeholder="MM/YY"
                  maxLength="5"
                  required

                />
              </div>

              <div className='input-container-half'>
                <label htmlFor="CVV">CVV/CVC</label>
                <input
                  type="number"
                  id="CVV"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <p className="total-cost"> Total cost</p>
            <p className="total-price">${totalPrice}</p>
            <button className='purchase-button'>Purchase</button>
          </form>) : (<div className="payment-form">
            <h2 >Payment</h2>
          </div>
          )}
        </>
      )}
    </div>
  )
}