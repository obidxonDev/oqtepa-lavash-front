import { configureStore } from '@reduxjs/toolkit'
import regionSlice from './regions'

export const store = configureStore({
   reducer:{
      regions: regionSlice
   }
})