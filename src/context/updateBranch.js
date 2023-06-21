import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: 0
}

export const reloadSlice = createSlice({
   name: 'reload',
   initialState,
   reducers: {
      reloadBranches: (state) => {
         state.value = state.value + 1
      }
   }
})

export const { reloadBranches } = reloadSlice.actions
export default reloadSlice.reducer