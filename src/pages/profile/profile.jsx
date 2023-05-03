import React, { useEffect } from 'react';
import './profile.css'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartActions} from '../../features/cartitems';
import { v4 as uuidv4 } from 'uuid';

export const Profile = () =>{
  
  const isLoggedIn = useSelector( state => state.login.loggedIn );
  const userInfo = useSelector( state => state.login.userInfo);

  const dispatch = useDispatch();
  let navigate = useNavigate();


  const orders = [
  {
    id: uuidv4(),
    date: '12 may',
    items: {},
    total: '£120',
  },
  {
    id: uuidv4(),
    date: '12 may',
    items: {},
    total: '£120',
  }
  ]

  //sign out user using firebase auth
  //redirect to login page
  //clears cart for offline mode
  const handleSignOut = async () => {
    try {
      await auth.signOut(); 
      console.log('User signed out successfully');
      dispatch(cartActions.clearItems())
      navigate('/login');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  //redirects to new page if user logs in and if web address is written manually
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      console.log("Redirecting to login")
    }
  }, [isLoggedIn]);


return(
<div className="profile">
  <div className='user-info'>
    
  {userInfo ? (
  <>
    <h1>Welcome {userInfo.name}</h1>
    <div className="user-details">
      <ul>
        <li>
          <strong>Name:</strong> {userInfo.name}
        </li>
        <li>
          <strong>Email:</strong> {userInfo.email}
        </li>
        <li>
          <strong>Address:</strong> {userInfo.address}
        </li>
      </ul>
    </div>
  </>
  ) : (
    <p>Loading user information...</p>
  )}
      
      <button>Edit Information</button>
</div>
<div className='order-details-info'>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <div className='user-order' >
            <li key={order.id}>
            <div>Order number: {order.id}</div>
            <div>Date: {order.date}</div>
            <div>Items: </div>
            <div>Total: ${order.total}</div>
          </li>
          </div>
          
        ))}
      </ul>

      </div >
      <div className='user-signout'>
        <button onClick={handleSignOut}>Log out</button>
      </div>
          
          
    </div>
)


}