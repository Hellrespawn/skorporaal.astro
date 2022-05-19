const Nunjucks = require('nunjucks');
const filters = require('./util/filter.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.setUseGitIgnore(true);

  eleventyConfig.addWatchTarget('./tailwind.config.cjs');
  eleventyConfig.addWatchTarget('./postcss.config.cjs');
  eleventyConfig.addWatchTarget('./src/_assets/styles.css');
  eleventyConfig.addWatchTarget('./src/static/styles.min.css');

  // Filters
  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });

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
