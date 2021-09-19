import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import characterRoutes from './routes/characters.routes.js';
import CharaterModel from './models/character.model.js';

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = 'mongodb+srv://Desturo:LTDB-14DX@cluster0.oyl5i.mongodb.net/characterDatabase?retryWrites=true&w=majority'

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/characters', characterRoutes);

app.get('/', (req, res) => {
    res.send('Hello to the roll99 APi');
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

    
