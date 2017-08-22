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
    <div className="panel panel-default">
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
          Tags:
          <ul className="list-inline">
            {image.tags.map(tag =>
              <li key={tag}>
                {tag}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// const ImageRow = ({ imageRow }) => {
//   return (
//     <div className="row">
//       {imageRow.map(image => <ImagePanel image={image} />)}
//     </div>
//   );
// };

class ImageContainer extends Component {
  constructor(props) {
    super(props);

    const endPoint =
      this.props.images.length < 12 ? this.props.images.length : 12;

    this.state = {
      filter: null,
      filteredImages: this.props.images,
      currentImages: this.props.images.slice(0, endPoint),
      page: 1
    };
  }

  filterImages = () => {
    let filteredImages = [];
    images.forEach(image => {
      if (image.filter === this.state.filter || !this.state.filter) {
        filteredImages.push(image);
      }
    });

    this.setState({ filteredImages: filteredImages }, () => {
      this.currentPage();
    });
  };

  currentPage = () => {
    const numImages = this.state.filteredImages.length;
    const startPoint = (this.state.page - 1) * 12;
    const endPoint = startPoint + 12 > numImages ? numImages : startPoint + 12;
    this.setState({
      currentImages: this.state.filteredImages.slice(startPoint, endPoint)
    });
  };

  handleFilter = newFilter => {
    console.log("in handleFilter!");
    console.log(newFilter);
    this.setState({ filter: newFilter }, () => {
      this.filterImages();
    });
  };

  handlePageChange = newPage => {
    this.setState({ page: parseInt(newPage) }, () => {
      this.currentPage();
    });
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

        <p>
          <strong>Results found:</strong> {this.state.filteredImages.length}
        </p>

        <PageNav
          numImages={this.state.filteredImages.length}
          currentPage={this.state.page}
          onClick={e => {
            e.preventDefault();
            this.handlePageChange(e.target.text);
          }}
        />

        <div className="image image-grid">
          {this.state.currentImages.map(image =>
            <ImagePanel image={image} key={image.imageUrl} />
          )}
        </div>
      </div>
    );
  }
}

const PageNav = ({ numImages, currentPage, onClick }) => {
  const pageArray = new Array(Math.ceil(numImages / 12)).fill(0);

  return (
    <div>
      {pageArray.map((val, i) =>
        <span>
          <span>&nbsp;&nbsp;</span>
          <a onClick={onClick}>
            {i + 1}
          </a>
          <span>&nbsp;&nbsp;</span>
        </span>
      )}
    </div>
  );
};

// {
//   i === currentPage
//     ? <span>
//         {i + 1}
//       </span>
//     : <a onClick={onClick}>
//         {i + 1}
//       </a>;
// }

const DropDownFilter = ({ onChange }) => {
  let instagramFilters = [
    "",
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
        <ImageContainer images={images} />
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
