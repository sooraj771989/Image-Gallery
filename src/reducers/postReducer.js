import { RECEIVE_POST } from '../const';

export default function postReducer(state = {}, action) {  
  switch (action.type) {
    case RECEIVE_POST:                                     
      return action.post;
    default:
      return state;
  }
};