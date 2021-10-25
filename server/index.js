const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./modules/auth/auth.route')
const chart = require('./modules/chart/chart.route')
// const { serverSocket } = require('./serverSocket');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

app.use(bodyParser.json());
app.use("/upload/avatars", express.static("upload/avatars"));
app.use("/upload/posts", express.static("upload/posts"));
app.use("/upload/comments", express.static("upload/comments"));

const db = process.env.DATABASE;// DB Config
console.log('database', db);
mongoose // Connect to MongoDB
  .connect(
    db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
global.isLog = false;


app.use(cors());
app.use('/auth', auth);
app.use('/chart', chart);


// serverSocket(io);

const port = process.env.PORT;
server.listen(port, () => console.log(`Server up and running on: ${port} !`));