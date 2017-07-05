'use strict';

const {cyan} = require('ansi-styles');
const chalk = require('chalk');
const sumUp = require('.');
const test = require('tape');

const enabled = chalk.enabled;

test(`sumUp()${' with non-color environment'.repeat(Number(chalk.supportsColor))}`, t => {
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
    sumUp({name: 'å'}, {color: true}),
    `${cyan.open}å${cyan.close}`,
    'should explicitly add ANSI colors to the string when `color` option is enabled.'
  );

  t.equal(
    sumUp({
      name: 'foo',
      version: '1.0.0',
      homepage: 'http://nodejs.org/',
      description: 'bar'
    }),
    `${chalk.cyan('foo')} ${chalk.gray('v1.0.0')}
${chalk.gray('http://nodejs.org/')}
bar`,
    'should join all supported properties into a string.'
  );

  t.equal(
    sumUp({version: '2.0'}, {color: false}),
    'v2.0',
    'should omit colors from string when `color` option is disabled.'
  );

  t.equal(
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
    /TypeError.*\[ 'A', 'B' ] .*for example npm's package\.json `\{.*\}`\./,
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
