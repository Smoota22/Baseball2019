// const express = require('express')
// const app = express()
//
// app.use(express.static(__dirname + '/public'))
// app.listen(3000, () => console.log('Server running on port 3000'))


const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post(__dirname + '/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})
app.listen(3000, () => {
  console.log('Server running on port 3000')
})
