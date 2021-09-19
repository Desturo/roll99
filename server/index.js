import express from 'express';
import cors from 'cors';

import characterRoutes from './routes/characters';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use('/characters', characterRoutes);

app.get('/', (req, res) => {
    res.send('Hello to the roll99 APi');
})