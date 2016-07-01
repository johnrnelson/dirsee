"use strict";

var fs = require("fs");
var path = require("path");

// var TodaysFile = new Date().toLocaleDateString().replace(/\//g,'-');
var dataFileName = 'today';

// debugger;
function WriteFile(Data2Write) {
    
    //Date in a serialize-able format...
    var dt = new Date().toLocaleDateString() + ' ' +new Date().toTimeString();
    
    var LINE_OF_DATA = '"'+dt+'","'+Data2Write.a+'","'+Data2Write.f+'","'+Data2Write.m+'"\r\n';
    fs.appendFile(Configuration.RootPath + '/HISTORY/'+dataFileName+'.json', LINE_OF_DATA, function(err) {
        if (err) {
            return console.log(err);
        }
        // console.log("The file was saved!");
        // process.exit(0);
    });
}

exports.WriteFile=WriteFile;