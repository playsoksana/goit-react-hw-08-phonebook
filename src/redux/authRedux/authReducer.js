import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authAction from './authAction';

const initialUserState = { name: null, email: null };

const auth = createReducer(initialUserState, {
 [authAction.registerSuccess]: (state, { payload }) => payload.user,
  [authAction.loginSuccess]: (state, { payload }) => payload.user,
  [authAction.logoutSuccess]: () => initialUserState,
  [authAction.getCurrentUserSuccess]: (_, {payload}) => payload
});

const isLoader = createReducer(false, {
  [authAction.registerRequest]: () => true,
  [authAction.registerSuccess]: () => false,
  [authAction.registerError]: () => false,
  [authAction.loginRequest]: () => true,
  [authAction.loginSuccess]: () => false,
  [authAction.loginError]: () => false,
  [authAction.logoutRequest]: () => true,
  [authAction.logoutSuccess]: () => false,
  [authAction.logoutError]: () => false,
  [authAction.getCurrentUserRequest]: () => true,
  [authAction.getCurrentUserSuccess]:()=> false,
  [authAction.getCurrentUserError]: () => false
})

const token = createReducer(null, {
  [authAction.registerSuccess]: (_, { payload }) => payload.token,
  [authAction.loginSuccess]: (_, { payload }) => payload.token,
  [authAction.logoutSuccess]: () => null
})


const error = createReducer(null, {
  [authAction.registerError]: (_, { payload }) => payload,
  [authAction.loginError]: (_, { payload }) => payload,
  [authAction.logoutError]: (_, payload) => payload,
   [authAction.getCurrentUserError]: (_, payload) => payload
})

const isLoggedIn = createReducer(false, {
  [authAction.registerSuccess]: () => true,
  [authAction.loginSuccess]: () => true,
  [authAction.logoutSuccess]: () => false,
  [authAction.getCurrentUserSuccess]: () => true
})




export default combineReducers({
  auth,
  isLoader,
  token,
  error,
  isLoggedIn,
});