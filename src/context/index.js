import { configureStore } from '@reduxjs/toolkit'
import reloadSlice from './updateBranch'
import cart from './cart'

export const store = configureStore({
   reducer:{
      reloadBranch: reloadSlice,
      cart: cart
   }
})

