import { configureStore } from '@reduxjs/toolkit'
import reloadSlice from './updateBranch'
import cart from './cart'
import reloadData from './reloadData'

export const store = configureStore({
   reducer:{
      reloadBranch: reloadSlice,
      cart: cart,
      reloadData: reloadData
   }
})

