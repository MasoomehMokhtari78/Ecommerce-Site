import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        registerStart: (state) => {
            state.isFetching = true
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    registerStart,
    registerSuccess,
    registerFailure,
} = userSlice.actions;
export default userSlice.reducer;