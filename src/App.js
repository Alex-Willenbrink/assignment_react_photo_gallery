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

let filters = [];
images.forEach(image => {
  if (!filters.includes(image.filter)) filters.push(image.filter);
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
          posted by
          <a href={image.userUrl}>{image.username}</a>
          at {image.time}
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

class ImageContainer extends Component {
  constructor() {
    super();

    this.state = {
      filter: null
    };
  }

  // filterImages = () => {
  //   let filteredImages = [];
  //   this.images.forEach(image => {
  //     if (image.filter === this.state.filter) {
  //       filteredImages.push(image);
  //     }
  //   });

  //   let imageRow = [];
  //   let imageRows = [];
  //   filteredImages.forEach((image, index) => {
  //     imageRow.push(image);
  //     if (index === filteredImages.length - 1 || imageRow.length > 2) {
  //       imageRows.push(imageRow);
  //       imageRow = [];
  //     }
  //   });
  // };

  handleFilter = newFilter => {
    console.log("in handleFilter!");
    console.log(newFilter);
    this.setState({ filter: newFilter });
    console.log(this.state.filter);
  };

  render() {
    const { filter, imageRows } = this.state;
    return (
      <div>
        <DropDownFilter
          onChange={e => {
            console.log(e);
            this.handleFilter(e.target.value);
          }}
        />

        {/*<div className="image">
          {imageRows.map(imageRow => <ImageRow imageRow={imageRow} />)}
        </div>*/}

        <div>
          {this.state.filter}
        </div>
      </div>
    );
  }
}

const DropDownFilter = ({ onChange }) => {
  let instagramFilters = [
    "Normal",
    "Lark",
    "Reyes",
    "Valencia",
    "Inkwell",
    "Ludwig"
  ];
  return (
    <select onChange={onChange}>
      {instagramFilters.map(filter =>
        <option value={filter} key={filter}>
          {filter}
        </option>
      )}
    </select>
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
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Our Photo Gallery!</h2>
        </div>
        <div className="container">
          <ImageContainer />
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
