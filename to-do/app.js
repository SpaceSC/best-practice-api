const createError = require('http-errors')

const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const userboardsRouter = require('./routes/userboardRouter')
const errorHandler = require('./middleware/errorHandler')


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/userboards', userboardsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(errorHandler)


module.exports = app