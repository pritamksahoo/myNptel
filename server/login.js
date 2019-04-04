// var conn = require('./connection');
// var upload_module = require('./upload');
var bodyparser = require('body-parser');
var multer = require('multer');
// var email = require('./email');
var stat = require('./statistics');
var Cookie = require('cookie-parser');
// var logout = require('express-passport-logout');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

exports.student_login = function (req, res) {
    var user = req.body.myUsername;
    var pass = req.body.myPassword;
    MongoClient.connect(url, function(err, db) {
        if (err) {

        } else {
            var dbs = db.db('nptel');
            var cursor = dbs.collection('Student_login').find({'username': user, 'password': pass}).toArray(function (err, result) {
                if (err) {

                } 
                else 
                {
                    console.log(result);
                    console.log();
                    if (result.length == 1) {
                        res.cookie('activeStudent', user);
                        res.redirect("http://localhost:3000/overview");
                        // Student profile
                    } else {
                        res.cookie('activeStudent', 'none');
                        res.redirect("http://localhost:3000/");
                    }
                }

            });
        }
        
    }); 
};

exports.instructor_login = function (req, res) {
    var user = req.body.myUsername;
    var pass = req.body.myPassword;
    MongoClient.connect(url, function(err, db) {
        if (err) {

        } else {
            var dbs = db.db('nptel');
            var cursor = dbs.collection('Instructor_login').find({'username': user, 'password': pass}).toArray(function (err, result) {
                if (err) {

                } 
                else 
                {
                    if (result.length == 1) {

                        res.cookie('activeInstructor', user);
                        // res.redirect("http://localhost:8080/profile");
                        res.redirect("http://localhost:3000/i_overview");
                        // Instructor profile
                    } else {
                        res.cookie('activeInstructor', 'none');
                        res.redirect("http://localhost:3000/loginI");
                    }
                }

            });
        }
        
    }); 
};

exports.i_log_out = function (req, res) {
    res.cookie('activeInstructor', 'none');
    res.cookie('course_topics', 'none');
    res.cookie('course_name', 'none');
    res.cookie('topic_name', 'none');
    res.cookie('status', 'none');
    res.render("logout", {
        whoami: 'instructor'
    });
};

exports.s_log_out = function (req, res) {
    res.cookie('activeStudent', 'none');
    res.render("logout", {
        whoami: 'student'
    });
};

exports.register_student_account = function (req, res) {
    var user = req.body.myUsername;
    var pass = req.body.myPassword;
    var email = req.body.myEmail;
    var first = req.body.myFirstname;
    var last = req.body.myLastname;
    var mob = req.body.myMobile;
    // console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) {

        } else {
            var dbs = db.db('nptel');
            var cursor = dbs.collection('Student_login').insert({username: user, password: pass, email: email, firstname: first, lastname: last, mobile: mob}, function (err) {
                if (err) {
                    res.sendFile("/home/amrik/Desktop/nptel/templates/register.html");
                } 
                else 
                {
                    res.redirect("http://localhost:3000/");
                }

            });
        }
        
    }); 
};

exports.register_instructor_account = function (req, res) {
    var user = req.body.myUsername;
    var pass = req.body.myPassword;
    var email = req.body.myEmail;
    var first = req.body.myFirstname;
    var last = req.body.myLastname;
    var mob = req.body.myMobile;
    var uni = req.body.myOrganization;
    // console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) {

        } else {
            var dbs = db.db('nptel');
            var cursor = dbs.collection('Instructor_login').insert({username: user, password: pass, email: email, firstname: first, lastname: last, mobile: mob, organization: uni}, function (err) {
                if (err) {
                    res.sendFile(__dirname + "/home/amrik/Desktop/nptel/templates/register.html");
                }
                else
                {
                    if (!fs.existsSync('uploads/' + user)){
                        fs.mkdirSync('uploads/' + user);
                    }
                    res.redirect("http://localhost:3000/loginI");
                }

            });
        }
        
    });
};

exports.check_validity = function (req, res) {
    var data, user = req.body.username;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            data = {
                'result': 'yono',
                'color': 'darkgoldenrod'
            };
            res.send(data);
        } else {
            var dbs = db.db('nptel');
            var cursor = dbs.collection('Student_login').find({username: user}).toArray(function (err, result) {
                if (err) {
                    data = {
                        'result': 'yono',
                        'color': 'darkgoldenrod'
                    };
                    res.send(data);
                }
                else
                {
                    if (result.length == 0 && user != "none") {
                        data = {
                            'result': 'yes',
                            'color': 'green'
                        };
                        res.send(data);
                    } else {
                        data = {
                            'result': 'no',
                            'color': 'red'
                        };
                        res.send(data);
                    }
                }

            });
        }
        
    });
};

exports.i_check_validity = function (req, res) {
    var data, user = req.body.username;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            data = {
                'result': 'yono',
                'color': 'darkgoldenrod'
            };
            res.send(data);
        } else {
            var dbs = db.db('nptel');
            var cursor = dbs.collection('Instructor_login').find({username: user}).toArray(function (err, result) {
                if (err) {
                    data = {
                        'result': 'yono',
                        'color': 'darkgoldenrod'
                    };
                    res.send(data);
                }
                else
                {
                    if (result.length == 0 && user != "none") {
                        data = {
                            'result': 'yes',
                            'color': 'green'
                        };
                        res.send(data);
                    } else {
                        data = {
                            'result': 'no',
                            'color': 'red'
                        };
                        res.send(data);
                    }
                }

            });
        }
        
    });
};

exports.overview = function (req, res) {
    var user = req.cookies['activeStudent'];
    if (user != "none") {
        stat.getStat("index", user, res, "hello");
        // res.render("index", {
        //     whoami: user
        // });
        // console.log(user);
    } else {
        res.redirect("http://localhost:3000/");
    }
};

exports.i_overview = function (req, res) {
    var user = req.cookies['activeInstructor'];
    if (user != "none") {
        // res.send("logged into haha!");

        MongoClient.connect(url, function(err, db) {
            if (err) {

            } else {
                var dbs = db.db('nptel');
                var cursor = dbs.collection('course_topics').find().toArray(function (err, result) {
                    if (err) {

                    } 
                    else 
                    {
                        res.cookie('course_topics', result);
                        res.cookie('err_msg', 'ok');
                        stat.getStat("ins_index", user, res, result);
                        // res.render("ins_index", {
                        //     whoami: user,
                        //     course_topics: result
                        // });
                    }

                });

            }
            
        }); 

        
        
    } else {
        res.redirect("http://localhost:3000/loginI");
    }
};

// exports.fetchFullProfile = function (req, res) {
//     var connection = conn.database('mydb', 'root', 'root');
//     var data, user = req.body.username;
//     //    console.log(user);
//     if (connection != "ERROR") {
//         connection.query('SELECT * FROM user WHERE username = ?', [user], function (error, results, fields) {
//             if (error) {
//                 data = {
//                     'result': 'NIL'
//                 };
//                 res.send(data);
//             } else {
//                 data = {
//                     'name': results[0].name,
//                     'email': results[0].email,
//                     'resume': results[0].resume,
//                     'username': results[0].username
//                 };
//                 res.send(data);
//                 //                console.log(results[0].username);
//             }
//         });
//     } else {
//         data = {
//             'result': 'NIL'
//         };
//         res.send(data);
//     }
// };

// exports.editInfo = function (req, res) {
//     var connection = conn.database('mydb', 'root', 'root');
//     var key = req.body.key;
//     var value = req.body.value;
//     var user = req.cookies['active'];
//     //    console.log(key);
//     //    console.log(value);
//     //    console.log(user);
//     if (user != "none") {
//         if (connection != "ERROR") {
//             var sql = "";
//             switch (key) {
//                 case 'name':
//                     sql = 'UPDATE user SET name = ? WHERE username = ?';
//                     break;
//                 case 'email':
//                     sql = 'UPDATE user SET email = ? WHERE username = ?';
//                     break;
//                 case 'username':
//                     sql = 'UPDATE user SET username = ? WHERE username = ?';
//                     break;
//                 case 'resume':
//                     //                    sql = 'UPDATE user SET name = ? WHERE username = ?';
//                     break;
//                 default:
//                     break;
//             }
//             //            console.log(sql);
//             connection.query(sql, [value, user], function (error, results) {
//                 if (error) {
//                     //                    console.log(error);
//                     data = {
//                         'answer': 'NIL'
//                     };
//                     res.send(data);
//                 } else {
//                     data = {
//                         'answer': '+VE'
//                     };
//                     if (key == 'username') {
//                         res.cookie('active', value);
//                     } else if (key == 'email') {
//                         email.sendOnEmailChange(value);
//                     }
//                     res.send(data);
//                 }
//             });
//         } else {
//             data = {
//                 'answer': 'NIL'
//             };
//             res.send(data);
//         }
//     } else {
//         data = {
//             'answer': 'NIL'
//         };
//         res.send(data);
//     }
// };

// exports.logOut = function (req, res) {
//     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     res.cookie('active', 'none');
//     logout();
//     res.render("wrong_login", {
//         message: "You have been logged out !"
//     });

// }