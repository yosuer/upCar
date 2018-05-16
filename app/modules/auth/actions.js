import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

export function register(data, successCB, errorCB) {
  return (dispatch) => {
    api.register(data, function (success, data, error) {
      if (success) successCB(data);
      else if (error) errorCB(error)
    });
  };
}

export function createUser(user, successCB, errorCB) {
  return (dispatch) => {
    api.createUser(user, function (success, data, error) {
      if (success) {
        dispatch({type: t.LOGGED_IN, data: user});
        successCB();
      }else if (error) errorCB(error)
    });
  };
}

export function login(data, successCB, errorCB) {
  return (dispatch) => {
    api.login(data, function (success, data, error) {
      if (success) {
        if (data.exists) dispatch({type: t.LOGGED_IN, data: data.user});
        successCB(data);
      } else if (error) errorCB(error)
    });
  };
}

export function resetPassword(data, successCB, errorCB) {
  return (dispatch) => {
    api.resetPassword(data, function (success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error)
    });
  };
}

export function signOut(successCB, errorCB) {
  return (dispatch) => {
    api.signOut(function (success, data, error) {
      if (success) {
        dispatch({type: t.LOGGED_OUT});
        successCB();
      }else if (error) errorCB(error)
    });
  };
}

export function checkLoginStatus(callback) {
  console.log('checkLoginStatus')
  return (dispatch) => {
    console.log('dispatch')
    auth.onAuthStateChanged(async (user) => {
      console.log('onAuthStateChanged')
      let isLoggedIn = (user !== null);
      if (isLoggedIn) {
        console.log('isLoggedIn')
        console.log(user)
        try {
          const user = await AsyncStorage.getItem('user');
          if (user === null) isLoggedIn = false
          else dispatch({type: t.LOGGED_IN, data: JSON.parse(user)})
        } catch (error) {
          callback(isLoggedIn);
        }
      } else {
        console.log('isLoggedIn : false')
        dispatch({type: t.LOGGED_OUT});
        callback(isLoggedIn);
      }
    });
  };
}