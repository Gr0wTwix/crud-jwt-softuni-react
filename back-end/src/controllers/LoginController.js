const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');

let jwt = require('jsonwebtoken');
let hash = require('../middlewares/hash');

module.exports = {
    async login(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        const mocked = await User.findOne({ email });

        if (email && password && mocked != null) {
            if (email === mocked.email && password === mocked.password) {
                let token = jwt.sign({ email: email },
                    hash.secret,
                    { expiresIn: '24h' }
                );

                return res.json({
                    success: true,
                    message: 'Successfully authenticated!',
                    token: token,
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Incorrect email or password!',
                });
            }
        } else {
            return res.json({
                success: false,
                message: 'Email not registered!',
            });
        }
    }
}
