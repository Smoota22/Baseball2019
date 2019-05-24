// const express = require('express')
// const app = express()
//
// app.use(express.static(__dirname + '/public'))
// app.listen(3000, () => console.log('Server running on port 3000'))


const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()
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
        username: req.body.username,
        password: req.body.password
    })
    .then(({ success }) => {
        if (success) res.sendStatus(200)
        else res.sendStatus(401)
    })
})
app.listen(3000, () => {
  console.log('Server running on port 3000')
})
