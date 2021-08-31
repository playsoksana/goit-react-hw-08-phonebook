import { combineReducers } from 'redux';
import * as contactsAction from './contactsAction';
import { createReducer } from '@reduxjs/toolkit';

const itemsReducer = createReducer([], {
  [contactsAction.fetchContactsSuccess]: (_, { payload }) => payload,
  [contactsAction.addContact]: (state, { payload }) => [payload, ...state],
  [contactsAction.deleteContact]: (state, { payload }) =>
    state.filter(el => el.id !== payload),
  default: state => state,
});
const isLoadingReducer = createReducer(false, {
  [contactsAction.fetchContactsRequest]: () => true,
  [contactsAction.fetchContactsSuccess]: () => false,
  [contactsAction.fetchContactsError]: () => false,
});

const filterReducer = createReducer('', {
  [contactsAction.filterContacts]: (_, { payload }) => payload,
  default: state => state,
});

const errorReducer = createReducer(null, {
  [contactsAction.fetchContactsError]: (_, { payload }) => payload,
  [contactsAction.fetchContactsRequest]: () => null,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});

export default contactsReducer;
