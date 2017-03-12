const birds = require('./routes/birds.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/birds', birds)

app.listen(PORT, () => {
  console.log(`Currently listening on PORT ${PORT}`)
})
