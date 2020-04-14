import React, { Component } from "react";
class Footer extends Component {
  render() {
    return (
      <div className="text-white bg-black text-center w-full py-10">
        <div className="text-white text-2xl"> ImageGallery </div>
        <div className="text-gray-600 mt-1"> Photos for everyone </div>
        <div className="text-gray-600 text-sm mt-4">
          Developed by 
          <a
            rel="noopener noreferrer"
            className="font-bold"
            target="_blank"
            href="https://sooraj771989.github.io/profile"
          > Sooraj
          </a>
        </div>
      </div>
    );
  }
}
export default Footer;
