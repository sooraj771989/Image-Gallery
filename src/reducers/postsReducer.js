import { RECEIVE_POSTS, ADD_POST, REMOVE_POST } from '../const';

const initialState = { posts: [] }

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.payload, ...state];
    case REMOVE_POST:
      return state.filter(post => post.id !== action.payload.id);
    default:
      return state;
  }
}