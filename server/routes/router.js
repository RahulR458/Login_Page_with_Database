const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
// const authPage = require('../middlewares/authMidleware')


route.get('/',services.homeRoutes);
route.get('/user-table',services.user_table)
route.get('/add-user',services.add_user)
route.get('/update-user',services.update_user)
// route.get('/login',services.login_user)
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