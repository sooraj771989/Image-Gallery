import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { getPosts } from "../../actions/postActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.showGalleryImage = this.showGalleryImage.bind(this);
    this.state = {
      settingsopen: false,
      anchorEl: null,
      img: null,
      title: null,
      content: null,
      author: null,
      openDialogData: false
    };
  }
  options = event => {
    this.setState({
      settingsopen: !this.state.settingsopen,
      anchorEl: event.currentTarget
    });
  };
  closedialog = () => {
    this.setState({ openDialogData: false });
  };
  showGalleryImage = post => {
    console.log(post);
    const { img, title, content, author } = post;
    this.setState({ img: img });
    this.setState({ title: title });
    this.setState({ content: content });
    this.setState({ author: author });
    this.setState({ openDialogData: true });
  };
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (this.props.posts.length) {
      return (
        <div className="w-full flex flex-row py-4 px-4 flex-wrap padding-top-div">
          <div className="mt-6 py-10 text-center w-full font-bold text-2xl">
            ImageGallery
          </div>
          <div className="masonry">
            {this.props.posts.map(post => {
              return (
                <div
                  className="w-full mb-10 px-0 lg:px-4 cell"
                  key={post.id}
                >
                  <div className="relative post-image-div">
                    <div
                      className="dashboard-image "
                      onClick={() => this.showGalleryImage(post)}
                    >
                      <img
                        alt="gallery-img"
                        src={post.img}
                        className="dashboard-post-image object-cover w-full "
                      />
                    </div>
                    <div className=" absolute middle bottom-0 left-0 hidden p-2 mb-5 ml-5 text-sm caption md:block">
                      <p className="text-gray-200 "> {post.author} </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Dialog
              fullWidth={true}
              maxWidth={"md"}
              className="overlay"
              open={this.state.openDialogData}
              onClose={this.closedialog}
            >
              <div className="flex items-center justify-between px-4 py-2">
                <div>
                  <p className="text-gray-600 text-sm"> Author</p>
                  <p className="text-gray-900"> {this.state.author} </p>
                </div>
                <div
                  className="close-icon hover"
                  onClick={this.closedialog}
                  alt="close"
                >
                  <svg
                    version="1.1"
                    viewBox="0 0 32 32"
                    width="20"
                    height="20"
                    aria-hidden="false"
                  >
                    <path d="M25.33 8.55l-1.88-1.88-7.45 7.45-7.45-7.45-1.88 1.88 7.45 7.45-7.45 7.45 1.88 1.88 7.45-7.45 7.45 7.45 1.88-1.88-7.45-7.45z" />
                  </svg>
                </div>
              </div>
              <div className="container w-10/12 modal-card py-4 mb-10 lg:mb-16">
                <img
                  alt="gallery-img"
                  className="dialog-image"
                  src={this.state.img}
                />
                <p className="font-bold mt-8"> {this.state.title} </p>
                <p className="text-gray-600 mt-4"> {this.state.content} </p>
              </div>
            </Dialog>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container flex flex-row py-10 px-10 flex-wrap padding-top-div">
          <div className="py-10 flex justify-center w-full">
            Sorry!! No Images to show
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({ posts: state.posts });

export default connect(
  mapStateToProps,
  { getPosts }
)(Dashboard);
