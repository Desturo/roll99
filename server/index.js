import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http'

import characterRoutes from './routes/characters.routes.js';
import CharaterModel from './models/character.model.js';

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb+srv://Desturo:LTDB-14DX@cluster0.oyl5i.mongodb.net/characterDatabase?retryWrites=true&w=majority'

const app = express();
const server = createServer(app);
const io = new Server(server, {cors: {
    origin: "*"
}});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/characters', characterRoutes);

app.get('/', (req, res) => {
    res.send('Hello to the roll99 APi');
});

io.on('connection', (socket) => {
    console.log(`connection ${socket.id.substr(0, 4)}`)

    socket.on('message', (message) => {
        const mssageObject = { text: message, id: socket.id};
        io.emit('message', mssageObject);
    });
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to database');
    })
    .catch((error) => {
        console.log(error);
    });

server.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})