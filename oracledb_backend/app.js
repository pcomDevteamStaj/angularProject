const express = require ('express');
const oracledb = require ('oracledb');
const bodyParser = require ('body-parser');
const config = require ('./config/config.js');

var app = express ();
app.use (bodyParser.urlencoded ({ extended: true }));
app.use (bodyParser.json ());


app.post ("/", function (req, res) {
    "use strict";
    /*
    console.log ("--- APP.JS ---")
    */
    console.log ("Username: " + req.param ('USER'));
    console.log ("Password: " + req.param ('PASS'));
    console.log ("Mail: " + req.param ('MAIL'));
    console.log ("Title: " + req.param ('TITLE'));
    console.log ("Phone: " + req.param ('PHONE'));
    console.log ("Gender: " + req.param ('GENDER'));
    /*
    console.log ("--------------");
    */
    oracledb.getConnection ({
            user: config.user,
            password: config.password,
            connectString: config.connectString
        }, function (err, connection) {
            if (err) {
                console.error ("Error #01: " + err.message);
                return;
            }

            connection.execute (
                "INSERT INTO GNL_USER (USER_ID, USER_NAME, USER_MAIL, USER_PASS, USER_TITLE, USER_PHONE, USER_GENDER, USER_RANK) VALUES (GNL_USER_SEQ.nextVal, _username, _mail, _password, _title, _phone, _gender, _rank)",
                {_username: "test_user_0", _mail: "test_mail_0", _password: "test_password_0", _title: "test_title_0", _phone: "test_phone_0", _gender: "test_gender_0", _rank: 0},
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
    
    console.log ("Username: " + req.param ('USER'));
    console.log ("Password: " + req.param ('PASS'));

    var data = JSON.stringify ({isAllowed: req.param ('PASS') === '123456'});
    res.setHeader ('Access-Control-Allow-Origin', '*');
    res.write (data);
    res.end ();
    /*
    oracledb.getConnection ({
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

                    // Get User
                    var user = result.rows [0];
                    console.log ("Password is " + (req.param ('PASS') === user [3]));
                    var data = JSON.stringify ({isAllowed: req.param ('PASS') === user [3]});
                    res.setHeader ('Access-Control-Allow-Origin', '*');
                    res.write (data);
                    res.end ();

                    connection.release (function (err) {
                        if (err) {
                            console.log ("Error #06: " + err.message);
                            return;
                        }

                        console.log ("Connection released!");
                    });
                }
            );
        }
    );
    */
});

app.get ('/user', function (req, res) {
    "use strict";
    
    console.log ("Username: " + req.param ('USER'));
    
    var data = JSON.stringify ({
        user_id: 10,
        user_name: "test",
        user_mail: "test@mail.com",
        user_title: "Job",
        user_phone: "532 000 00 00",
        user_rank: 2
    });
    res.setHeader ('Access-Control-Allow-Origin', '*');
    res.write (data);
    res.end ();
});

var server = app.listen (3000, function () {
    "use strict";

    var host = server.address ().address;
    var port = server.address ().port;

    console.log ("Server is listening at %s:%s", host, port);
});