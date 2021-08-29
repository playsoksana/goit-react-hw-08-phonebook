import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
//import { useDispatch, useSelector} from 'react-redux';
import authAction from './authAction';
import * as authSelector from './authSelector';


axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const tokenState = {
    setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    cleanToken() {
    axios.defaults.headers.common.Authorization = ''
    }
}


export const register = dataUser => async dispatch => {
    try {
        dispatch(authAction.registerRequest());
        const { data } = await axios.post('/users/signup', dataUser);
        dispatch(authAction.registerSuccess(data));
        dispatch(authAction.isLoggedIn());
        tokenState.setToken(data.token)
        return data;
    } catch (error) {
        dispatch(authAction.registerError(error.message))
    }
}

export const login = dataUser => async dispatch => {
    try {
        dispatch(authAction.loginRequest());
        const { data } = await axios.post('/users/login', dataUser);
        dispatch(authAction.loginSuccess(data));
        dispatch(authAction.isLoggedIn());
        tokenState.setToken(data.token)
        return data;
    } catch (error) {
        dispatch(authAction.loginError(error.message))
    }
}

export const logOut = () => async dispatch => {
    try {
     dispatch(authAction.logoutRequest())
        await axios.post('/users/logout');
        dispatch(authAction.logoutSuccess());
        tokenState.cleanToken()
    } catch (error) {
    dispatch(authAction.logoutError(error.message))
    }
}
export const fetchByToken = () => async dispatch => {    
    const token = authSelector.getToken();
        try {
        dispatch(authAction.getCurrentUserRequest());
        tokenState.setToken(token);
        const { data } = await axios('/users/current');
        
        dispatch(authAction.getCurrentUserSuccess(data))
        console.log(data);
        return data;
    } catch (error) {
        
       dispatch(authAction.getCurrentUserError())
}
 
}