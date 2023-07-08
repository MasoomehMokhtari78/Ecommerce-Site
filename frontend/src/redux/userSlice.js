import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState: {
        refresh: '',
        access: '',
        isLoggedIn: false,
        isFetching: false
    },
    reducers: {
        // registerStart: (state) => {
        //     state.isFetching = true
        // },
        // registerSuccess: (state) => {
        //     state.isFetching = false;
        //     state.error = null;

        // },
        // registerFailure: (state) => {
        //     state.isFetching = false;
        //     state.error = 'FAILED';
        //     console.log(state)
        // },
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.isLoggedIn = true;
            state.refresh = action.payload.refresh;
            state.access = action.payload.access;

        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = 'FAILED';
            console.log(state)
        },
        logout: (state) => {
            state.refresh = '';
            state.access = '';
            state.isLoggedIn = false;
            state.isFetching = false;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = userSlice.actions;
export default userSlice.reducer;