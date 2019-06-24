// const express = require('express')
// const app = express()
//
// app.use(express.static(__dirname + '/public'))
// app.listen(3000, () => console.log('Server running on port 3000'))


const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const store = require('./store')
const app = express()

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'Baseball_2019_db'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.post('/createUser', (req, res) => {
  store
    .createUser({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.post('/login', (req, res) => {
  store
    .authenticate({
      email: req.body.email,
      password: req.body.password
    })
    .then(({ success }) => {
        // res.send(req.body.email + "," + req.body.password);
        // res.send(success)
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
  });
  // let sql = 'SELECT first_name FROM user WHERE email = "' + req.body.email + '"';
  // // res.send(sql);
  // let query = db.query(sql, (err, results) => {
  //     if(err) throw err;
  //     console.log(results);
  //     res.send(results);
  // });
})

app.get('/autofill_team_names/:teamName', autofill_team_names);
function autofill_team_names(req, res) {
    var regex = format_query_string_regex(req.params.teamName);
    // let sql = 'SELECT team_ID FROM real_team WHERE team_name = "' + req.params.teamName + '"';
    // let sql = 'SELECT team_name FROM real_team WHERE team_name = "sdas"';
    let sql = 'SELECT team_name, team_ID FROM real_team WHERE team_name LIKE "' + regex + '" GROUP BY team_name, team_ID';
    // res.send(sql);
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/autofill_years/:teamID/:teamName/:yearID', autofill_years);
function autofill_years(req, res) {
    var regex = req.params.yearID + "%";
    let sql;
    if (regex === "%") {
        sql = 'SELECT year_ID FROM real_team WHERE team_ID = "' + req.params.teamID + '" AND team_name = "' + req.params.teamName + '"';
    } else {
        sql = 'SELECT year_ID FROM real_team WHERE team_ID = "' + req.params.teamID + '" AND team_name = "' + req.params.teamName + '" AND year_ID LIKE "' + regex + '"';
    }
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/load_team_data/:teamID/:yearID', load_team_data);
function load_team_data(req, res) {
    let sql = 'SELECT * FROM real_team WHERE team_ID = "' + req.params.teamID + '" AND year_ID = ' + req.params.yearID;
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/ranking_page/:attribute/:teamID/:yearID', open_ranking_page);
function open_ranking_page(req, res) {
    res.sendFile('ranking.html');
}

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

function format_query_string_regex(query_string) {
    var query_string = query_string.toLowerCase();
    var split_string = query_string.split(" ");
    var regex = split_string.join('%');
    var regex = "%" + regex + "%";
    return regex;
}
