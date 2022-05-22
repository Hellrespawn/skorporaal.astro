const htmlmin = require('html-minifier');

module.exports = {
  minifyHtml: (content, outputPath) => {
    if (outputPath && outputPath.endsWith('html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }

    return content;
  },

  minifyJSON: (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.json')) {
      return content.replace(/\s{2}/g, '').trim();
    }

    return content;
  },
};
