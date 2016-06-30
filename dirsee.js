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



var buglog = require("buglog");
global.BugLog = buglog.Config({
    StackDepth: 6,
    //  ShowDebugInfo: true,
    OnLog: function(LogRecord) {
        return;
        console.log('================================================================================');
        console.log(LogRecord);
        console.log('================================================================================');
    }
}, global);

// Let the user know how to quit...
BugLog.Warn('\r\n\r\n\t\t** Hit CTRL+C to stop this process! **\r\n\r\n');




//Try and read our config file..
try {
    var configFile = fs.readFileSync('./config.json', 'utf8');

    //Try and convert it to JSON...
    try {
        global.Configuration = JSON.parse(configFile);
    }
    catch (errJSONisBAD) {
        BugLog.Error("Bad JSON!");
        console.log(errJSONisBAD)
        process.exit(0);

    }
}
catch (errorMain) {
    if (errorMain.errno = -2) {
        BugLog.Info('Could not find the config.json file needed to configure this process!');
    }
    else {
        BugLog.Error('Fatal Error!!');
        console.log(errorMain);
    }
    process.exit(0);
}




BugLog.Info('Watching folder: ['+Configuration.WatchPath + ']');
// console.log(Configuration);

Configuration.RootPath = __dirname;

var HTMLWriter = require("./LIB/HTMLWriter");
                            
HTMLWriter.WriteFile({
    //Date in a serialize-able format...
    dt:new Date().toLocaleDateString() + ' ' +new Date().toTimeString(),
    a:'+', // + is add - is delete and * is edit...
    f:'a File Info**',//Action
    m:'simple msg aaa', // just a simple msg or note...
});

// process.exit(0);