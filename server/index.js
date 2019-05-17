const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.listen(3001, () => console.log('Server running on port 3000'))
