import React from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
class AddPost extends React.Component {
  state = { img: "", title: "", content: "" };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addPost(this.state);
  };
  render() {
    return (
      <div className="w-full py-16 mx-auto padding-top-div">
        <div className="w-10/12 lg:w-6/12 mx-auto">
          <h4> Add New Image </h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                required
                value={this.state.title}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <textarea
                name="content"
                rows="5"
                required
                value={this.state.content}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Content"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Add New Image
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = { addPost };
export default connect(null, mapDispatchToProps)(AddPost);
