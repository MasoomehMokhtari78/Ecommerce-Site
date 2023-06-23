import { publicRequest } from "../requestMethods";
import { registerStart, registerFailure, registerSuccess } from "./userSlice";

export const register = async (dispatch, user) => {
    // TODO: why send dispatch from register app
    dispatch(registerStart());
    try {
        const res = await publicRequest.post('/register', user);
        dispatch(registerSuccess(res.data));
    } catch (error) {
        dispatch(registerFailure())
    }
}