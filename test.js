'use strict';

var chalk = require('chalk');
var sumUp = require('./');
var test = require('tape');

var cyan = chalk.cyan;
var gray = chalk.gray;
var supportsColor = chalk.supportsColor;

test('sumUp()', function(t) {
  t.plan(10);

  t.equal(sumUp.name, 'sumUp', 'should have a function name.');

  t.equal(
    sumUp({foo: 'bar'}), '',
    'should return empty string when the object has no supported properties.'
  );

  t.equal(
    sumUp({name: 'foo'}), cyan('foo'),
    'should return the name of the object with cyan color.'
  );

  t.equal(
    sumUp({version: '1.0.0', color: undefined}),
    gray('v1.0.0'),
    'should return the version of the object with gray color.'
  );

  t.equal(
    sumUp({
      homepage: 'http://nodejs.org/',
      description: 'foo',
      color: true
    }),
    gray('http://nodejs.org/') + '\n' + 'foo',
    'should return the homepage URL and description of the object.'
  );

  t.equal(
    sumUp({
      name: 'foo',
      version: '1.0.0',
      homepage: 'http://nodejs.org/',
      description: 'bar'
    }),
    [
      cyan('foo') + ' ' + gray('v1.0.0'),
      gray('http://nodejs.org/'),
      'bar'
    ].join('\n'),
    'should join all supported properties into a string.'
  );

  t.equal(
    sumUp({version: '2.0', color: false}), 'v2.0',
    'should omit colors from string when `color` option is disabled.'
  );

  t.strictEqual(
    chalk.supportsColor,
    supportsColor,
    'should not modify `supportsColor` property of cached chalk module.'
  );

  t.throws(
    sumUp.bind(null), /TypeError.*must be an object\./,
    'should throw a type error when it takes no arguments.'
  );

  t.throws(
    sumUp.bind(null, true),  /TypeError.*must be an object\./,
    'should throw a type error when the argument is not an object.'
  );
});
