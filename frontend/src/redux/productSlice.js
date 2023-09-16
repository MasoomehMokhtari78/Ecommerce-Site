import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name:'products',
    initialState: {
        products: [],
        category: null,
    },
    reducers: {
        setCategory: (state, action) =>{
            state.category = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        }
    }
});

export const {
    setCategory,
    setProducts,
} = productSlice.actions;
export default productSlice.reducer;