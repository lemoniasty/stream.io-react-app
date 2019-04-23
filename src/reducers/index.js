import {combineReducers} from "redux";
// Step 1
//  Import reducer from redux-form library.
import {reducer as formReducer} from "redux-form";
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    // Step 2
    //  Attach reducer from the redux-form library to app reducers.
    form: formReducer
});