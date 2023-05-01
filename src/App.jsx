import { useEffect } from 'react'
import { Navbar } from './components/navbar'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actions as loginActions } from './features/login';
import { actions as cartActions } from './features/cartitems';
import { auth, collection, db, getDocs } from './firebase';
import { Shop } from './pages/shop/shop'
import { Cart } from './pages/cart/cart'
import {Login} from './pages/login/login'
import {Profile} from './pages/profile/profile'
import IndividualPoster from './components/Joel/IndividualPoster';
import {Register} from './pages/register/register'
import { doc, getDoc } from '@firebase/firestore';



function App() {
  const cart = useSelector( state => state.cartItems)
  const user = useSelector( state => state.login.user)
  const isLoggedIn = useSelector( state => state.login.loggedIn)

  const dispatch = useDispatch();


  //saves and reads cart from previous offline session (localstorage) when webpage is loaded
  //Only while logged out
  useEffect(() => {
    if(!isLoggedIn){
      let previousCart = JSON.parse(localStorage.getItem('cartItems'))||[];
      const timeoutId = setTimeout(() => {
        previousCart.forEach(item => {
        dispatch(cartActions.addItem(item));
      });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  //Update localstorage when cart changes by adding or removing
  //Only while logged out
  useEffect(() => {
    if(!isLoggedIn){
      const timeoutId = setTimeout(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [cart]);


  //checks if user is logged in when dispatch is used
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      if (user) {
        dispatch(loginActions.loginSuccess(user.uid));
        console.log("user is logged in //dispatch used");
        handleUserInfoDownload(user.uid);
      } else {
        dispatch(loginActions.logout());
        console.log("user is logged out");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);


  //if user is logged/logs in, starts fetching cart from firestore
  useEffect(() => {
      if (isLoggedIn){
        console.log("Starting item fetch")
    handleDownload(user)
      }
  }, [user]);

  //fetch cart items from firestore on page reload if logged in
  //TODO change query snapshot when real posters are added with more info
  const handleDownload = async (user) => {
    dispatch(cartActions.clearItems());
    const querySnapshot = await getDocs(collection(db, 'users', user, 'cartItems'));

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const item = {
          id: doc.id,
          name: data.name,
          price: data.price
        };
        
      dispatch(cartActions.addItem(item));
    });
  };

  //downloads userinfo from user firestore document when logged in
  const handleUserInfoDownload = (user) => {
    console.log(user)
    const docRef = doc(db, "users", user);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const userData = doc.data();
         
          dispatch(loginActions.loginFetchInfo(userData))
          //console.log(userData)
          } else {
            console.log("Could not retrieve user info");
          }
      })
      .catch((error) => {
        console.log( error);
      });
  };


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/single" element={<IndividualPoster />} />
          <Route path="/single/:id" element={<IndividualPoster />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
