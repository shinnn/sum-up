/*!
 * sum-up | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/sum-up
*/
'use strict';

var chalk = require('chalk');

function noColor(str) {
  return str;
}

module.exports = function sumUp(data) {
  if (typeof data !== 'object') {
    throw new TypeError('Argument to sum-up must be an object.');
  }

  var cyan;
  var gray;

  if (chalk.supportsColor && data.color === undefined || data.color) {
    cyan = chalk.cyan;
    gray = chalk.gray;
  } else {
    cyan = gray = noColor;
  }

  var lines = [];

  var nameAndVersion = cyan(data.name || '');
  if (data.version) {
    if (data.name) {
      nameAndVersion += ' ';
    }
    nameAndVersion += gray('v' + data.version);
  }

  if (nameAndVersion) {
    lines.push(nameAndVersion);
  }

  if (data.homepage) {
    lines.push(gray(data.homepage));
  }

  if (data.description) {
    lines.push(data.description);
  }

  return lines.join('\n');
};
