const createError = require('http-errors')

const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const userboardsRouter = require('./routes/userboardRouter')
const errorHandler = require('./middleware/errorHandler')
//const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer();
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
//  const server = http.createServer(function(req, res) {
//   // You can define here your custom logic to handle the request
//   // and then proxy the request.
//   proxy.web(req, res, { target: 'http://localhost:3001' });
// });

 


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader("X-USER-ID", "2");
});

//app.use('/api/todo/*', (req, res, next) => res.json({ message: 'Handle all requests'}) )

app.all('/api/userboards*', (req, res, next) => {
 proxy.web(req, res, { target: 'http://localhost:3001' });
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(errorHandler)

// console.log("listening on port 3000")
// server.listen(3000);


module.exports = app