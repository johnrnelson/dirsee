"use strict";


var fs = require("fs");
var path = require("path");

var chokidar = require('chokidar');


var HTMLWriter = require("./HTMLWriter");




function WatchAFolder(FolderPath2Watch) {
    /*
        Read the documentation at https://github.com/paulmillr/chokidar  
    */

    var watcher = chokidar.watch(FolderPath2Watch, {

        ignored: /node_modules|-min.js|\.git/,
        persistent: true,
        depth: 30,
        // followSymlinks: false,
        // useFsEvents: false,
        // usePolling: false
    });
    watcher.on('unlink', (event, path) => {
        // BugLog.Warn(event, path);
            HTMLWriter.WriteFile({
                a: '-', // + is add - is delete and * is edit...
                f: path, //Action
                m: '', // just a simple msg or note...
            });        
    });
    watcher.on('add', (path) => {

    });
    watcher.on('change', (path, stats) => {
        if (stats) {
            HTMLWriter.WriteFile({
                a: '*', // + is add - is delete and * is edit...
                f: path, //Action
                s:JSON.stringify(stats),
                m: '', // just a simple msg or note...
            });
            BugLog.Info('File Change:'+path);
        }
        // console.log(`File ${path} changed size to ${stats.size}`);
    });
    watcher.on('ready', () => {
        BugLog.Info('File Watcher is Ready!');
    })
}
exports.WatchAFolder = WatchAFolder;
