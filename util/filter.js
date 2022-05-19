module.exports = {
  filterPosts: (posts) =>
    posts.filter((post) => typeof post.data.tags !== 'undefined'),

  formatDate: (date) =>
    date
      ? date.toLocaleDateString('nl-NL', { dateStyle: 'short' })
      : 'A long time ago...',

  getPostColor: (post) =>
    post.data.tags.includes('recipe') ? 'bg-accent-500' : 'bg-primary-500',
};
