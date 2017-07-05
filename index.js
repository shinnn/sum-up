/*!
 * sum-up | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/sum-up
*/
'use strict';

const util = require('util');

const Chalk = require('chalk').constructor;

module.exports = function sumUp(pkgData, options) {
  if (!pkgData || Array.isArray(pkgData) || typeof pkgData !== 'object') {
    throw new TypeError(
      util.inspect(pkgData) +
      ' is not a plain object. Expected an object of package information,' +
      ' for example npm\'s package.json `{name: ... version: ..., description: ..., ...}`.'
    );
  }

  if (options) {
    if (Array.isArray(options) || typeof options !== 'object') {
      throw new TypeError(
        util.inspect(options) +
        ' is not a plain object. The second argument of sum-up must be a plain object or undefined.'
      );
    }
  } else {
    options = {};
  }

  if (options.color !== undefined && typeof options.color !== 'boolean') {
    throw new TypeError(
      util.inspect(options.color) +
      ' is neither true nor false. `color` option must be a Boolean value.'
    );
  }

  const chalkOption = {};

  if (options.color !== undefined) {
    chalkOption.enabled = options.color;
  }

  const chalk = new Chalk(chalkOption);
  const lines = [];

  const nameAndVersion = `${chalk.cyan(pkgData.name || '')}${
    pkgData.version ? `${pkgData.name ? ' ' : ''}${chalk.gray('v' + pkgData.version)}` : ''
  }`;

  if (nameAndVersion) {
    lines.push(nameAndVersion);
  }

  if (pkgData.homepage) {
    lines.push(chalk.gray(pkgData.homepage));
  }

  if (pkgData.description) {
    lines.push(pkgData.description);
  }

  return lines.join('\n');
};
