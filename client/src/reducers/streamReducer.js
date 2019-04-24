// Step 3
//  Prepare stream reducer.
import _ from "lodash";
import {CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {

        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};

        case EDIT_STREAM:
        case FETCH_STREAM:
        case CREATE_STREAM:
            // Key interpolation!
            return {...state, [action.payload.id]: action.payload};

        case DELETE_STREAM:
            return _.omit(action, action.payload);

        default:
            return state;
    }
}