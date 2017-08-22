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

const instagramFilters = [
  {
    text: "",
    value: ""
  }, {
    text: "Normal",
    value: "Normal"
  }, {
    text: "Lark",
    value: "Lark"
  }, {
    text: "Reyes",
    value: "Reyes"
  }, {
    text: "Valencia",
    value: "Valencia"
  }, {
    text: "Inkwell",
    value: "Inkwell"
  }, {
    text: "Ludwig",
    value: "Ludwig"
  }
];

const sortFilters = [
  {
    text: "",
    value: ""
  }, {
    text: "Likes Ascending",
    value: "likes-A"
  }, {
    text: "Likes Descending",
    value: "likes-D"
  }, {
    text: "Comments Ascending",
    value: "comments-A"
  }, {
    text: "Comments Descending",
    value: "comments-D"
  }, {
    text: "Username Ascending",
    value: "username-A"
  }, {
    text: "Username Descending",
    value: "username-D"
  }
]

module.exports = {
  images,
  instagramFilters,
  sortFilters
}
