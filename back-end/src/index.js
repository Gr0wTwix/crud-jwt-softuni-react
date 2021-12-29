const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://sadkat69:sadkat69@cluster0.p8o82.mongodb.net/thirdDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(5000, () => {
    console.log('Server is running on port 5000!');
});