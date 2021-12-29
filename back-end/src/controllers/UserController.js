const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('User');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const users = await User.paginate({}, { page, limit: 10, sort: '-createdAt' });
        return res.json(users);
    },

    async store(req, res) {
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail === null) {
            const user = await User.create(req.body);

            user.success = true;
            user.message = 'Email registered successfully!';

            req.io.emit('createUser', user);

            return res.json({ user, success: true, message: 'Email registered successfully!' });
        }

        return res.json({
            success: false,
            message: 'E-mail already registered!',
        })
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        req.io.emit('updateUser', user);

        return res.json({ user, success: true, message: 'User changed successfully!' });
    },

    async destroy(req, res) {
        const user = await User.findByIdAndRemove(req.params.id);

        req.io.emit('removeUser', user);

        return res.json({ user, success: true, message: 'User deleted successfully!' });
    },

    async showUser(req, res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async show(req, res) {
        const user = await User.find({ name: new RegExp('.*' + req.params.search + '.*') });

        return res.json(user);
    }

};