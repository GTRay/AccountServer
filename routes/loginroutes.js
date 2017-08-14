var mysql = require('mysql');
var connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : '00006622',
  database  : 'accountinfo'
});

connection.connect(function(err) {
  if(!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

exports.registor = function(req, res) {
  // console.log("req", req.body);
  var today = new Date();
  var users={
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "password": req.body.password,
    "created": today,
    "modified": tody
  }

  connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
    if(error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "user registered successfully"
      });
    }
  });
}

exports.login = function(req, res) {
  //
  var email = req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
    if(error) {
      // console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      // console.log('The solution is: ', results);
      if(results.length > 0) {
        if([0].password == password) {
          res.send({
            "code": 200,
            "success": "Email and password does not match"
          });
        } else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      } else {
        res.send({
          "code": 204,
          "success": "Email does not exits"
        });
      }
    }
  });
}
