function sortPost(left, right) {
  const order =
    right.data.date?.getTime() ?? 0 - left.data.date?.getTime() ?? 0;

  if (isNaN(order)) {
    return left.data.title.localeCompare(right.data.title);
  }

  return order;
}

module.exports = {
  filterPosts: (posts) =>
    posts
      .filter((post) => typeof post.data.tags !== 'undefined')
      .sort(sortPost),

  formatDate: (date) =>
    date
      ? date.toLocaleDateString('nl-NL', { dateStyle: 'short' })
      : 'A long time ago...',
};
