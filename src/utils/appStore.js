import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./FeedSlice"
import connectReducer from "./allConnections"
import requests from "./requests"
const store=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectReducer,
        recievedreq:requests,
    }
});
export default store;

// For redux -->
/*

 */