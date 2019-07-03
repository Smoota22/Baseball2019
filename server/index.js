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

app.get('/autofill_team_years/:teamID/:teamName/:yearID', autofill_team_years);
function autofill_team_years(req, res) {
    var regex = req.params.yearID + "%";
    let sql = 'SELECT year_ID FROM real_team WHERE team_ID = "' + req.params.teamID + '" AND team_name = "' + req.params.teamName + '"';
    if (regex != "NULL%") {
        sql += ' AND year_ID LIKE "' + regex + '"';
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

app.get('/autofill_player_names/:playerName', autofill_player_names);
function autofill_player_names(req, res) {
    var regex = format_query_string_regex(req.params.playerName);
    // let sql = 'SELECT team_ID FROM real_team WHERE team_name = "' + req.params.teamName + '"';
    // let sql = 'SELECT team_name FROM real_team WHERE team_name = "sdas"';
    let sql = 'SELECT full_name, ID FROM player WHERE full_name LIKE "' + regex + '" GROUP BY full_name, ID';
    // res.send(sql);
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/autofill_player_years/:playerID/:yearID', autofill_player_years);
function autofill_player_years(req, res) {
    var regex = req.params.yearID + "%";
    let sql = 'SELECT year_ID FROM pitching WHERE player_ID = "' + req.params.playerID + '" UNION SELECT year_ID FROM batting WHERE player_ID = "' + req.params.playerID + '" UNION SELECT year_ID FROM fielding WHERE player_ID = "' + req.params.playerID + '"';
    if (regex != "NULL%") {
        sql = 'SELECT year_ID FROM (' + sql + ') AS temp WHERE temp.year_ID LIKE "' + regex + '"';
    }
    // res.send(sql);
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/autofill_player_stint/:playerID/:yearID/:stint', autofill_player_stint);
function autofill_player_stint(req, res) {
    var regex = req.params.stint + "%";
    let sql = 'SELECT stint FROM (SELECT stint,year_ID FROM pitching WHERE player_ID = "' + req.params.playerID + '" UNION SELECT stint,year_ID FROM batting WHERE player_ID = "' + req.params.playerID + '" UNION SELECT stint,year_ID FROM fielding WHERE player_ID = "' + req.params.playerID + '") AS temp1 WHERE temp1.year_ID = ' + req.params.yearID;
    if (regex != "NULL%") {
        sql = 'SELECT stint FROM (' + sql + ') AS temp WHERE temp.stint LIKE "' + regex + '"';
    }
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/autofill_player_teamID/:playerID/:yearID/:stint/:teamID', autofill_player_teamID);
function autofill_player_teamID(req, res) {
    var regex = req.params.teamID + "%";
    let sql = 'SELECT team_ID FROM (SELECT team_ID,stint FROM (SELECT team_ID,stint,year_ID FROM pitching WHERE player_ID = "' + req.params.playerID + '" UNION SELECT team_ID,stint,year_ID FROM batting WHERE player_ID = "' + req.params.playerID + '" UNION SELECT team_ID,stint,year_ID FROM fielding WHERE player_ID = "' + req.params.playerID + '") AS temp1 WHERE temp1.year_ID = ' + req.params.yearID + ') AS temp2 WHERE temp2.stint = ' + req.params.stint;
    if (regex != "NULL%") {
        sql += ' AND team_ID IN (SELECT team_ID FROM real_team WHERE team_name LIKE "' + regex + '")';
    }
    res.send(sql);
    // let query = db.query(sql, (err, results) => {
    //     if(err) throw err;
    //     console.log(results);
    //     res.send(results);
    // });
}

app.get('/ranking/:attribute/:direction', ranking);
function ranking(req, res) {
    let sql = 'SELECT ' + req.params.attribute + ',team_ID,year_ID,team_name FROM real_team ORDER BY ' + req.params.attribute;
    if (req.params.direction < 0) {
        sql += ' DESC';
    } else {
        sql += ' ASC';
    }
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

app.get('/ranking_dropdown', ranking_dropdown);
function ranking_dropdown(req, res) {
    let sql = 'DESCRIBE real_team';
    // res.send(sql)
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
}

// app.get('/ranking_dropdown', ranking_dropdown);
// function ranking_dropodown(req, res) {
//     let sql = 'DESCRIBE real_team';
//     // res.send(sql)
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.send(results);
//     });
// }

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
