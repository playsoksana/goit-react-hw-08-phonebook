import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
