import * as store from '../storeMain';

export const getName = state => state.auth.auth.name;
export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const detIsLoader = state => state.auth.isLoader;

export const getToken = () => store.store.getState().auth.token;

