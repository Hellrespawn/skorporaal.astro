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

  formatDateTime: (date) => {
    let formattedDate = date.toLocaleString('nl-NL', {
      dateStyle: 'short',
      timeStyle: 'long',
    });
    return `<time datetime="${date.toISOString()}">${formattedDate}</time>`;
  },

  toISOString: (date) => {
    return date.toISOString();
  },
};
