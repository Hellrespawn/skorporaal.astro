module.exports = {
  filterPosts: (posts) =>
    posts.filter((post) => typeof post.data.tags !== 'undefined'),

  formatDate: (date) => {
    if (date) {
      let formattedDate = date.toLocaleDateString('nl-NL', {
        dateStyle: 'short',
      });
      return `<time datetime="${formattedDate}">${formattedDate}</time>`;
    }

    return 'A long time ago...';
  },

  toISOString: (date) => {
    return date.toISOString();
  },
};
