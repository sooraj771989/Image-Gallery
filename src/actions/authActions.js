import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../const";
import { usersAPIUrl } from "../api";
const isEmpty = require("is-empty");

const jwt = require('jsonwebtoken')
const SECRET_KEY = '123456789';
const expiresIn = '1h';

function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}
 

// Register User
export const registerUser = (userData, history) => dispatch => {


  axios.get(`${usersAPIUrl}`)
  .then(res => {
    console.log(res)
    // Get the id of last user
    const last_item_id = res.data[res.data.length-1].id;
    console.log(last_item_id)
    return last_item_id
  }).then(last_item_id => {

    console.log(last_item_id)
    const newUser = {
      id: last_item_id+1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    axios
    .post(`${usersAPIUrl}`, newUser)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

  })
  .catch(err =>{
  }
  );

 
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.get(`${usersAPIUrl}?email=${userData.email}&password=${userData.password}`)
    .then(res => {
      console.log("login endpoint called; request body:");
      console.log(res);
       if (res.data.length){
        console.log(res);
        const email = userData.email;
        const password = userData.password;
        const access_token = createToken({email, password})
        const token  = access_token;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(email));
       } 
    })
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
      })}
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};