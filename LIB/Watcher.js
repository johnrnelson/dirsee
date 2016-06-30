
"use strict";


var fs = require("fs");
var path = require("path");

var chokidar = require('chokidar');



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
    });
    watcher.on('add', (path) => {
        var fPath = GetFilePaths(path);


        fs.stat(fPath.FullPath, function(err, stats) {
            fPath.FullPathEditDate = stats.mtime.getTime();
            fs.stat(fPath.MinFile, function(err, stats) {

                if (err) {
                    // debugger;;
                    BugLog.Info('No Min File Found : ' + fPath.MinFile);
                    ServiceAPI.Compiler(fPath.FullPath, fPath.MinFile);
                }
                else {
                    var MinFileEdit = stats.mtime.getTime();

                    var diffTime = MinFileEdit - fPath.FullPathEditDate;

                    if (diffTime < 0) {

                        BugLog.Info('Min File Time Diff : ' + diffTime + ' |  ' + fPath.FullPath);
                        ServiceAPI.Compiler(fPath.FullPath, fPath.MinFile);

                    }
                    else {
                        // BugLog.Info('File is OK-->'+ fPath.FullPath);
                    }
                };

            });

        });
    });
    watcher.on('change', (path, stats) => {
        if (stats) {
            var fPath = GetFilePaths(path);
            BugLog.Info('File changed so compiling ==> ' + fPath.FullPath);
            ServiceAPI.Compiler(fPath.FullPath, fPath.MinFile);
        }
        // console.log(`File ${path} changed size to ${stats.size}`);
    });
    watcher.on('ready', () => {
        BugLog.Info('File Watcher is Ready!');
    })
}
exports.WatchAFolder = WatchAFolder;
