const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const externalLinks = require('markdown-it-external-links');
const filters = require('./util/filter.js');
const markdownIt = require('markdown-it');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  // Markdown
  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const md = markdownIt(options);
  md.use(externalLinks, {
    externalClassName: null,
    internalClassName: null,
    externalTarget: '_blank',
    externalRel: 'noopener noreferrer nofollow',
  });

  eleventyConfig.setLibrary('md', md);

  // Filters
  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });

  eleventyConfig.addPassthroughCopy('src/static');
  eleventyConfig.setUseGitIgnore(true);

  eleventyConfig.addWatchTarget('./tailwind.config.cjs');
  eleventyConfig.addWatchTarget('./postcss.config.cjs');
  eleventyConfig.addWatchTarget('./src/_assets/styles.css');
  eleventyConfig.addWatchTarget('./src/static/styles.min.css');

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

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
