const express = require ('express');
const oracledb = require ('oracledb');
const config = require ('./config/config.js');

var app = express ();

app.post ("/", function (req, res) {
    "use strict";

    oracledb.getConnection (
		{
            user: config.user,
            password: config.password,
            connectString: config.connectString
        }, function (err, connection) {
            if (err) {
                console.error ("Error #01: " + err.message);
                return;
            }
			
			console.log (": " + req.param);
			console.log (": " + req.params);

            connection.execute (
                "INSERT INTO GNL_USER (USER_ID, USER_NAME, USER_PASS, USER_MAIL, USER_RANK) VALUES (GNL_USER_SEQ.nextVal, :name, :pass, :mail, :rank)",
				{name: req.param ('USER'), pass: req.param ('PASS'), mail: "test@mail.com", rank: 0},
                {autoCommit: true},
                function (err, result) {
                    if (err) {
                        console.log ("Error #02: " + err.message);
                        return;
                    }

                    connection.release (function (err) {
                        if (err) {
                            console.log ("Error #03: " + err.message);
                            return;
                        }

                        console.log ("Connection released!");
                    });
                }
            );
        }
    );
});

app.get ('/', function (req, res) {
	"use strict";
	
	oracledb.getConnection (
		{
            user: config.user,
            password: config.password,
            connectString: config.connectString
        }, function (err, connection) {
            if (err) {
                console.error ("Error #04: " + err.message);
                return;
            }

            connection.execute (
                "SELECT * FROM GNL_USER WHERE USER_NAME = :name",
				{name: req.param ('USER')},
                function (err, result) {
                    if (err) {
                        console.log ("Error #05: " + err.message);
                        return;
                    }

                    connection.release (function (err) {
                        if (err) {
                            console.log ("Error #06: " + err.message);
                            return;
                        }

                        var user = result.rows [0];
						res.write ("Password: " + user [3]);
						res.end ();
						console.log ("Password: " + user [3]);
                    });
                }
            );
        }
    );
});

var server = app.listen (config.port, function () {
    "use strict";

    var host = server.address ().address;
    var port = server.address ().port;

    console.log ("Server is listening at %s:%s", host, port);
});