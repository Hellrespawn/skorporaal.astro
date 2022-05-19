module.exports = {
  filterPosts: (posts) =>
    posts
      .filter((post) => typeof post.data.tags !== 'undefined')
      .sort(
        (a, b) => a.data.date?.getTime() ?? 0 - b.data.date?.getTime() ?? 0
      ),

  formatDate: (date) =>
    date
      ? date.toLocaleDateString('nl-NL', { dateStyle: 'short' })
      : 'A long time ago...',
};
