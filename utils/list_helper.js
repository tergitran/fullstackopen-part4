const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map((blog) => blog.likes));
  const topFavoriteOne = blogs.find((item) => item.likes === max);
  return topFavoriteOne ? {
    title: topFavoriteOne.title,
    author: topFavoriteOne.author,
    likes: topFavoriteOne.likes,
  } : undefined;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return undefined;
  }
  const groupBy = (arr, key) => {
    return arr.reduce((ob, item) => {
        if(Object.keys(ob).includes(item[key])) {
            ob[item[key]].push(item);
        } else {
            ob[item[key]] = [item];
        }
        return ob;
    }, {})
  }
  const listAuthor = groupBy(blogs, 'author');
  const maxBlogs = Math.max(...Object.values(listAuthor).map(item => item.length));
  for (let author of Object.keys(listAuthor)) {
    if (listAuthor[author].length === maxBlogs) {
      return {
        author,
        blogs: listAuthor[author].length
      }
    }
  }
}

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return undefined;
  }
  const groupBy = (arr, key) => {
    return arr.reduce((ob, item) => {
        if(Object.keys(ob).includes(item[key])) {
            ob[item[key]] += item.likes;
        } else {
            ob[item[key]] = item.likes;
        }
        return ob;
    }, {})
  }
  const listAuthor = groupBy(blogs, 'author');
  const maxLikes = Math.max(...Object.values(listAuthor));
  for (let author of Object.keys(listAuthor)) {
    if (listAuthor[author] === maxLikes) {
      return {
        author,
        likes: maxLikes
      }
    }
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
