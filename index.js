const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io'); 
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();






app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, 'uploads/images')));
// app.use(express.static(path.join(__dirname, 'uploads/images/users')));
// app.use(express.static(path.join(__dirname, 'uploads/images/users/profile')));

app.use('/user/', require('./rautes/auth'));








const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});


// CORS configured via Server constructor (v4)

io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
});

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });
