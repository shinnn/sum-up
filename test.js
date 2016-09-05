'use strict';

const chalk = require('chalk');
const sumUp = require('.');
const test = require('tape');

const enabled = chalk.enabled;

test(`sumUp()${' with non-color environment'.repeat(Number(!!chalk.supportsColor))}`, t => {
  t.strictEqual(sumUp.name, 'sumUp', 'should have a function name.');

  t.strictEqual(
    sumUp({unsupportedObjectKey: 'bar'}),
    '',
    'should return empty string when the object has no supported properties.'
  );

  t.strictEqual(
    sumUp({name: 'foo'}),
    chalk.cyan('foo'),
    'should return the name of the object with cyan color.'
  );

  t.strictEqual(
    sumUp({version: '1.0.0', color: undefined}),
    chalk.gray('v1.0.0'),
    'should return the version of the object with gray color.'
  );

  t.strictEqual(
    sumUp({
      homepage: 'http://nodejs.org/',
      description: 'foo'
    }),
    chalk.gray('http://nodejs.org/') + '\nfoo',
    'should return the homepage URL and description of the object.'
  );

  t.strictEqual(
    sumUp({name: 'å'}, {color: true}),
    chalk.styles.cyan.open + 'å' + chalk.styles.cyan.close,
    'should explicitly add ANSI colors to the string when `color` option is enabled.'
  );

  t.strictEqual(
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

  t.strictEqual(
    sumUp({version: '2.0'}, {color: false}),
    'v2.0',
    'should omit colors from string when `color` option is disabled.'
  );

  t.strictEqual(
    chalk.enabled,
    enabled,
    'should not modify `enabled` property of cached chalk module.'
  );

  t.throws(
    () => sumUp(),
    /TypeError.*undefined is not a plain object. Expected an object of package information, /,
    'should throw a type error when it takes no arguments.'
  );

  t.throws(
    () => sumUp(['A', 'B']),
    /TypeError.*\[ 'A', 'B' \] .*for example npm's package\.json `\{.*\}`\./,
    'should throw a type error when the argument is not a plain object.'
  );

  t.throws(
    () => sumUp({version: '0.0.0'}, Infinity),
    /TypeError.*Infinity is not a plain object\..* must be a plain object or undefined\./,
    'should throw a type error when the second argument is not a plain object.'
  );

  t.throws(
    () => sumUp({version: '1.0.0'}, {color: new Set(['true'])}),
    /TypeError.*Set \{ 'true' \} is neither true nor false\. `color` option must be a Boolean value\./,
    'should throw a type error when `color` option is not a Boolean value.'
  );

  t.end();
});
