import { createSlice } from "@reduxjs/toolkit";

const requests=createSlice({
    name:"recievedreq",
    initialState:[],
    reducers:{
        addRequest:(state,actions)=>{
            return actions.payload;
        }
    }
})
export const {addRequest}=requests.actions;
export default requests.reducer;