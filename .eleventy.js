const Nunjucks = require('nunjucks');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.setUseGitIgnore(true);

  eleventyConfig.addWatchTarget('./tailwind.config.cjs');
  eleventyConfig.addWatchTarget('./postcss.config.cjs');
  eleventyConfig.addWatchTarget('./src/_assets/styles.css');

  eleventyConfig.addFilter('filterPosts', (posts) =>
    posts.filter((post) => typeof post.data.tags !== 'undefined')
  );

  eleventyConfig.addFilter('getPostColor', (post) =>
    post.data.tags.includes('recipe') ? 'bg-accent-500' : 'bg-primary-500'
  );

  eleventyConfig.addFilter('formatDate', (date) =>
    date
      ? date.toLocaleDateString('nl-NL', { dateStyle: 'short' })
      : 'A long time ago...'
  );

  eleventyConfig.addNunjucksGlobal('getFilters', () => [
    ['Recipes', 'recipe', 'bg-accent-500'],
    ['Posts', 'post', 'bg-primary-500'],
  ]);

  return {
    dir: {
      input: './src',
      output: './_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
    markdownTemplateEngine: 'njk',
  };
};
