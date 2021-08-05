//require("dotenv").config(); // already in www file (.env.est not necessary, this can be used for testing)
const createError = require("http-errors");

const express = require("express");
require("express-async-errors");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fetch = require("node-fetch");
const http = require('axios');
const MockAdapter = require("axios-mock-adapter");

const googleApi = http.create({
  baseURL: 'https://oauth2.googleapis.com'
});

//axios mock adapter
// sets the mock adapter on the our instance
const mock = new MockAdapter(googleApi);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onPost("/token").reply(200, {access_token: 'ya29.a0ARrdaM_-7Wn4SEuWQK0F7m3vrdMPNzl0G3znx4ntMmMzdxv2jKb3RMaEMfxnHfeAB89dAmclFkfwJw_wG-Rth1hhVxmfCtwGTsq9GLq3FpOYIzQCPPhLN-zL9UIhye0fIZY7qvVzliaOsudB6ADR0F9o0T0F',
  expires_in: 3599,
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
  token_type: 'Bearer',
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBmY2MwMTRmMjI5MzRlNDc0ODBkYWYxMDdhMzQwYzIyYmQyNjJiNmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDkxMjU1MjQ1NjMtNnJjMGE0ODU2b3RlcmFuNzQ1ZmUyczdjOWhjMWNuNzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDkxMjU1MjQ1NjMtNnJjMGE0ODU2b3RlcmFuNzQ1ZmUyczdjOWhjMWNuNzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk1OTYwOTg3OTg4OTkyOTI4OTkiLCJlbWFpbCI6InN1Z2FyZ2xpZGVyMjIyMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Imd4VnRHQWNsT28zX3ZfNm5waC1lUkEiLCJuYW1lIjoiVHN6aWx5IFRzemlseSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp3SkhHRHl5by0zYjdvLWJ3OGRIMDd0SnpTNlVPaWNqZkVxdElCcT1zOTYtYyIsImdpdmVuX25hbWUiOiJUc3ppbHkiLCJmYW1pbHlfbmFtZSI6IlRzemlseSIsImxvY2FsZSI6Imh1IiwiaWF0IjoxNjI4MTY1Njc3LCJleHAiOjE2MjgxNjkyNzd9.LBrQTp4-o1gRdjgnq8GBO9FtTo2WmKpAW3j8nV5Soae9f-5DI5HVhPeETwwHfKUraRpQWkkHRDeS86MyHUuWhuQWbPfm0r38GrAFTIW4PrlKeKEGf-u6tmDKRnue5oRoAYTNDgI7GoJoG5p4hBx2QMTRmaFeLLQyVzz-vRibQIzboutfXvexI1Ebo6S8JvhrUvrCoDbuUx3bnam5ehnS4WFx_K4GDhKQEZ2XMGEh-GK4f8VqzD127Lo8ZotqXiqUzk9l5AiQGyXeW3ZB21OOkD4p-K1xWwxxbHgGdon66xEWVIcUop7tOXhjR2XcvlYwH2TZj6MN50JBgHkSgqghIA'
});


const jwt = require("jsonwebtoken");

const userboardsRouter = require("./routes/userboardRouter");
const errorHandler = require("./middleware/errorHandler");
const requestUserHandler = require("./middleware/requestUserHandler");
//const http = require('http');
const httpProxy = require("http-proxy");

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
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on("proxyReq", function (proxyReq, req, res, options) {
  //proxyReq.setHeader("X-USER-ID", "2");

  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      //console.log(err);
      proxyReq.removeHeader("X-USER-ID");
    } else {
      proxyReq.setHeader("X-USER-ID", decoded.user_id);
    }
  });
});

//app.use('/api/todo/*', (req, res, next) => res.json({ message: 'Handle all requests'}) )

app.all("/api/userboards*", (req, res, next) => {
  proxy.web(req, res, { target: "http://localhost:3001" });
});

app.use(requestUserHandler);

// gateway handles users and login

app.get("/login", async (req, res) => {
  const code = req.query.code;
  console.log(code);

  const response = await googleApi.post("/token", {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  })

  const data = await response.data;
  console.log(data);

  // const response = await fetch("https://oauth2.googleapis.com/token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     code,
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET,
  //     redirect_uri: process.env.REDIRECT_URI,
  //     grant_type: "authorization_code",
  //   }),
  // });

  // const data = await response.json();
  // console.log(data);

  const userInfo = jwt.decode(data.id_token);

  console.log(userInfo);

  const token = jwt.sign(
    { user_id: userInfo.sub, user_email: userInfo.email, user_pic: userInfo.picture, given_name: userInfo.given_name },
    process.env.JWT_SECRET
  );

  //res.status(200).json({message: "You're logged in"});
  res.status(200).json({ token });
});

app.get("/api/private", async (req, res) => {
  //console.log(req.headers);

  if (res.locals.user) {
    //console.log(verified);
    return res.json({ message: "PSSSSSST SUCH SECRET, MUCH WOW" });
  } else {
    //console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

// console.log("listening on port 3000")
// server.listen(3000);

module.exports = app;

// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=509125524563-6rc0a4856oteran745fe2s7c9hc1cn73.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login&prompt=select_account
