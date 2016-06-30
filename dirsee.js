#!/usr/bin/env node

"use strict";

var nodeVer = process.version.substr(1, process.version.length - 1).split('.');
if (parseInt(nodeVer[0]) < 5) {
    console.log('Your version of node[' + process.version + '] is not supported.');
    process.exit(0)
};



var fs = require("fs");
var path = require("path");

var chokidar = require('chokidar');

var contents = fs.readFileSync('./config.json', 'utf8');
console.log(contents);
process.exit(0);


