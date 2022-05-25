const filters = require('./src/11ty/_util/filter.js');
const transforms = require('./src/11ty/_util/transform.js');
const configureMarkdown = require('./src/11ty/_util/markdown.js');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  configureMarkdown(eleventyConfig);

  // Filters
  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });

  // Transforms
  Object.entries(transforms).forEach(([name, transform]) => {
    eleventyConfig.addTransform(name, transform);
  });

  eleventyConfig.addPassthroughCopy('src/11ty/assets');

  // Generated CSS is in .gitignore, but must be watched for --serve
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget('./tailwind.config.cjs');
  eleventyConfig.addWatchTarget('./postcss.config.cjs');

  eleventyConfig.addWatchTarget('./src/scripts/');
  eleventyConfig.addWatchTarget('./src/styles/');

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: './src/11ty',
      output: './_site',
      includes: '_includes',
      layouts: '_includes/layouts',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
    markdownTemplateEngine: 'njk',
  };
};
