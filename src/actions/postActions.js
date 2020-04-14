import axios from 'axios';
import history from '../history';
import { RECEIVE_POSTS, ADD_POST, RECEIVE_POST, REMOVE_POST, UPDATE_POST, REPLACE_POST} from "../const";
import { postsAPIUrl } from "../api";

// Get All Posts
export const getPosts = () => {
  return (dispatch) => {
    return axios.get(`${postsAPIUrl}`)
      .then(response => {
        dispatch({type: RECEIVE_POSTS, posts: response.data});
      })
      .catch(error => { throw(error); });
  };
};

// Add Post

export const addPost = ({ title, content }) => {
  return (dispatch) => {
    return axios.post(`${postsAPIUrl}`, {title, content})
      .then(response => {
        let data = response.data;
        dispatch({type: ADD_POST, payload: {id: data.id, title: data.title, content: data.content}})
      })
      .then(() => {
        history.push("/editdashboard")
      })
      .catch(error => { throw(error) });
  };
};

// Get Post
export const getPost = (id) => {
  return (dispatch) => {
    return axios.get(`${postsAPIUrl}/${id}`)
      .then(response => {
        dispatch({type: RECEIVE_POST, post: response.data});
      })
      .catch(error => { 
        throw(error); 
      });
  };
};

// Delete Post
export const deletePost = (id) => {
  return (dispatch) => {
    return axios.delete(`${postsAPIUrl}/${id}`)
      .then(response => {
        dispatch({type: REMOVE_POST, payload: {id}})
      })
      .then(() => {
        history.push("/editdashboard")
      })
      .catch(error => {
        throw(error);
      });
  };
};

// Update Post
export const updatePost = (post) => {
  const postId = post.id;
  return (dispatch) => {
    return axios.patch(`${postsAPIUrl}/${post.id}`, {title: post.title, content: post.content, author: post.author})
      .then(response => {
        const data = response.data;
        dispatch({type: UPDATE_POST, payload: {id: data.id, title: data.title, content: data.content, author: data.author}})
        dispatch({type: REPLACE_POST, payload: {id: data.id, title: data.title, content: data.content, author: data.author}})
      })
      .then(() => {
        history.push(`/post/${postId}`)
      })
      .catch(error => { throw(error) });
  };
};