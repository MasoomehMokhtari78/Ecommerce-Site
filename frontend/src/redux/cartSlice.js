import { createSlice, current } from '@reduxjs/toolkit';
import productSlice from './productSlice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    }, 
    reducers: {
        addToCart: (state, action) => {
            //if the same product with the same size and color is selected
            const itemInCart = state.cart.find((item) => 
                                                item.id === action.payload.id
                                                & item.size === action.payload.size
                                                & item.color === action.payload.color
                                                );
            if (itemInCart) {
                itemInCart.quantity += action.payload.quantity;

            }else {
                state.cart.push({ ...action.payload})
            }
        },
        removeFromCart: (state, action) => {
            const removedItem = action.payload
            const otheritems = current(state).cart.filter((item) => item !== removedItem);
            state.cart = otheritems;

        }
    }
});

export const {
    addToCart,
    removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;