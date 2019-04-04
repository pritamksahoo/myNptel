var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

exports.getStat = function(whereTo, user, res, result) {
	MongoClient.connect(url, function(err, db) {
        if (err) {

        } else {
            var dbs = db.db('nptel');
            var cursor1 = dbs.collection('Student_login').find().toArray(function (err, result1) {
                if (err) {

                } 
                else 
                {
		            var cursor2 = dbs.collection('Instructor_login').find().toArray(function (err, result2) {
		                if (err) {

		                } 
		                else 
		                {
		                    var cursor3 = dbs.collection('courses').find().toArray(function (err, result3) {
				                if (err) {

				                } 
				                else 
				                {
				                	// console.log(result1.length);
				                	// console.log(result2.length);
				                	// console.log(result3.length);
				                	if (whereTo == "index") {
					                    res.render(whereTo, {
								            whoami: user,
								            s_count: result1.length,
								            i_count: result2.length,
								            c_count: result3.length
								        });
					                } else {
					                	res.render(whereTo, {
								            whoami: user,
								            course_topics: result,
								            s_count: result1.length,
								            i_count: result2.length,
								            c_count: result3.length
								        });
					                }
				                }

				            });
		                }

		            });
                }

            });
        }
        
    }); 
};
