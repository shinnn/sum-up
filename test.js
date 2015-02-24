'use strict';

var chalk = require('chalk');
var sumUp = require('./');
var test = require('tape');

var enabled = chalk.enabled;

var environment = '';
/* istanbul ignore if */
if (!chalk.supportsColor) {
  environment = ' with non-color environment';
}

test('sumUp()' + environment, function(t) {
  t.plan(11);

  t.equal(sumUp.name, 'sumUp', 'should have a function name.');

  t.equal(
    sumUp({unsupportedObjectKey: 'bar'}),
    '',
    'should return empty string when the object has no supported properties.'
  );

  t.equal(
    sumUp({name: 'foo'}),
    chalk.cyan('foo'),
    'should return the name of the object with cyan color.'
  );

  t.equal(
    sumUp({version: '1.0.0', color: undefined}),
    chalk.gray('v1.0.0'),
    'should return the version of the object with gray color.'
  );

  t.equal(
    sumUp({
      homepage: 'http://nodejs.org/',
      description: 'foo'
    }),
    chalk.gray('http://nodejs.org/') + '\nfoo',
    'should return the homepage URL and description of the object.'
  );

  t.equal(
    sumUp({
      name: 'å',
      color: true
    }),
    chalk.styles.cyan.open + 'å' + chalk.styles.cyan.close,
    'should explicitly add ANSI colors to the string when `color` option is enabled.'
  );

  t.equal(
    sumUp({
      name: 'foo',
      version: '1.0.0',
      homepage: 'http://nodejs.org/',
      description: 'bar'
    }),
    [
      chalk.cyan('foo') + ' ' + chalk.gray('v1.0.0'),
      chalk.gray('http://nodejs.org/'),
      'bar'
    ].join('\n'),
    'should join all supported properties into a string.'
  );

  t.equal(
    sumUp({version: '2.0', color: false}),
    'v2.0',
    'should omit colors from string when `color` option is disabled.'
  );

  t.strictEqual(
    chalk.enabled,
    enabled,
    'should not modify `enabled` property of cached chalk module.'
  );

  t.throws(
    sumUp.bind(null),
    /TypeError.*must be an object\./,
    'should throw a type error when it takes no arguments.'
  );

  t.throws(
    sumUp.bind(null, true),
    /TypeError.*must be an object\./,
    'should throw a type error when the argument is not an object.'
  );
});
