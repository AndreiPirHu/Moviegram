import React, { useEffect, useState } from 'react'
import "./register.css"
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateDoc } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';



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
      handleUserInfoUpload()
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
      handleCartUpload(item, user)
    });

    localStorage.removeItem('cartItems');
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
  const handleUserInfoUpload = async () => {
      //reference to correct collection
      const userDocRef = collection(db, 'users', user);

      try{
      
      //Add info to firestore
      await updateDoc(userDocRef, {
        email: email,
        name: name,
      });
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
        />
        </div>
        <button type="submit">Create account</button>
        <p>Already have an account? <a href="/#/login" >Sign in</a></p>
      </form>
      </div>
    </div>
  );
}