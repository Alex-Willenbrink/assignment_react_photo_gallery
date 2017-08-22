import React from "react";

const ImagePanel = ({image}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <div className="row">
          <a href={image.imageInstagram}>
            <img src={image.imageUrl} className="img-responsive"/>
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
            {image.tags.map(tag => <li key={tag}>
              {tag}
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;
