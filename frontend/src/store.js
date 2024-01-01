import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import React from "react"
import { ReactDOM } from 'react-dom';
// import "./bootstrap.min.css"
// import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
import reportWebVitals from './reportWebVitals';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/noteReducers';
const reducer = combineReducers({
  // this will contain reducers
  userLogin :userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
  noteCreate:noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  userUpdate: userUpdateReducer
});
const userInfoFromStorage=localStorage.getItem('userInfo')
?JSON.parse(localStorage.getItem("userInfo"))
:null;
const initialState={
  userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk];
 
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;