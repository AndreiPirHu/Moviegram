import React, { useEffect, useState } from 'react'
import "./register.css"
import { auth, collection, createUserWithEmailAndPassword, db, doc, setDoc, signInWithEmailAndPassword } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { actions as loginActions} from '../../features/login';


export const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const isLoggedIn = useSelector( state => state.login.loggedIn );
  const isLoading = useSelector( state => state.login.loading);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //Registers user to firestore auth
  const handleRegister = async (e) => {
      e.preventDefault();
      dispatch(loginActions.loginStart())
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      console.log(user)
      //upload user info to firestore
      handleUserInfoUpload(user.uid)
      //sign in the user after success
      handleSignIn()
    })
    .catch((error) => {
      dispatch(loginActions.loginFailure())
      console.log(error.code)
      console.log(error.message)
    });
  };

  //signs the user in when they register a new account  successfully
  const handleSignIn = async (e) => {
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password); 
      console.log('User logged in successfully');
      await handleOfflineCart(user.uid)
      dispatch(loginActions.loginSuccess(user.uid))
    } catch (error) {
      console.log('Error logging in:', error);
      dispatch(loginActions.loginFailure())
    }
  };

  //sends offline cart to be uploaded and deletes it from localstorage
  const handleOfflineCart = async (user) =>{
    let offlineCart = JSON.parse(localStorage.getItem('cartItems'))||[];

    await offlineCart.forEach(item => {
      handleCartUpload(item, user)
    });

    localStorage.removeItem('cartItems');

    //to update the cart info, update user
    dispatch(loginActions.loginSuccess(user.uid))
  }

  //uploads all the offline cart items to firestore
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


// uploads name and email to firestore for the user doc
  const handleUserInfoUpload = async (user) => {
      //reference to correct collection
      const userDocRef = doc(db, 'users', user);

      const userData = {
        email: email,
        name: name,
      };

      try{
      //Add info to firestore
      await setDoc(userDocRef, userData, {merge: true});
      console.log(`User info successfully added to firestore`);
     } catch (e) {
      console.error('Error adding user info to document:', e)
     }
  }
  

  //redirects to profile page if user is logged in and if web address is written manually
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/profile');
      console.log("Redirecting to profile")
    }
  }, [isLoggedIn]);



  return (
    <div className="container">
      <div className="form">
      <form  onSubmit={handleRegister}>
        <h2>Create account</h2>
        <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div>
        <label htmlFor="name">Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          pattern=".{6,}"
          title="Lösenordet måste vara minst 6 tecken lång"
        />
        
        </div>
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
        ) : (<button type="submit" className='button-container'>Create account</button>)}
        <p>Already have an account? <a href="/#/login" >Sign in</a></p>
      </form>
      </div>
    </div>
  );
}