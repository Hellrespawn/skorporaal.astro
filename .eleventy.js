module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.setUseGitIgnore(true);
  eleventyConfig.addWatchTarget('./tailwind.config.cjs');
  eleventyConfig.addWatchTarget('./postcss.config.cjs');
  eleventyConfig.addWatchTarget('./src/_assets/styles.css');

  eleventyConfig.setEjsOptions({ context: eleventyConfig.javascriptFunctions });

  return {
    dir: {
      input: './src',
      output: './_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    templateFormats: ['html', 'md', 'ejs', 'njk'],
    passthroughFileCopy: true,
    markdownTemplateEngine: 'ejs',
  };
};
