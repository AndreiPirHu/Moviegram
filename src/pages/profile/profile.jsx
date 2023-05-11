import React, { useEffect, useState } from 'react';
import './profile.css'
import { auth, collection, db, getDocs } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartActions } from '../../features/cartitems';
import { v4 as uuidv4 } from 'uuid';

export const Profile = () => {
  const [orders, setOrders] = useState([]);
  const isLoggedIn = useSelector(state => state.login.loggedIn);
  const userInfo = useSelector(state => state.login.userInfo);

  const userID = useSelector(state => state.login.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();





  const getOrderHistory = async () => {
    const querySnapshot = await getDocs(collection(db, "users", userID, "orderHistory"));

    const ordersData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        date: data.date,
        id: data.id,
        items: data.items,
        price: data.price,
      };
    });

    setOrders(ordersData)
  }

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getOrderHistory()
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [])

  //redirects to new page if user logs in and if web address is written manually
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      console.log("Redirecting to login")
    }
  }, [isLoggedIn]);


  return (
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
        <div className='user-signout'>
        <button onClick={handleSignOut}>Log out</button>
      </div>
      </div>
      <div className='order-details-info'>
        <h2>Order History</h2>
        <ul>
  {orders.map(order => (
    <div className='user-order' key={order.id}>
      <div className='order-number'>Order number: {order.id}</div>
      <div className='order-date'>Date: {order.date}</div>
      {(() => {
        const groupedItems = {};
        order.items.forEach(item => {
          const key = `${item.name}-${item.size}-${item.price}`;
          if (!groupedItems[key]) {
            groupedItems[key] = {
              item,
              itemCount: 1
            };
          } else {
            groupedItems[key].itemCount++;
          }
        });
        return Object.values(groupedItems).map(({ item, itemCount }) => (
          <div className='item-container' key={item.id}>
            <div className='image-container'>
              <img className='item-image' src={item.img} alt={item.name} />
            </div>
            <div className='item-details-container'>
              <div className='item-name-container'>
                <p className='item-name'>{item.name}</p>
                <p className='item-size'>{item.size}</p>
              </div>
                <p className='item-amount'>{itemCount}</p>
                <p className='item-price'>${item.price * itemCount}</p>
              
            </div>
          </div>
        ));
      })()}
      <div className='total-price'>Total: ${order.price}</div>
    </div>
  ))}
</ul>

      </div >

    </div>
  )


}