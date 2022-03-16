import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools}  from "redux-devtools-extension";
import { authReducer } from '../reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };