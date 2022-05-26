const htmlmin = require('html-minifier');
const katex = require('katex');

module.exports = {
  katex: (content) => {
    return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
      return katex.renderToString(equation);
    });
  },

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
