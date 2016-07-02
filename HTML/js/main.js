//Setup the Dashboard API...
var Dashboard = {
    DB: {
        //The local database... :-)
        Rows: [
            //Added to after we open our local files...
        ],
    },
    UpdateStatusText: function(StatusText) {
        Dashboard.DSUIHelperEL.innerHTML = StatusText;
    },
    /*
        A stands for ADD! We keep it simple so the history file 
        can be as small as possible...
    */
    A: function(DateTimeOfLogItem, Action, FilePath, FileStats, MSG) {
        // console.log(this.arguments);

        var displayDate = moment(new Date(DateTimeOfLogItem)).calendar();


        var tr = document.createElement('tr');
        tr.className = 'DataRow';
        tr.FileInfo = {
            dt: DateTimeOfLogItem,
            a: Action,
            f: FilePath,
            // s: FileStats, This gets taken care of kinda special... :-)
            m: MSG
        };



        //If the user clicks on the data row then....
        tr.onclick = function(evt) {
            console.info(evt, this.FileInfo);
        }

        //If the user clicks on the data row then....
        tr.onmouseout = function(evt) {
            Dashboard.UpdateStatusText('');
        }
        tr.onmouseover = function(evt) {
            // console.info(evt,this.FileInfo);
            Dashboard.UpdateStatusText('' + this.FileInfo.f + ' ');

        }


        var actionICON = '<i class="fa fa-question-circle animated bounce" aria-hidden="true"></i>';
        var actionTEXT = 'Unknown Action! ';

        if (Action == '*') {
            actionICON = '<i class="fa fa-pencil-square animated bounce" aria-hidden="true"></i>';
            actionTEXT = "Edited ";
        }
        if (Action == '-') {
            actionICON = '<i class="fa fa-minus-circle animated bounce" aria-hidden="true"></i>';
            actionTEXT = "Deleted ";
        }

        if (Action == '+') {
            actionICON = '<i class="fa fa-plus-circle animated bounce" aria-hidden="true"></i>';
            actionTEXT = "Added ";

        }


        var FileStatsHTML = '';
        var FileSizeHTML = '';


        //If the file has stats...
        if (Object.keys(FileStats).length) {
            var displayDate = moment(new Date(DateTimeOfLogItem)).calendar();
            if (FileStats.birthtime == FileStats.ctime) {
                FileStatsHTML = '*';
            }
            else {

                FileStats.birthtime = moment(new Date(FileStats.birthtime)).calendar();
                FileStats.ctime = moment(new Date(FileStats.ctime)).calendar();
                FileStats.mtime = moment(new Date(FileStats.mtime)).calendar();
                FileStatsHTML = 'BTime:' + FileStats.birthtime + '<br>' +
                    'CTime:' + FileStats.ctime + '<br>' +
                    'MTime:' + FileStats.mtime + '<br>' +
                    '';

            }
            console.log(FileStats);



            FileSizeHTML = FileStats.size;
            tr.FileInfo.s = FileStats;
        }
        else {

            FileStatsHTML = '';
        }


        tr.title = actionTEXT + " file (" + FilePath + ') ';

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
Dashboard.DSUIHelperEL = document.getElementById('DSUIHelperEL');
Dashboard.TableDisplayData.innerHTML = '';

window.ds = Dashboard;


console.info('The Dashboard JS Ready..');