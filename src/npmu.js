#!/usr/bin/env node

'use strict';

const npm = 'npm';
const npmu = require('./index');
const meow = require('meow');

const cli = meow(`
  Usage
    $ npmu
`);

npmu(npm);
