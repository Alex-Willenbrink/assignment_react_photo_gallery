import React, {Component} from "react";
import "./App.css";
import ImagePanel from "./ImagePanel";
import PageNav from "./PageNav";
import DropDownFilter from "./DropDownFilter";
const { images, instagramFilters, sortFilters } = require('./data');


class ImageContainer extends Component {
  constructor(props) {
    super(props);

    const endPoint = this.props.images.length < 12
      ? this.props.images.length
      : 12;

    this.state = {
      filter: null,
      sortType: null,
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

    this.setState({
      filteredImages: filteredImages
    }, () => {
      this.sortImages();
    });
  };

  currentPage = () => {
    const numImages = this.state.filteredImages.length;
    const startPoint = (this.state.page - 1) * 12;
    const endPoint = startPoint + 12 > numImages
      ? numImages
      : startPoint + 12;
    this.setState({
      currentImages: this.state.filteredImages.slice(startPoint, endPoint)
    });
  };

  sortImages = () => {
    if (!this.state.sortType) {
      this.currentPage();
      return;
    }

    const [sortType,
      direction] = this.state.sortType.split("-");

    const sortA = (a, b) => a[sortType] > b[sortType]
      ? 1
      : -1

    const sortD = (a, b) => a[sortType] > b[sortType]
      ? -1
      : 1

    const sortedImages = direction === 'A'
      ? this.state.filteredImages.sort(sortA)
      : this.state.filteredImages.sort(sortD)

    this.setState({
      filteredImages: sortedImages,
      page: 1
    }, () => {
      this.currentPage()
    })
  }

  handleFilter = newFilter => {
    console.log("in handleFilter!");
    console.log(newFilter);
    this.setState({
      filter: newFilter,
      page: 1
    }, () => {
      this.filterImages();
    });
  };

  

  handleSort = newSort => {
    this.setState({
      sortType: newSort
    }, () => this.sortImages())
  }

  handlePageChange = newPage => {
    this.setState({
      page: parseInt(newPage)
    }, () => {
      this.currentPage();
    });
  };

  render() {
    const {filter, imageRows} = this.state;
    return (
      <div>
        <DropDownFilter onChange={e => {
          console.log(e);
          this.handleFilter(e.target.value);
        }} filterArray={instagramFilters}/>

        <DropDownFilter onChange={e => {
          console.log(e);
          this.handleSort(e.target.value);
        }} filterArray={sortFilters}/>

        <p>
          <strong>Results found:</strong>
          {this.state.filteredImages.length}
        </p>

        <PageNav numImages={this.state.filteredImages.length} currentPage={this.state.page} onClick={e => {
          e.preventDefault();
          this.handlePageChange(e.target.text);
        }}/>

        <div className="image image-grid">
          {this.state.currentImages.map(image => <ImagePanel image={image} key={image.imageUrl}/>)}
        </div>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Our Photo Gallery!</h2>
        </div>
        <ImageContainer images={images}/>
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
