const axios = require('axios')
const bcrypt = require('bcrypt')

const User = require('../model/model');



exports.user_table = (req, res) => {
    const use = req.session.userId;
    if (use && use.role === 1) {
        // Make a get request to /api/users
        axios.get('http://localhost:3000/api/users')
            .then(function (response) {
                // console.log(response.data);
                res.render("index", { users: response.data });
            })
            .catch(err => {
                res.send(err);
            })
    }else{
        res.redirect("/")
    }
}



exports.add_user = (req,res)=>{
    res.render("add_user");
}


exports.update_user = (req, res) => {
    const use = req.session.userId;
    if (use && use.role === 1){
            axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
                .then(function (userData) {
                    res.render("update_user", { user: userData.data });
                })
                .catch(err => {
                    res.send(err);
                })
    }else{
        res.redirect("/")
    }
}


exports.homeRoutes = (req,res)=>{
    if(req.session.userId){
        const user = req.session.userId
        if(user.role === 0){
            res.render("user_page")
        }else if(user.role === 1){
            res.render("dashboad")
        }     
    }else{
        res.render("login")
    } 
}


exports.user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(password);
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            res.render('login', { error: 'Invalid credentials' });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (user.role === 0) {
                console.log(user.password);
                if (passwordMatch) {
                    req.session.userId = user;
                    if (req.session.userId) {
                        res.redirect("user-page")
                    }
                }
            } else if (user.role === 1) {
                console.log(user.password);
                if (passwordMatch) {
                    req.session.userId = user;
                    if (req.session.userId) {
                        res.redirect("dashboad")
                    }
                }
            }
        }

    } catch (error) {
        res.status(500).send('Error during login.');
    }
}


exports.dashboad_user = (req, res) => {
    // if (req.session.userId) {
        const user = req.session.userId
        if (user && !user.role === 0) {
            res.render('dashboad')
        } else {
            res.redirect("/")
        }
    }
// }


exports.logout_admin = (req,res)=>{
    req.session.destroy();
    res.setHeader('Cache-Control', 'no-store');
    res.render("login",{title:"Express",logout:"logout Successfully...!"})
}


exports.page_user = (req,res)=>{
    if(req.session.userId){
        const user = req.session.userId;
        if (!user.role === 0){
            res.render("user_page")
    }else{
        res.redirect("/")
    }
        }
        
    
}

