function sortPost(left, right) {
  const order =
    left.data.date?.getTime() ?? 0 - right.data.date?.getTime() ?? 0;

  if (isNaN(order)) {
    return left.data.title.localeCompare(right.data.title);
  }

  return -order;
}

module.exports = {
  filterPosts: (posts) =>
    posts
      .filter((post) => typeof post.data.tags !== 'undefined')
      .sort(sortPost),

  formatDate: (date) => {
    if (date) {
      let formattedDate = date.toLocaleDateString('nl-NL', {
        dateStyle: 'short',
      });
      return `<time datetime="${formattedDate}">${formattedDate}</time>`;
    }

    return 'A long time ago...';
  },

  getLanguageName: (name) => {
    return {
      nl: 'Dutch',
      en: 'English',
    }[name];
  },
};
