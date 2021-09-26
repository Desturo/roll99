import bcrtpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const users = [];

dotenv.config();

export const authenticate = (req, res) => {
    res.json(users)
}

export const createUser = async (req, res) => {
    

    try {
        const hashedPassword = await bcrtpt.hash(req.body.password, 10);

        const user = { name: req.body.name, password: hashedPassword }
        users.push(user);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const loginUser = async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {
        if (await bcrtpt.compare(req.body.password, user.password)) {

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECERET);

            res.json({ accessToken: accessToken});
        } else {
            res.send('Not Allowed');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
