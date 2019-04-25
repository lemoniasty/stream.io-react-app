import streams from "../apis/streams";
import history from "../history";
import {CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS, SIGN_IN, SIGN_OUT} from "./types";

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

// Step 2
//  Action creator responsible for creating a stream.
export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});

    // Return action object with payload returned from API server.
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });

    // Do some programmatic navigation to get the user back to the root route.
    // We will use our internal history object.
    history.push('/');
};

// Create all others action creators.
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    });
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    });
};

export const editStream = (id, formValues) => async dispatch => {
    // If we want to update ALL properties of a record then we use PUT method.
    // If we want to update SOME properties of a record then we use PATCH method.
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });

    // Do some programmatic navigation to get the user back to the root route.
    // We will use our internal history object.
    history.push('/');
};

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({
        type: DELETE_STREAM,
        payload: id
    });

    // Do some programmatic navigation to get the user back to the root route.
    // We will use our internal history object.
    history.push('/');
};