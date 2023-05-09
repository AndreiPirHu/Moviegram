import { useEffect, useState } from "react"
import "./checkout.css"
import { Link } from "phosphor-react";
import { useSelector } from "react-redux";


export const Checkout = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(0);


  const [userInfo, setUserInfo] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(false);
  
  const isLoggedIn = useSelector( state => state.login.loggedIn );
  const user = useSelector(state => state.login.userInfo)

  const handleUserInfo = (e) =>{
    e.preventDefault();
    setUserInfo(true)
    //TODO deactivate save information button on submit and reactivate it on change of any of the information in a useEffect
    //TODO if(isLoggedIn) save the address to firestore
  }

  const handleDeliveryInfo = (e) =>{
    e.preventDefault();
    setDeliveryInfo(true)
  }

  //Set user info if user is logged in
  //timeout to let userInfo load in from firestore
  useEffect(() =>{
    if(isLoggedIn){
      const timeoutId = setTimeout(() => {
      setEmail(user.email)
      setName(user.name)
      setAddress(user.address)
    }, 50);
    return () => clearTimeout(timeoutId);
    }
  }, [user]);

  return (
    <div className="checkout-container">
        
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
            />
          </div>
            <button className='save-info-button'>Save information</button>
        </form>
        


        {userInfo ? (<form className="delivery-form" onSubmit={handleUserInfo}>
        <h2>Delivery options</h2>
      <div>
        <label htmlFor="option1">DHL utlämning</label>
        <input
          type="radio"
          id="option1" 
          name="option"
          required
          onChange={() => setSelectedDelivery(5)} /> 
      </div>
      <div>
        <label htmlFor="option2">Postnord utlämning</label>
        <input 
        type="radio" 
        id="option2" 
        name="option" 
        required
        onChange={() => setSelectedDelivery(7)} />
      </div>

      <div>
        <label htmlFor="option3">Budbee box</label>
        <input 
        type="radio" 
        id="option3" 
        name="option" 
        required
        onChange={() => setSelectedDelivery(3)} />
      </div>

      <button type="submit" disabled={deliveryInfo === 0}>Save delivery</button>
    </form>) : (<h2>Delivery options</h2>)}
  


        <div className="payment-form">
        <h2>Payment</h2>

        </div>
    </div>
  )
}