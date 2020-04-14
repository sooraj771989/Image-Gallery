import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/postActions";


class InfoPost extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const post = this.props.post;
    return (
      <div className="w-full py-16 mx-auto padding-top-div">
        <div className="justify-center flex mt-16 flex-col mx-auto w-10/12 lg:w-6/12 mx-auto">
          <div>
            <img
              alt="gallery-img"
              className="post-edit-image"
              src={post.img}
            />
          </div>
          <h2 className="font-bold mt-6"> {post.title} </h2>
          <p className="text-gray-600 mt-4"> {post.content} </p>
          <p className="text-gray-600 mt-4">
            <span className="text-black font-bold"> Uploaded By: </span>
            {post.author}
          </p>
          <div className="btn-group mt-4 mb-4">
            <Link
              to={{
                pathname: `/post/${post.id}/edit`,
                state: { post: post },
              }}
              className="btn btn-info mr-4 "
            >
              Edit
            </Link>
           
            <Link to="/editdashboard" className="btn btn-primary mr-4 ">
              Close
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ post: state.post });
const mapDispatchToProps = { getPost };
export default connect(mapStateToProps, mapDispatchToProps)(InfoPost);
