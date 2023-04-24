import React, { useEffect, useState } from 'react';
import "./login.css"
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as loginActions} from '../../features/login';
import { setDoc, collection, db, doc, auth, signInWithEmailAndPassword } from '../../firebase';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoggedIn = useSelector( state => state.login.loggedIn );

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //handles login with firebase auth, saves user uid in redux
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password); 
      console.log('User logged in successfully');
      dispatch(loginActions.loginSuccess(user.uid))
      await handleOfflineCart(user.uid)
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  //sends offline cart to be uploaded and deletes it from localstorage
  const handleOfflineCart = async (user) =>{
    let offlineCart = JSON.parse(localStorage.getItem('cartItems'))||[];

    await offlineCart.forEach(item => {
      handleUpload(item, user)
    });

    localStorage.removeItem('cartItems');
  }

  //uploads all the offline cart items
  const handleUpload = async (item, user) =>{
    try{
    //reference to correct collection
    const cartItemsRef = collection(db, 'users', user, 'cartItems');

    // Set the itemID as the doc name
    const itemDocRef = doc(cartItemsRef, item.id);

    //Add item to firestore
    await setDoc(itemDocRef, item);
    console.log(`Document written with ID: ${item.id}`);
   } catch (e) {
    console.error('Error adding document:', e)
   }
  }

  //redirects to new page if user logs in and if web address is written manually
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/profile');
      console.log("Redirecting to profile")
    }
  }, [isLoggedIn]);


  return(
    <div className='form'>
      <h1>Login</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
