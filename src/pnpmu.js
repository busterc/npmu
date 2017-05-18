#!/usr/bin/env node

'use strict';

const npm = 'pnpm';
const npmu = require('./index');
const meow = require('meow');

const cli = meow(`
  Usage
    $ pnpmu
`);

npmu(npm);
