const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const credentials = require('./util/credentials');

const app = express();

const jwtManager = require('./auth-guards/jwt-managment');
const socketEvents = require('./util/socketEvents');

const authRouter = require('./routes/auth');
const workoutRouter = require('./routes/workout');
const notificationRouter = require('./routes/notification');
const searchersRouter = require('./routes/searcher');
const trainerRouter = require('./routes/trainer');
const userRouter = require('./routes/user');
const socketRouter = require('./routes/socket');
const conversationRouter = require('./routes/conversation');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/files/profile-images', express.static(path.join('/files/profile-images')));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use('/api/auth', authRouter); 
app.use('/api/workout', jwtManager.jwtVerivier, workoutRouter); 
app.use('/api/notification', jwtManager.jwtVerivier, notificationRouter); 
app.use('/api/trainer', jwtManager.jwtVerivier, trainerRouter); 
app.use('/api/user', jwtManager.jwtVerivier, userRouter);
app.use('/api/searchers',jwtManager.jwtVerivier, searchersRouter);
app.use('/api/socket',jwtManager.jwtVerivier, socketRouter);
app.use('/api/conversation',jwtManager.jwtVerivier, conversationRouter);

let server;

mongoose
  .connect(credentials.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    server = app.listen(process.env.PORT || 3000);
    const io = require('./util/socket').init(server);
    io.on(socketEvents.connection, function (socket) {});
  })
  .catch(err => {
    console.log(err);
});
