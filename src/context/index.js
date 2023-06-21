import { configureStore } from '@reduxjs/toolkit'
import reloadSlice from './updateBranch'

export const store = configureStore({
   reducer:{
      reloadBranch: reloadSlice
   }
})