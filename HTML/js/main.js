//Setup the Dashboard API...
var Dashboard = {
    DB: {
        //The local database... :-)
        Rows: [
            //Added to after we open our local files...
        ],
    },
    OpenHTMLPanel: function(URL2Show) {
        console.info('show -->', URL2Show);

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
            u: '../HISTORY/today.json',
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
                        Dashboard.DB.Rows.push({
                            dt: new Date(cData[0]), //date time
                            a: cData[1], //action
                            f: cData[2], // file statz
                            m: cData[3] //message 
                        });
                    }
                    else {
                        cData = null
                    }
                }

                OnOpen(null);
            }
        });
    }
};





//Open the local files that the nodes.js process has written out...
Dashboard.OpenLocalFiles(function(err) {
    if (err) {
        debugger;
    }
    else {
        //All files are open and good to go!
        console.clear();

        console.info('The Dashboard JS Ready..');

        var tblBOdy = document.getElementById('DisplayTableBody');

        console.log('DB', tblBOdy);

        /*
            For each row, wrap it in some tasty HTML that looks good, easy to work with,
            and has a good beat that you can dance to ... :-)
        */
        for (var r = Dashboard.DB.Rows.length; r--;) {
            var row = Dashboard.DB.Rows[r];
            var tr = document.createElement('tr');
            
            tr.innerHTML = '<td>' + row.dt + '</td><td>' + row.a + '</td><td>' + row.f + '</td><td>' + row.m + '</td>'
            
            tblBOdy.appendChild(tr);
        }


    }
})