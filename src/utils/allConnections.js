import { createSlice } from "@reduxjs/toolkit";

const allConnections=createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        allConnect:(state,actions)=>{
            return actions.payload;
        }
    }
})
export const {allConnect}=allConnections.actions;
export default allConnections.reducer;