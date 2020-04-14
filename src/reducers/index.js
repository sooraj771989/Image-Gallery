import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postsReducer,
  post: postReducer,
});