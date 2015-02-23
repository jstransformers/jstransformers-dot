'use strict';

var assert = require('assert');
var fs = require('fs');

var transform = require('../');

var failed = false;

function assertEqual(output, expected) {
  console.log('\tOutput:  ', JSON.stringify(output));
  console.log('\tExpected:', JSON.stringify(expected));
  if (output !== expected) {
    console.log('\tFAILED');
    failed = true;
  } else {
    console.log('\tPASSED');
  }
}

var input = fs.readFileSync(__dirname + '/input.dot', 'utf8');
var locals = {
  heading: 'Heading 1',
  bullets: [
    "Bullet 1",
    "Bullet 2"
  ]
};
var output = transform.compile(input)(locals);
fs.writeFileSync(__dirname + '/output.html', output);
var expected = '<h1>Heading 1</h1><h2>Heading 2</h2><ul><li>Bullet 1</li><li>Bullet 2</li></ul>';

assertEqual(output, expected);

if (failed) {
  console.log('tests FAILED');
  process.exit(1);
} else {
  console.log('tests PASSED');
}
