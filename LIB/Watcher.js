"use strict";


var fs = require("fs");
var path = require("path");

var chokidar = require('chokidar');

 

// var TodaysFile = new Date().toLocaleDateString().replace(/\//g,'-');
var dataFileName = 'today';

// debugger;
function WriteFile(Data2Write) {
    
    //Date in a serialize-able format...
    var dt = new Date().toLocaleDateString() + ' ' +new Date().toTimeString();
    
    var LINE_OF_DATA = 'ds.A("'+dt+'","'+Data2Write.a+'","'+Data2Write.f+'",'+Data2Write.s+',"'+Data2Write.m+'");\r\n';

    
    fs.appendFile(Configuration.RootPath + '/HTML/data/'+dataFileName+'.js', LINE_OF_DATA, function(err) {
        if (err) {
            BugLog.Error(err);
        }
    });
}





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
    watcher.IsReady = false;
    watcher.on('unlink', (path) => {
        BugLog.Info('File delete:' + path);
        WriteFile({
            a: '-', // + is add - is delete and * is edit...
            f: path, //Action
            s: '{}',
            m: '', // just a simple msg or note...
        });
    });
    
    watcher.on('add', (path) => {
        if (watcher.IsReady) {
            BugLog.Info('File add:' + path);
            fs.stat(path, function(err, stats) {
                //
                WriteFile({
                    a: '+', // + is add - is delete and * is edit...
                    f: path, //Action
                    s: JSON.stringify(stats),
                    m: '', // just a simple msg or note...
                });
            });
        }

    });
    watcher.on('change', (path, stats) => {
        if (stats) {
            WriteFile({
                a: '*', // + is add - is delete and * is edit...
                f: path, //Action
                s: JSON.stringify(stats),
                m: '', // just a simple msg or note...
            });
            BugLog.Info('File Change:' + path);
        }
        // console.log(`File ${path} changed size to ${stats.size}`);
    });
    watcher.on('ready', () => {
        BugLog.Info('File Watcher is Ready!');
        watcher.IsReady = true;
    })
}
exports.WatchAFolder = WatchAFolder;
