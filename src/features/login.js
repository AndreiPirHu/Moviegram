import { createAction, createReducer } from '@reduxjs/toolkit';

 const loginStart = createAction('start login');
 const loginSuccess = createAction('successful login');
 const loginFetchInfo = createAction('successfully fetched user info')
 const loginFailure = createAction('failed login');
 const logout = createAction('logged out');

const actions ={ loginStart, loginSuccess, loginFailure, logout, loginFetchInfo };

//checks what user is logged in and in what state the login is
//takes in all user info in user firestore document
const initialState = {
  user: null,
  userInfo: null,
  loggedIn: false,
  loading: false,
};

const reducer = createReducer(initialState, builder => {
  builder
  //when initiating login loading = true, for functions like inactivating login button and loading progress wheel
      .addCase(loginStart, (state, action) => ({
        ...state,
         loading : true
        }))

      //if login successful state of loggedIn is changed and loading is set to false, 
      .addCase(loginSuccess, (state, action) => ({ 
          user : action.payload,
          loggedIn : true,
          loading : false,
        }))

        //if error occurs, loading stops and user can try again
      .addCase(loginFailure, (state, action) => ({
        ...state, 
        loading : false
      }))

      .addCase(loginFetchInfo, (state, action) => ({
        ...state,
        userInfo: action.payload
      }))

        // when user logs out all states are set to initialState
      .addCase(logout, (state, action) => initialState)
});

export { reducer, actions}