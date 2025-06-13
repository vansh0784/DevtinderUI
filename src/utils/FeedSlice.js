import { createSlice } from "@reduxjs/toolkit";

const FeedSlice=createSlice({
    name:"Feed",
    initialState:null,
    reducers:{
        addFeed:(state,actions)=>{
            return actions.payload;
        }
        ,deleteUserfromFeed:(state,actions)=>{
            const newFeed=state.filter(user=>user._id!=actions.payload)
            return newFeed;
        }
    }
});

export const {addFeed,deleteUserfromFeed}=FeedSlice.actions;
export default FeedSlice.reducer;