const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const authPage = require('../middlewares/authMidleware')

const Permissions = [1,0];
/*
@description Root Route
@method GET/
*/
route.get('/',services.homeRoutes);
/*
@description add user
@method GET/add user
*/
route.get('/add-user',services.add_user)
/*
@description for update user
@method GET/update user
*/
route.get('/update-user',services.update_user)
// route.post('/update-user',services.update_user)

route.get('/login',services.login_user)
route.post('/login-user',services.user_login)

route.get('/dashboad',services.dashboad_user)

route.get('/logout',services.logout_admin)

route.get('/user-page',services.page_user)


//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route;