import express from 'express';
import cors from 'cors';

import characterRoutes from './routes/characters.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/characters', characterRoutes);

app.get('/', (req, res) => {
    res.send('Hello to the roll99 APi');
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})