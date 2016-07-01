//Setup the Dashboard API...
var Dashboard = {
    DB: {
        //The local database... :-)
        Rows: [
            //Added to after we open our local files...
        ],
    },

    //Get a file from our host acting as a server... 
    GetFile: function(Request, Response) {
        var xhr = new XMLHttpRequest();
        xhr.open(Request.m, Request.u, true);
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    Response(null, xhr.responseText);
                }
                else {
                    Response(xhr.statusText, null);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    },
    OpenLocalFiles: function(OnOpen) {

        // GetFILE();
        var req = {
            m: 'GET',
            u: 'HISTORY/today.json',
        };


        Dashboard.GetFile(req, function(Err, ResponseData) {
            if (Err) {
                // console.info(Err);
                OnOpen(Err);
            }
            else {
                var linesOdata = ResponseData.split('\r\n');
                var lData, cData;

                for (var l = 0; l < linesOdata.length; l++) {
                    lData = linesOdata[l];
                    if (lData.length > 1) {
                        cData = lData.split(",");
                        var action = cData[1];
                        var actionICON = '<i class="fa fa-question-circle" aria-hidden="true"></i>';
                        // console.info(actionICON)

                        if (action == '"*"') {
                            actionICON = '<i class="fa fa-pencil-square" aria-hidden="true"></i>';
                        }
                        if (action == '"-"') {
                            actionICON = '<i class="fa fa-minus-circle" aria-hidden="true"></i>';
                        }

                        if (action == '"+"') {
                            actionICON = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

                        }
                        // debugger;

                        var displayDate = moment(new Date(cData[0])).calendar();

                        function STRIPQ(String2Strip) {
                            return String2Strip.substr(1, String2Strip.length - 2);
                        }

                        Dashboard.DB.Rows.push({
                            dt: displayDate,
                            // dt: new Date(cData[0]), //date time
                            a: actionICON, //action
                            f: STRIPQ(cData[2]), // file statz
                            m: STRIPQ(cData[3]) //message 
                        });
                    }
                    else {
                        cData = null
                    }
                }

                OnOpen(null);
            }
        });
    },
    /*
        A stands for ADD! We keep it simple so the history file 
        can be as small as possible...
    */
    A: function(DateTimeOfLogItem, Action, FilePath, FileStats, MSG) {
        // console.log(this.arguments);
        var tr = document.createElement('tr');
        tr.className='DataRow';
        tr.FileInfo = {
            dt: DateTimeOfLogItem,
            a: Action,
            f: FilePath,
            // s: FileStats,
            m: MSG
        };
        tr.onclick=function(evt){
            console.info(evt,this.FileInfo);
        }
        var displayDate = moment(new Date(DateTimeOfLogItem)).calendar();

        var actionICON = '<i class="fa fa-question-circle" aria-hidden="true"></i>';

        if (Action == '*') {
            actionICON = '<i class="fa fa-pencil-square" aria-hidden="true"></i>';
        }
        if (Action == '-') {
            actionICON = '<i class="fa fa-minus-circle" aria-hidden="true"></i>';
        }

        if (Action == '+') {
            actionICON = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

        }


        var FileStatsHTML = '';
        var FileSizeHTML = '';
 

        //If the file has stats...
        if (Object.keys(FileStats).length) {
            console.log(FileStats);
            FileStats.birthtime = new Date(FileStats.birthtime);
            FileStats.ctime = new Date(FileStats.ctime);
            FileStats.mtime = new Date(FileStats.mtime);
            FileStatsHTML = '' + FileStats.birthtime + '';
            FileSizeHTML = FileStats.size;
            tr.FileInfo.s = FileStats;
        }
        else {

            FileStatsHTML = '';
        }

        tr.innerHTML = '<td>' + displayDate + '</td><td>' +
            actionICON + '</td><td>' +
            FilePath + '</td><td>' +
            FileSizeHTML + '</td><td>' +
            FileStatsHTML + '</td><td>' +
            MSG + '</td>';

        Dashboard.TableDisplayData.appendChild(tr);
    }
};

Dashboard.TableDisplayData = document.getElementById('DisplayTableBody');
Dashboard.TableDisplayData.innerHTML = '';

window.ds = Dashboard;


console.info('The Dashboard JS Ready..');
 