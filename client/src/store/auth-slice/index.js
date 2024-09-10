import { createSlice } from "@reduxjs/toolkit";




const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null,
}




const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        setUser:(state,action)=>{
            
        }
    }
})