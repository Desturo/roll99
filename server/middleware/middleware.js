import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

export const sendToken = (token) => {
    return (req, res, next) => {
        console.log('this works');
        console.log(req.test);
        next();
    }
}