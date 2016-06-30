"use strict";

var fs = require("fs");
var path = require("path");

// var TodaysFile = new Date().toLocaleDateString().replace(/\//g,'-');
var TodaysFile = 'today';

// debugger;
function WriteFile(Data2Write) {

    fs.appendFile(Configuration.RootPath + '/HISTORY/'+TodaysFile+'.html', Data2Write, function(err) {
        if (err) {
            return console.log(err);
        }

        // console.log("The file was saved!");
        // process.exit(0);
    });
}

exports.WriteFile=WriteFile;