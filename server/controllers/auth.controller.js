import bcrtpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const users = [];

let refreshTokens = [];

dotenv.config();

export const getUsers = (req, res) => {
    res.json(users)
}

export const createUser = async (req, res) => {
    

    try {
        const hashedPassword = await bcrtpt.hash(req.body.password, 10);

        const user = { name: req.body.name, password: hashedPassword }
        users.push(user);
        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const loginUser = async (req, res) => {
    const user = users.find(user => user.name == req.body.name);

    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {
        if (await bcrtpt.compare(req.body.password, user.password)) {

            const accesToken = generateAccesToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECERET);
            refreshTokens.push(refreshToken);
            res.json({ accesToken: accesToken, refreshToken: refreshToken });

        } else {
            res.send('Wrong Password');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const logoutUser = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
}

export const getRefreshtoken = (req, res) => {
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccesToken({ name: user.name });
        res.json({ accessToken: accessToken });
    })
}



const generateAccesToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECERET, { expiresIn: '5min'});
}