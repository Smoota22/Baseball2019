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

app.get('/load_team_data', (req, res) => {
  store
    .load_team_data()
    .then(() => res.sendStatus(200))
})

app.get('/load_team_data', (req, res) => {
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
