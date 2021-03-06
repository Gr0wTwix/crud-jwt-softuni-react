let jwt = require('jsonwebtoken');
const hash = require('./hash');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, hash.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Invalid Token!'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Token authentication not provided!'
        })
    }
};

module.exports = { checkToken }