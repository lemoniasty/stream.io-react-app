import {SIGN_IN, SIGN_OUT} from "./types";

// Action for sign in.
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
};

// Action for sign out.
export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};