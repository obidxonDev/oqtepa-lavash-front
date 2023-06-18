import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: null
}

export const regionsSlice = createSlice({
   name: 'regions',
   initialState,
   reducers: {
      addRegion: (state, action) => {
         
      }
   }
})