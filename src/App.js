import React, { Component } from "react";
import "./App.css";

let images = require("./photos").data;

images = images.map(image => {
  return {
    username: image.user.username,
    imageUrl: image.images["standard_resolution"]["url"],
    time: image["created_time"],
    likes: image.likes.count,
    comments: image.comments.count,
    filter: image.filter,
    tags: image.tags
  };
});

let imageRow = [];
let imageRows = [];
imageRows = images.forEach((image, index) => {
    imageRow.push(image)
    if(index === images.length - 1 || imageRow.length > 2) {
      imageRows.push(imageRow);
      imageRow = [];
    }
})

const ImagePanel = ({ image }) => {
  return (
    <div className="panel panel-default col-xs-4">
      <div className="panel-body">
        <img src={image.imageUrl} className="img-responsive" />
        <ul>
          <li>
            {image.username}
          </li>
          <li>
            {image.time}
          </li>
          <li>
            Likes: {image.likes}
          </li>
          <li>
            Comments: {image.comments}
          </li>
          <li>
            Filter: {image.filter}
          </li>
          <li>
            Tags: <ul className="list-inline"> { image.tags.map(tag => <li>{tag}</li>) } </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ImageRow = ({ imageRow }) => {
  return (
    <div className="row">
      {imageRow.map(image => <ImagePanel image={image}/>)}
    </div>
  )
}

const ImageContainer = ({ imageRows }) => {
  return (
    <div className="image">

      {imageRows.map(imageRow => <ImageRow imageRow={imageRow}/>)}
   </div>
  )
}

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
    console.log(images);
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
