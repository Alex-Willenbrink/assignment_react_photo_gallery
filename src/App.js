import React, { Component } from "react";
import logo from "./logo.svg";
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

const ImagePanel = ({
  username,
  imageUrl,
  time,
  likes,
  comments,
  filter,
  tags
}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <img src={imageUrl} className="img-responsive" />
        <ul>
          <li>
            {username}
          </li>
          <li>
            {time}
          </li>
          <li>
            Likes: {likes}
          </li>
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    console.log(images);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
