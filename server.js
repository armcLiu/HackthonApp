var mysql = require('mysql');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');


//Home Page & linking all directories
app.use('/js', express.static(__dirname + '/js'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use(express.static(__dirname));

//CORS Middleware, causes Express to allow Cross-Origin Requests
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(allowCrossDomain);

var connection = mysql.createConnection({
  host: "dbinst1.ci1vlft7abxx.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "password",
  database: "Tracker"
});


var queryString = "SELECT id FROM Tracker.EmpInfo;";

// Fetching data for signup database
app.post('/signup', function(req, res) {
  var bComp = req.body;
  console.log(bComp);
  if (!bComp.username || !bComp.password) {
    return res.json(400, 'Missing a parameter.');
  }
  connection.query(queryString, function(err, rows) {
    if (err) throw err;
    console.log(rows);
    return res.json(200, rows);
  });
});

// Fetching data for login from database
app.post('/login', function(req, res) {
  var bComp = req.body;
  if (!bComp.username || !bComp.password) {
    return res.json(400, 'Missing a parameter.');
  }
  console.log(bComp.password);
  console.log(bComp.username);
  connection.query("SELECT * FROM AdminLogin where username = '" + bComp.username + "'and password = '" + bComp.password + "';", function(err, rows) {
    if (rows.length == 0) {
      return res.json(400, 'The user does not exist, please contact your database manager');
    }
    else if (err) {
      return res.json(400, 'An error occurred while logging in.');
    } else
      console.log(rows);
    return res.json(200, rows);
  });
});



// Fetching data for user schedule from database
app.post('/retrieve', function(req, res) {
  var bComp = req.body;
  var username = bComp.username;
  console.log('Retrieving username');
  connection.query("SELECT DATE_FORMAT(Date,'%Y/%m/%d') as Date,DATE_FORMAT(expDate,'%Y/%m/%d') as expDate,expTimeIn,expTimeOut,(time_to_sec(timediff(expTimeOut, expTimeIn )) / 3600) as NoOfHours,if ((TimeIn IS NOT NULL && TimeOut IS NOT NULL ),'Completed',if ((TimeIn IS NOT NULL && TimeOut IS NULL), 'On-going',if((TimeIn IS NULL && TimeOut IS NULL), 'Not Started',''))) as Status FROM WorkEntry  WHERE empID = (SELECT id from EmpInfo where Username = '" + username + "') order by date asc;", function(err, rows) {
    if(err)
    {
      return res.json(400, 'Please login to continue');
    }
    else
    console.log(rows);
    return res.json(200, rows);
  });
});

// Fetching data for completed user schedule from database
app.post('/workRetrieve', function(req, res) {
  var bComp = req.body;
  var username = bComp.username;
  console.log('Retrieving username');
  connection.query("SELECT  w.* FROM (SELECT DATE_FORMAT(Date,'%Y/%m/%d') as Date,DATE_FORMAT(expDate,'%Y/%m/%d') as expDate,expTimeIn,expTimeOut,(time_to_sec(timediff(expTimeOut, expTimeIn )) / 3600) as NoOfHours, if ((TimeIn IS NOT NULL && TimeOut IS NOT NULL ),'Completed',if ((TimeIn IS NOT NULL && TimeOut IS NULL), 'On-going',if((TimeIn IS NULL && TimeOut IS NULL), 'Not Started',''))) as Status FROM WorkEntry WHERE empID = (SELECT id from EmpInfo where Username = '" + username + "')) w WHERE w.Status = 'Completed' order by w.Date asc;", function(err, rows) {
    if(err)
    {
      return res.json(400, 'Please login to continue');
    }
    else
    console.log(rows);
    return res.json(200, rows);
  });
});
// Fetching data for user schedule from database
app.post('/profile', function(req, res) {
  var bComp = req.body;
  var username = bComp.username;
  console.log('Retrieving username');
  connection.query("SELECT e.id,e.FirstName,e.LastName,e.Username,e.Email,e.Mobile,EXTRACT(YEAR FROM e.DateOfBirth) AS birthYear,EXTRACT(DAY FROM e.DateOfBirth) AS birthDay,MONTHNAME(e.DateOfBirth) AS birthMonth,DATE_FORMAT(e.EmpStartDate,'%Y/%m/%d') as EmpStartDate, e.Address,e.Sex,e.PostalCode,e.SIN,s.Level FROM EmpInfo as e, SalaryInfo as s where Username = '"+ username + "'and e.EmpType = s.id;", function(err, rows) {
    console.log(rows);
    return res.json(200, rows);
  });
});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});




