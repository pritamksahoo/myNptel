var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var multer = require('multer');
var login_module = require('./login');
var course_module = require('./course');
var enroll_module = require('./enroll');
var stat = require('./statistics');
var fs = require('fs');
var Cookie = require('cookie-parser');
//var filename = "";

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/views'));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'POST', 'GET');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


//app.use(bodyparser); 
//var jsonParser = bodyparser.json();
//
//var urlParser = bodyparser.urlencoded({
//    extended: true
//});

app.use(bodyparser.json());

app.use(Cookie());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.redirect('/loginS');
});

app.get('/ILogOut', login_module.i_log_out);

app.get('/SLogOut', login_module.s_log_out);

app.get('/loginS', function (req, res) {
    res.sendFile("/home/amrik/Desktop/nptel/templates/login.html");
});

app.get('/loginI', function (req, res) {
    res.sendFile("/home/amrik/Desktop/nptel/templates/loginI.html");
});

app.post('/LogIntoStudentAccount', login_module.student_login);

app.post('/LogIntoInstructorAccount', login_module.instructor_login);

app.get('/registerS', function (req, res) {
    res.sendFile("/home/amrik/Desktop/nptel/templates/register.html");
});

app.get('/registerI', function (req, res) {
    res.sendFile("/home/amrik/Desktop/nptel/templates/registerI.html");
});

app.post('/checkValidUsernameI', login_module.i_check_validity);

app.post('/checkValidUsername', login_module.check_validity);

app.post('/fetchFiles', course_module.fetchFiles);

app.post('/removeArticle', course_module.removeArticle);

app.post('/removeCourse', course_module.removeCourse);

// app.post('/logintoAccount', login_module.verify_login);

app.post('/registerStudentAccount', login_module.register_student_account);

app.post('/registerInstructorAccount', login_module.register_instructor_account);

// app.post('/editInfo', login_module.editInfo);

app.get('/overview', login_module.overview);

app.get('/i_overview', login_module.i_overview);

app.post('/addnewcourse', course_module.addNewCourse);

app.post('/publish', course_module.publish);

app.post('/finalTouchToCourse', course_module.decision);

app.get('/modifyCourse', course_module.modifyCourse);

app.get('/viewFile', course_module.viewFile);

app.post('/updateCourse', course_module.updateCourse);

app.post('/editCourse', course_module.editCourse);

app.get('/viewInsCourses', course_module.viewInsCourses);

app.get('/viewCourses', enroll_module.viewCourses);

app.get('/viewAllCourses', enroll_module.viewAllCourses);

app.post('/enterCourse', enroll_module.enterCourse);

app.get('/viewArticle', enroll_module.viewArticle);

app.get('/downloadArticle', enroll_module.downloadArticle);

app.post('/updateRating', enroll_module.updateRating);

app.post('/sendFeedback', enroll_module.sendFeedback);

app.post('/registerCourse', enroll_module.registerCourse);

app.post('/findCourseBasedOnTopic', enroll_module.findCourseBasedOnTopic);

// app.get('/logout', login_module.logOut);

app.listen(3000);