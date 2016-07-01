//Setup the Dashboard API...
var Dashboard = {
    DB: {
        //The local database... :-)
        Rows: [
            //Added to after we open our local files...
        ],
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
 