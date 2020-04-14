import { createStore, applyMiddleware, compose } from "redux";
import { getPosts } from './actions/postActions';
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const initialState = {};
const middleware = [thunk];
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware,loggerMiddleware),
    )
);
store.dispatch(getPosts());
export default store;