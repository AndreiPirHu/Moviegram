import React from 'react';
import './Profile.css'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions as cartActions} from '../../features/cartitems';

export const Profile = () =>{
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = {
    name: 'Namn',
    address: '123 stockholm',
    phone: '555-1234',
    email: 'mystore@example.com',
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


return(
  <div className="profile">
      <div className="profile-header">
        <h1 className="profile-name">{user.name}</h1>
      </div>
      <div className="profile-details">
          <p className="store-profile__address">{user.address}</p>
          <p className="store-profile__phone">{user.phone}</p>
          <p className="store-profile__email">{user.email}</p>
          <button onClick={handleSignOut}>Log out</button>
      </div>
    </div>
)


}