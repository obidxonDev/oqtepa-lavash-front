import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(i => i._id === action.payload._id)
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1
            } else{
                const tempPro = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempPro)
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(i => i._id === action.payload._id)
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
            } else if(state.cartItems[itemIndex].cartQuantity === 1){
                const updatedCartItem = state.cartItems.filter(i => i._id !== action.payload._id)
                state.cartItems = updatedCartItem
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeItem: (state, action) => {
            state.cartItems.map((cartItem) => {
                if (cartItem._id === action.payload._id) {
                  const nextCartItems = state.cartItems.filter(
                    (item) => item._id !== cartItem._id
                  );
                  state.cartItems = nextCartItems;
                }
                return state;
              });
              localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    }
})

export const { addToCart, decFromCart, removeItem } = cartSlice.actions
export default cartSlice.reducer