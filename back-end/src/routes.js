const express = require('express');
let middleware = require('./middlewares/jwt');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

routes.get('/users', middleware.checkToken, UserController.index);
routes.get('/users/:id', middleware.checkToken, UserController.showUser);
routes.get('/users/:search', middleware.checkToken, UserController.show);

routes.delete('/users/:id', middleware.checkToken, UserController.destroy);
routes.put('/users/:id',middleware.checkToken, UserController.update);
routes.post('/users', UserController.store);
routes.post('/login', LoginController.login);

module.exports = routes;
