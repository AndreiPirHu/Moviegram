import React, { useEffect, useState } from 'react';
import "./login.css"
import { useNavigate, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as loginActions } from '../../features/login';
import { setDoc, collection, db, doc, auth, signInWithEmailAndPassword } from '../../firebase';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const isLoggedIn = useSelector( state => state.login.loggedIn );
  const isLoading = useSelector( state => state.login.loading);

  const dispatch = useDispatch();
  let navigate = useNavigate();


  //handles login with firebase auth, saves user uid in redux
  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginActions.loginStart())
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      setLoginError(false)
      dispatch(loginActions.loginSuccess(user.uid))
      await handleOfflineCart(user.uid)
    } catch (error) {
      console.log('Error logging in:', error);
      dispatch(loginActions.loginFailure())
      setLoginError(true)
      
    }
  };

  //sends offline cart to be uploaded and deletes it from localstorage
  const handleOfflineCart = async (user) => {
    let offlineCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log("handleOfflineCart ", offlineCart)
    await offlineCart.forEach(item => {
      handleCartUpload(item, user)
    });

    localStorage.removeItem('cartItems');
  }



  //uploads all the offline cart items

  const handleCartUpload = async (item, user) =>{
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
    <div className="container">
    <div className='form'>
      <h1>Sign in</h1>
      <form onSubmit={handleSignIn}>
        
        <div>
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />  
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        </div>
        {loginError ? (<p className='login-error'>Wrong email or password, please try again.</p>) : ("")}

        {isLoading ? (
        <button disabled type="submit" className='button-container loading-button' >
        <div className="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
        </div>
        </button>
        ) : (<button type="submit" className='button-container'>Log In</button>)}
        
        <Link to="/register">
      <button className='register'>Register</button>
      </Link>
      </form>
    </div>
    </div>
  )
}
