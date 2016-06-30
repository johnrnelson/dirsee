"use strict";

var fs = require("fs");
var path = require("path");

// var TodaysFile = new Date().toLocaleDateString().replace(/\//g,'-');
var dataFileName = 'today';

// debugger;
function WriteFile(Data2Write) {

    fs.appendFile(Configuration.RootPath + '/HISTORY/'+dataFileName+'.json', Data2Write, function(err) {
        if (err) {
            return console.log(err);
        }

        // console.log("The file was saved!");
        process.exit(0);
    });
}

exports.WriteFile=WriteFile;