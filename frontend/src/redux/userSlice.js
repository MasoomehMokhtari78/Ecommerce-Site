import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState: {
        refresh: '',
        access: '',
        id: null,
        favoriteProducts: [],
        isLoggedIn: false,
        isFetching: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            console.log("loginSuccess")
            console.log(action)
            state.isFetching = false;
            state.isLoggedIn = true;
            state.refresh = action.payload.refresh;
            state.access = action.payload.access;
            state.id = action.payload.id;
            state.favoriteProducts = action.payload.favoriteProducts;

        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = 'FAILED';
            console.log(state)
        },
        logout: (state) => {
            //TODO: set to original state
            state.refresh = '';
            state.access = '';
            state.id = null;
            state.favoriteProducts = [];
            state.isLoggedIn = false;
            state.isFetching = false;
        },
        addFavorite: (state, action) => {
            state.favoriteProducts = action.payload;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    addFavorite
} = userSlice.actions;
export default userSlice.reducer;