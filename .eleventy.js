const filters = require('./util/filter.js');
const transforms = require('./util/transform.js');
const markdownIt = require('markdown-it');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  // Markdown
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  md.use(require('markdown-it-external-links'), {
    externalClassName: null,
    internalClassName: null,
    externalTarget: '_blank',
    externalRel: 'noopener noreferrer nofollow',
  });

  md.use(require('markdown-it-footnote'));

  eleventyConfig.setLibrary('md', md);

  // Filters
  Object.entries(filters).forEach(([name, filter]) => {
    eleventyConfig.addFilter(name, filter);
  });

  // Transforms
  Object.entries(transforms).forEach(([name, transform]) => {
    eleventyConfig.addTransform(name, transform);
  });

  eleventyConfig.addPassthroughCopy('src/static');

  // Generated CSS is in .gitignore, but must be watched for --serve
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget('./tailwind.config.cjs');
  eleventyConfig.addWatchTarget('./postcss.config.cjs');

  eleventyConfig.setQuietMode(true);
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
