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

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //Registers user to firestore auth
  const handleRegister = async (e) => {
      e.preventDefault();
      
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
        <button type="submit">Create account</button>
        <p>Already have an account? <a href="/#/login" >Sign in</a></p>
      </form>
      </div>
    </div>
  );
}