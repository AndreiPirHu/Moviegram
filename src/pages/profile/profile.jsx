import React from 'react';
import './profile.css'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions as cartActions} from '../../features/cartitems';
import { v4 as uuidv4 } from 'uuid';

export const Profile = () =>{
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = {
    name: 'Namn',
    address: '123 stockholm',
    phone: '555-1234',
    email: 'mystore@example.com',
  };

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


return(
<div className="profile">
  <div className='user-info'>
      <h1>Welcome {user.name}</h1>
      <div className="user-details">
        <ul>
          <li>
            <strong>Name:</strong> {user.name}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Address:</strong> {user.address}
          </li>
        </ul>
      </div>
      
      <button>Edit Information</button>
</div>
<div className='user-info'>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <div>Order #{order.id}</div>
            <div>Date: {order.date}</div>
            <div>Items: </div>
            <div>Total: ${order.total}</div>
          </li>
        ))}
      </ul>

      </div>
          <button onClick={handleSignOut}>Log out</button>
          
    </div>
)


}