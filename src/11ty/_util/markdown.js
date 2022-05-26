const markdownIt = require('markdown-it');
const path = require('node:path');

module.exports = function configureMarkdown(eleventyConfig) {
  // Handle internal links

  // markdown-it
  const md = markdownIt({
    html: true,
    breaks: true,
  });

  // Add `target` and `rel` to outgoing links.
  md.use(require('markdown-it-external-links'), {
    externalClassName: 'fancy-external-link',
    internalClassName: 'fancy-internal-link',
    externalTarget: '_blank',
    externalRel: 'noopener noreferrer nofollow',
  });

  // Enable support for footnotes
  md.use(require('markdown-it-footnote'));

  // Support relative links in markdown files. For example:
  // [HTML & CSS]({{ local("HTML CSS Tips & Tricks.md", collections.all) }})
  let collectionsCache;

  eleventyConfig.addNunjucksGlobal('@', function (filename, collections) {
    if (!collectionsCache) {
      collectionsCache = collections;
    }

    const target = collectionsCache.find(
      (item) => filename === path.basename(item.inputPath)
    );

    if (target) {
      return target.url;
    } else {
      throw new Error(`Unable to find file ${filename}`);
    }
  });

  eleventyConfig.setLibrary('md', md);
};
