module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.setUseGitIgnore(true);

  return {
    dir: {
      input: './src',
      output: './_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    templateFormats: ['html', 'md', 'ejs'],
    passthroughFileCopy: true,
  };
};
