import React, { Component } from "react";
import "./App.css";

let images = require("./photos").data;

images = images.map(image => {
  const createdTime = new Date(image["created_time"] * 1000).toString();
  return {
    username: image.user.username,
    userUrl: `https://instagram.com/${image.user.username}`,
    imageUrl: image.images["standard_resolution"]["url"],
    imageInstagram: image.link,
    time: createdTime,
    likes: image.likes.count,
    comments: image.comments.count,
    filter: image.filter,
    tags: image.tags
  };
});

var imageRow = [];
var imageRows = [];
images.forEach((image, index) => {
  imageRow.push(image);
  if (index === images.length - 1 || imageRow.length > 2) {
    imageRows.push(imageRow);
    imageRow = [];
  }
});

const ImagePanel = ({ image }) => {
  return (
    <div className="panel panel-default col-xs-4">
      <div className="panel-body">
        <div className="row">
          <a href={image.imageInstagram}>
            <img src={image.imageUrl} className="img-responsive" />
          </a>
        </div>
        <div className="row">
          posted by <a href={image.userUrl}>{image.username}</a> at {image.time}
        </div>
        <div className="row">
          <div className="col-xs-6">
            Likes: {image.likes}
          </div>
          <div className="col-xs-6">
            Comments: {image.comments}
          </div>
        </div>
        <div className="row">
          Filter: {image.filter}
        </div>
        <div className="row">
          Tags:{" "}
          <ul className="list-inline">
            {" "}{image.tags.map(tag =>
              <li>
                {tag}
              </li>
            )}{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ImageRow = ({ imageRow }) => {
  return (
    <div className="row">
      {imageRow.map(image => <ImagePanel image={image} />)}
    </div>
  );
};

const ImageContainer = ({ imageRows }) => {
  return (
    <div className="image">
      {imageRows.map(imageRow => <ImageRow imageRow={imageRow} />)}
    </div>
  );
};

// class imageContainer extends Component {
//   constructor() {
//     super()
//
//     this.state = {
//       imageRow: image.slice(index, index + ((this.images.length - this.state.index) > 3) ? 3 : this.images.length)),
//       index: 0,
//       images: images
//     }
//   }
//
//
//
//   render() {
//
//   }

// }

class App extends Component {
  render() {
    console.log(imageRows);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Our Photo Gallery!</h2>
        </div>
        <div className="container">
          <ImageContainer imageRows={imageRows} />
        </div>
      </div>
    );
  }
}

export default App;

// proxyConsole.js:56 Warning: Unknown prop `imageRows` on <imageContainer> tag. Remove this prop from the element. For details, see https://fb.me/react-unknown-prop
//     in imageContainer (at App.js:105)
//     in div (at App.js:104)
//     in div (at App.js:100)
//     in App (at index.js:8)
