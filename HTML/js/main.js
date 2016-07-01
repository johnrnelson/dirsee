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
    A: function(dt, a, f, s, m) {
        console.log(this.arguments);
        var tr = document.createElement('tr');
        var displayDate = moment(new Date(dt)).calendar();
        
        var actionICON = '<i class="fa fa-question-circle" aria-hidden="true"></i>';

        if (a== '*') {
            actionICON = '<i class="fa fa-pencil-square" aria-hidden="true"></i>';
        }
        if (a== '-') {
            actionICON = '<i class="fa fa-minus-circle" aria-hidden="true"></i>';
        }

        if (a== '+') {
            actionICON = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

        }
        tr.innerHTML = '<td>' + displayDate + '</td><td>' + actionICON + '</td><td>' + f + '</td><td>' + s + '</td><td>' + m + '</td>';

        Dashboard.TableDisplayData.appendChild(tr);
    }
};

Dashboard.TableDisplayData = document.getElementById('DisplayTableBody');
Dashboard.TableDisplayData.innerHTML = '';

window.ds = Dashboard;


console.info('The Dashboard JS Ready..');

//Open the local files that the nodes.js process has written out...
// Dashboard.OpenLocalFiles(function(err) {
//     if (err) {
//         debugger;
//     }
//     else {
//         //All files are open and good to go!
//         // console.clear();

//         console.info('The Dashboard JS Ready..');

//         var tblBOdy = document.getElementById('DisplayTableBody');

//         console.log('DB', tblBOdy);

//         /*
//             For each row, wrap it in some tasty HTML that looks good, easy to work with,
//             and has a good beat that you can dance to ... :-)
//         */
//         for (var r = Dashboard.DB.Rows.length; r--;) {
//             var row = Dashboard.DB.Rows[r];
//             var tr = document.createElement('tr');

//             tr.innerHTML = '<td>' + row.dt + '</td><td>' + row.a + '</td><td>' + row.f + '</td><td>' + row.m + '</td>'

//             tblBOdy.appendChild(tr);
//         }


//     }
// });
