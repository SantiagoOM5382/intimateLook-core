require('dotenv-flow').config()
const compression = require('compression')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./src/routes/index')

const app = express()
const port = process.env.PORT || 3000

if (process.env.ENV === 'local') process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

require('./src/database/config')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

// Routes
app.use('/api', apiRouter)

// Say hello
app.get('/', (req, res) => (
  res.status(200).json({ message: 'core en linea!' })
))

// Local environment
if (process.env.ENV === 'local') {
  app.listen(port, () => {
    console.log(`Servidor en :${port}`)
  })
} else { // cloud function
  exports.core = app
}
