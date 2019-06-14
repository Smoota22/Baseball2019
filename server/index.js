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
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

app.get('/load_team_IDs/:teamName', load_team_IDs);
function load_team_IDs(req, res) {
    // let sql = 'SELECT team_ID FROM real_team WHERE team_name = "' + req.params.teamName + '"';
    let sql = 'SELECT team_ID FROM real_team WHERE team_name LIKE "' + req.params.teamName + '" GROUP BY LENGTH(team_name)';
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/load_team_years/:teamID', load_team_years);
function load_team_years(req, res) {
    let sql = 'SELECT year_ID FROM real_team WHERE team_ID = "' + req.params.teamID;
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/load_team_data/:teamID/:yearID', load_team_data);
function load_team_data(req, res) {
    let sql = 'SELECT games FROM real_team WHERE team_ID = "' + req.params.teamID + '" AND year_ID = ' + req.params.yearID;
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.post('/load_team_data/submit_team', load_team_data_submit);
function load_team_data_submit(req, res) {
    var teamID = req.body.team_ID;
    var yearID = req.body.yearID;
    res.redirect('/load_team_data/' + teamID + '/' + yearID);
}

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
