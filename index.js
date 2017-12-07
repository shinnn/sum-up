'use strict';

const Chalk = require('chalk').constructor;
const inspectWithKind = require('inspect-with-kind');

module.exports = function sumUp(pkgData, options) {
	if (!pkgData || Array.isArray(pkgData) || typeof pkgData !== 'object') {
		throw new TypeError(`Expected an object of package information \`{name: ... version: ..., description: ..., ...}\`, but got ${
			inspectWithKind(pkgData)
		}.`);
	}

	if (options) {
		if (Array.isArray(options) || typeof options !== 'object') {
			throw new TypeError(`The second argument of sum-up must be a plain object or undefined, but got ${
				inspectWithKind(options)
			}.`);
		}
	} else {
		options = {};
	}

	const chalkOption = {};

	if (options.color === true) {
		chalkOption.enabled = true;
		chalkOption.level = 1;
	} else if (options.color === false) {
		chalkOption.enabled = false;
		chalkOption.level = 0;
	} else if (options.color !== undefined) {
		throw new TypeError(`Expected \`color\` option to be a Boolean value, but got ${
			inspectWithKind(options.color)
		}.`);
	}

	const chalk = new Chalk(chalkOption);
	const lines = [];

	const nameAndVersion = `${chalk.cyan(pkgData.name || '')}${
		pkgData.version ? `${pkgData.name ? ' ' : ''}${chalk.gray(`v${pkgData.version}`)}` : ''
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
