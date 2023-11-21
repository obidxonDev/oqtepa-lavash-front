import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  false
}


export const reloadDataSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        reloadData: (state) => {
            state.value = !state.value
        }
    }
})

export const { reloadData } = reloadDataSlice.actions
export default reloadDataSlice.reducer