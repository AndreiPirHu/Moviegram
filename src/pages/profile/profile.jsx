import React, { useEffect, useState } from 'react';
import './profile.css'
import { auth, collection, db, doc, getDocs, setDoc } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartActions } from '../../features/cartitems';
import { actions as loginActions } from '../../features/login';
import { v4 as uuidv4 } from 'uuid';
import { getDoc } from 'firebase/firestore';

export const Profile = () => {
  const [orders, setOrders] = useState([]);
  const isLoggedIn = useSelector(state => state.login.loggedIn);
  const userInfo = useSelector(state => state.login.userInfo);

  const [editingInfo, setEditingInfo] = useState(false)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [maximizedOrders, setMaximizedOrders] = useState([]);

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

  //toggle if order is minimized
  const toggleOrder = (orderId) => {
    if (maximizedOrders.includes(orderId)) {
      setMaximizedOrders(maximizedOrders.filter(id => id !== orderId));
    } else {
      setMaximizedOrders([...maximizedOrders, orderId]);
    }
  };

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

  const editUserInformation = async () => {
    if (!editingInfo) {
      setEditingInfo(true)
    } else {
      //reference to correct collection
      const userDocRef = doc(db, 'users', userID);

      const userData = {
        name: name,
        address: address,
      };

      try {
        //Add info to firestore
        await setDoc(userDocRef, userData, { merge: true });
        console.log(`User info successfully added to firestore`);
        setEditingInfo(false)
        handleUserInfoDownload(userID)
      } catch (e) {
        console.error('Error adding user info to document:', e)
      }
      
    }


  }


  const getUserInfo = () => {
    if (userInfo){
    setName(userInfo.name)
    setAddress(userInfo.address)
    setEmail(userInfo.email)
    }
    
    
  }

  //downloads userinfo from user firestore document when logged in
  const handleUserInfoDownload = (user) => {
    /* console.log(user) */
    const docRef = doc(db, "users", user);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const userData = doc.data();

          dispatch(loginActions.loginFetchInfo(userData))
          //console.log(userData)
          getUserInfo()
        } else {
          console.log("Could not retrieve user info");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getOrderHistory()
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [])

  //redirects to login page if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      console.log("Redirecting to login")
    }
  }, [isLoggedIn]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getUserInfo()
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [userInfo]);



  return (
    <div className="profile">
      <div className='profile-container'>
        <div className='user-info'>

          {userInfo ? (
            <>
              <h1>Welcome {userInfo.name}</h1>
              <div className="user-details">

                <div className='input-container'>
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={!editingInfo}
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
                    disabled={!editingInfo}
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
                    disabled
                  />
                </div>
              </div>
            </>
          ) : (
            <p>Loading user information...</p>
          )}

          <button onClick={editUserInformation}>{!editingInfo ? 'Edit Information' : 'Save'}</button>
          <div className='user-signout'>
            <button onClick={handleSignOut}>Log out</button>
          </div>
        </div>

        <div className='order-details-info'>
          <h2>Order History</h2>

          {orders.map(order => {
            const isMaximized = maximizedOrders.includes(order.id);

            return (
              <div className='user-order' key={order.id}>
                <div className={`order-summary ${isMaximized ? 'maximized' : ''}`}onClick={() => toggleOrder(order.id)}>
                  <div className='order-number'>Order number: {order.id}</div>
                  <div className='order-date'>Date: {order.date}</div>
                  <div className='total-price'>Total: ${order.price}</div>
                </div>

                {isMaximized && (
                  <>
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
                  </>
                )}

              </div>

            );
          })}

        </div >
      </div>
    </div>
  )


}